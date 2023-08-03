// is it for when screen is load not for a logic
// Controller - DOM maintained



import {noteOperations} from "../services/note-service.js";
window.addEventListener('load' , init);



function init(){            //  sethbthose things which cames after the refresh on the screen.
    showCounts();
    bindEvents();
    diasbleButton();
    disableButtonUpdate();
}

const enableButton=()=> {          // when the screen is load
    document.querySelector('#delete').disabled=false;   
}


const diasbleButton=()=> {          // when the screen is load
    document.querySelector('#delete').disabled=true;   
}

const enableButtonUpdate = () => {
    document.querySelector('#update').disabled = false;
}

const disableButtonUpdate = () => {
    document.querySelector('#update').disabled = true;
}







function bindEvents(){
    document.querySelector('#add').addEventListener('click' , addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#search').addEventListener('click',searchNote);
    document.querySelector('#update').addEventListener('click',addNote)
    document.querySelector('#sort-up').addEventListener('click', sortUp);
    document.querySelector('#sort-up1').addEventListener('click', sortUp1);
    document.querySelector('#sort-down').addEventListener('click', sortDown);
    document.querySelector('#sort-down1').addEventListener('click', sortDown1);
    //document.querySelector("#save").addEventListener("click", save);
    document.querySelector('#clear').addEventListener('click', clearAll);
}


function deleteMarked(){
    //console.log("delete mark hua");
    noteOperations.delete();
    printNotes(noteOperations.getNotes());
}

function clearAll(){
    const fields = ['id', 'title', 'desc', 'cdate', 'importance'];
    for (let x of fields) {
      // console.log(obj[x]);
      document.querySelector(`#${x}`).value ="";
    }
}
    

function showCounts(){      // when sceen is load they show the count on the screen
    noteOperations.markTotal()>0?enableButton():diasbleButton();
    document.querySelector('#total').innerText=noteOperations.total();      // total shows the length of the array
    document.querySelector('#marktotal').innerText=noteOperations.markTotal(); 
    document.querySelector('#unmarktotal').innerText=noteOperations.unmarkTotal(); 

}


function addNote(){
    /*
    Read Id , title , description , Date of Complertion and importance

    1= Read all Input files ?
    Ans : We need to learn DOM (Docuement object Model) 
    Object-JS defined some object tree to read the page content .This tree is refer as Model.. That's why we called this DOM..
    */
   const fields =['id','title','desc','cdate','importance'];
   const noteObject ={};    // object literal -- God object
   for(let field of fields){
    noteObject[field]=document.querySelector(`#${field}`).value;
   }
   noteOperations.add(noteObject);
   printNote(noteObject);
   showCounts();
}


function printIcon(myClassName='trash', fn,id){
    // <i class="fa-solid fa-trash"></i>
    //i class="fa-solid fa-user-pen"></i>
    // <i class="fa-solid fa-sort-up"></i>
    //<i class="fa-solid fa-sort-down"></i>
    const iTag  = document.createElement('i');
    iTag.setAttribute('note-id',id);        // set attribute creates a customized attribute create by developer
    iTag.className =  `fa-solid fa-${myClassName} me-2 hand`;
    iTag.addEventListener('click',fn);
    // if(myClassName === 'trash'){
    //     iTag.addEventListener('click',handleClick);
    // }
    return iTag;
}


function toggleMark(){          // trash button is clicked tis works
    //console.log('Toggle mark...hogya', this) ;
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    const tr = icon.parentNode.parentNode;
    //tr.className='table-danger';
    tr.classList.toggle('table-danger');
    showCounts();

    
}

  
function sortUp() {
    printNotes(noteOperations.sortUp());
}


function sortDown() {
    printNotes(noteOperations.sortDown());
}


function sortUp1() {
    printNotes(noteOperations.sortUp1());
}


function sortDown1() {
    printNotes(noteOperations.sortDown1());
}


function edit() {
    enableButtonUpdate();
    const icon = this;
    const id = this.getAttribute('note-id');
    const obj = noteOperations.searchById(id);
   
    for (let x in obj) {
      // console.log(obj[x]);
      if(x=='isMarked')
      continue;
      document.querySelector(`#${x}`).value = obj[x];
    }
  
    printNotes(noteOperations.deleteById(id)) ;
    enableButtonUpdate();
}

function save() {
    if (window.localStorage) {
      const alltask = noteOperations.getalltask();
      localStorage.tasks = JSON.stringify(alltask);
      alert("Data Stored");
    } else {
      alert("Outdated Browser No Support of local storage");
    }
  }


function searchNote(){
    //option click ki value kisi variable m storwe karo 
    const searchText = document.getElementById("searchText");
    searchText.style.display = "inline-block";
    //searchNote.setAttribute('searchText' , id);
    searchText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          const searchValue = searchText.value;
          const notes = noteOperations.getNotes();
          const filteredNotes = notes.filter(note => note.id === searchValue);
          printNotes(filteredNotes);
        }
      });
    
}


function printNotes(notes){
    const tbody=document.querySelector('#notes');
    tbody.innerHTML='';
    notes.forEach(note =>printNote(note)); 
}


function printNote(noteObject){
    const tbody = document.querySelector('#notes'); // excess the tbody
    const row = tbody.insertRow();  // <tr>
    for(let key in noteObject){     // traverse 
        if(key=='isMarked'){
            continue;
        }
        const td = row.insertCell();    //  <td>
        td.innerText= noteObject[key];      // innerText used to insert values inside.
    }
    const td = row.insertCell();
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    td.appendChild(printIcon('user-pen',edit,noteObject.id));
    disableButtonUpdate();
    showCounts();

    
}
