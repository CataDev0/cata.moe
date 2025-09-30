<script lang="ts">
	import {
		SiAxios,
		SiBootstrap,
		SiBun,
		SiDiscorddotjs,
		SiDocker,
		SiDotnet,
		SiExpress,
		SiGithub,
		SiJquery,
		SiLeaflet,
		SiMariadb,
		SiMysql,
		SiNodedotjs,
		SiNpm,
		SiPrisma,
		SiSharp,
		SiSvelte,
		SiTailwindcss,
		SiTypescript,
		SiVite
	} from '@icons-pack/svelte-simple-icons';

	export let title: string;
	export let description: string; // (1–2 lines)
	export let techStacks: string[];
	export let screens: string[]; // or Demo GIF
	// export let Key features or challenges
	export let repoLink: string; // GitHub and/or Live Link

	const iconMap = {
		'.net': SiDotnet,
		'bun.sh': SiBun,
		'c#': SiSharp,
		'discord.js': SiDiscorddotjs,
		'express.js': SiExpress,
		'node.js': SiNodedotjs,
		'svelte/kit': SiSvelte,
		axios: SiAxios,
		bootstrap: SiBootstrap,
		docker: SiDocker,
		jquery: SiJquery,
		leaflet: SiLeaflet,
		mariadb: SiMariadb,
		mysql: SiMysql,
		mysql2: SiMysql,
		npm: SiNpm,
		prisma: SiPrisma,
		svelte: SiSvelte,
		tailwindcss: SiTailwindcss,
		typescript: SiTypescript,
		vite: SiVite
	};

	$: techStackIcons = techStacks.sort().map((word) => {
		const key = word.toLowerCase();
		const Icon = iconMap[key as keyof typeof iconMap] ?? SiGithub;
		return { Icon, label: word };
	});
</script>

<div class="rounded-lg bg-gray-800 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
	<h3 class="mb-2 text-2xl font-semibold">{title}</h3>
	<div class="project-card-description mb-4 text-gray-300">{@html description}</div>
	<div class="mb-4 flex flex-wrap items-center gap-4">
		{#each techStackIcons as { Icon, label }}
			<div class="flex items-center gap-2 rounded bg-gray-700 px-3 py-1 text-sm text-white">
				<Icon size={20} />
				<span>{label}</span>
			</div>
		{/each}
	</div>
	<a href={repoLink} target="_blank">View Project →</a>
</div>

<style>
	a {
		color: var(--color-blue-400) !important;
	}
	a:hover {
		text-decoration: underline solid 1px !important;
	}
</style>
