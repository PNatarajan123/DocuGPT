# DocuGPT
GPT-4 based autocomplete for Google Docs

DocuGPT is a Google Apps Script project that integrates OpenAI's powerful GPT model directly into Google Docs, allowing users to generate text, summarize content, and much more, directly within a document.

## Prerequisites

Before you begin, ensure you have an OpenAI API key. If you don't have one, visit [OpenAI](https://openai.com/) to generate your API key.

## Setup Instructions

### Step 1: Getting the Script

1. Navigate to the [DocuGPT GitHub repository](https://github.com/PNatarajan123/DocuGPT).
2. Download or clone the repository to your local machine.

### Step 2: Creating a Google Apps Script

1. Open Google Docs and create a new document or open an existing one.
2. Click on `Extensions` > `Apps Script`.
3. Delete any code in the script editor and replace it with the code from the `Code.gs` file from the cloned or downloaded repository.
4. Delete any code in the Page.html script and copy paste the HTML code from this github.

### Step 3: Adding Your API Key

1. In the script editor, locate the line `var API_KEY = "";`.
2. Replace the empty quotes with your OpenAI API key, so it looks like `var API_KEY = "your_api_key_here";`.

### Step 4: Saving and Using the Script

1. Save the script by clicking `File` > `Save`, and give it a name.
2. Close the Apps Script tab.
3. Refresh your Google Docs page.
4. After refreshing, you should see a new menu item in your Google Docs menu bar named `DocuGPT` or the name you gave to your script. If you don't see it, you might need to refresh the page again or ensure your script is correctly saved and named.

## Using DocuGPT

With the script now embedded in your Google Docs, you can use it to generate text, summarize content, and perform other tasks supported by the GPT model directly in your document. Click on the menu item added by your script to see the available options and start interacting with GPT.

## Troubleshooting

- **Menu not appearing**: Ensure the script was saved correctly, and try refreshing the Google Docs page.
- **API key issues**: Double-check that the API key is correctly entered in the script. There should be no extra spaces or characters.

## Contributing

Feel free to fork the repository and submit pull requests with any improvements or fixes. For major changes, please open an issue first to discuss what you would like to change.
