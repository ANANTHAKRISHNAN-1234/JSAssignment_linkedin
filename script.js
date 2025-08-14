const api_url = "https://zenquotes.io/api/quotes";

const quote_api_url =
  "https://firestore.googleapis.com/v1/projects/js-learn-776cf/databases/(default)/documents/Quotes";
let quoteLists = [];
const quote = document.getElementById("quotetext");
const author = document.getElementById("quote-author");
async function getQuotes() {
  try {
    const response = await fetch(quote_api_url);
    data = await response.json();
    documents = data.documents;
    documents.forEach((docs) => {
      quoteLists.push(docs.fields);
      console.log(docs.fields);
    });
    if (quoteLists[1].q.stringValue === "") {
      //if quotes is empty at starting
      quote.innerHTML = "Be Brave";
      author.innerHTML = "Jawaharlal Nehru";
    } else {
      quote.innerHTML = `"${quoteLists[1].q.stringValue}"`;
      author.innerHTML = `-${quoteLists[1].a.stringValue}`;
    }
  } catch (api_error) {
    console.log(api_error);
  }
}
function changeContent() {
  const randomIndex = Math.floor(Math.random() * quoteLists.length);
  console.log(randomIndex);
  console.log(quoteLists[randomIndex].q.stringValue);
  if (quoteLists[randomIndex].q.stringValue === "") {
    changeContent();
    return;
  }
  let length = quoteLists[randomIndex].q.stringValue.length;
  // Adjust font size and height based on quote length
  if (length < 40) {
    quotetext.style.fontSize = "2rem";
    quotetext.style.height = "100px";
  } else if (length < 100) {
    quotetext.style.fontSize = "1.5rem";
    quotetext.style.height = "130px";
  } else {
    quotetext.style.fontSize = "0.5em";
    quotetext.style.height = "160px";
  }
  quote.innerHTML = `"${quoteLists[randomIndex].q.stringValue}"`;
  author.innerHTML = `-${quoteLists[randomIndex].a.stringValue}`;
}
function shareOnLinkedIn() {
  const textToShare = document.getElementById("quotetext").innerText;

  // Encode the text and use it as part of a URL on your site
  const baseUrl =
    "http://127.0.0.1:5501/Assignment/14082025_day1_QuoteAssignment/index.html"; // You must have this page that shows the content
  const urlWithText = baseUrl + "?content=" + encodeURIComponent(textToShare);

  // LinkedIn Share URL with your generated URL
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    urlWithText
  )}`;

  // Open LinkedIn share window
  window.open(linkedInUrl, "_blank");
}
//onload
getQuotes();
