#!/bin/bash

# Find the default Chrome user data directory on Linux or macOS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  CHROME_PROFILE_DIR="$HOME/.config/google-chrome"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  CHROME_PROFILE_DIR="$HOME/Library/Application Support/Google/Chrome"
else
  echo "Unsupported operating system"
  exit 1
fi

# Check if the directory exists
if [[ ! -d "$CHROME_PROFILE_DIR" ]]; then
  echo "Chrome profile directory not found: $CHROME_PROFILE_DIR"
  exit 1
fi

echo "Chrome profile directory: $CHROME_PROFILE_DIR"
