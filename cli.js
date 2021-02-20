#! /usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const tmplDir = path.join(__dirname, 'templates')
const destDir = process.cwd()
console.log(process.cwd())

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name'
    }
]).then(answer => {
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            // console.log(file)
            ejs.renderFile(path.join(tmplDir, file), answer, (err, result) => {
                if (err) throw err
                // console.log(result)
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })

})

