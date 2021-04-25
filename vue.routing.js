'use strict'
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vue_route_generator_1 = require('vue-route-generator')
const pluginName = 'VueAutoRoutingPlugin'

class VueAutoRoutingPlugin {
  constructor (options) {
    this.options = options
    assert(options.pages, '`pages` is required')
  }
  apply (compiler) {
    const generate = () => {
      const code = vue_route_generator_1.generateRoutes(this.options)
      const to = path.resolve(this.options.output)
      if (fs.existsSync(to) && fs.readFileSync(to, 'utf8').trim() === code.trim()) {
        return
      }
      fs.writeFileSync(to, code)
    }
    compiler.hooks.run.tap(pluginName, generate)
    compiler.hooks.watchRun.tap(pluginName, generate)
  }
}

module.exports = VueAutoRoutingPlugin
