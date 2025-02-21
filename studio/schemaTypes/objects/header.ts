export default {
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'info',
      title: 'Info',
      type: 'text',
    },
    {
      name: 'links',
      title: 'Header Links',
      type: 'array',
      of: [
        { type: 'linkObject' },
        { type: 'internalLink' },
        { type: 'anchorLink' },
      ]
    },
  ]
}
