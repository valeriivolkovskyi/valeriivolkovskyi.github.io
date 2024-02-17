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
 * @typedef {import("@notionhq/client/build/src/api-endpoints").PartialBlockObjectResponse} PartialBlockObjectResponse
 *
 */

const { createElement } = require("./rendering");
const { PARAMS } = require("./params");
const t = require("./blockTypes");
const {
	mapBlockToTag,
	parseClasses,
	createAnnotatedTextElement,
} = require("./helpers");


const blockTransformers = {
	[t.bulleted_list_item]: (block) => createRichTextHTMLElement(block),
	[t.paragraph]: (block) => createRichTextHTMLElement(block),
	[t.heading_1]: (block) => createRichTextHTMLElement(block),
	[t.heading_2]: (block) => createRichTextHTMLElement(block),
	[t.heading_3]: (block) => createRichTextHTMLElement(block),

	[t.code]: (block) => createCodeElement(block),
	[t.image]: (data) => createImageElement(data),
	// [t.divider]: () => `<div class="${PARAMS.classPrefix}-divider"></div>`,
	// [t.quote]: () => null,
	// [t.numbered_list_item]: () => null,
	// [t.toggle_blocks]: () => null,
	// [t.column_list_and_column]: () => null,
	// [t.callout]: () => null,
	// [t.to_do]: () => null,
	// [t.video]: () => null,
	// [t.child_database]: () => null,
	// [t.bookmark]: () => null,
	// [t.breadcrumb]: () => null,
	// [t.child_page]: () => null,
	// [t.embed]: () => null,
	// [t.equation]: () => null,
	// [t.file]: () => null,
	// [t.link_preview]: () => null,
	// [t.mention]: () => null,
	// [t.pdf]: () => null,
	// [t.synced_block]: () => null,
	// [t.table]: () => null,
	// [t.table_of_contents]: () => null,
	// [t.template]: () => null,
};
/**
 *
 * @param {ImageBlockData} imageBlockData
 * @return {Element}
 */
function createImageElement(imageBlockData) {
	const { type, caption } = imageBlockData.image;
	const imageFileInfo = imageBlockData.image[type];
	if (imageFileInfo.url.length === 0) return null;

	const src = imageFileInfo.url;
	const alt = caption.map((text) => text.plain_text).join("");
	const captionText = createRichText(caption);

	return createElement("div", { className: "n-image" }, [
		createElement("img", { src, alt }, null),
		createElement("p", {}, captionText),
	]);
}

/**
 * @param {CodeBlockData} codeBlockData
 * @return {Element}
 */
function createCodeElement(codeBlockData) {
	const { rich_text, caption, language } = codeBlockData.code;

	const plainTextFromCode = rich_text.map((text) => text.plain_text).join("");
	const codeCaption = createRichText(caption);

	return createElement("div", { className: `${PARAMS.classPrefix}-code` }, [
		codeCaption &&
			createElement(
				"p",
				{ className: `${PARAMS.classPrefix}-code-caption` },
				codeCaption,
			),
		createElement(
			"code",
			{ className: `${PARAMS.classPrefix}-code-${language}` },
			plainTextFromCode,
		),
	]);
}

/**
 *
 * @param {BlockData } block
 */
function getChildren(block) {
	return processBlockList(block.children);
}

/**
 *
 * @param {BlockData} block
 */
function createRichTextHTMLElement(block) {
	const type = block.type;
	const HTMLTag = mapBlockToTag(type);
	const className =  parseClasses(block[type], type);
	const content = createRichText(block[type].rich_text);
	const children = block.has_children ? getChildren(block) : null;

	return createElement(HTMLTag, {className }, content, children);
}

/**
 *
 * @param {RichTextData[]} richText
 * @returns {Element}
 */
function createRichText(richText) {
	return richText.map(createAnnotatedTextElement);
}

/**
 * @param {Array<PartialBlockObjectResponse | BlockObjectResponse>} blocks
 */
function processBlockContent(blocks) {
	const HTMLElements = [];

	const readyBlocks = new Set();

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];

		if (
			blockTransformers.hasOwnProperty(block.type) &&
			!readyBlocks.has(block)
		) {
			let element = blockTransformers[block.type](block);

			if (
				block.type === t.bulleted_list_item ||
				block.type === t.numbered_list_item
			) {
				let right = i + 1;
				const siblings = [element];

				while (blocks[right]?.type === block.type) {
					const elem = blockTransformers[block.type](blocks[right]);
					siblings.push(elem);
					readyBlocks.add(blocks[right]);
					right++;
				}

				element = createElement("ul", {}, siblings);
			}

			if (element !== null) {
				HTMLElements.push(element);
			}
		} else {
			// throw new Error(`Unsupported block type: ${block.type}`)
			console.log(`Unsupported block type: ${block.type}`);
		}
	}

	return HTMLElements;
}

/**
 * @param {ListBlockChildrenResponse} page
 */
function processBlockList(page) {
	return processBlockContent(page.results);
}

module.exports = { processBlockList };
