const imageQuery = `{
  ...,
  asset->,
  "assetId": asset->_id,
}`
const videoQuery = `{
  ...,
  asset->,
  'aspectRatio': asset->data.aspect_ratio,
  'playbackId': asset->playbackId,
}`
const linkQuery = `{
  ...,
  _type == 'internalLink' => {
    'referenceTitle': reference->title,
    'referenceType': reference->_type,
    'slug': reference->slug.current,
  }
}`
export const postQuery = `{
  ...,
  categories[]->{
    title,
    description,
    "slug": slug.current,
  },
  mediaItems[]{
    ...,
    _type == 'imageObject' => ${imageQuery},
    _type == 'videoObject' => {
      ...,
      video${videoQuery}
    },
  },
  images[]${imageQuery},
}`
export const postsQuery = `
  'posts': *[_type == 'post'] | order(publishedAt desc)${postQuery}
`
export const postsByCategoryQuery = `
  'posts': *[_type == 'post' && references(*[_type == 'category' && (slug.current == $category || lower(title) == lower($category))][0]._id)] | order(publishedAt desc)${postQuery}
`
export const categoryBySlugQuery = `
  'category': *[_type == 'category' && (slug.current == $category || lower(title) == lower($category))][0]{
    title,
    description,
    "slug": slug.current,
  }
`
export const pageQuery = `
  'page': *[_type == 'page' && slug.current == $slug][0]{
    ...,
    images[]${imageQuery},
    gridItems[]{
      ...,
      image${imageQuery},
      video${videoQuery}
    },
    posts[]->${postQuery}
  }
`
export const siteQuery = `
  'site': *[_type == 'site'][0]{
    ...,
    footer{
      ...,
      links[]${linkQuery},
      services[]->,
      services2[]->
    },
    header{
      ...,
      links[]${linkQuery},
    }
  }
`
