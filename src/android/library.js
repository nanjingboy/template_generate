"use strict"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const copydir = require("copy-dir")
const rmdir = require('rmdir')
const Base = require("./base")

module.exports = class Library extends Base {

  run(language) {
    const { output, name, packageName } = this.pros
    const targetPath = path.join(output, name)
    const templatePath = path.join(__dirname, "..", "..", "templates", "android", "library")
    copydir.sync(templatePath, targetPath)

    let librarySrcPath = path.join(targetPath, "library", "src", "main", "java")
    let sampleSrcPath = path.join(targetPath, "sample", "src", "main", "java")
    packageName.split(".").forEach((part) => {
      librarySrcPath = path.join(librarySrcPath, part)
      sampleSrcPath = path.join(sampleSrcPath, part)
    })
    sampleSrcPath = path.join(sampleSrcPath, "sample")
    mkdirp.sync(librarySrcPath)
    mkdirp.sync(sampleSrcPath)

    let mainActivityPath = path.join(targetPath, "sample", "src", "template")
    if (language === "kotlin") {
      mainActivityPath = path.join(mainActivityPath, "MainActivity.kt")
    } else {
      mainActivityPath = path.join(mainActivityPath, "MainActivity.java")
    }
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
    fs.createReadStream(mainActivityPath).pipe(
      fs.createWriteStream(path.join(sampleSrcPath, "MainActivity.java"))
    )
    rmdir(path.dirname(mainActivityPath), () => {})
    const sampleValuesResPath = path.join(targetPath, "sample", "src", "main", "res", "values", "strings.xml")
    fs.writeFileSync(
      sampleValuesResPath,
      fs.readFileSync(sampleValuesResPath, "utf8").replace(/{AppName}/g, name),
      "utf8"
    )
  }
}