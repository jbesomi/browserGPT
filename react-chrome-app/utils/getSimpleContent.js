// const { htmlToText } = require("html-to-text");

const htmlToText = require("html-to-text");

function getSimpleContent(html) {
  const options = {
    wordwrap: false,
    ignoreHref: true,
    ignoreImage: true,
    tags: {
      textarea: {
        format: "block",
        options: {
          leadingLineBreaks: 0,
          trailingLineBreaks: 0,
        },
      },
    },
    formatters: {
      textarea: (elem, walk, options) => {
        const content = walk(elem.children, options);
        return `[textarea]${content}[/textarea]`;
      },
    },
  };

  const options2 = {
    wordwrap: 130,
    ignoreHref: true,
    ignoreImage: true,
    preserveNewlines: true,
    uppercaseHeadings: false,
    singleNewLineParagraphs: false,
  };

  const text = htmlToText(html, options2);
  return text;
}

module.exports = {
  getSimpleContent,
};
