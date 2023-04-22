const cheerio = require("cheerio");

function simplifyHtml(html) {
  const $ = cheerio.load(html);

  ["style", "script", "noscript", "head", "meta"].forEach((tag) =>
    $(tag).remove()
  );

  $("div").replaceWith((i, el) => $(el).html());

  $("a, input, button").each(function (i) {
    const $elem = $(this);
    const text = $elem.text().trim();
    const tagName = $elem.prop("tagName").toLowerCase();

    const newTag = tagName === "input" ? "input" : "link";
    $elem.replaceWith(`<${newTag} id=${i}>${text}</${newTag}>`);
  });

  $("*")
    .contents()
    .filter(function () {
      return this.type === "text";
    })
    .each(function () {
      this.data = this.data.trim();
    });

  return $("body")
    .html()
    .replace(/<\/?input/g, (m) => m + ">");
}

// Usage
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Page</title>
</head>
<body>
  <div>
    <a href="https://example.com">Link example</a>
  </div>
  <input type="text" placeholder="Input example" />
  <button>Button example</button>
</body>
</html>
`;

console.log(simplifyHtml(html));
