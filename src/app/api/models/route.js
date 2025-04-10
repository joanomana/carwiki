export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const from = parseInt(searchParams.get("from"), 10) || 2020;

    const bodyMap = {
        coupe: "Coupe",
        sedan: "Sedan",
        suv: "SUV",
        pickup: "Pickup",
        crossover: "Crossover",
        minivan: "Minivan",
    };

    const apiBody = bodyMap[type];
    if (!apiBody) {
        return new Response(JSON.stringify([]), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }

    const url = `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=${from}&body=${encodeURIComponent(apiBody)}`;

    try {
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.replace(/^.*?\(/, "").replace(/\);?$/, ""));
        const cars = json.Trims.filter(car => car.model_name && car.make_display);
        return Response.json(cars);
        } catch (error) {
            console.error("Error fetching data from CarQuery:", error);
            return new Response(JSON.stringify([]), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
        }
}
