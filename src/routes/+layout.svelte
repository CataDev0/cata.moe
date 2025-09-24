<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const footerLinks = Object.freeze({
		"GitHub Profile": "https://github.com/CataDev0/",
		"KaikiBot Website": "https://kaikibot.xyz/",
		"NPM Profile": "https://www.npmjs.com/~cataclym",
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<footer>
	<div class="bg-gray-800 p-6 shadow-lg">
		<div class="mx-auto flex justify-center gap-8 text-center text-gray-300">
			{#each Object.entries(footerLinks) as entry}
				<a href={entry[1]}><h4>{entry[0]}</h4></a>
			{/each}
		</div>
	</div>
</footer>
