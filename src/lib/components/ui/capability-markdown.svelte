<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Code } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { capabilityId } = $props();

	let MarkdownComponent: any = $state(null);
	let loading = $state(true);
	let error = $state(false);

	onMount(async () => {
		try {
			// Attempt to dynamically import the corresponding .svx file
			const module = await import(`$lib/content/capabilities/${capabilityId}.svx`);
			MarkdownComponent = module.default;
			loading = false;
		} catch (e) {
			// Silently fail - no markdown content available for this capability
			loading = false;
			error = true;
		}
	});
</script>

{#if !loading && !error && MarkdownComponent}
	<Card.Root>
		<Card.Header>
			<Card.Title class="flex items-center gap-2">
				<Code class="h-5 w-5" />
				Implementation Guide
			</Card.Title>
			<Card.Description>
				Practical examples and code snippets for implementing this capability
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-code:text-foreground prose-pre:bg-transparent prose-pre:p-0">
				<svelte:component this={MarkdownComponent} />
			</div>
		</Card.Content>
	</Card.Root>
{/if}