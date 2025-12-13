<script lang="ts">
	import {
		SiDebian,
		SiEndeavouros,
		SiLinux,
		SiOpensuse,
		SiUbuntu
	} from '@icons-pack/svelte-simple-icons';


	let { title, description, techStacks, reason }: {
		title: string;
		description: string; 
		techStacks: string[];
		reason: string; 
	} = $props();

	const systemTheme: { [index: string]: [typeof SiUbuntu, string] } = Object.freeze({
		ubuntu: [SiUbuntu, '#E95420'],
		opensuse: [SiOpensuse, '#73ba25'],
		debian: [SiDebian, '#a80030'],
		endeavouros: [SiEndeavouros, '#7F3FBF']
	});

	const theme = Object.entries(systemTheme).find(([distro]) =>
		title.toLowerCase().includes(distro)
	)?.[1] || [SiLinux, '#003778'];

	const [Icon, color] = theme;
	const cid = Math.random().toString(16).slice(2)

	let hiddenClass = $state("hidden");
</script>

<div
	class="rounded-lg bg-gray-800 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
	style="border-bottom: {color} solid 0.3rem;"
>
	<h3 class="mb-2 flex items-center gap-2 text-2xl font-semibold text-nowrap whitespace-nowrap">
		<Icon size={28} />{title}
	</h3>
	<p class="mb-4 text-gray-300">{description}</p>
	<div class="mb-4 flex flex-wrap items-center gap-4">
		{#each techStacks as techStack}
			<div class="flex items-center gap-2 rounded bg-gray-700 px-3 py-1 text-sm text-white">
				<span>{techStack}</span>
			</div>
		{/each}
	</div>
	{#if reason}
		<button class="text-gray-400 text-xs opacity-75 hover:opacity-100 cursor-pointer" onclick={() => hiddenClass = hiddenClass ? "" : "hidden"}>Why?</button>
		<div id={cid} class="{hiddenClass} bg-gray-700 rounded p-1 px-2">
			<p class="mb-4 text-gray-300">{reason}</p>
		</div>
	{/if}
</div>
