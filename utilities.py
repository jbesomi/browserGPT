import os
from typing import Any, Dict, Optional

from playwright.sync_api import sync_playwright, Page
from pydantic import BaseModel, Extra, Field, root_validator

from langchain.utils import get_from_dict_or_env


class PlaywrightDriverCrawler(BaseModel):
    """Wrapper around Playwright.

    To use, you should have the ``playwright`` python package installed.

    Example:
        .. code-block:: python

            from langchain import PlaywrightDriverCrawler
            playwright_crawler = PlaywrightDriverCrawler()
    """

    playwright: Any  #: :meta private:
    browser: Any  #: :meta private:
    context: Any  #: :meta private:
    page: Optional[Page] = None

    class Config:
        """Configuration for this pydantic object."""

        extra = Extra.forbid
        arbitrary_types_allowed = True

    @root_validator()
    def validate_environment(cls, values: Dict) -> Dict:
        """Validate that python package exists in environment."""
        try:
            import playwright.sync_api

            values["playwright"] = playwright.sync_api
        except ImportError:
            raise ValueError(
                "Could not import playwright python package. "
                "Please install it with `pip install playwright` and run `playwright install`."
            )
        return values

    def __init__(self, **data: Any) -> None:
        super().__init__(**data)
        self._initialize_playwright()

    def _initialize_playwright(self) -> None:
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=False)
        self.context = self.browser.new_context()

    def run(self, command: str) -> str:
        """Run command through Playwright and parse result."""
        print(f"command: {command}.")
        self.page = self.context.new_page()
        result = self.execute_command(command)
        self.page.close()
        print(f"result: {result}.")
        return result

    def goto(self, url: str = Field(description="url to go to")) -> str:
        self.page = self.context.new_page()
        self.execute_command(f"goto('{url}')")
        self.page.close()
        return f"go to {url} done."

    def execute_command(self, command: str) -> str:
        """Execute command using Playwright."""
        try:
            result = eval(f"self.page.{command}")
        except Exception as e:
            result = f"Error executing command: {str(e)}"
        return result

    def close(self) -> None:
        """Close Playwright browser and stop the Playwright driver."""
        if self.context:
            self.context.close()
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
