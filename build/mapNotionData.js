/**
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} BlockObjectResponse
 */

const parseNotionBlocks = require("./parseNotionBlocks");

function getPlainText(data) {
	return data[0]["plain_text"];
}

/**
 *
 * @param {BlockObjectResponse} data
 * @return {{projects: *[], articles: *[], tags: *[]}}
 */
module.exports = function (data) {
	const articles = [];
	const projects = [];
	const tags = new Map();
	const mapTags = ({ name }) => {
		tags.set(name, (tags.get(name) || 0) + 1);
		return name;
	};

	for (const page of data) {
		const { properties } = page;
		const newPage = {
			title: getPlainText(properties["Name"]["title"]),
			description: getPlainText(properties["Description"]["rich_text"]),
			tags: properties["Tags"]["multi_select"].map(mapTags),
			date: properties["Date"]["date"]["start"],
			slug: properties["Slug"]["url"],
			content: parseNotionBlocks(page["blocks"]["results"]),
		};

		if (properties["Type"]["select"]["name"] === "Project") {
			projects.push(newPage);
		} else {
			articles.push(newPage);
		}
	}

	return {
		articles,
		projects,
		tags: [...tags],
	};
};
