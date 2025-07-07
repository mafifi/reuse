<script lang="ts">
	import CapabilityDetail from '$lib/components/blocks/capability-detail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<CapabilityDetail capabilityId={data.id} />
