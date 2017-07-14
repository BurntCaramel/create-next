#!/usr/bin/env node

const Path = require('path')
const FS = require('fs-extra')
const installPackages = require('./installPackages')

function writeFilesMap({ baseDir, filesMap }) {
	let promises = []
	filesMap.forEach((contents, fileNameOrArray) => {
		const fileName = Path.join.apply(Path, [].concat(fileNameOrArray))
		promises.push(
			typeof contents === 'string' ? (
				FS.outputFile(Path.join(baseDir, fileName), contents)
			) : (
				FS.outputJSON(Path.join(baseDir, fileName), contents)
			)
		)
	})
	return Promise.all(promises)
}

const baseDir = process.cwd()

require('yargs')
	.option('baseDir', {
		default: baseDir
	})
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
	.command({
		command: 'app <name>',
		desc: 'Creates a new Next.js app',
		builder: {
		},
		handler(args) {
			const make = require('./commands/app')
			const checkYarnTool = require('./checkYarnTool')
			const useYarn = checkYarnTool()
			const { dependencies, devDependencies, filesMap, baseDir } = make(args)
			writeFilesMap({ filesMap, baseDir })
				.then(() => installPackages(baseDir, devDependencies, { dev: true, useYarn }))
				.then(() => installPackages(baseDir, dependencies, { useYarn }))
				.then(() => {
					console.log(`Created Next.js app ${args.name} in`, baseDir)
				})
				.catch(error => {
					console.error(error)
				})
		}
	})
	.demandCommand(1)
	.help('help')
	.argv
