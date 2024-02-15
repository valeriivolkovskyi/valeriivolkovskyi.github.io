/**
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} Block
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ImageBlockObjectResponse} ImageItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ParagraphBlockObjectResponse} ParagraphBlock
 * @typedef {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse}  RichTextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").TextRichTextItemResponse} TextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ApiColor} ApiColor
 * @typedef {import("@notionhq/client/build/src/api-endpoints").CodeBlockObjectResponse} CodeBlock
 */

const blockTypeParsers = {
	/** @param {ParagraphBlock} data */
	paragraph: (data) => parseParagraph(data.paragraph),
	/** @param {ImageItem} data */
	image: (data) => parseImage(data),
	/**
	 * @param {CodeBlock} block
	 */
	code: (block) => parseCodeBlock(block),
	// headings: () => null,
	// bulleted_list_item: () => null,
	// quote: () => null,
	// numbered_list_item: () => null,
	// toggle_blocks: () => null,
	// callout: () => null,
	// divider: () => null,
	// child_database: () => null,
	// bookmark: () => null,
	// breadcrumb: () => null,
	// child_page: () => null,
	// column_list_and_column: () => null,
	// embed: () => null,
	// equation: () => null,
	// file: () => null,
	// link_preview: () => null,
	// mention: () => null,
	// pdf: () => null,
	// synced_block: () => null,
	// table: () => null,
	// table_of_contents: () => null,
	// template: () => null,
	// to_do: () => null,
	// video: () => null,
};

/**
 *
 * @param {TextItem} textItem
 * @return {string}
 */
function parseTextItem(textItem) {
	if (textItem.type !== "text") {
		throw new Error('"parseTextItem": Expected type text');
	}
	const { href, text, annotations } = textItem;
	let result = text.content;

	if (href !== null) result = `<a href="${href}">${result}</a>`;
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
	const { type, caption, external, file } = imageBlock.image;
	const imageTypes = { external, file };
	let actualImageFile = imageTypes[type];

	const src = actualImageFile.url;
	const alt = parseRichText(caption);

	return `<img src="${src}" alt="${alt}">`;
}

/**
 * @param {CodeBlock} block
 */
function parseCodeBlock(block) {
	const { code } = block;

	const codeText = code.rich_text.map((text) => text.plain_text);
	const codeCaption = parseRichText(code.caption).join("");
	const codeCaptionText =
		codeCaption.length > 0
			? `<p class="n-code-caption">${codeCaption}</p>`
			: "";

	return `<div class="n-code">${codeCaptionText}<code class="n-code-${code.language}">${codeText}</code><div>`;
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
