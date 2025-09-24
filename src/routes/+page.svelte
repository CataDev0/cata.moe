<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { blur } from 'svelte/transition';
	import SystemsCard from '$lib/components/SystemsCard.svelte';

	let { data }: PageProps = $props();
	const { projects, systems } = data;

	let textState = $state(0);

	const texts = [
		"A Passionate Developer",
		"A Car Enthusiast",
		"A Linux System Admin"
	];

	let timeout: NodeJS.Timeout;
	function updateText() {
		timeout = setTimeout(() => {
			textState = textState === texts.length ? 0 : textState + 1;
			updateText();
		}, 3000);
	}

	onMount(() => updateText());
	onDestroy(() => clearTimeout(timeout));
</script>

<div class="min-h-screen px-6 py-12 text-white">
	<div class="mx-auto mb-16 max-w-4xl text-center">
		<h1 class="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">Cata</h1>
		<p class="h-[1.5em] overflow-hidden text-xl font-light text-gray-300 sm:text-2xl">
			{#key textState}
				<span in:blur={{ duration: 300  }} out:blur={{ duration: 300 }}>
					{texts[textState]}
				</span>
			{/key}
		</p>
	</div>

	<div class="mx-auto max-w-5xl mb-5">
		<h2 class="mb-8 border-b border-gray-600 pb-2 text-3xl font-bold">Projects</h2>
		<div class="grid gap-8 md:grid-cols-2">
			{#each projects as project}
				<ProjectCard {...project} />
			{/each}
		</div>
	</div>

	<div class="mx-auto max-w-5xl mb-5">
		<h2 class="mb-8 border-b border-gray-600 pb-2 text-3xl font-bold">My systems</h2>
		<div class="grid gap-8 md:grid-cols-1">
			{#each systems as system}
				<SystemsCard {...system} />
			{/each}
		</div>
	</div>
</div>
