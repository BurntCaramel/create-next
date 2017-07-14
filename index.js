#!/usr/bin/env node

const Path = require('path')
const FS = require('fs-extra')
const installPackages = require('./installPackages')

function writeFilesMap({ baseDir, filesMap }) {
	let promises = []
	filesMap.forEach((contents, fileName) => {
		promises.push(
			FS.outputFile(Path.join(baseDir, fileName), contents)
		)
	})
	return Promise.all(promises)
}

const baseDir = process.cwd()

require('yargs')
	.command({
		command: 'express',
		desc: 'Creates a Express.js server with Next.js integration',
		handler(args) {
			const { makeFilesMap } = require('./commands/express')
			const filesMap = makeFilesMap()
			writeFilesMap({ filesMap, baseDir })
				.then(() => {
					console.log('Created Express.server in', baseDir)
				})
				.catch(error => {
					console.error(error)
				})
		}
	})
	.command({
		command: 'emotion',
		desc: 'Adds emotion CSS support using babel',
		builder: {
			inline: {
				default: true
			}
		},
		handler(args) {
			console.log('args', args)
			const { makeFilesMap } = require('./commands/emotion')
			const filesMap = makeFilesMap(args)
			writeFilesMap({ filesMap, baseDir })
				.then(() => {
					console.log('Added emotion CSS support in', baseDir)
				})
				.catch(error => {
					console.error(error)
				})
		}
	})
	.command({
		command: 'env',
		desc: 'Adds .env support using Webpack',
		builder: {
			override: {
				default: false
			}
		},
		handler(args) {
			const make = require('./commands/env')
			const { devDependencies, filesMap } = make(args)
			writeFilesMap({ filesMap, baseDir })
				.then(() => installPackages(baseDir, devDependencies, { dev: true }))
				.then(() => {
					console.log('Added .env support in', baseDir)
				})
				.catch(error => {
					console.error(error)
				})
		}
	})
	.demandCommand(1)
	.help('help')
	.argv
