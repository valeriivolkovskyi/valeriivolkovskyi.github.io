/**
 * @typedef {string | null} ParseResult
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} Block
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ImageBlockObjectResponse} ImageItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ParagraphBlockObjectResponse} ParagraphBlock
 * @typedef {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse}  RichTextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").TextRichTextItemResponse} TextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ApiColor} ApiColor
 * @typedef {import("@notionhq/client/build/src/api-endpoints").Heading1BlockObjectResponse} Heading1BlockObjectResponse
 * @typedef {{ rich_text: Array<RichTextItem>, color: ApiColor, is_toggleable: boolean }} HeadingItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").CodeBlockObjectResponse} CodeBlock
 *
 */

const blockTypeParsers = {
	paragraph: (data) => parseParagraph(data.paragraph),
	image: (data) => parseImage(data),
	code: (block) => parseCodeBlock(block),
	heading_1: (block) => parseHeadingBlock(block.heading_1),
	heading_2: (block) => parseHeadingBlock(block.heading_2),
	heading_3: (block) => parseHeadingBlock(block.heading_3),
	bulleted_list_item: (block) => parseBulletListItem(block.bulleted_list_item),
	divider: () => '<div class="n-divider"></div>',
	// quote: () => null,
	// numbered_list_item: () => null,
	// toggle_blocks: () => null,
	// column_list_and_column: () => null,
	// callout: () => null,
	// to_do: () => null,
	// video: () => null,
	// child_database: () => null,
	// bookmark: () => null,
	// breadcrumb: () => null,
	// child_page: () => null,
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
};

function parseClasses(...args) {
	return args.filter(Boolean).join(' ').trim();
}

/**
 *
 * @param {{rich_text: RichTextItem[], color: ApiColor}} item
 * @returns ParseResult
 */
function parseBulletListItem(item) {
	if (item.rich_text.length === 0) return null;

	const text = parseRichText(item.rich_text);
	const color = getColor(item.color);

	let _class = parseClasses('n-bullet-list-item', color);

	return `<div class="${_class}">${text}</div>`;
}
/**
 *
 * @param {string} color
 */
function getColor(color) {
	if (!color || color === "default") return "";

	return color;
}
/**
 *
 * @param {TextItem} textItem
 * @return {string}
 */
function parseTextItem(textItem) {
	const { href, text, annotations } = textItem;
	let result = text.content;

	if (href !== null) result = `<a href="${href}">${result}</a>`;
	if (annotations.bold) result = `<b>${result}</b>`;
	if (annotations.italic) result = `<i>${result}</i>`;
	if (annotations.strikethrough) result = `<s>${result}</s>`;
	if (annotations.underline) result = `<u>${result}</u>`;
	if (annotations.code) result = `<code>${result}</code>`;
	if (getColor(annotations.color) !== "")
		result = `<span class="n-color-${annotations.color}">${result}</span>`;

	return result;
}
/**
 *
 * @param {RichTextItem[]} richText
 * @returns ParseResult
 */
function parseRichText(richText) {
	if (richText.length === 0) {
		return null;
	}

	return richText.map(parseTextItem).join("");
}
/** @param {HeadingItem} heading
 * @returns ParseResult
*/
function parseHeadingBlock(heading) {
	const text = parseRichText(heading.rich_text);
	if (text === null) {
		return null;
	}

	const color = getColor(heading.color);
	let _class = "";

	if (color !== "") _class = `${_class} ${color}`;
	if (heading.is_toggleable) _class = `${_class} n-toggleable-heading`;

	return `<h1${_class}>${text}</h1>`;
}
/**
 *
 * @param {{ rich_text: RichTextItem[], color: ApiColor }} paragraph
 * @returns ParseResult */
function parseParagraph(paragraph) {
	if (paragraph.rich_text.length === 0) {
		return null;
	}

	const color =
		paragraph.color !== "default" ? ` class="n-color-${paragraph.color}"` : "";

	const text = parseRichText(paragraph.rich_text);

	return `<p${color}>${text}</p>`;
}
/**
 *
 * @param {ImageItem} imageBlock
 * @returns ParseResult
 */
function parseImage(imageBlock) {
	const { type, caption } = imageBlock.image;
	const imageFileInfo = imageBlock.image[type];
	if (imageFileInfo.url.length === 0) return null;

	const src = imageFileInfo.url;
	const plainAlt = caption.map((text) => text.plain_text).join("");
	const captionText = parseRichText(caption) || "";
	const altAttr = ` alt="${plainAlt}"`;

	return `<div class="n-image"><img src="${src}"${altAttr}><p>${captionText}</p></div>`;
}
/**
 * @param {CodeBlock} block
 * @return {ParseResult}
 */
function parseCodeBlock(block) {
	const { rich_text, caption, language } = block.code;
	if (rich_text.length === 0) return null;

	const plainTextFromCode = rich_text.map((text) => text.plain_text);
	const codeCaption = parseRichText(caption);
	const codeCaptionText =
		codeCaption && `<p class="n-code-caption">${codeCaption}</p>`;

	return `<div class="n-code">${
		codeCaptionText || ""
	}<code class="n-code-${language}">${plainTextFromCode}</code></div>`;
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
