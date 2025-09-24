<script lang="ts">
	import SystemsCard from "./SystemsCard.svelte";

	export let title: string;
	export let description: string; // (1–2 lines)
	export let specifications: string[];
    const techStacks = specifications;
</script>

<SystemsCard { title } { description } { techStacks }/>