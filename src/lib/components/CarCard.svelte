<script lang="ts">
	import { SiSubaru as overrideIcon } from '@icons-pack/svelte-simple-icons';
	import SystemsCard from './SystemsCard.svelte';

	export let title: string;
	export let description: string;
	export let specifications: string[];
	const techStacks = specifications;
	const reason = null;
</script>

<SystemsCard {title} {description} {techStacks} {reason} {overrideIcon} />
