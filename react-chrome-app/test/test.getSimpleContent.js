const { getSimpleContent } = require("../utils/getSimpleContent");

test("getSimpleContent returns a simplified representation of the HTML content", () => {
  const html = `
    <div>
      <textarea>Sample text</textarea>
      <button>Submit</button>
      <a href="/one">Go to One</a>
      <a href="/two">Go to Two</a>
    </div>
  `;

  const expectedResult = `
    [textarea]Sample text[/textarea]
    Submit
    Go to One [/one]Go to Two [/two]
  `;

  // expect(getSimpleContent(html)).toEqual(expectedResult.trim());

  console.log(getSimpleContent(html));
});
