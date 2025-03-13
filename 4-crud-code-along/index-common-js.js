// Create a module that accesses the file system and uses Common JS modules

// puts in module to access file system (built into node)
const fs = require("fs");

// access the third argument the the user types into REPL
const action = process.argv[2];

// We want node to read data.json and get all of thebooks listed
function printAllBooks() {
    // parameters are: what to read, what encoding, what to do
    fs.readFile("./data.json", "utf8", (err, data) => {
        // turns JSON object into JavaScript
        const books = JSON.parse(data);
        for(let i = 0; i < books.length; i++){
            console.log(books[i].title + "\n")
            console.log(books[i].text + "\n" + "\n") 
        }
    })
}

function printOneBook(num) {
    fs.readFile("./data.json", "utf8", (err, data) => {
        // turns JSON object into JavaScript
        const books = JSON.parse(data);
        console.log(books[num].title + "\n")
        console.log(books[num].text + "\n" + "\n") 
})
}

if (action === 'getAll') {
    printAllBooks()
} else if (action === 'getOne') {
    printOneBook(Number(process.argv[3]));
} else {
    console.log("please try again")
}