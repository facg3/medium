var input = document.getElementById('input');
var button = document.getElementById('search');
var response = {};

button.addEventListener('click', function(event) {
  var name = input.value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      response = JSON.parse(xhr.responseText);
    }
  }
  xhr.open("POST", "/mynews");
  xhr.send(name);

});
