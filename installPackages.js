const Path = require('path')
const FS = require('fs')
const Spawn = require('cross-spawn')
const { resolve, coroutine, runNode } = require('creed')

const accessibleFile = (path) => runNode(FS.access, path).map(() => path).catch(() => null)

const installPackages = coroutine(function * installPackage(projectPath, packageNames, { dev = false } = {}) {
    const appPackage = require(Path.join(projectPath, 'package.json'))
    const dependencies = (dev ? appPackage.devDependencies : appPackage.dependencies) || {}
    const needInstalling = packageNames.filter(packageName => !dependencies[packageName])
    if (needInstalling.length === 0) {
        return
    }

    const useYarn = !!(yield accessibleFile(Path.join(projectPath, 'yarn.lock')))
    const command = useYarn ? 'yarnpkg' : 'npm'
    let args = useYarn ? ['add'].concat(dev ? ['--dev'] : []) : ['install', dev ? '--save' : '--save-dev']
    args.push.apply(args, needInstalling)
    const proc = Spawn.sync(command, args, { stdio: 'inherit' })
    if (proc.status !== 0) {
      throw new Error(`\`${command} ${args.join(' ')}\` failed with status ${proc.status}`)
    }
})

module.exports = installPackages