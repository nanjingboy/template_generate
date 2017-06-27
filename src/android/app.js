"use strict"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const copydir = require("copy-dir")
const Base = require("./base")

module.exports = class App extends Base {

  run(language) {
    const { output, name, packageName } = this.pros
    const targetPath = path.join(output, name)
    const configTemplatePath = path.join(__dirname, "..", "..", "templates", "android", "templates", "app")
    copydir.sync(
      path.join(__dirname, "..", "..", "templates", "android", "app"),
      targetPath
    )
    this.copyFile(
      path.join(configTemplatePath, `build.${language}.gradle`),
      path.join(targetPath, "build.gradle")
    )
    this.copyFile(
      path.join(configTemplatePath, `app.build.${language}.gradle`),
      path.join(targetPath, "app", "build.gradle")
    )

    let appSrcPath = path.join(targetPath, "app", "src", "main", "java")
    packageName.split(".").forEach((part) => {
      appSrcPath = path.join(appSrcPath, part)
    })
    mkdirp.sync(appSrcPath)

    const mainActivityName = language === "java" ? "MainActivity.java" : "MainActivity.kt"
    const mainActivityPath = path.join(appSrcPath, mainActivityName)
    this.copyFile(
      path.join(configTemplatePath, mainActivityName),
      mainActivityPath
    )

    const packageNameReplacePaths = [
      path.join(targetPath, "app", "src", "main", "AndroidManifest.xml"),
      mainActivityPath,
      path.join(targetPath, "app", "build.gradle")
    ]
    packageNameReplacePaths.forEach((manifestPath) => {
      fs.writeFileSync(
        manifestPath,
        fs.readFileSync(manifestPath, "utf8").replace(/{PackageName}/g, packageName),
        "utf8"
      )
    })
    const appValuesResPath = path.join(targetPath, "app", "src", "main", "res", "values", "strings.xml")
    fs.writeFileSync(
      appValuesResPath,
      fs.readFileSync(appValuesResPath, "utf8").replace(/{AppName}/g, name),
      "utf8"
    )
    if (language === 'kotlin') {
      fs.unlinkSync(path.join(targetPath, "app", "src", "main", "res", "layout", "activity_main.xml"))
    }
  }

  copyFile(sourcePath, targetPath) {
    fs.writeFileSync(targetPath, fs.readFileSync(sourcePath, "utf8"), "utf8")
  }
}