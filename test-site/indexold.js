console.log(itemRef);
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

function getFileLink(root, path){
var pathReference = storage.ref(string.concat(root, path));
var gsReference = storage.refFromURL(string.concat('gs://', string.concat(root, path)));
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
      link.download=path;
      //link.click();
    };
    xhr.open('GET', url);
    xhr.send();
    lnk = document.createElement(a);
    lnk.href = url;

    // Or inserted into an <img> element:
    // var img = document.getElementById('myimg');
    // img.src = url;
    console.log("Something woked!!!??.....");
  }).catch(function(error) {
    // Handle any errors
    console.log(error);
  });
}

var pathReference = storage.ref('folders/file.pdf');
var gsReference = storage.refFromURL('gs://folder/file.pdf')
//var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/file.pdf')
storageRef.child('file.pdf').getDownloadURL().then(function(url) {
    console.log('url:', url);
  
    
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
      console.log('blob:', blob);
      const data = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = data;
      link.download="file.pdf";
      //link.click();
    };
    xhr.open('GET', url);
    xhr.send();
    lnk = document.getElementById("myfile");
    lnk.href = url;
    //console.log(type(lnk));
    
    // Or inserted into an <img> element:
    // var img = document.getElementById('myimg');
    // img.src = url;
   // console.log("Something woked!!!??.....");
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


//list 
// Create a reference under which you want to list
var listRef = storageRef.child('folder/');
// Find all the prefixes and items.

listRef.listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) {
   // console.log(folderRef.name);


    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
  });

  var itemArray = [];
  
  res.items.forEach(function(itemRef) {
    console.log(itemRef.location);
    itemArray.push(itemRef.location.path_)
    //console.log(itemArray.lengt);
    //All the items under listRef.
  });

 

  
  itemArray.forEach(item =>{
    var listItem = document.createElement("li");
    var anchorTag = document.createElement('a');


    listItem.textContent = item.split("/")[1];


  });

}).catch(function(error) {
  // Uh-oh, an error occurred!
});



/******Get all files from a folder and list on DOM for viewing and download********/

//Grab reference to all files from a specific path on Storage 
const storageRefOne = storage.ref('folder/');

//Create reference to list area on DOM
const fileList = document.querySelector("#file-list");

//Get file download url and render to DOM
//NOTE: This is a function and must be called in order to work
async function getFileInfo() {


   fileInfo = await storageRefOne.listAll(); //Get all files from reference
   fileInfo.items.forEach(async item => { //Go through each file and render to DOM

    //Create path to file
    let pathToFile = `folder/${item.name}`;
  
    //Create reference to file
    let fileReference = storage.ref(pathToFile); 

    //Get download URL 
    let fileURL = await fileReference.getDownloadURL();

    
    
    //Create anchor tag 
    let anchorTag = document.createElement('a');

    anchorTag.setAttribute('href', fileURL);  //Set link to file on anchorTag
    anchorTag.setAttribute('target', '_blank') //Open file in new window when clicked
    anchorTag.textContent = item.name; //Set anchor tag text to file name
  

    //Create delete button
    let fileDeleteButton = document.createElement('button');
    fileDeleteButton.setAttribute('id',`delete-${item.name}`)
    fileDeleteButton.textContent = '❌';
    
    //Create list element
    let listelement = document.createElement('li');

    /******************Download file when clicked***************/
    let xhr = new XMLHttpRequest();
    //Use anchor tag to enable download without onclick listener
    let fileDownloadButton = document.createElement('a');
    xhr.responseType = 'blob';
    xhr.open('GET', fileURL);
    xhr.send();
    xhr.onload = (async (event)=> {
      var blob = await xhr.response; 
      fileDownloadButton.href = URL.createObjectURL(blob); //file data for download
      fileDownloadButton.setAttribute("download", item.name); //file name on download
      fileDownloadButton.setAttribute("id",item.name); // anchor tag 'id'
      fileDownloadButton.textContent = '⬇️' //anchor tag text
    });



    /******Append tags in sequential order and render to DOM*****/

    //append anchor tag to list element
    listelement.appendChild(anchorTag);

    //Append file download button
    listelement.appendChild(fileDownloadButton);
    
    //Append file delete button
    listelement.appendChild(fileDeleteButton);

    //append list element to file-list (Render to DOM)
    fileList.appendChild(listelement);


    /*******************Delete file when clicked*****************/
    //Implemented after rendered to DOM, why not before?
    let fileDeleteRef = document.getElementById(`delete-${item.name}`);
    
    fileDeleteRef.addEventListener('click', async e=> {
      e.preventDefault();
      let deleteConfirmation = confirm(`Are you sure you want to delete ${item.name}?`);

      if(deleteConfirmation){
        result = await item.delete();
        window.location.href='wss-static.html'; //Refresh page to show new results
        //Should do error checking to here as well
      }
      else{
        alert('Delete cancelled');
      }
    })
   });
}

//Call function
getFileInfo();
