// Create a Node app that determines the birthstone based on a month inputted by the user. Refer to the README instructions. 

import { readFile } from "fs";

let whichMonth = process.argv[2];

const findBirthstone = (month) => {
    readFile("./data.json", "utf8", (err, data) => {
        let birthstones = JSON.parse(data);
        console.log(`${month}'s birthstone is ${birthstones[month]}`)
    })
}
findBirthstone(whichMonth)