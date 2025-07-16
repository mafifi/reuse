<script lang="ts">
	import capabilities from '$lib/data';
	import offerings from '$lib/data/offerings.json';
	import * as Card from '$lib/components/ui/card';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	let { offeringId } = $props();

	let offering = $derived(offerings.offerings.find((offering) => offering.id === offeringId));

	// Calculate summary statistics
	let totalCapabilities = $derived(() => {
		let count = 0;
		for (const layer of capabilities) {
			for (const category of layer.categories) {
				if (category.subcategories) {
					for (const subcategory of category.subcategories) {
						count += subcategory.capabilities.length;
					}
				} else {
					count += category.capabilities.length;
				}
			}
		}
		return count;
	});

	let assessedCapabilities = $derived(() => {
		return offering?.capabilities.length || 0;
	});

	let completionPercentage = $derived(() => {
		return Math.round((assessedCapabilities() / totalCapabilities()) * 100);
	});

	let levelDistribution = $derived(() => {
		const distribution = { level1: 0, level2: 0, level3: 0 };
		offering?.capabilities.forEach((cap) => {
			if (cap.level === 1) distribution.level1++;
			else if (cap.level === 2) distribution.level2++;
			else if (cap.level === 3) distribution.level3++;
		});
		return distribution;
	});

	function getFillColor(layer: string, level: number | undefined) {
		let layerColor: string[] = [];
		switch (layer) {
			case 'business':
				layerColor = [
					'bg-transparent',
					'bg-midnight-blue-950/30',
					'bg-midnight-blue-950/60',
					'bg-midnight-blue-950'
				];
				break;
			case 'application':
				layerColor = [
					'bg-transparent',
					'bg-watercourse-950/30',
					'bg-watercourse-950/60',
					'bg-watercourse-950'
				];
				break;
			case 'data':
				layerColor = [
					'bg-transparent',
					'bg-purple-heart-950/30',
					'bg-purple-heart-950/60',
					'bg-purple-heart-950'
				];
				break;
			case 'infrastructure':
				layerColor = ['bg-transparent', 'bg-mariner-950/30', 'bg-mariner-950/60', 'bg-mariner-950'];
				break;
			case 'security':
				layerColor = ['bg-transparent', 'bg-golf-950/30', 'bg-golf-950/60', 'bg-golf-950'];
				break;
		}
		switch (level) {
			case undefined:
				return 'bg-transparent';
			case 1:
				return `${layerColor[1]}`;
			case 2:
				return `${layerColor[2]}`;
			case 3:
				return `${layerColor[3]}`;
		}
	}
</script>

{#if !offering}
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
	>
		<Card.Root class="mx-auto max-w-md p-8 text-center">
			<Card.Content>
				<h2 class="text-primary mb-4 text-2xl font-bold">Offering Not Found</h2>
				<p class="text-muted-foreground mb-6">The requested offering could not be found.</p>
				<Button href="/">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Offering List
				</Button>
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-primary text-2xl font-bold">{offering.name}</Card.Title>
			<Card.Description>{offering.description}</Card.Description>

			<!-- Simple Legend -->
			<div class="mt-4 p-3">
				<div class="flex justify-end">
					<div class="text-muted-foreground text-xs">
						{assessedCapabilities()}/{totalCapabilities()} ({completionPercentage()}%)
					</div>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<!-- Bento grid layout for architecture layers -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each capabilities as layer}
					<Card.Root class={`${layer.color} p-3`}>
						<div class="mb-3">
							<h3 class="text-primary text-sm font-medium">{layer.name}</h3>
						</div>
						<!-- Grid layout for capability circles -->
						<div class="grid grid-cols-6 gap-1">
							{#each layer.categories as category}
								{#if category.subcategories}
									{#each category.subcategories as subcategory}
										{#each subcategory.capabilities as capability}
											{@const fillColor = getFillColor(
												layer.id,
												offering.capabilities.find((c) => c.id === capability.id)?.level
											)}
											{@const assessmentLevel = offering.capabilities.find(
												(c) => c.id === capability.id
											)?.level}
											<HoverCard.Root>
												<HoverCard.Trigger>
													<div
														class={cn(
															'border-border h-4 w-4 cursor-pointer rounded-full border',
															fillColor
														)}
														title={capability.name}
													></div>
												</HoverCard.Trigger>
												<HoverCard.Content class="w-60">
													<div class="space-y-1">
														<h4 class="text-sm font-semibold">{capability.name}</h4>
														<p class="text-muted-foreground text-xs">{capability.definition}</p>
														<div class="flex items-center gap-2 border-t pt-1">
															<div class={cn('h-3 w-3 rounded-full border', fillColor)}></div>
															<span class="text-xs font-medium">
																{assessmentLevel ? `Level ${assessmentLevel}` : 'Not Capable'}
															</span>
														</div>
													</div>
												</HoverCard.Content>
											</HoverCard.Root>
										{/each}
									{/each}
								{:else}
									{#each category.capabilities as capability}
										{@const fillColor = getFillColor(
											layer.id,
											offering.capabilities.find((c) => c.id === capability.id)?.level
										)}
										{@const assessmentLevel = offering.capabilities.find(
											(c) => c.id === capability.id
										)?.level}
										<HoverCard.Root>
											<HoverCard.Trigger>
												<div
													class={cn(
														'border-border h-4 w-4 cursor-pointer rounded-full border',
														fillColor
													)}
													title={capability.name}
												></div>
											</HoverCard.Trigger>
											<HoverCard.Content class="w-60">
												<div class="space-y-1">
													<h4 class="text-sm font-semibold">{capability.name}</h4>
													<p class="text-muted-foreground text-xs">{capability.definition}</p>
													<div class="flex items-center gap-2 border-t pt-1">
														<div class={cn('h-3 w-3 rounded-full border', fillColor)}></div>
														<span class="text-xs font-medium">
															{assessmentLevel ? `Level ${assessmentLevel}` : 'Not Capable'}
														</span>
													</div>
												</div>
											</HoverCard.Content>
										</HoverCard.Root>
									{/each}
								{/if}
							{/each}
						</div>
					</Card.Root>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
{/if}
