#!/usr/bin/env node
// Fetch SVG/PNG assets from Figma using the Images API.
// Usage examples:
//   FIGMA_TOKEN=xxx node scripts/fetch-figma-assets.mjs --config figma-assets.config.json
//   FIGMA_TOKEN=xxx node scripts/fetch-figma-assets.mjs --file-key <key> --svgs id1:icon-search,id2:icon-bell --pngs id3:hero@2x --scale 1
//   FIGMA_TOKEN=xxx node scripts/fetch-figma-assets.mjs --file-key <key> --auto --page "Dashboard" --limit 200
// Docs: https://www.figma.com/developers/api#images

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FIGMA_API = 'https://api.figma.com/v1'

function parseArgs(argv) {
  const args = {}
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        args[key] = true
      } else {
        args[key] = next
        i++
      }
    }
  }
  return args
}

function parseList(val) {
  // Format: id:name,id2:name2
  if (!val) return []
  return val.split(',').map((pair) => {
    const [id, name] = pair.split(':')
    return { id: id?.trim(), name: (name || id)?.trim() }
  }).filter(Boolean)
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function downloadTo(url, outPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await ensureDir(path.dirname(outPath))
  await fs.writeFile(outPath, buf)
}

async function fetchJson(url, token) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma API failed: ${res.status} ${res.statusText} - ${text}`)
  }
  return res.json()
}

async function fetchFile({ token, fileKey }) {
  return fetchJson(`${FIGMA_API}/files/${fileKey}`, token)
}

function walk(node, visit) {
  visit(node)
  if (node.children) {
    for (const child of node.children) walk(child, visit)
  }
}

function findPage(document, pageName) {
  return (document.children || []).find((p) => p.name === pageName)
}

function findNodeById(document, id) {
  let hit = null
  walk(document, (n) => { if (n.id === id) hit = n })
  return hit
}

function collectExportables(root, { limit = 500 }) {
  const results = []
  walk(root, (n) => {
    if (results.length >= limit) return
    const settings = n.exportSettings || n.export_settings || null
    if (Array.isArray(settings) && settings.length) {
      for (const s of settings) {
        const fmt = (s.format || s.mime_type || '').toString().toUpperCase()
        const suffix = (s.suffix || '').toString()
        let scale = 1
        if (s.constraint && s.constraint.type === 'SCALE' && typeof s.constraint.value === 'number') {
          scale = s.constraint.value
        }
        if (fmt === 'SVG' || fmt === 'PNG') {
          results.push({ id: n.id, name: n.name, format: fmt, suffix, scale })
        }
      }
    }
  })
  return results
}

function uniqueNames(items) {
  const used = new Map()
  for (const it of items) {
    const base = slugify((it.name || it.id) + (it.suffix ? ` ${it.suffix}` : ''))
    let name = base || slugify(it.id)
    let i = 1
    while (used.has(name)) {
      i += 1
      name = `${base}-${i}`
    }
    used.set(name, true)
    it.outName = name
  }
  return items
}

async function fetchImages({ token, fileKey, ids = [], format = 'svg', scale = 1 }) {
  if (!ids.length) return {}
  const u = new URL(`${FIGMA_API}/images/${fileKey}`)
  u.searchParams.set('ids', ids.join(','))
  u.searchParams.set('format', format)
  if (format === 'png' && scale) u.searchParams.set('scale', String(scale))
  const res = await fetch(u.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma images API failed: ${res.status} ${res.statusText} - ${text}`)
  }
  const json = await res.json()
  return json.images || {}
}

