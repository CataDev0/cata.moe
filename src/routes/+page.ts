import path from 'path';

export async function load({ fetch }) {

    let counter: Promise<{ path: string, count: number }[]>;

    try {
        const res = await fetch("https://stats.cata.moe/stats");

        if (res.ok) {
            counter = res.json().then(json => json.find((entry: { path: string, count: number }) => entry.path === "/")?.count)

            return {
                counter,
            };
        }
    }
    catch (e) {
        return {}
    }
}