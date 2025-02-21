export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mediaItems',
      title: 'Content blocks',
      description: 'Projects, images, videos',
      type: 'array',
      of: [
        {type: 'imageObject'},
        {type: 'videoObject'}
      ],
    },
    {
      name: 'large',
      title: 'make media items large',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'color',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: new Date().toISOString()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      images: 'images'
    },
    prepare: ({title, mediaItems}: { title: string, mediaItems?: any[] }) => {
      const media = mediaItems && mediaItems.length > 0 ? mediaItems[0] : null;
      return {
        title: title,
        media: media
      };
    }
  },
}
