declare module "@publicspace/serial" {
	/**
	 * Converts HTML to a JSON representation.
	 * @param {string} html - The HTML string to be converted.
	 * @param {boolean} useRoot - Whether to use the root HTML element.
	 * @returns {object[]} An array of objects representing the HTML structure.
	 */
	export function htmlToJson(html: string, useRoot: boolean): object[];

	/**
	 * Converts a JSON representation back to HTML.
	 * @param {object[]} json - An array of objects representing the HTML structure to be converted.
	 * @returns {string} The HTML string.
	 */
	export function jsonToHtml(json: object[]): string;
}
