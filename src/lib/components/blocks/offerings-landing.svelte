<script lang="ts">
	import offerings from '$lib/data/offerings.json';
	import OfferingHeatmapView from './offering-heatmap-view.svelte';
	import { createOfferingHeatmapViewModel } from './offering-heatmap-viewmodel.svelte';
	import { comparisonStore, canCompare, selectionCount } from '$lib/stores/comparison';
	import { Button } from '$lib/components/ui/button';
	import { ChartBar } from '@lucide/svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-primary mb-4 text-4xl font-bold">Offerings</h1>
			<p class="text-muted-foreground mx-auto max-w-3xl text-left text-xl">
				Explore our offerings and their capabilities. Select offerings to compare them side-by-side.
			</p>
			<div class="flex justify-center">
				<div class="bg-muted/30 mt-4 rounded-lg p-3">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="flex items-center gap-1">
								<div class="border-border h-3 w-3 rounded-full border bg-transparent"></div>
								<span class="text-muted-foreground text-xs">None</span>
							</div>
							<div class="flex items-center gap-1">
								<div class="border-border h-3 w-3 rounded-full border bg-slate-950/30"></div>
								<span class="text-muted-foreground text-xs">Basic</span>
							</div>
							<div class="flex items-center gap-1">
								<div class="border-border h-3 w-3 rounded-full border bg-slate-950/60"></div>
								<span class="text-muted-foreground text-xs">Intermediate</span>
							</div>
							<div class="flex items-center gap-1">
								<div class="border-border h-3 w-3 rounded-full border bg-slate-950"></div>
								<span class="text-muted-foreground text-xs">Advanced</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Comparison Controls -->
		{#if $selectionCount > 0}
			<div class="mb-8 flex justify-center">
				<div class="bg-muted/50 rounded-lg p-4">
					<div class="flex items-center gap-4">
						<div class="text-sm font-medium">
							{$selectionCount} offering{$selectionCount === 1 ? '' : 's'} selected
						</div>
						<div class="flex gap-2">
							<Button 
								variant="outline" 
								size="sm" 
								onclick={() => comparisonStore.clearSelections()}
							>
								Clear All
							</Button>
							{#if $canCompare}
								<Button href="/offerings/compare" class="flex items-center gap-2">
									<ChartBar class="h-4 w-4" />
									Compare Selected
								</Button>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Simple Legend -->

		<!-- Offerings -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each offerings.offerings as offering}
				<OfferingHeatmapView
					viewModel={createOfferingHeatmapViewModel(offering.id)}
					showSelectionControls={true}
				/>
			{/each}
		</div>
	</div>
</div>
