const Spawn = require('cross-spawn')

function checkYarnTool() {
  try {
    const { error } = Spawn.sync('yarnpkg', ['--version'])
    if (error) { throw error }
    return true
  }
  catch (error) {
    return false
  }
}

module.exports = checkYarnTool
