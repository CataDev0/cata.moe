<script lang="ts">
	import {
	SiAxios,
		SiBun,
		SiDiscorddotjs,
		SiDotnet,
		SiExpress,
		SiGithub,
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
		prisma: SiPrisma,
		mysql: SiMysql,
		mysql2: SiMysql,
		mariadb: SiMariadb,
		'node.js': SiNodedotjs,
		typescript: SiTypescript,
		'bun.sh': SiBun,
		svelte: SiSvelte,
		'svelte/kit': SiSvelte,
		tailwindcss: SiTailwindcss,
		'discord.js': SiDiscorddotjs,
		'express.js': SiExpress,
		'c#': SiSharp,
		".net": SiDotnet,
        vite: SiVite,
		"axios": SiAxios,
		npm: SiNpm
	};

	$: techStackIcons = techStacks.map((word) => {
		const key = word.toLowerCase();
		const Icon = iconMap[key as keyof typeof iconMap] ?? SiGithub;
		return { Icon, label: word };
	});

</script>

<div class="rounded-lg bg-gray-800 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
	<h3 class="mb-2 text-2xl font-semibold">{title}</h3>
	<div class="mb-4 text-gray-300 project-card-description">{@html description}</div>
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
