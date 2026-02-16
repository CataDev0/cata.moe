<script lang="ts">
	import { slide } from 'svelte/transition';
	import {
		SiSubaru,
		SiHonda,
		SiNissan,
		SiMazda,
		SiZoom
	} from '@icons-pack/svelte-simple-icons';
	import type { SvelteComponent } from 'svelte';

	type CarCardProps = {
		title: string;
		description: string;
		engine?: { type?: string; code?: string; aspiration?: string };
		performance?: { horsepower?: string };
		drivetrain?: { system?: string };
		model?: { code?: string };
		media?: { images?: string[] };
		wishlist?: Array<{
			title: string;
			engine?: { type?: string; code?: string; aspiration?: string };
			performance?: { horsepower?: string };
			drivetrain?: { system?: string };
			media?: { images?: string[] };
		}>;
	};

	let {
		title,
		description,
		engine,
		performance,
		drivetrain,
		model,
		media,
		wishlist
	}: CarCardProps = $props();

	const isWishlist = !!wishlist;
	let showWishlist = $state(false);
	let selectedImage = $state<string | null>(null);

	const brandIcons: { [key: string]: [typeof SvelteComponent, string] } = {
		subaru: [SiSubaru, '#004f98'],
		honda: [SiHonda, '#f40000'],
		nissan: [SiNissan, '#c41e3a'],
		mazda: [SiMazda, '#0066cc']
	};

	const brandColors: { [key: string]: string } = {
		mercedes: '#00afca',
		volvo: '#001e50',
		lancia: '#004f98',
		datsun: '#c41e3a'
	};

	function getBrandIcon(carTitle: string): [typeof SvelteComponent, string] | null {
		const brand = Object.entries(brandIcons).find(([key]) =>
			carTitle.toLowerCase().includes(key)
		)?.[1] || null;
		return brand;
	}

	function getBrandColor(carTitle: string): string {
		const brand = Object.entries(brandColors).find(([key]) =>
			carTitle.toLowerCase().includes(key)
		)?.[1] || 'rgb(55, 65, 81)';
		return brand;
	}

	const brandIcon = getBrandIcon(title);
	const [Icon, iconColor] = brandIcon || [null, null];
	const cardBorderColor = Icon ? iconColor : getBrandColor(title);

	function getSpecBadges(car: any) {
		const badges: string[] = [];
		
		if (car.engine) {
			if (car.engine.type) badges.push(car.engine.type);
			if (car.engine.code) badges.push(car.engine.code);
			if (car.engine.aspiration) badges.push(car.engine.aspiration);
		}
		
		if (car.performance?.horsepower) badges.push(car.performance.horsepower);
		if (car.drivetrain?.system) badges.push(car.drivetrain.system);
		if (car.model?.code) badges.push(car.model.code);
		
		return badges;
	}

	const badges = getSpecBadges({ engine, performance, drivetrain, model });
</script>

<div
	class="rounded-lg border-2 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-gray-600"
	style:border-color={iconColor || 'rgb(55, 65, 81)'}
