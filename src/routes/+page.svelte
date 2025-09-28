<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { blur, fade } from 'svelte/transition';
	import SystemsCard from '$lib/components/SystemsCard.svelte';

	let { data }: PageProps = $props();
	const { projects, systems, counter } = data;

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

<div class="min-h-screen px-6 py-12 text-white">
	<div class="mx-auto mb-16 max-w-4xl text-center">
		<h1 class="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">Cata</h1>
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

	<div class="mx-auto mb-5 max-w-5xl">
		<h2 class="mb-8 border-b border-gray-600 pb-2 text-3xl font-bold">Projects</h2>
		<div class="grid gap-8 md:grid-cols-2">
			{#each projects as project}
				<ProjectCard {...project} />
			{/each}
		</div>
	</div>

	<div class="mx-auto mb-5 max-w-5xl">
		<h2 class="mb-8 border-b border-gray-600 pb-2 text-3xl font-bold">My systems</h2>
		<div class="grid gap-8 md:grid-cols-1">
			{#each systems as system}
				<SystemsCard {...system} />
			{/each}
		</div>
	</div>
</div>
