const inputNum = document.getElementById("num-input");
const inputOpt = document.getElementById("opt-input");
const genBtn = document.getElementById("gen-btn");
const genContent = document.getElementById("gen-content");
const copyBtn = document.getElementById("copy-btn");
let count = 0;
let options = "paras";
let tempCount = 0;
genBtn.addEventListener("click", () => {
  genContent.classList.add("gen-content");
  getValues();
});

function getValues() {
  count = inputNum.value;
  options = inputOpt.value;
  validateValue();
  let url =
    "https://baconipsum.com/api/?type=meat-and-filler&${options}=${count}&start-with-lorem=1";

  fetchContent(url);
}

async function fetchContent(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    let data = await response.json();
    displayGenContent(data);
  } else {
    alert("An Error occurred while fetching");
  }
}

function displayGenContent(data) {
  let texts = "";
  texts = data.join("<br /><br />");
  genContent.innerHTML = texts;
}

function validateValue() {
  if (count > 100) {
    invalidInput();
    count = 100;
    inputNum.value = count;
  } else if (count < 1 || isNaN(count)) {
    invalidInput();
    count = 5;
    inputNum.value = count;
  }
}

function invalidInput() {
  inputNum.style.border = "2px solid #ff6a67";
  setTimeout(() => {
    inputNum.style.border = "2px solid green";
  }, 1000);
}

copyBtn.addEventListener("click", () => {
  let copyText = genContent.textContent;
  navigator.clipboard.writeText(copyText);
});
