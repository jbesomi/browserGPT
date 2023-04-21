# test.py
from utilities import PlaywrightDriverCrawler


def test_playwright_driver_crawler():
    crawler = PlaywrightDriverCrawler()

    # Navigate to a website
    crawler.run('goto("https://example.com")')

    # Take a screenshot and save it to a file
    crawler.run('screenshot(path="example_screenshot.png")')

    # Close the Playwright resources
    crawler.close()


if __name__ == "__main__":
    test_playwright_driver_crawler()
