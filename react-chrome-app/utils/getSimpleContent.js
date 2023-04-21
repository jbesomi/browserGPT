const { htmlToText } = require("html-to-text");

function getSimpleContent(html) {
  const options = {
    wordwrap: false,
    ignoreHref: true,
    ignoreImage: true,
    formatters: {
      textarea: (elem, walk, options) => {
        const content = walk(elem.children, options);
        return `[textarea]${content}[/textarea]`;
      },
    },
  };

  const text = htmlToText(html, options);
  return text;
}

module.exports = {
  getSimpleContent,
};
