import type { NextApiRequest, NextApiResponse } from 'next'
import path from "path"
import fs from "fs"

type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const datadir = path.join(process.cwd(), '../json')
    const files = fs.readdirSync(datadir);
    const json = files.map(file => ({
        asin: file.replace('.json', ''),
    }));
    res.status(200).json({ products: json })
}
