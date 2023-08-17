// Constants
const API_KEY = "INSERT_API_KEY";
const MODEL_TYPE = "text-curie-001"; //chatGPT model

var finalString = "";
var tokensUsed = 0;
var totaltokens = 0;

// Creates a custom menu in Google Docs
function onOpen() {
  DocumentApp.getUi().createMenu("DocuGPT")
    .addItem("Finish Idea", "generateIdeas")
    .addItem("Show Sidebar", "showSidebar")
    .addToUi();
}

function getFinalString() {
  return finalString;
}

function getTokensUsed(){
  return tokensUsed;
}

function getTotalTokensUsed(){
  return totaltokens;
}

function getSelectedText() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  const text = [];
  if (selection) {
    const elements = selection.getSelectedElements();
    for (let i = 0; i < elements.length; ++i) {
      if (elements[i].isPartial()) {
        const element = elements[i].getElement().asText();
        const startIndex = elements[i].getStartOffset();
        const endIndex = elements[i].getEndOffsetInclusive();

        text.push(element.getText().substring(startIndex, endIndex + 1));
      } else {
        const element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip images and
        // other non-text elements.
        if (element.editAsText) {
          const elementText = element.asText().getText();
          // This check is necessary to exclude images, which return a blank
          // text element.
          if (elementText) {
            text.push(elementText);
          }
        }
      }
    }
  }
  if (!text.length) throw new Error('Please select some text.');
  return text;
}


function showSidebar() {
  var template = HtmlService.createTemplateFromFile('Page');
  template.value = getFinalString();
  template.val = getTokensUsed();
  template.totval = getTotalTokensUsed();
  var html = template.evaluate().setTitle('DocuGPT');
  DocumentApp.getUi().showSidebar(html);
}

// Generates prompt based on the selected text and adds it to the document
function generateIdeas() {
  const doc = DocumentApp.getActiveDocument();
  const selectedText = getSelectedText()
  const body = doc.getBody();
  const prompt = selectedText;
  console.log(selectedText);

  const requestBody = {
    model: MODEL_TYPE,
    prompt: prompt,
    temperature: 1,
    max_tokens: 40,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    payload: JSON.stringify(requestBody),
  };

  const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestOptions);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  const generatedText = json.choices[0].text;
  Logger.log(generatedText);

  finalString = generatedText.toString();
  const usage = json.usage;
  if(usage && usage.total_tokens){
    tokensUsed = usage.total_tokens;
  }

  finalString = finalString.replace(/(\r\n|\n|\r)/gm, "");

  showSidebar();
}
