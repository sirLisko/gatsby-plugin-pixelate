const Jimp = require("jimp");

function onCreateNode({ node, actions }, configOptions) {
  if (node.internal.type !== configOptions.nodeType) {
    return;
  }
  if (!node[configOptions.nodeInput]) {
    return;
  }
  return Jimp.read(node[configOptions.nodeInput]).then(image =>
    image
      .pixelate(configOptions.ratio)
      .getBase64(Jimp.MIME_PNG, (err, image_pixeled) =>
        actions.createNodeField({
          name: configOptions.nodeOutput || "image_pixelated",
          value: image_pixeled,
          node
        })
      )
  );
}

exports.onCreateNode = onCreateNode;
