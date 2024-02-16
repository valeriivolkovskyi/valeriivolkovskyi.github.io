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

const {createElement} = require("react");
const ReactDOM = require("react-dom/server");

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
 */
function createRichTextHTMLElement(block) {
	const type = block.type;
	const attributes = {
		className: parseClasses(block[type], type),
	};

	const element = createElement(
		mapBlockToTag(type),
		attributes,
		createRichText(block[type].rich_text),
	);

	const result = {
		type,
		component: element,
		children: null,
	};

	if (block.has_children) {
		result.children = processBlockList(block.children);
	}

	return result;
}

const blockTransformers = {
	bulleted_list_item: (block) => createRichTextHTMLElement(block),
	paragraph: (block) => createRichTextHTMLElement(block),
	heading_1: (block) => createRichTextHTMLElement(block),
	heading_2: (block) => createRichTextHTMLElement(block),
	heading_3: (block) => createRichTextHTMLElement(block),
	code: (block) => createCodeElement(block),
	image: (data) => createImageElement(data),
	// divider: () => `<div class="${PARAMS.classPrefix}-divider"></div>`,
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
	return isToggleable ? ["toggleable", 'toggleable-closed'] : [""];
}

function parseClasses(element, type) {
	const baseClass = type;
	const color = parseColor(element.color);
	const toggleable = parseToggleable(element.is_toggleable);

	return [baseClass, color, ...toggleable]
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
 *
 * @param {TextData} textData
 * @return {React.Element}
 */
function createTextElement(textData) {
	const { href, text, annotations } = textData;
	let result = text.content;
	const transformers = [
		(content) =>
			href !== null ? createElement("a", { href }, content) : content,
		(content) =>
			annotations.bold ? createElement("b", {}, content) : content,
		(content) =>
			annotations.italic ? createElement("i", {}, content) : content,
		(content) =>
			annotations.strikethrough
				? createElement("s", {}, content)
				: content,
		(content) =>
			annotations.underline ? createElement("u", {}, content) : content,
		(content) =>
			annotations.code
				? createElement(
						"code",
						{ className: `${PARAMS.classPrefix}-inline-code` },
						content,
				  )
				: content,
		// Adjusted to add possible handling of an undefined color.
		(content) => {
			const color = annotations.color ? parseColor(annotations.color) : "";
			return color !== ""
				? createElement("span", { className: `nc-${color}` }, content)
				: content;
		},
	];
	transformers.forEach((transform) => {
		result = transform(result);
	});
	return result;
}

/**
 *
 * @param {RichTextData[]} richText
 * @returns ParsedContent
 */
function createRichText(richText) {
	return richText.map(createTextElement);
}

/**
 *
 * @param {ImageBlockData} imageBlockData
 * @return {ParsedContent}
 */
function createImageElement(imageBlockData) {
	const { type, caption } = imageBlockData.image;
	const imageFileInfo = imageBlockData.image[type];
	if (imageFileInfo.url.length === 0) return null;

	const src = imageFileInfo.url;
	const alt = caption.map((text) => text.plain_text).join("");
	const captionText = createRichText(caption);

	const component = createElement("div", { className: "n-image" }, [
		createElement("img", { src, alt }, null),
		createElement("p", null, captionText),
	]);

	return { component };
}

/**
 * @param {CodeBlockData} codeBlockData
 * @return {ParsedContent}
 */
function createCodeElement(codeBlockData) {
	const { rich_text, caption, language } = codeBlockData.code;

	const plainTextFromCode = rich_text.map((text) => text.plain_text).join("");
	const codeCaption = createRichText(caption);

	const component = createElement(
		"div",
		{ className: `${PARAMS.classPrefix}-code` },
		[
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
		],
	);

	return { component };
}

/**
 * @param {Array<PartialBlockObjectResponse | BlockObjectResponse>} blocks
 */
function processBlockContent(blocks) {
	const HTMLElements = [];

	for (const block of blocks) {
		if (blockTransformers.hasOwnProperty(block.type)) {
			const element = blockTransformers[block.type](block);

			if (element !== null) {
				HTMLElements.push(element);
			}
		} else {
			// throw new Error(`Unsupported block type: ${block.type}`)
			console.log(`Unsupported block type: ${block.type}`);
		}
	}

	return HTMLElements.map((element) => {
		const type = element.type;

		if (!!element.children) {
			return createElement("div", { className: "parent" }, [
				element.component,
				element.children,
			]);
		} else {
			return element.component;
		}
	});
}

/**
 * @param {ListBlockChildrenResponse} page
 */
function processBlockList(page) {
	return processBlockContent(page.results);
}

/**
 * @param {ListBlockChildrenResponse} page
 */
function renderToString(page) {
	const res = processBlockList(page);
	return ReactDOM.renderToString(res);
}

module.exports = renderToString;
