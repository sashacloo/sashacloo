export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'dateTime',
      title: 'Date/Time',
      type: 'datetime'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'body',
      title: 'Description',
      type: 'blockContent'
    },
    {
      name: 'link',
      title: 'Link to post',
      type: 'url',
    }
  ],

  preview: {
    select: {
      dateTime: 'dateTime',
      title: 'title'
    }
  }
}
