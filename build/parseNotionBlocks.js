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
	bulleted_list_item: (block) =>
		parseElement("li", `n-${block.type}`, block.bulleted_list_item),
	paragraph: (block) => parseElement("p", `n-${block.type}`, block.paragraph),
	heading_1: (block) => parseElement("h1", `n-${block.type}`, block.heading_1),
	heading_2: (block) => parseElement("h2", `n-${block.type}`, block.heading_2),
	heading_3: (block) => parseElement("h3", `n-${block.type}`, block.heading_3),
	code: (block) => parseCodeBlock(block),
	image: (data) => parseImage(data),
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

/**
 *
 * @param {boolean} isToggleable
 */
function parseToggleable(isToggleable) {
	return isToggleable ? "n-toggleable" : "";
}
function parseClasses(...args) {
	return args.filter(Boolean).join(" ").trim();
}
/**
 *
 * @param {string} color
 */
function getColor(color) {
	if (!color || color === "default") return "";

	return color.replaceAll("/", "-");
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

	const color = getColor(annotations.color);

	if (color !== "") result = `<span class="nc-${color}">${result}</span>`;

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
/** @param {HeadingItem | RichTextItem} element
 * @param {string} tag
 * @param {string} baseClass
 * @returns ParseResult
 */
function parseElement(tag, baseClass, element) {
	if (element.rich_text.length === 0) return null;

	const text = parseRichText(element.rich_text);
	const _class = parseClasses(
		baseClass,
		getColor(element.color),
		parseToggleable(element.is_toggleable),
	);

	return `<${tag} class="${_class}">${text}</${tag}>`;
}

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
