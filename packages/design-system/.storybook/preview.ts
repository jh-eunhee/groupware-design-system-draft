import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
    },
  },
}

export default preview
