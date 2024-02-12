const { Client } = require("@notionhq/client")
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB = process.env.NOTION_DB;

if (!NOTION_KEY || !NOTION_DB) {
  throw new Error('Invalid keys');
}

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
})

async function getPages() {
try {
  const data = notion.databases.query({
    database_id: process.env.NOTION_DB,
    "filter": {
      "property": "Article Status",
      "status": {
        "equals": "Done"
      }
    },
  })
  return await data;
} catch (err) {
  console.log(err)
  throw new Error('Can`t fetch Notion database');
}
}

/**
 * @param {string} id
 * @returns {ListBlockChildrenResponse}
 */
async function getPageBlocks(id) {
  try {
    return await notion.blocks.children.list({block_id: id});
  } catch (err) {
    console.log(err);
    throw new Error(`Can't fetch page: ${id}`)
  }
}

/**
 * Retrieves the blocks from the pages.
 * @typedef {Partial<PageObjectResponse & ListBlockChildrenResponse>} Pages
 * @returns {Promise<Pages>}
 */
async function getFullPage() {
  const {results} = await getPages();
  const pages = [];

  for (const pageInfo of results) {
    const page = await getPageBlocks(pageInfo.id);
    pages.push({
      blocks: page.results.map(block => ({
        has_children: block.has_children,
        type: block.type,
        [block.type]: block[block.type]
      })),
      properties: pageInfo.properties,
      last_edited_time: pageInfo.last_edited_time,
    });
  }

  return {pages};
}

function generateJSON(data) {
  // Preparing path with path module to ensure the right file path.
  const dirPath = path.resolve('../', './data');
  const filePath = path.resolve(dirPath, './articles.json');

  // Remove directory
  rimraf.sync(dirPath);

  // Create directory
  mkdirp.sync(dirPath);

  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error(`Error while writing to the file: ${err}`);
      throw new Error("Failed to write a JSON file");
    }
    console.log('Data written to file successfully.');
  });
}

async function getArticles() {
  const data = await getFullPage();
  generateJSON(data);
}


getArticles();