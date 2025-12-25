<script lang="ts">
	import {
		SiDebian,
		SiEndeavouros,
		SiLinux,
		SiOpensuse,
		SiUbuntu
	} from '@icons-pack/svelte-simple-icons';
	import type { SvelteComponent } from 'svelte';
	import { slide } from 'svelte/transition';

	let {
		title,
		description,
		techStacks,
		reason,
		overrideIcon
	}: {
		title: string;
		description: string;
		techStacks: string[];
		reason: string | null;
		overrideIcon: typeof SvelteComponent<Record<string, any>, any, any> | null;
	} = $props();

	const systemTheme: { [index: string]: [typeof SiUbuntu, string] } = Object.freeze({
		ubuntu: [SiUbuntu, '#E95420'],
		opensuse: [SiOpensuse, '#73ba25'],
		debian: [SiDebian, '#a80030'],
		endeavouros: [SiEndeavouros, '#7F3FBF']
	});

	const theme = Object.entries(systemTheme).find(([distro]) =>
		title.toLowerCase().includes(distro)
	)?.[1] || [overrideIcon ?? SiLinux, '#003778'];

	const [Icon, color] = theme;
	const cid = Math.random().toString(16).slice(2);

	let showReason = $state(false); // Changed from hiddenClass
	function embedLink(input: string) {
		return input.replace(
			/\[([^\]]+)]\((https?:\/\/[^)]+)\)/gm,
			'<a class="text-blue-400" href="$2">$1</a>'
		);
	}
</script>

<div
	class="rounded-lg border-2 border-transparent bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
	style:border-color={color}
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
		<button
			class="cursor-pointer text-xs text-gray-400 opacity-75 hover:opacity-100"
			onclick={() => (showReason = !showReason)}>Why?</button
		>
		{#if showReason}
			<div id={cid} class="mt-1 rounded-md bg-gray-700 p-2 pt-1" in:slide|local out:slide|local>
				<p class="inline align-middle text-gray-300">{@html embedLink(reason)}</p>
			</div>
		{/if}
	{/if}
</div>
