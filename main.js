let items = [];

const output = document.getElementById("output");

const testData = new XMLHttpRequest();
testData.open("GET", "http://www.wired.com/feed/");
testData.send();
testData.addEventListener("load", function(event) {
  console.log("event: ", event);
  const testXML = this.responseXML;
  const allItemData = testXML.getElementsByTagName("item");
  console.log("testXML: ", testXML);
  console.log("allItemData: ", allItemData);
  const allItems = Array.from(allItemData);
  console.log("allItems: ", allItems);
  allItems.forEach(function(item) {
    let title = item.getElementsByTagName("title");
    let author = item.getElementsByTagName("creator");
    let newItem = new NewItem(title[0].textContent, author[0].textContent);
    items.push(newItem);
  });
  console.log("items after load: ", items);
  let buildHTML = '';
  items.forEach(function(item) {
    buildHTML += `<p>${item.title}</p><p> - ${item.author}</p>`
  })
  output.innerHTML = buildHTML;
})

function NewItem(title, author) {
  this.title = title;
  this.author = author;
}
