<script lang="ts">
	import OfferingComparisonView from '$lib/components/blocks/offering-comparison-view.svelte';
	import { createOfferingComparisonViewModel } from '$lib/components/blocks/offering-comparison-viewmodel.svelte';
	
	const viewModel = createOfferingComparisonViewModel();
</script>

<OfferingComparisonView {viewModel} />