# fake-sanity-image-cdn

## What is it?

A proxy to use Sanity <code>@sanity/image-url</code> helper with
fake image. Usefull in tests or storybook.

## How to use it?

Use this proxy service as the `baseUrl` when you create the
imageUrlBuilder instanse:

```js
import imageUrlBuilder from '@sanity/image-url';

const myConfiguredSanityClient = {
/_ ... _/,
baseUrl: "https://fake-sanity-image-cdn.vercel.app/proxy/"
};

const builder = imageUrlBuilder(myConfiguredSanityClient);

console.log(builder.image("...").url())</code></pre>
```

## Limitations

- Do not support `webp` image transformations (`jpg` image will alwails be returned)
