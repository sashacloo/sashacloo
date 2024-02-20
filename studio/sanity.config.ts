import { colorInput } from "@sanity/color-input"
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'sashacloo',

  projectId: '1ql581l8',
  dataset: 'production',

  plugins: [
    colorInput(),
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
