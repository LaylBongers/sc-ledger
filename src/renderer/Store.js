const path = require('path')
const fs = require('fs')
const app = require('electron').remote.app

class Store {
    constructor () {
        let appDataDir = path.join(app.getPath('appData'), 'sc-ledger')
        let targetPath = path.join(appDataDir, 'locations.json')

        // Create the folder just in case
        fs.mkdir(appDataDir, function (error) {
            // Already exists is an error we expect to happen
            if (error.code !== 'EEXIST') {
                console.error(error)
            }
        })

        this.targetPath = targetPath
    }

    save (locations) {
        let jsonData = JSON.stringify(locations)
        let targetPath = this.targetPath

        fs.writeFile(targetPath, jsonData, function (err) {
            if (err) {
                return console.log(err)
            }
            console.log('Saved locations to ' + targetPath)
        })
    }
}

export default Store
