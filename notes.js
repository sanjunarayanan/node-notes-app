const fs=require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return "Your notes..."
}

const addNotes = (title, body ) => {
  const notes = loadNotes()
  //const duplicateNotes = notes.filter((note) =>  note.title === title)
  const duplicateNote = notes.find((note) => note.title === title)
  if(duplicateNote == undefined){
    notes.push({
      title:title,
      body:body
    })
    saveNotes(notes);
    console.log(chalk.green("successfully added.."))
  }else {
    console.log(chalk.red("title is already taken.."))
  }
  
}


const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  if(notes.length > notesToKeep.length){
    console.log(chalk.green("successfully removed.."))
    saveNotes(notesToKeep);
  }else{
    console.log(chalk.red("the title is not matched.."))
  }
  
}


const saveNotes= (notes) => {
  const notesData = JSON.stringify(notes);
  const data = fs.writeFileSync('notes.json',notesData)
}


const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return []
  }
}

const listNotes = () =>{
  console.log(chalk.red("Your Note is Here...."))
  const notes = loadNotes()
  notes.forEach(note => {
    console.log(note.title)
  });
}



const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if(note==undefined){
    console.log(chalk.red("No matching found for the Title : "+title))
  }else {
    console.log(chalk.green("Matching Found ..."))
    console.log(chalk.green("Title : "+note.title))
    console.log(chalk.green("Body : "+note.body))
  }
}
module.exports={addNotes,getNotes,removeNote,listNotes,readNote}