const toJSON = (a) => JSON.stringify(a)

function make({
	baseDir,
	inline = true
} = {}) {
	const devDependencies = ['emotion']

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
		filesMap,
		devDependencies
	}
}

module.exports = make