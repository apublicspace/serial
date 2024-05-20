import { expect } from "chai";
import Serial from "../index.js";

describe("Serial tests", () => {
	it("should convert HTML to JSON", () => {
		let html = `
			<div id="top">
				<div class="container animation">
					<h2 class="title">
						Hello <b>world</b>
					</h2>
				</div>
			</div>
			<div class="other-class">
				Next
			</div>
		`;

		let json = Serial.htmlToJson(html);

		let expectedJson = [
			{
				tag: "div",
				attributes: {
					id: "top"
				},
				children: [
					{
						tag: "div",
						attributes: {
							class: "container animation"
						},
						children: [
							{
								tag: "h2",
								attributes: {
									class: "title"
								},
								children: [
									{
										type: "text",
										content: "Hello"
									},
									{
										tag: "b",
										children: [
											{
												type: "text",
												content: "world"
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				tag: "div",
				attributes: {
					class: "other-class"
				},
				children: [
					{
						type: "text",
						content: "Next"
					}
				]
			}
		];

		expect(json).to.deep.equal(expectedJson);

		html = "<h1>Hello, World!</h1>";

		json = Serial.htmlToJson(html);

		expectedJson = [
			{
				tag: "h1",
				children: [
					{
						type: "text",
						content: "Hello, World!"
					}
				]
			}
		];

		expect(json).to.deep.equal(expectedJson);

		html = `
			<html data-theme="theme">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Document</title>
				</head>
				<body>
					<main>
						<h1>Hello, World!</h1>
						<p>This is a paragraph.</p>
					</main>
				</body>
			</html>
		`;

		json = Serial.htmlToJson(html, true);

		expectedJson = [
			{
				tag: "html",
				attributes: {
					"data-theme": "theme"
				},
				children: [
					{
						tag: "head",
						children: [
							{
								tag: "meta",
								attributes: {
									charset: "UTF-8"
								}
							},
							{
								tag: "meta",
								attributes: {
									name: "viewport",
									content: "width=device-width, initial-scale=1.0"
								}
							},
							{
								tag: "title",
								children: [
									{
										type: "text",
										content: "Document"
									}
								]
							}
						]
					},
					{
						tag: "body",
						children: [
							{
								tag: "main",
								children: [
									{
										tag: "h1",
										children: [
											{
												type: "text",
												content: "Hello, World!"
											}
										]
									},
									{
										tag: "p",
										children: [
											{
												type: "text",
												content: "This is a paragraph."
											}
										]
									}
								]
							}
						]
					}
				]
			}
		];

		expect(json).to.deep.equal(expectedJson);

		html = "<h1>Hello, World!</h1>";

		json = Serial.htmlToJson(html, true);

		expectedJson = [
			{
				tag: "html",
				children: [
					{
						tag: "head"
					},
					{
						tag: "body",
						children: [
							{
								tag: "h1",
								children: [
									{
										type: "text",
										content: "Hello, World!"
									}
								]
							}
						]
					}
				]
			}
		];

		expect(json).to.deep.equal(expectedJson);
	});

	it("should convert JSON to HTML", () => {
		let json = [
			{
				tag: "div",
				attributes: {
					id: "top"
				},
				children: [
					{
						tag: "div",
						children: [
							{
								tag: "h2",
								attributes: {
									class: "title"
								},
								children: [
									{
										type: "text",
										content: "Hello, "
									},
									{
										tag: "b",
										children: [
											{
												type: "text",
												content: "World!"
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				tag: "div",
				attributes: {
					class: "other-class"
				},
				children: [
					{
						type: "text",
						content: "Next"
					}
				]
			}
		];

		let expectedHtml =
			'<div id="top"><div><h2 class="title">Hello, <b>World!</b></h2></div></div><div class="other-class">Next</div>';

		let html = Serial.jsonToHtml(json);

		expect(html).to.deep.equal(expectedHtml);

		json = [
			{
				tag: "h1",
				children: [
					{
						type: "text",
						content: "Hello, World!"
					}
				]
			}
		];

		expectedHtml = "<h1>Hello, World!</h1>";

		html = Serial.jsonToHtml(json);

		expect(html).to.deep.equal(expectedHtml);
	});
});
