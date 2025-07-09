<script lang="ts">
	import ArchitectureLanding from '$lib/components/blocks/architecture-landing.svelte';
	import OfferingsLanding from '$lib/components/blocks/offerings-landing.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	let currentTab = $state('architecture');
</script>

<Tabs.Root bind:value={currentTab}>
	<Tabs.List>
		<Tabs.Trigger value="architecture">Architecture</Tabs.Trigger>
		<Tabs.Trigger value="offerings">Offerings</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="architecture">
		<ArchitectureLanding />
	</Tabs.Content>
	<Tabs.Content value="offerings">
		<OfferingsLanding />
	</Tabs.Content>
</Tabs.Root>
