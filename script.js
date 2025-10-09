function createPaste() {

const content = document.getElementById('pasteContent').value;
$.ajax({
 type:'POST',
 url: 'create.php',
 data: {content:content},
 dataType: 'json',
 success: function (response) {
  if (response.success) {
    const pasteId = response.id;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p> Your Paste <a href="view.php?id=${pasteId}" >View </a></p>`;
  } else {

    alert('Error');
  }



}, 
error: function () {

    alert('Error')
}

}); 

}