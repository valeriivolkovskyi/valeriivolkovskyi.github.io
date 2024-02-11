const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
})

async function getDatabase() {
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

  const res = await data;
  return JSON.stringify(res);
} catch (err) {
  console.log(err)
  throw new Error('Cant fetch Notion database');
}
}
