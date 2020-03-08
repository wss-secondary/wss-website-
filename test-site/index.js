// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDB5WvMVUCGrN-LQdW2IxBo9Os3GIhS8yc",
    authDomain: "wss-website-22b8b.firebaseapp.com",
    databaseURL: "https://wss-website-22b8b.firebaseio.com",
    projectId: "wss-website-22b8b",
    storageBucket: "gs://wss-website-22b8b.appspot.com",
    messagingSenderId: "534076691405",
    appId: "1:534076691405:web:03fd536ec35c829feaaa84",
    measurementId: "G-SZ62MRH5FX"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Storage Buckets
var storage = firebase.storage();
var storageRef = storage.ref();
var classref = storageRef.child('folder');
//var physicsref = storageRef.child('folder');


//Retreiving files

//var storage = firebase.storage();

var pathReference = storage.ref('file.pdf');
var gsReference = storage.refFromURL('gs://file.pdf')
//var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/file.pdf')


storageRef.child('file.pdf').getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
    console.log('url:', url);
  
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
      console.log('blob:', blob);
      const data = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = data;
      link.download="file.pdf";
      link.click();
    };
    xhr.open('GET', url);
    xhr.send();
  
    // Or inserted into an <img> element:
    var img = document.getElementById('myimg');
    img.src = url;
    console.log("Something woked!!!??.....");
  }).catch(function(error) {
    // Handle any errors
    console.log(error);
  });

const myForm = document.querySelector("#fileBtn");
const storageRef1 = document.querySelector("#inpFile");
var storageRef = firebase.storage().ref();
myForm.addEventListener('click',e=>{
    e.preventDefault();
    let storageRef = firebase.storage().ref(storageRef1.files[0].name);
    
    console.log(storageRef1.files[0]);
    storageRef.put(storageRef1.files[0]).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
    });
});