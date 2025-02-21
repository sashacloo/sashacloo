export default {
  name: 'linkObject',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https', 'tel', 'mailto'],
      })
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
