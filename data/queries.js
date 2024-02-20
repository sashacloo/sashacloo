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
export const postsQuery = `
'posts': *[_type == 'post'] | order(publishedAt desc){
  ...,
  slides[]{
    ...,
    _type == 'imageObject' => ${imageQuery},
    _type == 'videoObject' => {
      ...,
      video${videoQuery}
    },
  },
  images[]${imageQuery},
}`
export const pageQuery = `
  'page': *[_type == 'page' && slug.current == $slug][0]{
    ...,
    images[]${imageQuery},
    gridItems[]{
      ...,
      image${imageQuery},
      video${videoQuery}
    },
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
