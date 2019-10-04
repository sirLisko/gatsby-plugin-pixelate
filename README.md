# gatsby-plugin-pixelate [![npm][npm-image]][npm-url]

> A Gatsby plugin for pixelating images

## Install

```bash
npm install gatsby-plugin-pixelate
```

## Example

### Config file

```js
  {
    resolve: "gatsby-plugin-pixelate",
      options: {
        nodeType: "GoodreadsBook",
        nodeInput: "image_url",
        nodeOutput: "image_pixelated",
        ratio: 5
      }
    }
  }
```

It will extend the `nodeType` with the _base64_ version of the image container in `nodeInput`

```js
  // GoodreadsBook node
  fields {
    image_pixelated
  }
```

[npm-image]: https://img.shields.io/npm/v/gatsby-plugin-pixelate.svg
[npm-url]: https://npmjs.com/package/gatsby-plugin-pixelate
