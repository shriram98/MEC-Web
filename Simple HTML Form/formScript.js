document.forms["jobapp"].onsubmit = function(e){
  convertJSON();
  e.preventDefault();
}

function convertJSON(){
  document.getElementById("right").innerHTML = "Please wait...Processing";
  var obj = {};
  var i;
  for(i=0;i<9;i++)
  {
    var nm = document.forms["jobapp"][i].name;
    var vl = document.forms["jobapp"][i].value;
    if(i<2 || i>4)
    {
      obj[nm]= vl;
    }
    else {
        if(document.forms["jobapp"][i].checked)
        {
          obj[nm] = vl;
        }
    }
  }

  //var JSONobj = JSON.stringify(obj);
  //document.getElementById("right").innerHTML = obj + '\n\n' + JSONobj;

  postData(obj);


}

function postData(data){
  fetch('https://httpbin.org/post', {
    method:'post',
    body : JSON.stringify(data)
  }).then(
    function(response){
      return response.json();
    }).then(function(output){
      //var d1 = document.getElementById('out');
      var d=JSON.stringify(output);
      //d1.insertAdjacentHTML('beforeend', '\n\n' + d + '\n\n' + output );
      document.getElementById("right").innerHTML =  '\n\n' + d + '\n\n' + output;
      for (var property in output) {
        console.log(property + ': ' +output[property]);
}
    }).catch(function(error){
      window.alert('Error Fetching Data');
      document.getElementById("right").innerHTML = "Error";
    });
}
