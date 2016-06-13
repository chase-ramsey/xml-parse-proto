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
    let description = item.getElementsByTagName("description");
    let innerDesc = description[0].textContent.match(/src="[^\"]*"/gim);
    let image = innerDesc[0].replace(/src=|"/gim, "");
    let newItem = new NewItem(title[0].textContent, author[0].textContent, link[0].textContent, image);
    itemsWired.push(newItem);
  });
  let buildHTML = `<h3>Wired</h3>`;
  for (var i = 0; i < 10; i++) {
    buildHTML += `<div class="content-card"><p><img src="${itemsWired[i].image}" /></p><div class="card-text"<p><a href="${itemsWired[i].link}">${itemsWired[i].title}</a></p><p> - ${itemsWired[i].author}</p></div></div>`
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
    let description = item.getElementsByTagName("description");
    let innerDesc = description[0].textContent.match(/src="[^\"]*"/gim);
    let image = innerDesc[0].replace(/src=|"/gim, "");
    let newItem = new NewItem(title[0].textContent, author[0].textContent, link[0].textContent, image);
    itemsPitchfork.push(newItem);
  });
  let buildHTML = `<h3>Pitchfork</h3>`;
  for (var i = 0; i < 10; i++) {
    buildHTML += `<div class="content-card"><p><img src="${itemsPitchfork[i].image}" /></p><div class="card-text"<p><a href="${itemsPitchfork[i].link}">${itemsPitchfork[i].title}</a></p><p> - ${itemsPitchfork[i].author}</p></div></div>`
  }
  outputPitchfork.innerHTML = buildHTML;
})

const testDataNYTimes = new XMLHttpRequest();
testDataNYTimes.open("GET", "http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml");
testDataNYTimes.send();
testDataNYTimes.addEventListener("load", function(event) {
  const testXML = this.responseXML;
  console.log("testXML: ", testXML);
  const allItemData = testXML.getElementsByTagName("item");
  const allItems = Array.from(allItemData);
  allItems.forEach(function(item) {
    let title = item.getElementsByTagName("title");
    let author = item.getElementsByTagName("creator");
    let link = item.getElementsByTagName("link");
    let image = "";
    let media = item.getElementsByTagName("content");
    console.log("media: ", media);
    if (media.length !== 0) {
      let mediaParse = media[0].outerHTML.match(/url="([^\"]*)"/g);
      console.log("mediaParse: ", mediaParse);
      let image = mediaParse[0].replace(/url=|"/g, "");
      console.log("image: ", image);
      let newItem = new NewItem(title[0].textContent, author[0].textContent, link[0].textContent, image);
      itemsNYTimes.push(newItem);
    }
  });
  let buildHTML = `<h3>NYTimes (Tech)</h3>`;
  for (var i = 0; i < 10; i++) {
    buildHTML += `<div class="content-card"><p><img src="${itemsNYTimes[i].image}" /></p><div class="card-text"<p><a href="${itemsNYTimes[i].link}">${itemsNYTimes[i].title}</a></p><p> - ${itemsNYTimes[i].author}</p></div></div>`
  }
  outputNYTimes.innerHTML = buildHTML;
})

function NewItem(title, author, link, image) {
  this.title = title;
  this.author = author;
  this.link = link;
  this.image = image;
}
