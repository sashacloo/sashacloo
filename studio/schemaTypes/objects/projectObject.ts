import { PlayIcon } from '@sanity/icons'

export default {
  name: 'projectObject',
  title: 'Project',
  // icon: PlayIcon,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleIsVisible',
      title: 'Visible on the website',
      type: 'boolean',
      description: 'Show/hide project title on the website',
      initialValue: true,
    },
    {
      name: 'mediaItems',
      title: 'Project: images, videos, Q&A',
      type: 'array',
      of: [
        {type: 'imageObject'},
        {type: 'videoObject'},
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      mediaItems: 'mediaItems'
    },
    prepare: ({title, mediaItems}: { title: string, mediaItems?: any[] }) => {
      const media = mediaItems && mediaItems.length > 0 ? mediaItems[0] : null;
      return {
        title: title,
        media: media
      };
    }
  }
}
