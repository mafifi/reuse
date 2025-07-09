<script lang="ts">
	import offerings from '$lib/data/offerings.json';
	import OfferingHeatmap from './offering-heatmap.svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-primary mb-4 text-4xl font-bold">Offerings</h1>
			<p class="text-muted-foreground mx-auto max-w-3xl text-xl">
				Explore our offerings and their capabilities. Hover over capabilities to preview details,
				click to explore in depth.
			</p>
		</div>

		<!-- Offerings -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each offerings.offerings as offering}
				<OfferingHeatmap offeringId={offering.id} />
			{/each}
		</div>
	</div>
</div>
