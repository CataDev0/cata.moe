<script lang="ts">
	import {
		SiBun,
		SiCloudflare,
		SiGithub,
		SiSvelte,
		SiTailwindcss
	} from '@icons-pack/svelte-simple-icons';

	// IconSize
	const size = 54;
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 py-12 text-white">
	<div class="mx-auto mb-16 max-w-4xl rounded-xl bg-gray-800/50 p-8 text-center shadow-lg">
		<h1 class="mb-4 text-3xl font-extrabold tracking-tight sm:text-6xl">About</h1>
		<p class="mb-6 text-xl font-light text-gray-300 sm:text-2xl">
			cata.moe is a portfolio made possible with various technologies, such as
		</p>
		<div class="m-auto flex w-full items-center justify-center gap-4">
			<SiBun {size} />
			<SiCloudflare {size} />
			<SiGithub {size} />
			<SiSvelte {size} />
			<SiTailwindcss {size} />
		</div>
	</div>
</div>
