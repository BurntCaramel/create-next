const Path = require('path')

function make({
  name,
  baseDir
} = {}) {
  baseDir = Path.join(baseDir, name)
	const dependencies = ['react', 'react-dom', 'next@beta']
	const devDependencies = []

	const filesMap = new Map()
	filesMap.set('package.json', {
    "name": name,
    "version": "0.1.0",
    "description": "Fancy Next.js app",
    "scripts": {
      "dev": "next",
      "build": "next build",
      "start": "next start",
      "build:static": "next build && next out"
    }
  })

  filesMap.set(['pages', 'index.js'], (
`export default () => (
	<main>
		<h1>Welcome to Next.js</h1>
	</main>
)
`
  ))

	return {
    baseDir,
		dependencies,
		devDependencies,
		filesMap
	}
}

module.exports = make
