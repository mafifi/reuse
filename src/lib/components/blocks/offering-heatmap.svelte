<script lang="ts">
	import capabilities from '$lib/data/capabilities.json';
	import offerings from '$lib/data/offerings.json';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	let { offeringId } = $props();

	let offering = $derived(offerings.offerings.find((offering) => offering.id === offeringId));

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
			<Card.Title>{offering.name}</Card.Title>
			<Card.Description>{offering.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
				{#each capabilities as layer}
					<div class="flex flex-col gap-2">
						<Card.Root>
							<Card.Header>
								<Card.Title>{layer.name}</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="flex flex-row flex-wrap gap-2">
									{#each layer.categories as category}
										{#if category.subcategories}
											{#each category.subcategories as subcategory}
												{#each subcategory.capabilities as capability}
													{@const fillColor = getFillColor(
														layer.id,
														offering.capabilities.find((c) => c.id === capability.id)?.level
													)}
													<div class="flex items-center gap-2">
														<circle
															class={cn('border-border h-4 w-4 rounded-full border', fillColor)}
														/>
													</div>
												{/each}
											{/each}
										{:else}
											{#each category.capabilities as capability}
												{@const fillColor = getFillColor(
													layer.id,
													offering.capabilities.find((c) => c.id === capability.id)?.level
												)}
												<div class="flex items-center gap-2">
													<circle
														class={cn('border-border h-4 w-4 rounded-full border', fillColor)}
													/>
												</div>
											{/each}
										{/if}
									{/each}
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
{/if}
