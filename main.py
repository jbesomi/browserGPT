from langchain.utilities import SerpAPIWrapper
from langchain.agents import Tool
from langchain.tools.file_management.write import WriteFileTool
from langchain.tools.file_management.read import ReadFileTool

from langchain.agents import load_tools

# from utilities import PlaywrightDriverCrawler
# playwright_crawler = PlaywrightDriverCrawler()

from langchain.utilities import TextRequestsWrapper

from Crawler import Crawler

requests = TextRequestsWrapper()

_crawler = Crawler()

"""
if cmd.startswith("SCROLL UP"):
			_crawler.scroll("up")
		elif cmd.startswith("SCROLL DOWN"):
			_crawler.scroll("down")
		elif cmd.startswith("CLICK"):
			
		elif cmd.startswith("TYPE"):
			spacesplit = cmd.split(" ")
			id = spacesplit[1]
			text = spacesplit[2:]
			text = " ".join(text)
			# Strip leading and trailing double quotes
			text = text[1:-1]

			if cmd.startswith("TYPESUBMIT"):
				text += '\n'
			_crawler.type(id, text)
"""

"""

"""

from pydantic import Field


def click(id: str = Field(description="ID to click")):
    _crawler.click(id)
    return "done."


def type(
    id: str = Field(description="ID to click"),
    text: str = Field(description="content to type into"),
):
    text = " ".join(text)
    _crawler.type(id, text)
    return "done."


def get_browser_content():
    browser_content = "\n".join(_crawler.crawl())
    return browser_content


tools = [
    Tool(
        name="scroll_up",
        func=lambda x: _crawler.scroll("up"),
        description="Scroll up one page",
    ),
    Tool(
        name="scroll_down",
        func=lambda x: _crawler.scroll("down"),
        description="Scroll down one page",
    ),
    Tool(
        name="click",
        func=click,
        description="click on a given element. You can only click on links, buttons, and inputs!",
    ),
    Tool(
        name="type",
        func=type,
        description="type the specified text into the input with id X",
    ),
    Tool(
        name="browser_content",
        func=get_browser_content,
        description="Get browser content (simplified) of the current open page",
    ),
    Tool(
        name="goto page",
        func=_crawler.go_to_page,
        description="Go to the selected page",
    ),
    WriteFileTool(),
]


from langchain.vectorstores import FAISS
from langchain.docstore import InMemoryDocstore
from langchain.embeddings import OpenAIEmbeddings

# Define your embedding model
embeddings_model = OpenAIEmbeddings()
# Initialize the vectorstore as empty
import faiss

embedding_size = 1536
index = faiss.IndexFlatL2(embedding_size)
vectorstore = FAISS(embeddings_model.embed_query, index, InMemoryDocstore({}), {})

from langchain.experimental import AutoGPT
from langchain.chat_models import ChatOpenAI

agent = AutoGPT.from_llm_and_tools(
    ai_name="Tom",
    ai_role="Assistant",
    tools=tools,  # + other_tools,
    llm=ChatOpenAI(temperature=0),
    memory=vectorstore.as_retriever(),
)
# Set verbose to be true
agent.chain.verbose = True

agent.run(
    [
        "go to https://jbesomi.com, then open the 'backstage' page, from the 'backstage', select the first article and save the article in a file called first.txt"
    ]
)

import time

time.sleep(1000)
