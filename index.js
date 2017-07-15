#!/usr/bin/env node

const run = require('create-create/run')

require('yargs')
	.option('baseDir', {
		default: process.cwd()
	})
	.command({
		command: 'app <name>',
		desc: 'Creates a new Next.js app',
		builder: {
		},
		handler(args) {
			const make = require('./commands/app')
			run(make(args), {
				makeMessage: () => `Created Next.js app ${args.name} in ${args.baseDir}`
			})
		}
	})
	.command({
		command: 'express',
		desc: 'Creates a Express.js server with Next.js integration',
		handler(args) {
			const make = require('./commands/express')
			run(make(args), {
				makeMessage: () => `Created Express.server in ${args.baseDir}`
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
			const make = require('./commands/emotion')
			run(make(args), {
				makeMessage: () => `Created Emotion CSS support in ${args.baseDir}`
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
			run(make(args), {
				makeMessage: () => `Added .env support in ${args.baseDir}`
			})
		}
	})
	.demandCommand(1)
	.help('help')
	.argv
