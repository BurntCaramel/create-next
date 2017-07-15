const toJSON = (a) => JSON.stringify(a)

function make({
	baseDir,
	inline = true
} = {}) {
	const filesMap = new Map()
	filesMap.set('.babelrc', {
		text: (
`{
	"presets": [
		"next/babel"
	],
	"plugins": [
		["emotion/babel", { "inline": ${toJSON(inline)} }]
	]
}
`)
	})

	return {
		baseDir,
		filesMap
	}
}

module.exports = make