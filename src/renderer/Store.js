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
            if (error && error.code !== 'EEXIST') {
                console.error(error)
            }
        })

        this.targetPath = targetPath
    }

    load (callback) {
        let me = this
        let targetPath = this.targetPath

        // I'm aware this isn't the greatest but readFile wasn't calling the
        // callback for some reason
        try {
            let data = fs.readFileSync(targetPath)

            let locations = JSON.parse(data)
            console.log('Loaded locations from ' + targetPath)

            return locations
        } catch (err) {
            // Couldn't read the file, use the seed data instead and write
            // that to a new file
            console.log('Could not load locations, creating seed file')

            let locations = require('./SeedLocations.json')
            me.save(locations)

            return locations
        }
    }

    save (locations) {
        // Make sure something hasn't gone horribly wrong
        // Who needs to save an empty locations file anyways?
        if (Object.keys(locations).length === 0) {
            return
        }

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
