export async function load({ fetch }) {

    let counter;

    try {
        const res = await fetch("https://stats.cata.moe/stats");

        if (res.ok) {
            const json: { path: string, count: number }[] = await res.json();
            counter = json.find((entry) => entry.path === "/")?.count;
        }
    }
    catch {
        counter = 0;
    }

    return {
        counter,
    };
}