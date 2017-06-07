"use strict"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const copydir = require("copy-dir")

class Android {

  static library(name, packageName, output) {
    const targetPath = path.join(output, name)
    const templatePath = path.join(__dirname, "..", "templates", "android")

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

    const mainActivityPath = path.join(targetPath, "sample", "src", "main", "java", "MainActivity.java")
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
    fs.unlinkSync(mainActivityPath)

    const sampleValuesResPath = path.join(targetPath, "sample", "src", "main", "res", "values", "strings.xml")
    fs.writeFileSync(
      sampleValuesResPath,
      fs.readFileSync(sampleValuesResPath, "utf8").replace(/{AppName}/g, name),
      "utf8"
    )
  }
}

module.exports = Android