/**
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} Block
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ImageBlockObjectResponse} ImageItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ParagraphBlockObjectResponse} ParagraphBlock
 * @typedef {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse}  RichTextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").TextRichTextItemResponse} TextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ApiColor} ApiColor
 */

const blockTypeParsers = {
	/** @param {ParagraphBlock} data */
	paragraph: (data) => parseParagraph(data.paragraph),

	/** @param {ImageItem} data */
	image: (data) => parseImage(data),
	// bookmark: () => null,
	// breadcrumb: () => null,
	// bulleted_list_item: () => null,
	// callout: () => null,
	// child_database: () => null,
	// child_page: () => null,
	// code: () => null,
	// column_list_and_column: () => null,
	// divider: () => null,
	// embed: () => null,
	// equation: () => null,
	// file: () => null,
	// headings: () => null,
	// link_preview: () => null,
	// mention: () => null,
	// numbered_list_item: () => null,
	// pdf: () => null,
	// quote: () => null,
	// synced_block: () => null,
	// table: () => null,
	// table_of_contents: () => null,
	// template: () => null,
	// to_do: () => null,
	// toggle_blocks: () => null,
	// video: () => null,
};

/**
 *
 * @param {TextItem} textItem
 * @return {string}
 */
function parseTextItem(textItem) {
	if (textItem.type !== 'text') {
		throw new Error('"parseTextItem": Expected type text');
	}
	const { href, text, annotations} = textItem;
	let result = text.content;

	if (href !== null) result = `<a href="${href}">${result}</a>`
	if (annotations.bold) result = `<b>${result}</b>`;
	if (annotations.italic) result = `<i>${result}</i>`;
	if (annotations.strikethrough) result = `<s>${result}</s>`;
	if (annotations.underline) result = `<u>${result}</u>`;
	if (annotations.code) result = `<code>${result}</code>`;
	if (annotations.color !== "default")
		result = `<span class="n-color-${annotations.color}">${result}</span>`;

	return result;
}

/**
 *
 * @param {RichTextItem[]} richText
 */
function parseRichText(richText) {
	return richText.map(parseTextItem);
}

/**
 *
 * @param {{ rich_text: RichTextItem[], color: ApiColor }} paragraph
 * @return {string|null}
 */
function parseParagraph(paragraph) {
	if (paragraph.rich_text.length === 0) {
		return null;
	}

	const color =
		paragraph.color !== "default" ? ` class="n-color-${paragraph.color}"` : "";

	const text = parseRichText(paragraph.rich_text).join("");

	return `<p${color}>${text}</p>`;
}

/**
 *
 * @param {ImageItem} imageBlock
 */
function parseImage(imageBlock) {
  const {type, caption, external, file} = imageBlock.image;
  const imageTypes = {external, file};
  let actualImageFile = imageTypes[type];

	const src = actualImageFile.url;
	const alt = parseRichText(caption);


	return `<img src="${src}" alt="${alt}">`
}

/**
 * @param {Block} block
 * @returns {null|string} - The parsed content as a string, or null if the block type is unsupported.
 */
function parseBlock(block) {
	const type = block.type;

	if (blockTypeParsers.hasOwnProperty(type)) {
		return blockTypeParsers[type](block);
	} else return null;
}

/**
 *
 * @param {Block[]} blocks
 * @returns string
 */
function parseNotionBlocks(blocks) {
	const result = [];

	for (const block of blocks) {
		const parsed = parseBlock(block);
		if (parsed !== null) {
			result.push(parsed);
		}
	}

	return result.join("");
}

module.exports = parseNotionBlocks;
