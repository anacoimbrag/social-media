import fs from 'fs'

/**
 * to simulate some interactions with database, I'm using json file to persist users data
 */
const FILE_NAME = "../static/users.json"

export const updateFile = (json) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(json))
}