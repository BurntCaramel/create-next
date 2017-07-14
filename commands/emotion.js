const toJSON = (a) => JSON.stringify(a)

function makeFilesMap({
	inline = true
} = {}) {
	const filesMap = new Map()
	filesMap.set('.babelrc', (
`{
	"presets": [
		"next/babel"
	],
	"plugins": [
		["emotion/babel", { "inline": ${toJSON(inline)} }]
	]
}
`
	))

	return filesMap
}

module.exports = {
	makeFilesMap
}