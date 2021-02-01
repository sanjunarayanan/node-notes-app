// const test = require('./utils')
// const sum = test.add (4,7)
// console.log(sum)
// console.log(test.name+" from utils")
// console.log("iam from app.js")

//  const validator = require('validator')
//  const test = require('./notes')
//  console.log(test())  // because it is a function
//  console.log(validator.isEmail('sanju@gmail.com'))

// const chalk = require('chalk')
// const test = require('./notes')
// console.log(chalk.redBright.italic('Hello world!'));
// console.log(chalk.yellow('Success!'));
// console.log(test())  // because it is a function
// const yargs = reuire('yargs')
// console.log(process.argv)
// const command = process.argv[2]
// if (command === 'add') {
// console.log('Adding note!')
// } else if (command === 'remove') {
// console.log('Removing note!')
// }

const notes = require('./notes.js')
const yargs = require('yargs')
// customize the version
yargs.version('1.1.0')

// add a command 
yargs.command({
  command :'add',
  describe :'add a note',
  builder: {
    title: {
      demandOption : true,
      type : 'string'
    },
    body : {
      demandOption : true,
      type : 'string'
    },
  },
  handler(argv){
    notes.addNotes(argv.title,argv.body)
  }
})

// remove a command 
yargs.command({
  command :'remove',
  describe :'remove a note',
  builder: {
    title: {
      demandOption : true,
      type : 'string'
    }
  },
  handler(argv){
    notes.removeNote(argv.title)
  }
})

//list  a command 
yargs.command({
  command :'list',
  describe :'list a note',
  handler: function(){
    notes.listNotes()
  }
})

// read a command 
yargs.command({
  command :'read',
  builder: {
    title : {
      demandOption : true,
      type : 'string'
    }
  },
  handler: function(argv){
    notes.readNote(argv.title)
  }
})


yargs.parse()