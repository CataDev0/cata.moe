<script lang="ts">
	import CarCard from '$lib/components/CarCard.svelte';

	let { data } = $props();
	const { cars } = data;
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-12 text-white">
	<div class="mx-auto mb-16 max-w-4xl text-center">
		<h2 class="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">Car overview</h2>
	</div>

	<div class="mx-auto mb-5 max-w-5xl">
		<h2 class="mb-8 border-b border-gray-600 pb-2 text-3xl font-bold">List</h2>
		<div class="grid gap-8 md:grid-cols-2">
			{#each cars as car}
				<CarCard {...car} />
			{/each}
		</div>
	</div>
</div>
