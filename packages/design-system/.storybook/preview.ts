import type { Preview } from '@storybook/react'
import '../../design-tokens/build/css/variables.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
    },
  },
}

export default preview
