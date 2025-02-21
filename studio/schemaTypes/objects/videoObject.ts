import { PlayIcon } from '@sanity/icons'

export default {
  name: 'videoObject',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'video',
      title: 'Video File',
      type: 'file',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image'
    },
    {
      name: 'soundToggle',
      title: 'Show Sound on/off switch',
      type: 'boolean',
      description: 'Show/hide project title on the website',
      initialValue: false
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      title: 'title',
    }
  },
}
