from playwright.sync_api import Playwright, sync_playwright

# Define the path to your real Chrome profile
user_data_dir = "/Users/jonathan/Library/Application Support/Google/Chrome"

with sync_playwright() as playwright:
    # Launch the browser with the user data directory option
    browser = playwright.chromium.launch_persistent_context(
        user_data_dir=user_data_dir,
        headless=False,  # Set to True if you don't want to see the browser window
    )

    # Create a new page in the browser
    page = browser.new_page()

    # Use the page object to interact with the web page
    page.goto("https://www.example.com")
    print(page.title())

    # Close the browser
    # browser.close()
