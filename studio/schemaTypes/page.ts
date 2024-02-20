export default {
  name: 'page',
  title: 'Page',
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
      name: 'images',
      title: 'Image(s)',
      type: 'array',
      of: [{type: 'imageObject'}]
    },
    {
      name: 'color',
      title: 'Background Color',
      type: 'color',
      initialValue: '#ffffff',
      options: {
        disableAlpha: true
      }
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
    prepare: ({title, images}) => {
      const media = images && images.length > 0 ? images[0] : null;
      return {
        title: title,
        media: media
      };
    }
  },
}
