var input = document.getElementById('input');
var button = document.getElementById('search');
var response = {};
var leftDiv = document.createElement("div");
var rightDiv = document.createElement("div");

button.addEventListener('click', function(event) {
  var name = input.value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      response = JSON.parse(xhr.responseText);
      if(rightDiv.innerHTML == '') {
        createArticles(response);
      } else {
        removeArticles();
      }
    }
  }
  xhr.open("POST", "/mynews");
  xhr.send(name);
});


function createArticles(response) {
  leftDiv.setAttribute('id', 'leftDiv');
  rightDiv.setAttribute('id', 'rightDiv');
  var anchor = [],
    image = [],
    title = [],
    author = [],
    date = [];
  for (let i = 0; i < 5; i++) {
    anchor.push(document.createElement('a'));
    anchor[i].setAttribute('href', response.articles[i].url);
    image.push(document.createElement('img'));
    image[i].setAttribute('src', response.articles[i].urlToImage);
    title.push(document.createElement('p'));
    title[i].innerHTML = response.articles[i].title;
    author.push(document.createElement('p'));
    author[i].innerHTML = response.articles[i].author;
    date.push(document.createElement('p'));
    date[i].innerHTML = response.articles[i].publishedAt;
    anchor[i].appendChild(image[i]);
    anchor[i].appendChild(title[i]);
    anchor[i].appendChild(author[i]);
    anchor[i].appendChild(date[i]);

    if (i != 0) {
      rightDiv.appendChild(anchor[i]);
    } else {
      leftDiv.appendChild(anchor[i]);
    }
  }
  document.getElementsByClassName('body')[0].appendChild(leftDiv);
  document.getElementsByClassName('body')[0].appendChild(rightDiv);
  document.getElementById('leftDiv').style.visibility.visible;
  document.getElementById('rightDiv').style.visibility.visible;

}

function removeArticles() {
  document.getElementById('leftDiv').innerHTML = '';
  document.getElementById('leftDiv').style.visibility.hidden;
  document.getElementById('rightDiv').innerHTML = '';
  document.getElementById('rightDiv').style.visibility.hidden;
}
