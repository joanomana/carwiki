import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const brand = decodeURIComponent(searchParams.get("brand"))?.replace(/\s+/g, "-");

    try {
        const apiUrl = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${brand}`;

        const response = await fetch(apiUrl);
        const text = await response.text();

        let json;
        if (text.trim().startsWith("callback(")) {
            json = JSON.parse(text.replace(/^callback\(/, "").replace(/\);?$/, ""));
        } else {
            json = JSON.parse(text);
        }

        return NextResponse.json(json);
    } catch (error) {
        console.error("Error en el API route:", error);
        return NextResponse.json({ error: "Error fetching or parsing data from external API." }, { status: 500 });
    }
}
