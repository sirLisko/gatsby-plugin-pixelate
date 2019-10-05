const plugin = require("../gatsby-node");

const pixelateSpy = jest.fn();
const getBase64Spy = jest.fn();

const mockImage = {
  pixelate: ratio => {
    pixelateSpy(ratio);
    return { getBase64: getBase64Spy };
  }
};
jest.mock("jimp", () => ({
  read: () => Promise.resolve(mockImage),
  MIME_PNG: "mime"
}));

describe("gatsby-node-pixelate", () => {
  const fakeNode = {
    internal: {
      type: "IAmANodeType"
    },
    image_url: "i_am_the_original_image"
  };
  const mockActions = {
    createNodeField: jest.fn()
  };
  const gatbyInjected = {
    node: fakeNode,
    actions: mockActions
  };

  it("should return undefined if it not a meaningful node", () => {
    const configOptions = {
      nodeType: "foo",
      nodeInput: "image_url",
      ratio: "5"
    };
    expect(plugin.onCreateNode(gatbyInjected, configOptions)).toBe(undefined);
  });

  it("should return undefined if it not a meaningful node property", () => {
    const configOptions = {
      nodeType: "IAmANodeType",
      nodeInput: "not_image_url",
      ratio: "5"
    };
    expect(plugin.onCreateNode(gatbyInjected, configOptions)).toBe(undefined);
  });

  it("should work only on meaningful nodes", () => {
    const configOptions = {
      nodeType: "IAmANodeType",
      nodeInput: "image_url",
      ratio: "5"
    };
    expect(plugin.onCreateNode(gatbyInjected, configOptions)).not.toBe(
      undefined
    );
  });

  it("should work properly", async () => {
    const configOptions = {
      nodeType: "IAmANodeType",
      nodeInput: "image_url",
      ratio: "5"
    };
    await plugin.onCreateNode(gatbyInjected, configOptions);
    expect(pixelateSpy).toHaveBeenCalledWith("5");
    expect(getBase64Spy).toHaveBeenCalledWith("mime", expect.any(Function));

    getBase64Spy.mock.calls[0][1]({}, "iAmPixelated");
    expect(gatbyInjected.actions.createNodeField).toHaveBeenCalledWith({
      name: "image_pixelated",
      node: fakeNode,
      value: "iAmPixelated"
    });
  });
});
