/**
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} BlockObjectResponse
 */

import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import {mkdirp} from "mkdirp";

import mapNotionData from "./mapNotionData.js";

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB = process.env.NOTION_DB;

if (!NOTION_KEY || !NOTION_DB) {
	throw new Error("Invalid keys");
}

const notion = new Client({
	auth: process.env.NOTION_KEY,
});

async function getPages() {
	try {
		const data = notion.databases.query({
			database_id: process.env.NOTION_DB,
			filter: {
				property: "Article Status",
				status: {
					equals: "Done",
				},
			},
		});
		return await data;
	} catch (err) {
		console.log(err);
		throw new Error("Can`t fetch Notion database");
	}
}

/**
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} BlockObjectResponse
 * @returns {Promise<BlockObjectResponse>}
 */
async function getPageBlocks(id) {
	try {
		const pageBlocks = await notion.blocks.children.list({ block_id: id });

		for (const block of pageBlocks.results) {
			if (block.has_children) {
				block.children = await getPageBlocks(block.id);
			}
		}

		return pageBlocks;
	} catch (err) {
		console.log(err);
		throw new Error(`Can't fetch page: ${id}`);
	}
}

/**
 *
 * @returns {Promise<BlockObjectResponse[]>}
 */
async function getFullPages() {
	const { results } = await getPages();
	const pages = [];

	for (const pageInfo of results) {
		const blocks = await getPageBlocks(pageInfo.id);

		pages.push({
			...pageInfo,
			blocks,
		});
	}
	return pages;
}

function writeToFile(filePath, data) {
	fs.writeFile(filePath, JSON.stringify(data), (err) => {
		if (err) {
			console.error(`Error while writing to the file: ${err}`);
			throw new Error("Failed to write a JSON file");
		}
		console.log("Data written to file successfully.");
	});
}

/**
 * Generates JSON files from Notion data and saves them to the specified directory.
 * @param {BlockObjectResponse} data - The Notion data to convert to JSON.
 */
function generateJSON(data) {
	const dirPath = path.resolve("./", "./_data");
	const articlesFilePath = path.resolve(dirPath, "./articlesData.json");
	const projectsFilePath = path.resolve(dirPath, "./projectsData.json");
	const tagsFilePath = path.resolve(dirPath, "./tagsData.json");

	// for debug
	// writeToFile(path.resolve(dirPath, "./_debug_data.json"), data);

	const { articles, projects, tags } = mapNotionData(data);

	// Create directory
	mkdirp.sync(dirPath);

	writeToFile(articlesFilePath, articles);
	writeToFile(projectsFilePath, projects);
	writeToFile(tagsFilePath, tags);
}

async function getArticles() {
	const data = await getFullPages();
	generateJSON(data);
}

getArticles();
