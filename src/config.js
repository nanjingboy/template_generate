"use strict"

const fs = require("fs")
const path = require("path")

module.exports = class Config {

  static version() {
    let packageConfig = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
    )
    return packageConfig.version
  }
}