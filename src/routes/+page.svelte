<script lang="ts">
	import { viewport } from '$lib/actions.js';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SystemsCard from '$lib/components/SystemsCard.svelte';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { projects, systems, counter } = data;
	const overrideIcon = null;

	let textState = $state(0);

	const texts = [
		'A Passionate Developer',
		'A Car Enthusiast',
		'A Linux System Admin',
		'A Full-Stack System Developer',
		'A Package Maintainer'
	];

	function updateText(i = 0) {
		textState = i % texts.length;
		setTimeout(() => {
			updateText(i + 1);
		}, 3000);
	}

	onMount(() => updateText());
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 py-12 text-white">
	<div class="mx-auto mb-16 max-w-4xl text-center">
		<h1
			class="mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl"
		>
			Cata
		</h1>
		<p class="relative h-[1.5em] overflow-hidden text-xl font-light text-gray-300 sm:text-2xl">
			{#each texts as text, i}
				{#if textState === i}
					<span
						class="absolute top-0 left-0 w-full text-center"
						transition:blur|localtransition:fade
					>
						{text}
					</span>
				{/if}
			{/each}
		</p>
		{#await counter ?? Promise.resolve(0) then count}
			<p transition:blur class="text-xl text-sky-400">
				<span class="font-mono">{count}</span> page visits
			</p>
		{/await}
	</div>

	<div class="mx-auto mb-16 max-w-5xl">
		<div class="mb-8 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 p-4 shadow-md">
			<h2 class="mb-2 pl-2 text-3xl font-bold">Projects</h2>
			<p class="pl-2 text-xl text-gray-300">An Overview of Key Projects I Have Worked On</p>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			{#each projects as project, i}
				<div use:viewport class="revealable" style="transition-delay: {i * 150}ms">
					<ProjectCard {...project} />
				</div>
			{/each}
		</div>
	</div>

	<div class="mx-auto mb-5 max-w-5xl">
		<div class="mb-8 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 p-4 shadow-md">
			<h2 class="mb-2 pl-2 text-3xl font-bold">My systems</h2>
			<p class="pl-2 text-xl text-gray-300">Current Hardware Lineup</p>
		</div>
		<div class="grid gap-8 md:grid-cols-1">
			{#each systems as system, i}
				<div use:viewport class="revealable" style="transition-delay: {i * 150}ms">
					<SystemsCard {...system} {overrideIcon} />
				</div>
			{/each}
		</div>
	</div>
</div>
