export async function GET(request) {
    const data = await fetch("https://www.carqueryapi.com/api/0.3/?cmd=getMakes");
    const result = await data.json();
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    });
}