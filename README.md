# fake-sanity-image-cdn

## What is it?

A proxy to use Sanity <code>@sanity/image-url</code> helper with
fake image. Usefull in tests or storybook.

## How to use it?

Use this proxy service as the `baseUrl` when you create the
imageUrlBuilder instanse:

```js
import imageUrlBuilder from '@sanity/image-url';

const myConfiguredSanityClient = { /* ... */ };

const builder = imageUrlBuilder(myConfiguredSanityClient).withOptions({ 
  baseUrl: "https://fake-sanity-image-cdn.vercel.app/proxy/" 
});

console.log(builder.image("...").url())
```

## Limitations

- Do not support `webp` image transformations (`jpg` image will alwails be returned)
