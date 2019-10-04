# gatsby-plugin-pixelate

> A Gatsby plugin for pixelating images

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
