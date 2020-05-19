//const validator = require('validator')

const notesUtils = require('./notes')
const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command : 'add',
    describe : 'add a new note',
    builder: {
        title: {
            describe : 'note title',
            demandOption : true,
            type : 'string'
        },
        body:{
            describe : "The body of the note",
            demandOption : true,
            type : 'string'
        },
        filename : {
            describe : "The file to which the note is to be written",
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => {
        notesUtils.setNoteFile(argv.filename)
        notesUtils.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command : 'rm',
    describe : 'Remove a note based on the title',
    builder : {
        filename : {
            describe :"Notes file from which the note to be removed",
            demandOption : true,
            type : 'string'
        },
        title : {
            descibe : "Title of note to be removed",
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => {
        notesUtils.setNoteFile(argv.filename)
        notesUtils.rmNote(argv.title)
    }
})

yargs.command({
    command : 'list',
    describe : 'list all notes',
    builder : {
        filename : {
            descibe : "Name of the file from which notes are to be listed",
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => {
        notesUtils.setNoteFile(argv.filename)
        notesUtils.listNotes()
    }
})

yargs.command({
    command : 'read',
    describe : 'read notes',
    builder : {
        title : {
            descibe : "Title of note to be removed",
            demandOption : true,
            type : 'string'
        },
        filename : {
            descibe : "Name of the file from which notes are to be listed",
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => {
        notesUtils.setNoteFile(argv.filename)
        notesUtils.readNote(argv.title)
    }
})

yargs.parse()
