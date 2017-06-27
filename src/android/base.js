"use strict"

const fs = require("fs")

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

  copyFile(sourcePath, targetPath) {
    fs.writeFileSync(targetPath, fs.readFileSync(sourcePath, "utf8"), "utf8")
  }
}