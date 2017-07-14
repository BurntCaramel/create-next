function make({
	inline = true
} = {}) {
	const dependencies = []
	const devDependencies = ['dotenv']

	const filesMap = new Map()
	filesMap.set('next.config.js', (
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
`
	))

	return {
		dependencies,
		devDependencies,
		filesMap
	}
}

module.exports = make
