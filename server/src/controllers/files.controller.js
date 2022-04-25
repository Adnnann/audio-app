import _ from 'lodash'
import fs from 'file-system'

const listFiles = (req, res, next) => {

    let files = fs.fs.readdirSync('./files')
    return res.send({files:files})

}


export default {
    listFiles
}
