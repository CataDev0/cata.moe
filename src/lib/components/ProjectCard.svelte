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
	export let description: string;
	export let techStacks: string[];
	// export let screens: string[];
	export let repoLink: string;

	const iconMap = Object.freeze({
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
	});

	const colors = Object.freeze({
		'svelte/kit': '#ff3e00',
		typescript: '#3178C6',
		'c#': '#512bd4'
	});

	$: techStackIcons = techStacks.sort().map((word) => {
		const key = word.toLowerCase();
		const Icon = iconMap[key as keyof typeof iconMap] ?? SiGithub;
		return { Icon, label: word };
	});

	function getTechColor(techs: string[]) {
		for (const tech of techs) {
			const key = tech.toLowerCase();
			if (key in colors) return colors[key as keyof typeof colors];
		}
		return undefined;
	}

	$: color = getTechColor(techStacks);
</script>

<div
	class="rounded-lg border-2 border-transparent bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
	style:border-color={color}
>
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
	<a href={repoLink} target="_blank" class="text-blue-400 hover:underline">View Project →</a>
</div>
