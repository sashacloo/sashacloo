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
