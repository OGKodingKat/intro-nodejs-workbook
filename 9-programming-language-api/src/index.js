import express from 'express'; //external module for using express
import pg from 'pg';
const { Client } = pg
import config from './config.js'; // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values
 


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


//helper function
async function getAllLanguages(){
    await client.connect(); //connecting to our database
    let result = await client.query("SELECT * FROM programming_languages");
    console.log(result.rows);
    await client.end(); //ending the connection to our database

}


//api endpoint
app.get("/get-all-languages", async (req, res) =>{
    let languages = getAllLanguages();
    let JSONlanguages = JSON.stringify(languages);
    res.send(JSONlanguages);
});