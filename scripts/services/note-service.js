// CRUD Operations
// this file is alll about the logic
import Note from '../models/note.js';
export const noteOperations = {
    notes:[],


    add(noteObject){
        const note = new Note(noteObject);
        this.notes.push(note);
    },


    searchById(id){
        return this.notes.find(note=>note.id==id);      // find the same object in the notes in the array to excess 
    },


    toggleMark(id){
        this.searchById(id).toggleMark();       // gives the object of the note in the array..
        //const noteObject=this.searchById(id);       // if element is find by searchById get to noteobject if persent false and not a true
        //noteObject.isMarked = !noteObject.isMarked;
    },


    total(){
        return this.notes.length;
    },


    markTotal(){
        return this.notes.filter(note=>note.isMarked).length;
    },


    unmarkTotal(){
        return this.total()-this.markTotal();
    },


    getNotes(){
        return this.notes;
    },


    delete(){
       this.notes= this.notes.filter(note=>!note.isMarked);

    },


    sortUp(){
        const arr =[...this.notes];
        return arr.sort((a,b) => a.title.localeCompare(b.title));
    },


    sortDown(){
        const arr =[...this.notes];
        return arr.sort((b,a) => a.title.localeCompare(b.title));
    },


    sortUp1(){
        const arr =[...this.notes];
        return arr.sort((a,b) => a.cdate.localeCompare(b.cdate));
    },


    sortDown1(){
        const arr =[...this.notes];
        return arr.sort((b,a) => a.cdate.localeCompare(b.cdate));
    },


    search(id){
        //return this.notes.find(note=>note.id==id);
    },

    
    deleteById(id) {
        console.log(id);
       return this.notes = this.notes.filter(note => note.id!=id);
      },

}

//export default noteOperations;