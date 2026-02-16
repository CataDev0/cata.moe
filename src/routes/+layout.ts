import { error } from '@sveltejs/kit';

interface Project {
	title: string;
	description: string;
	techStacks: string[];
	screens: [];
	repoLink: string;
	reason: string;
}

type System = Exclude<Project, 'screens' | 'repoLink'>;

type Car = {
	title: string;
	description: string;
	engine?: { type?: string; code?: string; aspiration?: string };
	performance?: { horsepower?: string };
	drivetrain?: { system?: string };
	model?: { code?: string };
	media?: { images?: string[] };
	wishlist?: Array<{
		title: string;
		engine?: { type?: string; code?: string; aspiration?: string };
		performance?: { horsepower?: string };
		drivetrain?: { system?: string };
		media?: { images?: string[] };
	}>;
};

export const prerender = true;

export async function load({ fetch, url }) {
	try {
		fetch('https://stats.cata.moe/reportstat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Referer: 'https://cata.moe'
			},
			body: JSON.stringify({ path: url.pathname })
		}).catch(() => {
			// Ignore it
		});

		const [projectsRes, carsRes] = await Promise.all([
			fetch('projects.json'),
			fetch('cars.json')
		]);

		const [{
			projects,
			systems
		}, { cars }]: [projects: { projects: Project[], systems: System[] }, cars: { cars: Car[] }] = await Promise.all([
			projectsRes.json(),
			carsRes.json()
		]);

		return { projects, systems, cars };
	} catch {
		throw error(500, 'Unexpected load error');
	}
}
