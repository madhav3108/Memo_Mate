// its all about the data
// ES-6

class Note{
    constructor(noteObject){
        for(let key in noteObject){
            this[key]=noteObject[key];
        }
        this.isMarked=false;
    }
    toggleMark(){
        this.isMarked =!this.isMarked;
    }
}
export default Note;