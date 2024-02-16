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
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ListBlockChildrenResponse} ListBlockChildrenResponse
 *
 */
const mapBlockToTag = (blockType) => {
	switch (blockType) {
		case "paragraph":
			return "p";
		case "heading_1":
			return "h1";
		case "heading_2":
			return "h2";
		case "heading_3":
			return "h3";
		case "bulleted_list_item":
			return "li";
		case "image":
			return "img";
		case "divider":
			return "div";
		case "code":
			return "code";
		default:
			return "div";
	}
};

const PARAMS = {
	classPrefix: "n",
};

/**
 *
 * @param {BlockData} block
 * @returns {string}
 */
function createRichTextHTMLElement(block) {
	const type = block.type;
	const attributes = {
		classList: parseClasses(block[type], type),
	};

	return createElement(
		mapBlockToTag(type),
		attributes,
		createRichText(block[type].rich_text),
	);
}

const blockParsers = {
	bulleted_list_item: (block) => createRichTextHTMLElement(block),
	paragraph: (block) => createRichTextHTMLElement(block),
	heading_1: (block) => createRichTextHTMLElement(block),
	heading_2: (block) => createRichTextHTMLElement(block),
	heading_3: (block) => createRichTextHTMLElement(block),
	code: (block) => createCode(block),
	image: (data) => createImage(data),
	divider: () => `<div class="${PARAMS.classPrefix}-divider"></div>`,
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
	return isToggleable ? "toggleable" : "";
}

function parseClasses(element, type) {
	const baseClass = type;
	const color = parseColor(element.color);
	const toggleable = parseToggleable(element.is_toggleable);

	return [baseClass, color, toggleable]
		.filter(Boolean)
		.map((c) => `${PARAMS.classPrefix}-${c.replaceAll("_", "-")}`)
		.join(" ");
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
 * @param {string} tag
 * @param {{ classList: string}} attributes
 * @param {string} children
 *
 * @returns ParsedContent
 */
function createElement(tag, attributes, children) {
	return `<${tag} class="${attributes.classList}">${children || ""}</${tag}>`;
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
	if (annotations.code)
		result = `<code class="${PARAMS.classPrefix}-incline-code">${result}</code>`;

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
	return richText.map(createTextElement).join("");
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
	const alt = caption.map((text) => text.plain_text).join("");
	const captionText = createRichText(caption);

	// todo: captionText should be optional;

	return `<div class="n-image"><img src="${src}"alt="${alt}"><p>${captionText}</p></div>`;
}

/**
 * @param {CodeBlockData} codeBlockData
 * @return {ParsedContent}
 */
function createCode(codeBlockData) {
	const { rich_text, caption, language } = codeBlockData.code;

	const plainTextFromCode = rich_text.map((text) => text.plain_text).join("");
	const codeCaption = createRichText(caption);

	return `
    <div class="${PARAMS.classPrefix}-code">
      ${
				codeCaption
					? `<p class="${PARAMS.classPrefix}-code-caption">${codeCaption}</p>`
					: ""
			}
      <code class="${PARAMS.classPrefix}-code-${language}">${plainTextFromCode}</code>
    </div>
  `;
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
		} else {
			// throw new Error(`Unsupported block type: ${block.type}`)
			console.log(`Unsupported block type: ${block.type}`);
		}
	}

	return result.join("");
}

/**
 * @param {ListBlockChildrenResponse} page
 */
function parseNotionPage(page) {
	return parseNotionBlocksData(page.results);
}

module.exports = parseNotionPage;
