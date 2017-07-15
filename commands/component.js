const Path = require('path')

function make({
  name,
  baseDir
} = {}) {
	const filesMap = new Map()

  filesMap.set(['components', `${name}.js`], {
    text: (
`import React from 'react'

export default ({

}) => (
	<div>
		<p>Change me</p>
	</div>
)
`)
  })

	return {
    baseDir,
		filesMap
	}
}

module.exports = make