>
	<h3 class="mb-2 flex items-center gap-2 text-2xl font-semibold">
		{#if Icon}
			<Icon size={28} style="color: {iconColor}" />
		{/if}
		{title}
	</h3>
	<p class="mb-4 text-gray-300">{description}</p>
	
	{#if media?.images && media.images.length > 0}
		<div class="mb-4 grid gap-2 grid-cols-1 sm:grid-cols-2">
			{#each media.images as img}
				<div
					class="relative group cursor-pointer"
					onclick={() => (selectedImage = img)}
				>
					<img 
						src={img} 
						alt={title} 
						class="rounded-lg w-full h-48 object-cover transition-opacity group-hover:opacity-90"
					/>
					<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-black/30 pointer-events-none">
						<SiZoom size={36} class="text-white drop-shadow-lg" />
					</div>
				</div>
			{/each}
		</div>
	{/if}
	
	{#if !isWishlist}
		<div class="mb-4 flex flex-wrap items-center gap-2">
			{#each badges as badge}
				<div class="flex items-center gap-2 rounded bg-gray-700 px-3 py-1 text-sm text-white">
					<span>{badge}</span>
				</div>
			{/each}
		</div>
	{:else if wishlist}
		<button
			class="cursor-pointer text-sm text-blue-400 hover:text-blue-300 transition-colors"
			onclick={() => (showWishlist = !showWishlist)}
		>
			{showWishlist ? 'Hide' : 'Show'} wishlist ({wishlist.length})
		</button>
		
		{#if showWishlist}
			<div class="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" in:slide|local out:slide|local>
				{#each wishlist as wish}
					{@const wishBrandIcon = getBrandIcon(wish.title)}
					{@const [WishIcon, wishIconColor] = wishBrandIcon || [null, null]}
					{@const wishBorderColor = WishIcon ? wishIconColor : getBrandColor(wish.title)}
					<div class="rounded-md bg-gray-700/50 p-4 border border-gray-600" style:border-color={wishBorderColor}>
						<h4 class="mb-3 font-semibold text-lg flex items-center gap-2">
							{#if WishIcon}
								<WishIcon size={24} style="color: {wishIconColor}" />
							{/if}
							{wish.title}
						</h4>
						{#if wish.media?.images && wish.media.images.length > 0}
							<div class="mb-3 flex gap-3 overflow-x-auto">
								{#each wish.media.images as img}
									<div
										class="relative group cursor-pointer flex-shrink-0"
										onclick={() => (selectedImage = img)}
									>
										<img 
											src={img} 
											alt={wish.title} 
											class="rounded w-40 h-40 object-cover transition-opacity group-hover:opacity-90"
										/>
										<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded bg-black/30 pointer-events-none">
											<SiZoom size={36	} class="text-white drop-shadow-lg" />
										</div>
									</div>
								{/each}
							</div>
						{/if}
						<div class="space-y-2">
							{#if wish.engine}
								<div class="text-sm text-gray-400">
									<span class="font-semibold">Engine:</span>
									<div class="flex flex-wrap items-center gap-2 mt-1">
										{#if wish.engine.type}<span class="rounded bg-gray-600 px-2 py-1 text-xs text-white">{wish.engine.type}</span>{/if}
										{#if wish.engine.code}<span class="rounded bg-gray-600 px-2 py-1 text-xs text-white">{wish.engine.code}</span>{/if}
										{#if wish.engine.aspiration}<span class="rounded bg-gray-600 px-2 py-1 text-xs text-white">{wish.engine.aspiration}</span>{/if}
									</div>
								</div>
							{/if}
							{#if wish.performance?.horsepower}
								<div class="text-sm text-gray-400">
									<span class="font-semibold">Performance:</span>
									<div class="flex flex-wrap items-center gap-2 mt-1">
										<span class="rounded bg-gray-600 px-2 py-1 text-xs text-white">{wish.performance.horsepower}</span>
									</div>
								</div>
							{/if}
							{#if wish.drivetrain?.system}
								<div class="text-sm text-gray-400">
									<span class="font-semibold">Drivetrain:</span>
									<div class="flex flex-wrap items-center gap-2 mt-1">
										<span class="rounded bg-gray-600 px-2 py-1 text-xs text-white">{wish.drivetrain.system}</span>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>

{#if selectedImage}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
		onclick={() => (selectedImage = null)}
	>
		<div class="relative max-h-[80vh] max-w-[80vw]" onclick={(e) => e.stopPropagation()}>
			<img 
				src={selectedImage} 
				alt="Full size" 
				class="max-h-[80vh] max-w-[80vw] object-contain rounded-lg"
			/>
			<button
				class="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
				onclick={() => (selectedImage = null)}
			>
				✕
			</button>
		</div>
	</div>
{/if}