async function run() {
  const args = parseArgs(process.argv)
  const token = process.env.FIGMA_TOKEN
  if (!token) {
    console.error('Missing FIGMA_TOKEN env. Create a Figma Personal Access Token (file_read) and export FIGMA_TOKEN=...')
    process.exit(1)
  }

  // Load config if provided
  let config = { fileKey: '', svgs: [], pngs: [], scale: 1 }
  if (args.config) {
    const p = path.isAbsolute(args.config) ? args.config : path.join(process.cwd(), args.config)
    const raw = await fs.readFile(p, 'utf-8')
    config = { ...config, ...JSON.parse(raw) }
  }

  // CLI overrides
  const fileKey = args['file-key'] || config.fileKey
  if (!fileKey) {
    console.error('Missing file key. Provide --file-key <key> or set in config file.')
    process.exit(1)
  }

  let svgs = args.svgs ? parseList(args.svgs) : (config.svgs || [])
  let pngs = args.pngs ? parseList(args.pngs) : (config.pngs || [])
  let scale = Number(args.scale || config.scale || 1)

  const auto = !!args.auto
  const pageName = args.page && String(args.page)
  const rootId = args.root && String(args.root)
  const limit = Number(args.limit || 500)

  if (auto) {
    console.log('Auto-discovery enabled: reading exportable nodes from Figma file...')
    const file = await fetchFile({ token, fileKey })
    let scope = file.document
    if (pageName) {
      const page = findPage(file.document, pageName)
      if (!page) {
        console.error(`Page not found: ${pageName}`)
        process.exit(1)
      }
      scope = page
    }
    if (rootId) {
      const node = findNodeById(scope, rootId)
      if (!node) {
        console.error(`Root node not found in scope: ${rootId}`)
        process.exit(1)
      }
      scope = node
    }

    const exported = collectExportables(scope, { limit })
    if (!exported.length) {
      console.warn('No exportable nodes found (with export settings).')
    }

    const svgItems = exported.filter(e => e.format === 'SVG')
    const pngItems = exported.filter(e => e.format === 'PNG')

    uniqueNames(svgItems)
    uniqueNames(pngItems)

    svgs = svgItems.map(e => ({ id: e.id, name: e.outName }))

    // PNG scale decision: if all same scale in export settings, use it; else use provided scale
    const pngScales = new Set(pngItems.map(e => e.scale || 1))
    if (pngScales.size === 1) {
      const only = [...pngScales][0]
      if (!Number.isNaN(only) && Number(only) > 0) scale = Number(only)
    } else if (pngScales.size > 1) {
      console.warn(`Multiple PNG scales detected (${[...pngScales].join(', ')}). Using --scale/${scale}.`)
    }

    pngs = pngItems.map(e => ({ id: e.id, name: e.outName }))

    console.log(`Discovered: ${svgs.length} SVG, ${pngs.length} PNG (limit=${limit})`)
  }

  // Prepare output dirs
  const iconsDir = path.join(process.cwd(), 'public', 'icons')
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  await ensureDir(iconsDir)
  await ensureDir(imagesDir)

  // Fetch SVGs
  if (svgs.length) {
    const idList = svgs.map(s => s.id)
    const imageMap = await fetchImages({ token, fileKey, ids: idList, format: 'svg' })
    for (const item of svgs) {
      const url = imageMap[item.id]
      if (!url) {
        console.warn(`No URL for SVG id=${item.id} (${item.name})`)
        continue
      }
      const out = path.join(iconsDir, `${item.name || item.id}.svg`)
      await downloadTo(url, out)
      console.log(`Saved: ${path.relative(process.cwd(), out)}`)
    }
  } else {
    console.log('No SVG ids provided; skipping SVG download')
  }

  // Fetch PNGs
  if (pngs.length) {
    const idList = pngs.map(s => s.id)
    const imageMap = await fetchImages({ token, fileKey, ids: idList, format: 'png', scale })
    for (const item of pngs) {
      const url = imageMap[item.id]
      if (!url) {
        console.warn(`No URL for PNG id=${item.id} (${item.name})`)
        continue
      }
      const out = path.join(imagesDir, `${item.name || item.id}.png`)
      await downloadTo(url, out)
      console.log(`Saved: ${path.relative(process.cwd(), out)}`)
    }
  } else {
    console.log('No PNG ids provided; skipping PNG download')
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
