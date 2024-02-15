/**
 * @typedef {string | null} ParsedContent
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} BlockData
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ImageBlockObjectResponse} ImageBlockData
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ParagraphBlockObjectResponse} ParagraphBlockData
 * @typedef {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse}  RichTextData
 * @typedef {import("@notionhq/client/build/src/api-endpoints").TextRichTextItemResponse} TextData
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ApiColor} ApiColorType
 * @typedef {import("@notionhq/client/build/src/api-endpoints").Heading1BlockObjectResponse} HeadingBlockData
 * @typedef {{ rich_text: Array<RichTextData>, color: ApiColorType, is_toggleable: boolean }} HeaderInformation
 * @typedef {import("@notionhq/client/build/src/api-endpoints").CodeBlockObjectResponse} CodeBlockData
 *
 */

const blockParsers = {
	bulleted_list_item: (block) =>
		createElement("li", `n-${block.type}`, block.bulleted_list_item),
	paragraph: (block) => createElement("p", `n-${block.type}`, block.paragraph),
	heading_1: (block) => createElement("h1", `n-${block.type}`, block.heading_1),
	heading_2: (block) => createElement("h2", `n-${block.type}`, block.heading_2),
	heading_3: (block) => createElement("h3", `n-${block.type}`, block.heading_3),
	code: (block) => createCode(block),
	image: (data) => createImage(data),
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
function parseColor(color) {
	if (!color || color === "default") return "";

	return color.replaceAll("_", "-");
}

/**
 *
 * @param {TextData} textData
 * @return {string}
 */
function createTextElement(textData) {
	const { href, text, annotations } = textData;
	let result = text.content;

	if (href !== null) result = `<a href="${href}">${result}</a>`;
	if (annotations.bold) result = `<b>${result}</b>`;
	if (annotations.italic) result = `<i>${result}</i>`;
	if (annotations.strikethrough) result = `<s>${result}</s>`;
	if (annotations.underline) result = `<u>${result}</u>`;
	if (annotations.code) result = `<code>${result}</code>`;

	const color = parseColor(annotations.color);

	if (color !== "") result = `<span class="nc-${color}">${result}</span>`;

	return result;
}

/**
 *
 * @param {RichTextData[]} richText
 * @returns ParsedContent
 */
function createRichText(richText) {
	if (richText.length === 0) {
		return null;
	}

	return richText.map(createTextElement).join("");
}

/**
 * @param {string} tag
 * @param {string} baseClass
 * @param {HeaderInformation | RichTextData} elementData
 * @returns ParsedContent
 */
function createElement(tag, baseClass, elementData) {
	if (elementData.rich_text.length === 0) return null;

	const text = createRichText(elementData.rich_text);
	const classes = parseClasses(
		baseClass,
		parseColor(elementData.color),
		parseToggleable(elementData.is_toggleable),
	);

	return `<${tag} class="${classes}">${text}</${tag}>`;
}

/**
 *
 * @param {ImageBlockData} imageBlockData
 * @return {ParsedContent}
 */
function createImage(imageBlockData) {
	const { type, caption } = imageBlockData.image;
	const imageFileInfo = imageBlockData.image[type];
	if (imageFileInfo.url.length === 0) return null;

	const src = imageFileInfo.url;
	const plainAlt = caption.map((text) => text.plain_text).join("");
	const captionText = createRichText(caption) || "";

	return `<div class="n-image"><img src="${src}"alt="${plainAlt}"><p>${captionText}</p></div>`;
}
/**
 * @param {CodeBlockData} codeBlockData
 * @return {ParsedContent}
 */
function createCode(codeBlockData) {
	const { rich_text, caption, language } = codeBlockData.code;
	if (rich_text.length === 0) return null;

	const plainTextFromCode = rich_text.map((text) => text.plain_text);
	const codeCaption = createRichText(caption);
	const codeCaptionText =
		codeCaption && `<p class="n-code-caption">${codeCaption}</p>`;

	return `<div class="n-code">${
		codeCaptionText || ""
	}<code class="n-code-${language}">${plainTextFromCode}</code></div>`;
}

/**
 *
 * @param {BlockData[]} blocksData
 * @returns string
 */
function parseNotionBlocksData(blocksData) {
	const result = [];

	for (const block of blocksData) {
		if (blockParsers.hasOwnProperty(block.type)) {
			const html = blockParsers[block.type](block);
			if (html !== null) {
				result.push(html);
			}
		}
	}

	return result.join("");
}

module.exports = parseNotionBlocksData;
