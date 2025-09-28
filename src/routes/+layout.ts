import { error } from '@sveltejs/kit';

interface Project {
    title: string;
    description: string;
    techStacks: string[];
    screens: [];
    repoLink: string;
}

type System = Exclude<Project, "screens" | "repoLink">;
type Car = Exclude<Project, "screens" | "repoLink" | "techStacks"> & { specifications: string[] };

export const prerender = true;

export async function load({ fetch, url }) {

    // Ignore return value
    fetch('https://stats.cata.moe/reportstat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Referer": "https://cata.moe"},

        body: JSON.stringify({ path: url.pathname })
    });
    
    const res = await fetch("projects.json");
    
    if (!res.ok) throw error(404);

    const { projects, systems, cars }: { projects: Project[], systems: System[], cars: Car[] } = await res.json();

    return {
        projects, systems, cars
    };
}