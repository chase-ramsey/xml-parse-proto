const testData = new XMLHttpRequest();
testData.open("GET", "https://killscreen.com/feed");
testData.send();
testData.addEventListener("load", function() {
  const testXML = this.responseXML;
  console.log("testXML: ", testXML);
})
