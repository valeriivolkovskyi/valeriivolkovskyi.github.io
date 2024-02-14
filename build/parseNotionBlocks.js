/**
 * @typedef {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} BlockObjectResponse
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ImageBlockObjectResponse} ImageBlockObject
 * @typedef {import("@notionhq/client/build/src/api-endpoints").ParagraphBlockObjectResponse} ParagraphBlockObjectResponse
 * @typedef {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse}  RichTextItem
 * @typedef {import("@notionhq/client/build/src/api-endpoints").TextRichTextItemResponse} TextRichTextItemResponse
 * @property {AnnotationResponse} TextRichTextItemResponse.AnnotationResponse
 */

const blockTypeParsers = {
	/** @param {ParagraphBlockObjectResponse} data */
	paragraph: (data) => parseRichText(data.paragraph),

	/** @param {ImageBlockObject} data */
	image: (data) => {
		const caption = data.image.caption;
		return parseTextItem(caption);
	},
	bookmark: () => null,
	breadcrumb: () => null,
	bulleted_list_item: () => null,
	callout: () => null,
	child_database: () => null,
	child_page: () => null,
	code: () => null,
	column_list_and_column: () => null,
	divider: () => null,
	embed: () => null,
	equation: () => null,
	file: () => null,
	headings: () => null,
	link_preview: () => null,
	mention: () => null,
	numbered_list_item: () => null,
	pdf: () => null,
	quote: () => null,
	synced_block: () => null,
	table: () => null,
	table_of_contents: () => null,
	template: () => null,
	to_do: () => null,
	toggle_blocks: () => null,
	video: () => null,
};

/**
 * @param {AnnotationResponse} annotations
 * @param {string} text
 */
function addAnnotations(annotations, text) {
	let annots = text;

	if (annotations.bold) annots = `<b>${annots}</b>`;
	if (annotations.italic) annots = `<i>${annots}</i>`;
	if (annotations.strikethrough) annots = `<strike>${annots}</strike>`;
	if (annotations.underline) annots = `<u>${annots}</u>`;
	if (annotations.code) annots = `<code>${annots}</code>`;
	if (annotations.color !== "default")
		annots = `<span class="n-color-${annotations.color}">${annots}</span>`;

	return annots;
}

/**
 *
 * @param {TextRichTextItemResponse} text
 * @return {string}
 */
function parseTextItem(text) {
	return addAnnotations(text.annotations, text.text.content);
}

/**
 * @param {{ rich_text: Array<RichTextItemResponse>, color: ApiColor }} paragraph
 * @return {string|null}
 */
function parseRichText(paragraph) {
	if (paragraph.rich_text.length === 0) {
		return null;
	}

	const color =
		paragraph.color !== "default" ? ` class="n-color-${paragraph.color}"` : "";
	const slices = paragraph.rich_text.map(parseTextItem);

	return `<p${color}>${slices.join("")}</p>`;
}

/**
 * @param {BlockObjectResponse} block
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
 * @param {BlockObjectResponse[]} blocks
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