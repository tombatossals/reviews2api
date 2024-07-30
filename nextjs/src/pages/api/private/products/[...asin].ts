import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: "edge",
};

type ResponseData = {
    message: string,
    url?: string,
}

export default async function handler(
    req: NextRequest
): Promise<Response> {
    const authorization = req.headers.get("authorization");

    const asin = req.url.split("=")[req.url.split("=").length - 1];
    if (!authorization || !authorization.startsWith('Bearer ') || authorization.split(' ')[1] !== "hocuspocus") {
        return NextResponse.json({ message: 'Necesitas una autorización para ver esto' }, {
            status: 401, headers: {
                "content-type": "application/json",
            },
        });
    }

    return NextResponse.json({
        message: 'You did it!',
        url: `https://amazon.es/gp/product/${asin}`,
    }, {
        status: 200, headers: {
            "content-type": "application/json",
        },
    });
}
