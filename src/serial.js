import * as cheerio from "cheerio";

function htmlToJson(html, useRoot) {
	const serialize = cheerio.load(html);

	function processNode(node) {
		const element = {
			tag: node.tagName
		};

		if (node.attribs && Object.keys(node.attribs).length > 0) {
			element.attributes = node.attribs;
		}

		const children = [];
		node.children.forEach((child) => {
			if (child.type === "tag") {
				children.push(processNode(child));
			} else if (child.type === "text" && child.data.trim()) {
				children.push({
					type: "text",
					content: child.data.trim()
				});
			}
		});

		if (children.length > 0) {
			element.children = children;
		}

		return element;
	}

	let children;
	if (useRoot) {
		children = serialize.root().children().toArray();
	} else {
		children = serialize("body").children().toArray();
	}
	const json = children.map((node) => processNode(node));

	return json;
}

function jsonToHtml(json) {
	function processElement(element) {
		if (element.type === "text") {
			return element.content;
		}

		let tag = element.tag;
		let attributes = "";

		if (element.attributes) {
			attributes = Object.keys(element.attributes)
				.map((key) => `${key}="${element.attributes[key]}"`)
				.join(" ");
			if (attributes) {
				attributes = " " + attributes;
			}
		}

		let children = "";
		if (element.children) {
			children = element.children
				.map((child) => processElement(child))
				.join("");
		}

		return `<${tag}${attributes}>${children}</${tag}>`;
	}

	return json.map((element) => processElement(element)).join("");
}

export default { htmlToJson, jsonToHtml };
