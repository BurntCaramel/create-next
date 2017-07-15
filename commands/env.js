function make({
	baseDir,
	inline = true
} = {}) {
	const devDependencies = ['dotenv']

	const filesMap = new Map()
	filesMap.set('next.config.js', {
		text: (
`require('dotenv').config()
const webpack = require('webpack')
module.exports = {
	webpack: (config) => {
		config.plugins.push(
			new webpack.EnvironmentPlugin(process.env)
		)
		return config
	}
}
`)
	})

	return {
		baseDir,
		devDependencies,
		filesMap
	}
}

module.exports = make
