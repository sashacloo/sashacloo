export default {
  title: 'Site',
  name: 'site',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "Your website's name. Should be under 60 characters.",
      validation: Rule => Rule.max(60).warning('Should be under 60 characters.'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: "A short summary of what to expect when visiting your website. Should be under 160 characters.",
      validation: Rule => Rule.max(160).warning('Should be under 160 characters.'),
    },
    {
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'The address people will type in to get to your website.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'This image is the first thing people will see when someone shares your website. Recommended size 1200x630 (will be auto resized).',
    },
    {
      name: 'appID',
      title: 'Facebook App ID',
      type: 'string',
      description: "Your Facebook App ID can be found by clicking \"Settings\" then \"Basic\" in the navigation menu on the left side of your Facebook App page.",
    },
  ],
}
