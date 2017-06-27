"use strict"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const copydir = require("copy-dir")
const Base = require("./base")

module.exports = class Library extends Base {

  run(language) {
    const { output, name, packageName } = this.pros
    const targetPath = path.join(output, name)
    const configTemplatePath = path.join(__dirname, "..", "..", "templates", "android", "templates", "library")
    copydir.sync(
      path.join(__dirname, "..", "..", "templates", "android", "library"),
      targetPath
    )
    this.copyFile(
      path.join(configTemplatePath, `build.${language}.gradle`),
      path.join(targetPath, "build.gradle")
    )
    this.copyFile(
      path.join(configTemplatePath, `library.build.${language}.gradle`),
      path.join(targetPath, "library", "build.gradle")
    )
    this.copyFile(
      path.join(configTemplatePath, `sample.build.${language}.gradle`),
      path.join(targetPath, "sample", "build.gradle")
    )

    let librarySrcPath = path.join(targetPath, "library", "src", "main", "java")
    let sampleSrcPath = path.join(targetPath, "sample", "src", "main", "java")
    packageName.split(".").forEach((part) => {
      librarySrcPath = path.join(librarySrcPath, part)
      sampleSrcPath = path.join(sampleSrcPath, part)
    })
    sampleSrcPath = path.join(sampleSrcPath, "sample")
    mkdirp.sync(librarySrcPath)
    mkdirp.sync(sampleSrcPath)

    const mainActivityName = language === "java" ? "MainActivity.java" : "MainActivity.kt"
    const mainActivityPath = path.join(sampleSrcPath, mainActivityName)
    this.copyFile(
      path.join(configTemplatePath, mainActivityName),
      mainActivityPath
    )

    const packageNameReplacePaths = [
      path.join(targetPath, "library", "src", "main", "AndroidManifest.xml"),
      path.join(targetPath, "sample", "src", "main", "AndroidManifest.xml"),
      mainActivityPath,
      path.join(targetPath, "sample", "build.gradle")
    ]
    packageNameReplacePaths.forEach((manifestPath) => {
      fs.writeFileSync(
        manifestPath,
        fs.readFileSync(manifestPath, "utf8").replace(/{PackageName}/g, packageName),
        "utf8"
      )
    })
    const sampleValuesResPath = path.join(targetPath, "sample", "src", "main", "res", "values", "strings.xml")
    fs.writeFileSync(
      sampleValuesResPath,
      fs.readFileSync(sampleValuesResPath, "utf8").replace(/{AppName}/g, name),
      "utf8"
    )
    if (language === 'kotlin') {
      fs.unlinkSync(path.join(targetPath, "sample", "src", "main", "res", "layout", "activity_main.xml"))
    }
  }
}