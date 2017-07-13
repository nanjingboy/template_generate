"use strict"

module.exports = class Base {

  constructor(name, output) {
    this.pros = {
      name: name,
      output: output
    }
  }

  swift() {
    this.run('swift')
  }
}