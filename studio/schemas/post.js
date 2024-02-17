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
      name: 'images',
      title: 'Image(s)',
      type: 'array',
      of: [{type: 'imageObject'}]
    },
    {
      name: 'color',
      title: 'Background Color',
      type: 'colorPicker',
      initialValue: '#ffffff'
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
    prepare: ({title, images}) => {
      return {
        title: title,
        media: images[0]
      }
    }
  },
}
