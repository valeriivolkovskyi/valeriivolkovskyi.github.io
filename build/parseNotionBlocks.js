const { renderToString } = require("./renderNotion/rendering");
const { processBlockList } = require("./renderNotion/transformNotionBlocks");

/**
 * @param {ListBlockChildrenResponse} page
 */
function render(page) {
	const res = processBlockList(page);
	return renderToString(res);
}

/**
 *
 * @param {BlockData} block
 */
function renderBlock(block) {}

// debug
const data = [
	{
		object: "page",
		id: "9e402068-51ad-4ab0-9b5e-ff1c3942f3c4",
		created_time: "2024-02-14T08:55:00.000Z",
		last_edited_time: "2024-02-14T11:26:00.000Z",
		created_by: { object: "user", id: "93bfee87-3786-4846-8b2b-e66cc624a7e8" },
		last_edited_by: {
			object: "user",
			id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
		},
		cover: null,
		icon: null,
		parent: {
			type: "database_id",
			database_id: "6052e127-f205-492f-849d-120015824703",
		},
		archived: false,
		properties: {
			Description: {
				id: "%3EkgH",
				type: "rich_text",
				rich_text: [
					{
						type: "text",
						text: {
							content: "State manager for all types of web apps",
							link: null,
						},
						annotations: {
							bold: false,
							italic: false,
							strikethrough: false,
							underline: false,
							code: false,
							color: "default",
						},
						plain_text: "State manager for all types of web apps",
						href: null,
					},
				],
			},
			Tags: {
				id: "CRYF",
				type: "multi_select",
				multi_select: [
					{
						id: "0c8e95f9-99c6-4c63-be4a-fbd824b18e7a",
						name: "react",
						color: "brown",
					},
					{
						id: "e3441a6e-ceec-45d3-8e1e-f6508c068af5",
						name: "web components",
						color: "red",
					},
					{
						id: "db245ea4-ce9a-4669-a68c-90e47928774d",
						name: "state management",
						color: "yellow",
					},
				],
			},
			Date: {
				id: "RQKm",
				type: "date",
				date: { start: "2024-02-14", end: null, time_zone: null },
			},
			Slug: { id: "j%3Bau", type: "url", url: "state-manager" },
			Type: {
				id: "plZv",
				type: "select",
				select: { id: "Uhp|", name: "Project", color: "default" },
			},
			"Article Status": {
				id: "swjK",
				type: "status",
				status: {
					id: "b16d015e-3531-466d-a7a9-2fcd69d1b072",
					name: "Done",
					color: "green",
				},
			},
			Name: {
				id: "title",
				type: "title",
				title: [
					{
						type: "text",
						text: { content: "State", link: null },
						annotations: {
							bold: false,
							italic: false,
							strikethrough: false,
							underline: false,
							code: false,
							color: "default",
						},
						plain_text: "State",
						href: null,
					},
				],
			},
		},
		url: "https://www.notion.so/State-9e40206851ad4ab09b5eff1c3942f3c4",
		public_url: null,
		blocks: {
			object: "list",
			results: [
				{
					object: "block",
					id: "15252d6e-322f-48d1-9da2-7c69729705c8",
					parent: {
						type: "page_id",
						page_id: "9e402068-51ad-4ab0-9b5e-ff1c3942f3c4",
					},
					created_time: "2024-02-14T08:58:00.000Z",
					last_edited_time: "2024-02-14T09:00:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: {
									content:
										"Performance-oriented and highly adaptable state manager for any types of JS applications: NodeJS, Web Components, WASM, React, Vue, etc..",
									link: null,
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text:
									"Performance-oriented and highly adaptable state manager for any types of JS applications: NodeJS, Web Components, WASM, React, Vue, etc..",
								href: null,
							},
							{
								type: "text",
								text: { content: "", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "",
								href: null,
							},
						],
						color: "default",
					},
				},
			],
			next_cursor: null,
			has_more: false,
			type: "block",
			block: {},
			request_id: "b3f42211-bb4e-4ef9-bd1c-25b8b28daae0",
		},
	},
	{
		object: "page",
		id: "5de27ba6-306a-446e-ad8c-3429474ee452",
		created_time: "2024-02-11T22:10:00.000Z",
		last_edited_time: "2024-02-16T21:00:00.000Z",
		created_by: { object: "user", id: "93bfee87-3786-4846-8b2b-e66cc624a7e8" },
		last_edited_by: {
			object: "user",
			id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
		},
		cover: null,
		icon: null,
		parent: {
			type: "database_id",
			database_id: "6052e127-f205-492f-849d-120015824703",
		},
		archived: false,
		properties: {
			Description: {
				id: "%3EkgH",
				type: "rich_text",
				rich_text: [
					{
						type: "text",
						text: { content: "Description of article", link: null },
						annotations: {
							bold: false,
							italic: false,
							strikethrough: false,
							underline: false,
							code: false,
							color: "default",
						},
						plain_text: "Description of article",
						href: null,
					},
				],
			},
			Tags: {
				id: "CRYF",
				type: "multi_select",
				multi_select: [
					{
						id: "1dfd5716-b26c-4bfc-8054-7ba7e9117408",
						name: "design patterns",
						color: "green",
					},
				],
			},
			Date: {
				id: "RQKm",
				type: "date",
				date: { start: "2024-02-12", end: null, time_zone: null },
			},
			Slug: { id: "j%3Bau", type: "url", url: "pattern-observer" },
			Type: {
				id: "plZv",
				type: "select",
				select: { id: "qUmc", name: "Article", color: "blue" },
			},
			"Article Status": {
				id: "swjK",
				type: "status",
				status: {
					id: "b16d015e-3531-466d-a7a9-2fcd69d1b072",
					name: "Done",
					color: "green",
				},
			},
			Name: {
				id: "title",
				type: "title",
				title: [
					{
						type: "text",
						text: { content: "Pattern Observer", link: null },
						annotations: {
							bold: false,
							italic: false,
							strikethrough: false,
							underline: false,
							code: false,
							color: "default",
						},
						plain_text: "Pattern Observer",
						href: null,
					},
				],
			},
		},
		url: "https://www.notion.so/Pattern-Observer-5de27ba6306a446ead8c3429474ee452",
		public_url: null,
		blocks: {
			object: "list",
			results: [
				{
					object: "block",
					id: "8ecb4c87-4225-4cff-b549-eb5d91f6a766",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-11T22:24:00.000Z",
					last_edited_time: "2024-02-11T22:25:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: { content: "Content is here", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Content is here",
								href: null,
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					id: "5629bbb9-54fb-41ad-9875-8715137e6877",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-11T22:39:00.000Z",
					last_edited_time: "2024-02-15T23:33:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: {
									content: "This is my Article about ObserveR ",
									link: null,
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "This is my Article about ObserveR ",
								href: null,
							},
							{
								type: "text",
								text: { content: "Pattern ", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Pattern ",
								href: null,
							},
							{
								type: "text",
								text: { content: "code", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: true,
									color: "default",
								},
								plain_text: "code",
								href: null,
							},
							{
								type: "text",
								text: { content: " variabe", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: " variabe",
								href: null,
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					id: "b826f543-859b-410d-bacb-85f746b77e17",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-12T00:04:00.000Z",
					last_edited_time: "2024-02-15T11:14:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "code",
					code: {
						caption: [
							{
								type: "text",
								text: { content: "Code caption", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Code caption",
								href: null,
							},
						],
						rich_text: [
							{
								type: "text",
								text: {
									content:
										"const a = new State();\nconsole.log(a);\n\n\n// bold ",
									link: null,
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text:
									"const a = new State();\nconsole.log(a);\n\n\n// bold ",
								href: null,
							},
							{
								type: "text",
								text: { content: "comment", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "comment",
								href: null,
							},
							{
								type: "text",
								text: { content: " ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: " ",
								href: null,
							},
							{
								type: "text",
								text: { content: "link", link: { url: "http://google.com/" } },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "link",
								href: "http://google.com/",
							},
							{
								type: "text",
								text: { content: "\nconst b = new Map();", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "\nconst b = new Map();",
								href: null,
							},
						],
						language: "javascript",
					},
				},
				{
					object: "block",
					id: "e43fb805-d405-49ee-bc41-d9e02658957d",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-11T22:53:00.000Z",
					last_edited_time: "2024-02-14T22:18:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: { content: "End of the ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "End of the ",
								href: null,
							},
							{
								type: "text",
								text: { content: "ARTICLE", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "brown",
								},
								plain_text: "ARTICLE",
								href: null,
							},
						],
						color: "red_background",
					},
				},
				{
					object: "block",
					id: "3ae5094c-d394-4224-a0bf-53fd3d1166a2",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-15T08:11:00.000Z",
					last_edited_time: "2024-02-15T08:12:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: {
									content: "text with href",
									link: { url: "http://google.com/" },
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "text with href",
								href: "http://google.com/",
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					id: "500fb75f-948d-47a1-a829-9b2e844c6206",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-16T13:35:00.000Z",
					last_edited_time: "2024-02-16T13:35:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "84c6a664-15ed-4a9c-8940-4f113484a264",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-16T13:35:00.000Z",
					last_edited_time: "2024-02-16T13:35:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: true,
					archived: false,
					type: "heading_1",
					heading_1: {
						rich_text: [
							{
								type: "text",
								text: { content: "Toggle Heading", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Toggle Heading",
								href: null,
							},
						],
						is_toggleable: true,
						color: "default",
					},
					children: {
						object: "list",
						results: [
							{
								object: "block",
								id: "1e71c911-63b5-4df6-b560-6d9ab0dbe255",
								parent: {
									type: "block_id",
									block_id: "84c6a664-15ed-4a9c-8940-4f113484a264",
								},
								created_time: "2024-02-16T13:35:00.000Z",
								last_edited_time: "2024-02-16T13:35:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "paragraph",
								paragraph: {
									rich_text: [
										{
											type: "text",
											text: { content: "Hidden text", link: null },
											annotations: {
												bold: false,
												italic: false,
												strikethrough: false,
												underline: false,
												code: false,
												color: "default",
											},
											plain_text: "Hidden text",
											href: null,
										},
									],
									color: "default",
								},
							},
						],
						next_cursor: null,
						has_more: false,
						type: "block",
						block: {},
						request_id: "5ca6919d-ffba-476d-97a8-ebd0e81daae1",
					},
				},
				{
					object: "block",
					id: "6ceb7bf8-c64a-40c2-806c-0ee5c1d0b74b",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:38:00.000Z",
					last_edited_time: "2024-02-14T21:38:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "ef20de5f-f76f-43a5-a328-94a8766b6d67",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:50:00.000Z",
					last_edited_time: "2024-02-14T22:39:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "image",
					image: {
						caption: [
							{
								type: "text",
								text: { content: "Image ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Image ",
								href: null,
							},
							{
								type: "text",
								text: { content: "Caption", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Caption",
								href: null,
							},
						],
						type: "file",
						file: {
							url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/8ef64b98-cc33-413d-8bd6-e5c80de36968/cc7116f4-74bd-4819-92a0-28cfa89bb2a3/Screenshot_2024-02-15_at_12.50.36_AM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240216T221715Z&X-Amz-Expires=3600&X-Amz-Signature=c03191ad7a2b7cdd8323b96818343f5010fab25c308fe4708355eb39870fda54&X-Amz-SignedHeaders=host&x-id=GetObject",
							expiry_time: "2024-02-16T23:17:15.897Z",
						},
					},
				},
				{
					object: "block",
					id: "cbe4b285-9b3d-4f10-9ea7-046c6df2d13a",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:40:00.000Z",
					last_edited_time: "2024-02-15T14:32:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "heading_1",
					heading_1: {
						rich_text: [
							{
								type: "text",
								text: { content: "Heading 1 ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "yellow_background",
								},
								plain_text: "Heading 1 ",
								href: null,
							},
							{
								type: "text",
								text: { content: "boldred", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "red",
								},
								plain_text: "boldred",
								href: null,
							},
						],
						is_toggleable: false,
						color: "default",
					},
				},
				{
					object: "block",
					id: "9aecec1a-2d51-4a05-aa87-74db544d7634",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-15T14:19:00.000Z",
					last_edited_time: "2024-02-15T14:19:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "4e5f83f4-8f9b-44e7-a779-a797989d10ae",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-15T14:19:00.000Z",
					last_edited_time: "2024-02-15T14:19:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "heading_1",
					heading_1: { rich_text: [], is_toggleable: false, color: "default" },
				},
				{
					object: "block",
					id: "67a7a340-1b4f-4a52-9ce4-abfa62836abe",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:40:00.000Z",
					last_edited_time: "2024-02-14T21:40:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "heading_2",
					heading_2: {
						rich_text: [
							{
								type: "text",
								text: { content: "Heading 2", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Heading 2",
								href: null,
							},
						],
						is_toggleable: false,
						color: "default",
					},
				},
				{
					object: "block",
					id: "2e29e66b-7736-4c1f-8bf2-ce5d3562ee51",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:41:00.000Z",
					last_edited_time: "2024-02-14T21:41:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "heading_3",
					heading_3: {
						rich_text: [
							{
								type: "text",
								text: { content: "Heading 3", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Heading 3",
								href: null,
							},
						],
						is_toggleable: false,
						color: "default",
					},
				},
				{
					object: "block",
					id: "5235c396-ad74-420f-a360-a4022ec2aee5",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:41:00.000Z",
					last_edited_time: "2024-02-14T21:41:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "e452c368-c90c-4f77-b34a-62fcde6ee703",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:41:00.000Z",
					last_edited_time: "2024-02-14T21:41:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "to_do",
					to_do: {
						rich_text: [
							{
								type: "text",
								text: { content: "todolist item ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "todolist item ",
								href: null,
							},
						],
						checked: false,
						color: "default",
					},
				},
				{
					object: "block",
					id: "d73d7f7a-6b10-43eb-90b2-3d25a1b5b542",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:41:00.000Z",
					last_edited_time: "2024-02-14T21:41:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "to_do",
					to_do: {
						rich_text: [
							{
								type: "text",
								text: { content: "todolist item checked", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "todolist item checked",
								href: null,
							},
						],
						checked: true,
						color: "default",
					},
				},
				{
					object: "block",
					id: "c0c7857b-1959-496a-87e6-aee09303bb51",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:41:00.000Z",
					last_edited_time: "2024-02-14T21:41:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "4eaa405f-d877-49f0-9bd4-1e265afb1310",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:42:00.000Z",
					last_edited_time: "2024-02-14T21:43:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: true,
					archived: false,
					type: "table",
					table: {
						table_width: 2,
						has_column_header: false,
						has_row_header: false,
					},
					children: {
						object: "list",
						results: [
							{
								object: "block",
								id: "76d35bee-7978-490d-b267-2549ce554f5d",
								parent: {
									type: "block_id",
									block_id: "4eaa405f-d877-49f0-9bd4-1e265afb1310",
								},
								created_time: "2024-02-14T21:42:00.000Z",
								last_edited_time: "2024-02-14T21:42:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "table_row",
								table_row: {
									cells: [
										[
											{
												type: "text",
												text: { content: "My Column 1", link: null },
												annotations: {
													bold: false,
													italic: false,
													strikethrough: false,
													underline: false,
													code: false,
													color: "default",
												},
												plain_text: "My Column 1",
												href: null,
											},
										],
										[
											{
												type: "text",
												text: { content: "My Column 2", link: null },
												annotations: {
													bold: false,
													italic: false,
													strikethrough: false,
													underline: false,
													code: false,
													color: "default",
												},
												plain_text: "My Column 2",
												href: null,
											},
										],
									],
								},
							},
							{
								object: "block",
								id: "8a9f0ed4-b944-4ee2-afc4-9f71d4588958",
								parent: {
									type: "block_id",
									block_id: "4eaa405f-d877-49f0-9bd4-1e265afb1310",
								},
								created_time: "2024-02-14T21:42:00.000Z",
								last_edited_time: "2024-02-14T21:43:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "table_row",
								table_row: {
									cells: [
										[
											{
												type: "text",
												text: { content: "My Row 1", link: null },
												annotations: {
													bold: false,
													italic: false,
													strikethrough: false,
													underline: false,
													code: false,
													color: "default",
												},
												plain_text: "My Row 1",
												href: null,
											},
										],
										[
											{
												type: "text",
												text: { content: "My Row 2", link: null },
												annotations: {
													bold: false,
													italic: false,
													strikethrough: false,
													underline: false,
													code: false,
													color: "default",
												},
												plain_text: "My Row 2",
												href: null,
											},
										],
									],
								},
							},
							{
								object: "block",
								id: "d17fda9d-3beb-4921-a381-c59e91f8d16a",
								parent: {
									type: "block_id",
									block_id: "4eaa405f-d877-49f0-9bd4-1e265afb1310",
								},
								created_time: "2024-02-14T21:42:00.000Z",
								last_edited_time: "2024-02-14T21:42:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "table_row",
								table_row: { cells: [[], []] },
							},
						],
						next_cursor: null,
						has_more: false,
						type: "block",
						block: {},
						request_id: "c209240f-cd69-4351-a673-a510641b8e42",
					},
				},
				{
					object: "block",
					id: "133038ff-a10e-4dfc-bb2d-5fef249f0363",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:43:00.000Z",
					last_edited_time: "2024-02-14T21:43:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "bulleted_list_item",
					bulleted_list_item: {
						rich_text: [
							{
								type: "text",
								text: { content: "Bullet list point 1", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Bullet list point 1",
								href: null,
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					id: "52e8c7e4-a7df-4d9b-aa30-656d11e888a0",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:43:00.000Z",
					last_edited_time: "2024-02-16T21:00:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: true,
					archived: false,
					type: "bulleted_list_item",
					bulleted_list_item: {
						rich_text: [
							{
								type: "text",
								text: { content: "Bullet list point 2", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Bullet list point 2",
								href: null,
							},
						],
						color: "default",
					},
					children: {
						object: "list",
						results: [
							{
								object: "block",
								id: "1a3b1c7c-f19d-480c-a75b-a8d62b781694",
								parent: {
									type: "block_id",
									block_id: "52e8c7e4-a7df-4d9b-aa30-656d11e888a0",
								},
								created_time: "2024-02-14T21:43:00.000Z",
								last_edited_time: "2024-02-16T21:00:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "bulleted_list_item",
								bulleted_list_item: {
									rich_text: [
										{
											type: "text",
											text: { content: "Children 1", link: null },
											annotations: {
												bold: false,
												italic: false,
												strikethrough: false,
												underline: false,
												code: false,
												color: "default",
											},
											plain_text: "Children 1",
											href: null,
										},
									],
									color: "default",
								},
							},
							{
								object: "block",
								id: "93373694-33a4-4665-8d11-f53e89e3e548",
								parent: {
									type: "block_id",
									block_id: "52e8c7e4-a7df-4d9b-aa30-656d11e888a0",
								},
								created_time: "2024-02-16T21:00:00.000Z",
								last_edited_time: "2024-02-16T21:00:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: true,
								archived: false,
								type: "bulleted_list_item",
								bulleted_list_item: {
									rich_text: [
										{
											type: "text",
											text: { content: "Children 2", link: null },
											annotations: {
												bold: false,
												italic: false,
												strikethrough: false,
												underline: false,
												code: false,
												color: "default",
											},
											plain_text: "Children 2",
											href: null,
										},
									],
									color: "default",
								},
								children: {
									object: "list",
									results: [
										{
											object: "block",
											id: "0bce511f-d76c-46ac-ad65-7c53e2db493c",
											parent: {
												type: "block_id",
												block_id: "93373694-33a4-4665-8d11-f53e89e3e548",
											},
											created_time: "2024-02-14T21:43:00.000Z",
											last_edited_time: "2024-02-16T21:00:00.000Z",
											created_by: {
												object: "user",
												id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
											},
											last_edited_by: {
												object: "user",
												id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
											},
											has_children: false,
											archived: false,
											type: "bulleted_list_item",
											bulleted_list_item: {
												rich_text: [
													{
														type: "text",
														text: {
															content: "Bullet list point 4",
															link: null,
														},
														annotations: {
															bold: false,
															italic: false,
															strikethrough: false,
															underline: false,
															code: false,
															color: "default",
														},
														plain_text: "Bullet list point 4",
														href: null,
													},
												],
												color: "default",
											},
										},
									],
									next_cursor: null,
									has_more: false,
									type: "block",
									block: {},
									request_id: "84ac47de-1a8f-4262-b4cb-90150825dd9b",
								},
							},
						],
						next_cursor: null,
						has_more: false,
						type: "block",
						block: {},
						request_id: "f31cc2b4-0dd0-43ac-8cd8-136bf96f84b5",
					},
				},
				{
					object: "block",
					id: "50c035e6-e83f-4cb3-86aa-98e98e45d94b",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:45:00.000Z",
					last_edited_time: "2024-02-14T21:45:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: true,
					archived: false,
					type: "toggle",
					toggle: {
						rich_text: [
							{
								type: "text",
								text: { content: "Toggle list", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Toggle list",
								href: null,
							},
						],
						color: "default",
					},
					children: {
						object: "list",
						results: [
							{
								object: "block",
								id: "4d7c2b8a-cd10-48a0-9c17-b58998bb87d1",
								parent: {
									type: "block_id",
									block_id: "50c035e6-e83f-4cb3-86aa-98e98e45d94b",
								},
								created_time: "2024-02-14T21:45:00.000Z",
								last_edited_time: "2024-02-14T21:45:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "paragraph",
								paragraph: {
									rich_text: [
										{
											type: "text",
											text: { content: "Hidden contend", link: null },
											annotations: {
												bold: false,
												italic: false,
												strikethrough: false,
												underline: false,
												code: false,
												color: "default",
											},
											plain_text: "Hidden contend",
											href: null,
										},
									],
									color: "default",
								},
							},
							{
								object: "block",
								id: "379c740e-8acc-4ec6-8948-0e44988d7f51",
								parent: {
									type: "block_id",
									block_id: "50c035e6-e83f-4cb3-86aa-98e98e45d94b",
								},
								created_time: "2024-02-14T21:45:00.000Z",
								last_edited_time: "2024-02-14T21:45:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "paragraph",
								paragraph: { rich_text: [], color: "default" },
							},
						],
						next_cursor: null,
						has_more: false,
						type: "block",
						block: {},
						request_id: "d91024fa-8517-4f9d-a5b2-15f777d40b1f",
					},
				},
				{
					object: "block",
					id: "e1cbf95e-7b87-4ce2-9d53-77660e3a044a",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:45:00.000Z",
					last_edited_time: "2024-02-14T21:47:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: true,
					archived: false,
					type: "quote",
					quote: {
						rich_text: [
							{
								type: "text",
								text: { content: "Quoted Text. ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Quoted Text. ",
								href: null,
							},
							{
								type: "text",
								text: { content: "Bold text", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Bold text",
								href: null,
							},
						],
						color: "default",
					},
					children: {
						object: "list",
						results: [
							{
								object: "block",
								id: "4a65ce0f-5a4b-4e79-8209-34ad97b99c37",
								parent: {
									type: "block_id",
									block_id: "e1cbf95e-7b87-4ce2-9d53-77660e3a044a",
								},
								created_time: "2024-02-14T21:46:00.000Z",
								last_edited_time: "2024-02-14T21:47:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "bulleted_list_item",
								bulleted_list_item: {
									rich_text: [
										{
											type: "text",
											text: { content: "Bullet list in quote", link: null },
											annotations: {
												bold: false,
												italic: false,
												strikethrough: false,
												underline: false,
												code: false,
												color: "default",
											},
											plain_text: "Bullet list in quote",
											href: null,
										},
									],
									color: "default",
								},
							},
						],
						next_cursor: null,
						has_more: false,
						type: "block",
						block: {},
						request_id: "1ecdbd41-c799-47a0-813b-2d420d9b0db5",
					},
				},
				{
					object: "block",
					id: "27cdfd36-700f-44cb-ad07-18e16b855c73",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:47:00.000Z",
					last_edited_time: "2024-02-14T21:47:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "e601ca0c-adf7-4994-b712-0ca2d066022e",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:47:00.000Z",
					last_edited_time: "2024-02-14T21:47:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "divider",
					divider: {},
				},
				{
					object: "block",
					id: "92a6c764-c100-4969-b852-20696acc51e2",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:47:00.000Z",
					last_edited_time: "2024-02-14T21:47:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: { content: "Under divider", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Under divider",
								href: null,
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					id: "1b087bdc-0a2b-402a-a92d-30b60f67b0f7",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-15T20:12:00.000Z",
					last_edited_time: "2024-02-15T20:12:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "955849c1-7b80-4d39-aedf-6e83c424b330",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:47:00.000Z",
					last_edited_time: "2024-02-14T21:47:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "869939fb-6085-4b37-9eb6-7db67e379965",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:47:00.000Z",
					last_edited_time: "2024-02-14T21:47:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "callout",
					callout: {
						rich_text: [
							{
								type: "text",
								text: { content: "Callout ", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Callout ",
								href: null,
							},
							{
								type: "text",
								text: { content: "Text", link: null },
								annotations: {
									bold: true,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "Text",
								href: null,
							},
						],
						icon: { type: "emoji", emoji: "💡" },
						color: "gray_background",
					},
				},
				{
					object: "block",
					id: "f75354c0-3dfe-451f-abfa-986d4bdd8d10",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:47:00.000Z",
					last_edited_time: "2024-02-14T21:48:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "paragraph",
					paragraph: { rich_text: [], color: "default" },
				},
				{
					object: "block",
					id: "ef6e9f2e-0c39-4614-8e60-7ae605edb7a3",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:49:00.000Z",
					last_edited_time: "2024-02-14T21:49:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "image",
					image: { caption: [], type: "external", external: { url: "" } },
				},
				{
					object: "block",
					id: "9ae670be-11d8-41b8-b3a2-5a26c79639cd",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:39:00.000Z",
					last_edited_time: "2024-02-15T10:56:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: false,
					archived: false,
					type: "image",
					image: {
						caption: [],
						type: "external",
						external: {
							url: "https://images.unsplash.com/photo-1534211698458-e2be12c1a94c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
						},
					},
				},
				{
					object: "block",
					id: "2d251983-f2db-43d4-86aa-da91a0a63f11",
					parent: {
						type: "page_id",
						page_id: "5de27ba6-306a-446e-ad8c-3429474ee452",
					},
					created_time: "2024-02-14T21:49:00.000Z",
					last_edited_time: "2024-02-15T21:57:00.000Z",
					created_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					last_edited_by: {
						object: "user",
						id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
					},
					has_children: true,
					archived: false,
					type: "toggle",
					toggle: {
						rich_text: [
							{
								type: "text",
								text: { content: "BBBBB", link: null },
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: "BBBBB",
								href: null,
							},
						],
						color: "default",
					},
					children: {
						object: "list",
						results: [
							{
								object: "block",
								id: "8194b428-96eb-4ef2-ac71-6a66e715d817",
								parent: {
									type: "block_id",
									block_id: "2d251983-f2db-43d4-86aa-da91a0a63f11",
								},
								created_time: "2024-02-15T21:57:00.000Z",
								last_edited_time: "2024-02-15T21:57:00.000Z",
								created_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								last_edited_by: {
									object: "user",
									id: "93bfee87-3786-4846-8b2b-e66cc624a7e8",
								},
								has_children: false,
								archived: false,
								type: "paragraph",
								paragraph: {
									rich_text: [
										{
											type: "text",
											text: { content: "sdsdsd", link: null },
											annotations: {
												bold: false,
												italic: false,
												strikethrough: false,
												underline: false,
												code: false,
												color: "default",
											},
											plain_text: "sdsdsd",
											href: null,
										},
									],
									color: "default",
								},
							},
						],
						next_cursor: null,
						has_more: false,
						type: "block",
						block: {},
						request_id: "dfc029b9-4b9b-4d09-a7d6-07481a6b530f",
					},
				},
			],
			next_cursor: null,
			has_more: false,
			type: "block",
			block: {},
			request_id: "b7e5532b-3c03-4a8c-aae4-cef1c9caa034",
		},
	},
];
const res = render(data[1].blocks);
console.log(res);

module.exports = render;
