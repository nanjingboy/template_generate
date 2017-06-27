"use strict"

module.exports = class Base {

  constructor(name, packageName, output) {
    this.pros = {
      name: name,
      packageName: packageName,
      output: output
    }
  }

  kotlin() {
    this.run('kotlin')
  }

  java() {
    this.run('java')
  }
}