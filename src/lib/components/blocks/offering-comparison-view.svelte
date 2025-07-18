<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, X } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { OfferingComparisonViewModel } from './offering-comparison-viewmodel.svelte';

	let { viewModel }: { viewModel: OfferingComparisonViewModel } = $props();

	function getLevelColor(level: number | undefined): string {
		switch (level) {
			case undefined:
				return 'bg-gray-100 text-gray-400';
			case 1:
				return 'bg-slate-950/30 text-slate-700';
			case 2:
				return 'bg-slate-950/60 text-slate-800';
			case 3:
				return 'bg-slate-950 text-white';
			default:
				return 'bg-gray-100 text-gray-400';
		}
	}

	function getLevelText(level: number | undefined): string {
		switch (level) {
			case undefined:
				return 'Not Capable';
			case 1:
				return 'Level 1';
			case 2:
				return 'Level 2';
			case 3:
				return 'Level 3';
			default:
				return 'Not Capable';
		}
	}

	function isDifferentFromFirst(
		levels: { [offeringId: string]: number | undefined },
		offeringId: string
	): boolean {
		const firstOfferingId = viewModel.selectedOfferings[0]?.id;
		if (!firstOfferingId) return false;

		return levels[firstOfferingId] !== levels[offeringId];
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-primary text-4xl font-bold">Offering Comparison</h1>
					<p class="text-muted-foreground mt-2">
						Compare capabilities across {viewModel.selectedOfferings.length} selected offerings
					</p>
				</div>
				<div class="flex gap-2">
					<Button variant="outline" onclick={viewModel.clearSelections}>
						<X class="mr-2 h-4 w-4" />
						Clear All
					</Button>
					<Button variant="outline" href="/offerings">
						<ArrowLeft class="mr-2 h-4 w-4" />
						Back to Offerings
					</Button>
				</div>
			</div>
		</div>

		{#if !viewModel.hasSelections}
			<Card.Root class="mx-auto max-w-2xl p-8 text-center">
				<Card.Content>
					<h2 class="text-primary mb-4 text-2xl font-bold">No Offerings Selected</h2>
					<p class="text-muted-foreground mb-6">
						Select at least 2 offerings from the offerings page to compare them.
					</p>
					<Button href="/offerings">
						<ArrowLeft class="mr-2 h-4 w-4" />
						Go to Offerings
					</Button>
				</Card.Content>
			</Card.Root>
		{:else}
			<!-- Selected Offerings Header -->
			<div class="mb-8">
				<h2 class="text-primary mb-4 text-2xl font-bold">Selected Offerings</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each viewModel.selectedOfferings as offering}
						<Card.Root class="p-4">
							<Card.Header class="pb-2">
								<Card.Title class="text-lg">{offering.name}</Card.Title>
								<Card.Description class="text-sm">{offering.description}</Card.Description>
							</Card.Header>
						</Card.Root>
					{/each}
				</div>
			</div>

			<!-- Comparison Sections -->
			{#each viewModel.comparisonSections as section}
				{#if section.capabilities.length > 0}
					<div class="mb-8">
						<h2 class="text-primary mb-4 text-2xl font-bold">{section.title}</h2>
						<div class="space-y-4">
							{#each section.capabilities as capability}
								<Card.Root>
									<Card.Content class="p-4">
										<div class="mb-3">
											<h3 class="text-primary font-semibold">{capability.name}</h3>
											<p class="text-muted-foreground text-sm">{capability.definition}</p>
											<div class="mt-1 text-xs text-gray-500">
												{capability.layer} → {capability.category}
												{#if capability.subcategory}
													→ {capability.subcategory}
												{/if}
											</div>
										</div>

										<!-- Capability levels across offerings -->
										<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
											{#each viewModel.selectedOfferings as offering}
												{@const level = capability.levels[offering.id]}
												{@const isHighlighted =
													section.type === 'differences' &&
													isDifferentFromFirst(capability.levels, offering.id)}
												<div class="flex items-center justify-between rounded-lg border p-3">
													<div class="flex-1">
														<div class="text-sm font-medium">{offering.name}</div>
													</div>
													<div class="flex-shrink-0">
														<span
															class={cn(
																'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
																getLevelColor(level),
																isHighlighted && 'ring-2 ring-orange-400'
															)}
														>
															{getLevelText(level)}
														</span>
													</div>
												</div>
											{/each}
										</div>
									</Card.Content>
								</Card.Root>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
