<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Separator } from '$lib/components/ui/separator';
	import { Building2, Layers, Database, Server, Shield, ChevronRight } from '@lucide/svelte';
	import CapabilityCard from './capability-card.svelte';
	import architectureLayers from '$lib/data/capabilities';

	const iconMap = {
		Building2: Building2,
		Layers: Layers,
		Database: Database,
		Server: Server,
		Shield: Shield
	};
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-primary mb-4 text-4xl font-bold">Reusable Capabilities</h1>
			<p class="text-muted-foreground mx-auto max-w-3xl text-xl">
				Explore our comprehensive technology capabilities organized by architecture layers. Hover
				over capabilities to preview details, click to explore in depth.
			</p>
		</div>

		<!-- Architecture Layers -->
		<div class="space-y-8">
			{#each architectureLayers as layer}
				{@const IconComponent = iconMap[layer.icon as keyof typeof iconMap]}
				<Card.Root id={layer.id} class={`${layer.color} transition-all duration-200`}>
					<Card.Header class="pb-4">
						<div class="flex items-center gap-3">
							<div class="bg-background rounded-lg p-2 shadow-sm">
								<IconComponent className="h-6 w-6 text-primary" />
							</div>
							<div>
								<Card.Title class="text-primary text-2xl">{layer.name}</Card.Title>
								<Card.Description class="text-muted-foreground text-base"
									>{layer.description}</Card.Description
								>
							</div>
						</div>
					</Card.Header>
					<Card.Content>
						<div class="space-y-6">
							{#each layer.categories as category}
								{#if category.subcategories}
									<!-- Infrastructure layer with 3-level hierarchy -->
									<div class="space-y-4">
										<!-- Second level category card -->
										<Card.Root class="bg-background/60 border-dashed">
											<Card.Header class="pb-3">
												<Card.Title class="text-primary text-lg">{category.name}</Card.Title>
												<Card.Description class="text-muted-foreground text-sm">
													{category.description}
												</Card.Description>
											</Card.Header>
											<Card.Content>
												<!-- Bento grid layout for subcategories -->
												<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
													{#each category.subcategories as subcategory}
														<div class="space-y-2">
															<div class="flex items-center gap-2">
																<h4
																	class="text-muted-foreground text-sm font-medium tracking-wide uppercase"
																>
																	{subcategory.name}
																</h4>
																<Separator class="flex-1" />
															</div>
															<div class="space-y-1">
																{#each subcategory.capabilities as capability}
																	<CapabilityCard {capability} compact={true} />
																{/each}
															</div>
														</div>
													{/each}
												</div>
											</Card.Content>
										</Card.Root>
									</div>
								{:else}
									<!-- Regular 2-level hierarchy for other layers -->
									<div class="space-y-2">
										<div class="flex items-center gap-2">
											<h4 class="text-muted-foreground text-sm font-medium">
												{category.name}
											</h4>
											<Separator class="flex-1" />
										</div>
										<div
											class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
										>
											{#each category.capabilities as capability}
												<CapabilityCard {capability} />
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<!-- Summary Stats -->
		<div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
			{#each architectureLayers as layer}
				{@const totalCapabilities = layer.categories.reduce((sum, category) => {
					if (category.subcategories) {
						return (
							sum +
							category.subcategories.reduce(
								(subSum, subcategory) => subSum + subcategory.capabilities.length,
								0
							)
						);
					}
					return sum + category.capabilities.length;
				}, 0)}
				<Card.Root id={layer.id} class="p-4 text-center">
					<div class="text-primary text-2xl font-bold">{totalCapabilities}</div>
					<div class="text-muted-foreground text-sm">{layer.name.split(' ')[0]} Capabilities</div>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
