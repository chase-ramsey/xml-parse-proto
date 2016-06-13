let itemsWired = [];
let itemsPitchfork = [];
let itemsNYTimes = [];

const outputWired = document.getElementById("output1");
const outputPitchfork = document.getElementById("output2");
const outputNYTimes = document.getElementById("output3");

const testDataWired = new XMLHttpRequest();
testDataWired.open("GET", "http://www.wired.com/feed/");
testDataWired.send();
testDataWired.addEventListener("load", function(event) {
  const testXML = this.responseXML;
  const allItemData = testXML.getElementsByTagName("item");
  const allItems = Array.from(allItemData);
  allItems.forEach(function(item) {
    let title = item.getElementsByTagName("title");
    let author = item.getElementsByTagName("creator");
    let link = item.getElementsByTagName("link");
    console.log("link: ", link);
    let newItem = new NewItem(title[0].textContent, author[0].textContent, link[0].textContent);
    itemsWired.push(newItem);
  });
  let buildHTML = `<h3>Wired</h3>`;
  for (var i = 0; i < 10; i++) {
    buildHTML += `<p><a href="${itemsWired[i].link}">${itemsWired[i].title}</a></p><p>${itemsWired[i].author}</p>`
  }
  outputWired.innerHTML = buildHTML;
})

const testDataPitchfork = new XMLHttpRequest();
testDataPitchfork.open("GET", "http://pitchfork.com/rss/news/");
testDataPitchfork.send();
testDataPitchfork.addEventListener("load", function(event) {
  const testXML = this.responseXML;
  const allItemData = testXML.getElementsByTagName("item");
  const allItems = Array.from(allItemData);
  allItems.forEach(function(item) {
    let title = item.getElementsByTagName("title");
    let author = item.getElementsByTagName("creator");
    let link = item.getElementsByTagName("link");
    let newItem = new NewItem(title[0].textContent, author[0].textContent, link[0].textContent);
    itemsPitchfork.push(newItem);
  });
  let buildHTML = `<h3>Pitchfork</h3>`;
  for (var i = 0; i < 10; i++) {
    buildHTML += `<p><a href="${itemsPitchfork[i].link}">${itemsPitchfork[i].title}</a></p><p>${itemsPitchfork[i].author}</p>`
  }
  outputPitchfork.innerHTML = buildHTML;
})

const testDataNYTimes = new XMLHttpRequest();
testDataNYTimes.open("GET", "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml");
testDataNYTimes.send();
testDataNYTimes.addEventListener("load", function(event) {
  const testXML = this.responseXML;
  const allItemData = testXML.getElementsByTagName("item");
  const allItems = Array.from(allItemData);
  allItems.forEach(function(item) {
    let title = item.getElementsByTagName("title");
    let author = item.getElementsByTagName("creator");
    let link = item.getElementsByTagName("link");
    let newItem = new NewItem(title[0].textContent, author[0].textContent, link[0].textContent);
    itemsNYTimes.push(newItem);
  });
  let buildHTML = `<h3>NYTimes</h3>`;
  for (var i = 0; i < 10; i++) {
    buildHTML += `<p><a href="${itemsNYTimes[i].link}">${itemsNYTimes[i].title}</a></p><p>${itemsNYTimes[i].author}</p>`
  }
  outputNYTimes.innerHTML = buildHTML;
})

function NewItem(title, author, link) {
  this.title = title;
  this.author = author;
  this.link = link;
}
