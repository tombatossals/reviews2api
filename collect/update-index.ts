import fs from "fs"
import path from "path"

const d = path.join(__dirname, '../json');

fs.readdir(d, (err, files) => {
    const f = files.filter(file => path.extname(file).toLowerCase() === '.json');
    console.log(f)
})