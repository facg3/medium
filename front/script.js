const input = document.getElementById('input');
var button = document.getElementById('search');
var interface = document.getElementById('interface');
var response = {};
// var leftDiv = document.createElement("div");
// var rightDiv = document.createElement("div");

button.addEventListener('click', function(event) {
  var name = input.value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      response = JSON.parse(xhr.responseText);
      if(interface.innerHTML == '') {
        createArticles(response);
      } else {
        removeArticles();
        createArticles(response);
      }
      // createArticles(response);
      // console.log("date",Date.now);
      // console.log('sdsdsdsds',typeof response);
    }
  }
  xhr.open("POST", "/mynews");
  xhr.send(name);
});

function createArticles(response){
  for (var i = 0; i < response.length; i++) {
    // document.getElementByTagName('interface').style.display = 'hidden';
    // document.getElementById('interface').style.visibility.hidden;
    console.log("samara",response[1].author);
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.src = response[i].urlToImage;
    div.appendChild(img);
    var author = document.createElement('h2');
    author.innerText= response[i].author;
    div.appendChild(author);
    var title = document.createElement('a');
    title.href=response[i].url;
    title.innerHTML= response[i].title;
    div.appendChild(title);
    var description = document.createElement('p');
    description.innerHTML= response[i].description;
    div.appendChild(description);
    var hr = document.createElement('hr');
    div.appendChild(hr);
    interface.appendChild(div);
  }


}
//
function removeArticles() {
  document.getElementById('interface').innerHTML = '';
  document.getElementById('interface').style.visibility.hidden;
}
