import express from "express"; // External module for Express
import pg from "pg";
const { Client } = pg;
import config from "./config.js"; // Internal module for DB connection

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Helper Function: Get All Languages
async function getAllLanguages() {
  const client = new Client(config);
  await client.connect();

  try {
    let result = await client.query("SELECT * FROM programming_languages");
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  } finally {
    await client.end();
  }
}

// Helper Function: Get One Language
async function getOneLanguage(id) {
  const client = new Client(config);
  await client.connect();

  try {
    let result = await client.query("SELECT * FROM programming_languages WHERE id = $1", [id]);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching language:", error);
    return [];
  } finally {
    await client.end();
  }
}

// Helper Function: Search by Name
async function searchLanguagesByName(name) {
  const client = new Client(config);
  await client.connect();

  try {
    let result = await client.query(
      "SELECT * FROM programming_languages WHERE LOWER(name) LIKE LOWER($1)",
      [`%${name}%`]
    );
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error searching languages:", error);
    return [];
  } finally {
    await client.end();
  }
}

// Helper Function: Sort by Column
async function getAllLanguagesSorted(column) {
  const client = new Client(config);
  await client.connect();

  try {
    // Validate the column input to prevent SQL injection
    const validColumns = ["id", "name", "year", "creator"];
    if (!validColumns.includes(column)) {
      throw new Error("Invalid column name.");
    }

    let result = await client.query(`SELECT * FROM programming_languages ORDER BY ${column} ASC`);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching sorted languages:", error);
    return [];
  } finally {
    await client.end();
  }
}

// API Endpoints

// Get all languages
app.get("/get-all-languages", async (req, res) => {
  let languages = await getAllLanguages();
  res.json(languages);
});

// Get one language
app.get("/get-one-language/:id", async (req, res) => {
  let languages = await getOneLanguage(req.params.id);
  res.json(languages);
});

// Search languages by name
app.get("/search-languages-by-name/:name", async (req, res) => {
  let languages = await searchLanguagesByName(req.params.name);
  res.json(languages);
});

// Sort languages by a specific column
app.get("/get-all-languages/sort-by/:column", async (req, res) => {
  let column = req.params.column;
  let languages = await getAllLanguagesSorted(column);
  res.json(languages);
});

// Sort languages by year
app.get("/get-all-languages/sort-by-year", async (req, res) => {
  let languages = await getAllLanguagesSorted("year");
  res.json(languages);
});

export { getAllLanguages, getOneLanguage, searchLanguagesByName, getAllLanguagesSorted };
