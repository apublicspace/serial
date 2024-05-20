<a href="https://github.com/apublicspace/serial"><img src="https://cheerio.js.org/img/orange-c.svg" width="60" alt="Cheerio"></a>

###

# Serialize HTML and JSON data

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/apublicspace/serial/blob/master/LICENSE.md)

### Cheerio extension for HTML and JSON data serialization

## Installation and Import

Install @publicspace/serial with npm:

```sh
npm install @publicspace/serial
```

Import serial:

```js
import serial from "@publicspace/serial";
```

## Serialize HTML and JSON Data

htmlToJson usage:

```js
const json = Serial.htmlToJson(`
	<h1>
		Hello, World!
	</h1>
`);
```

jsonToHtml usage:

```js
const html = Serial.jsonToHtml([
	{
		tag: "h1",
		children: [
			{
				type: "text",
				content: "Hello, World!"
			}
		]
	}
]);
```

## Example Usage

Import the module:

```js
import Serial from "@publicspace/serial";
```

### HTML to JSON

Convert HTML to JSON:

```js
const html = `
	<div class="container">
		<h1>Hello, World!</h1>
		<p>This is a paragraph.</p>
	</div>
`;
const json = Serial.htmlToJson(html);
console.log(json);
```

Convert entire HTML document to JSON:

```js
const html = `
	<html data-theme="theme">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>
		</head>
		<body id="top" class="hero-container animation">
			<main>
				<h1>Hello, World!</h1>
				<p>This is a paragraph.</p>
			</main>
		</body>
	</html>
`;
const json = Serial.htmlToJson(html, true);
console.log(json);
```

### JSON to HTML

Convert JSON to HTML:

```js
const json = [
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
				attributes: {
					id: "top",
					class: "hero-container animation"
				},
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
const html = Serial.jsonToHtml(json);
console.log(html);
```
