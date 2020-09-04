var firebaseConfig = {
  apiKey: "AIzaSyDIWmtFU8XSclpT9utSZ_zBcaurqYDPcLE",
  authDomain: "wss-website-d3f51.firebaseapp.com",
  databaseURL: "https://wss-website-d3f51.firebaseio.com",
  projectId: "wss-website-d3f51",
  storageBucket: "wss-website-d3f51.appspot.com",
  messagingSenderId: "782277894037",
  appId: "1:782277894037:web:5cd66524c4d214f93aa09c",
  measurementId: "G-MPVEWKDELE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var storage = firebase.storage();
var storageRef = storage.ref();
var listRef =storageRef.child("Student-resources/Physics") ;

// Variables
var ref1  = "Student-resources/Physics/"


/******Get all files from a folder and list on DOM for viewing and download********/

//Grab reference to all files from a specific path on Storage 
const storageRefOne = storage.ref('Student-resources/Physics/');

//Create reference to list area on DOM
const fileList = document.querySelector("#file-list");

//Get file download url and render to DOM
//NOTE: This is a function and must be called in order to work
async function getFileInfo() {
  fileInfo = await storageRefOne.listAll(); //Get all files from reference
  fileInfo.items.forEach(async item => { //Go through each file and render to DOM

    //Create path to file
    let pathToFile = `Student-resources/Physics/${item.name}`;
  
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
