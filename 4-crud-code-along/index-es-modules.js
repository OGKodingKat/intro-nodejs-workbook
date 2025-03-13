// Create a module that accesses the file system and uses ES modules
import { readFile } from 'fs';

function printAllBooks() {
    readFile("./data.json", "utf8", (err, data) => {
        const books = JSON.parse(data);
        console.log(books)
    })
}
printAllBooks()