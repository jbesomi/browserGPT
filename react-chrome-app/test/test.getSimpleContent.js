const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

const cheerio = require("cheerio");

const parseHTMLtoJSON = (html) => {
  const $ = cheerio.load(html);

  const processElement = (element) => {
    const obj = {
      type: element.name,
      children: [],
    };

    // Process text content
    const text = $(element).text().trim();
    if (text) {
      obj.content = text;
    }

    // Process attributes
    const attributes = $(element).attr();
    const allowedAttributes = ["href", "src", "id"];
    const filteredAttributes = Object.entries(attributes)
      .filter(([key]) => allowedAttributes.includes(key))
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    if (Object.keys(filteredAttributes).length > 0) {
      obj.attributes = filteredAttributes;
    }

    // Process child elements
    $(element)
      .children()
      .each((_, child) => {
        obj.children.push(processElement(child));
      });

    return obj;
  };

  return processElement($("body").get(0));
};

// Example usage

async function getHtmlFromUrl(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const html = await response.text();
      return html;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching URL: ${error.message}`);
    return null;
  }
}

const htmlparser2 = require("htmlparser2");

function filterDOM(htmlString) {
  const $ = cheerio.load(htmlString);

  const handler = new htmlparser2.DomHandler();
  const parser = new htmlparser2.Parser(handler, { decodeEntities: true });

  parser.write(htmlString);
  parser.end();
  const rootNode = handler.dom;

  function filterNodes(node) {
    if (!node.children) {
      return;
    }

    node.children = node.children.filter((child) => {
      if (child.type === "tag") {
        if (
          child.name === "a" ||
          child.name === "input" ||
          child.name === "textarea"
        ) {
          return true;
        } else {
          filterNodes(child);
          return child.children && child.children.length > 0;
        }
      } else if (child.type === "text" && child.data.trim() !== "") {
        return true;
      }

      return false;
    });
  }

  filterNodes(rootNode[0]);
  return rootNode;
}

// Example usage:
const inputHtml = `
  <html>
    <head>
      <title>Test Page</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>
        Here is some text with a <a href="https://example.com">link</a>.
      </p>
      <input type="text" placeholder="Type here">
      <textarea>Write something...</textarea>
    </body>
  </html>
`;

const minimalDOM = filterDOM(inputHtml);
console.log(JSON.stringify(minimalDOM, null, 2));

const html2 = `
  <div>
    <h1>Page Title</h1>
    <p>This is a paragraph.</p>
    <a href="https://www.example.com">Click here</a>
  </div>
`;

(async () => {
  const url = "http://localhost:3000/";
  const html = await getHtmlFromUrl(url);

  if (html) {
    const jsonRepresentation = parseHTMLtoJSON(html);
    console.log(JSON.stringify(jsonRepresentation, null, 2));
  }
})();
