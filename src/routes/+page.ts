export async function load({ fetch }) {
	let counter: Promise<number | undefined>;

	try {
		const res = await fetch('https://stats.cata.moe/stats');

		if (res.ok) {
			counter = (res.json() as Promise<{ path: string; count: number }[]>).then(
				(json) => json?.find((entry) => entry.path === '/')?.count
			);

			return {
				counter
			};
		}
	} catch (e) {
		return {};
	}
}
