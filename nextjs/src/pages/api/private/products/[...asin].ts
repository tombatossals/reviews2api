import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

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
    if (!req) return NextResponse.json({ message: 'No hay petición' }, { status: 400 });

    const authorization = req?.headers?.get("authorization")
    if (!authorization || !authorization.startsWith('Bearer ') || authorization.split(' ')[1] !== "hocuspocus") {
        return NextResponse.json({ message: 'Necesitas una autorización para ver esto' }, { status: 401 });
    }

    return NextResponse.json({
        message: 'You did it!',
        url: `https://amazon.es/gp/product/${asin}`,
    }, { status: 200 });
}
