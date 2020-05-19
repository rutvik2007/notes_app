const fs = require('fs')
const chalk = require('chalk')

var fileName = 'notes.json' //default filename for the notes, can also be changed using the setNoteFile function

const printNote = (note) =>{
    console.log('\n' + note.title)
    console.log(note.body + '\n')
}

const listNotes = () => {
    const notes = loadNotes(fileName)
    notes.forEach((note) => printNote(note))
}

const readNote = (title) => {
    const notes = loadNotes(fileName)
    const note = notes.find((note) => note.title === title)
    if(note){
        printNote(note)
    }
    else{
        console.log("No note with given title found")
    }
}

const setNoteFile = (file) => {
    fileName = file
}

const rmNote = (title) => {
    const notes = loadNotes(fileName)
    var removed = false
    for(var i = 0; i < notes.length; i++){
        if(notes[i].title === title){
            notes.splice(i, 1)
            removed = true
            i--
        }
    }
    if(removed){
        saveNotes(fileName,notes)
        console.log(chalk.inverse.green("Note removed"))
    }
    else{
        console.log(chalk.inverse.red("No note with given title found, nothing removed from notes"))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes(fileName)
    const exists = notes.find((note) => note.title === title)
    if(!exists){
        notes.push({
            title: title,
            body: body
        })
        console.log(notes)
        saveNotes(fileName, notes)
    }
    else{
        console.log("Note with that title already exists")
    }
}

const saveNotes = (noteFile, notes) => {
    fs.writeFileSync(noteFile, JSON.stringify(notes))
}

const loadNotes = (noteFile) => {
    try{
        return JSON.parse(fs.readFileSync(noteFile).toString())
    }
    catch(e){
        return []
    }
}



module.exports = {
    listNotes : listNotes,
    addNote : addNote,
    rmNote : rmNote,
    setNoteFile : setNoteFile,
    readNote : readNote
}