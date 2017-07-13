"use strict"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const copydir = require("copy-dir")
const Base = require("./base")

module.exports = class Library extends Base {

  run(language) {
    const { output, name } = this.pros
    const targetPath = path.join(output, name)
    const templatePath = path.join(__dirname, "..", "..", "templates", "ios", "library", language)
    copydir.sync(templatePath, targetPath)
    fs.renameSync(
      path.join(targetPath, "template.podspec"),
      path.join(targetPath, `${name}.podspec`)
    )

    const appNameReplacePaths = [
      path.join(targetPath, `${name}.podspec`),
      path.join(targetPath, "Example", "Podfile")
    ]
    appNameReplacePaths.forEach((filePath) => {
      fs.writeFileSync(
        filePath,
        fs.readFileSync(filePath, "utf8").replace(/{AppName}/g, name),
        "utf8"
      )
    })
  }
}