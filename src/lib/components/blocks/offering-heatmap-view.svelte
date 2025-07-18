<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { OfferingHeatmapViewModel } from './offering-heatmap-viewmodel.svelte';
	import { comparisonStore } from '$lib/stores/comparison';

	let { viewModel, showSelectionControls = false } = $props<{
		viewModel: OfferingHeatmapViewModel;
		showSelectionControls?: boolean;
	}>();

	// Check if this specific offering is selected
	let isSelected = $derived($comparisonStore.some(s => s.id === viewModel.offeringId));
</script>

{#if !viewModel.offering}
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
	<Card.Root class={cn('relative', isSelected && 'ring-2 ring-blue-500')}>
		<Card.Header>
			<div class="flex items-start justify-between">
				<div class="flex-1">
					<Card.Title class="text-primary text-2xl font-bold">{viewModel.offering.name}</Card.Title>
					<Card.Description>{viewModel.offering.description}</Card.Description>
				</div>
				{#if showSelectionControls}
					<div class="ml-4 flex-shrink-0">
						<Button
							variant={isSelected ? 'default' : 'outline'}
							size="sm"
							onclick={viewModel.toggleSelection}
						>
							{isSelected ? 'Selected' : 'Select'}
						</Button>
					</div>
				{/if}
			</div>

			<!-- Simple Legend -->
			<div class="mt-4 p-3">
				<div class="flex justify-end">
					<div class="text-muted-foreground text-xs">
						{viewModel.assessedCapabilities}/{viewModel.totalCapabilities} ({viewModel.completionPercentage}%)
					</div>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<!-- Bento grid layout for architecture layers -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each viewModel.layers as layer}
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
											{@const fillColor = viewModel.getFillColor(
												layer.id,
												viewModel.offering.capabilities.find((c) => c.id === capability.id)?.level
											)}
											{@const assessmentLevel = viewModel.offering.capabilities.find(
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
										{@const fillColor = viewModel.getFillColor(
											layer.id,
											viewModel.offering.capabilities.find((c) => c.id === capability.id)?.level
										)}
										{@const assessmentLevel = viewModel.offering.capabilities.find(
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
