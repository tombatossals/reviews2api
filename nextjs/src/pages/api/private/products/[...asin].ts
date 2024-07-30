import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";

export const config = {
    runtime: "edge",
};

type ResponseData = {
    message: string,
    url?: string,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { asin } = req.query

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ') || authorization.split(' ')[1] !== "hocuspocus") {
        return res.status(401).json({ message: 'Necesitas una autorización para ver esto' });
    }

    const token = authorization.split(' ')[1];


    const dir = path.join(__dirname, "../../../../../../public/api/products");
    if (fs.existsSync(`${dir}/${asin}.json`)) {
        return res.status(200).json({
            message: 'You did it!',
            url: `https://amazon.es/gp/product/${asin}`,
        });
    }

    res.status(404).json({ message: `Product ${asin} not found` });
}
