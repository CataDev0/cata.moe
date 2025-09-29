<script lang="ts">
	import {
		SiDebian,
		SiEndeavouros,
		SiLinux,
		SiOpensuse,
		SiUbuntu
	} from '@icons-pack/svelte-simple-icons';

	export let title: string;
	export let description: string; // (1–2 lines)
	export let techStacks: string[];

	const systemIcons = Object.freeze({
		ubuntu: SiUbuntu,
		opensuse: SiOpensuse,
		debian: SiDebian,
		endeavouros: SiEndeavouros
	});

	const Icon =
		Object.entries(systemIcons).find(([distro]) => title.toLowerCase().includes(distro))?.[1] ||
		SiLinux;
</script>

<div class="rounded-lg bg-gray-800 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
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
</div>
