<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Building2, Layers, Database, Server, Shield, ChevronRight } from '@lucide/svelte';
	import architectureLayers from '$lib/data/capabilities.json';

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
						<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{#each layer.capabilities as capability}
								<HoverCard.Root>
									<HoverCard.Trigger href={`/capability/${capability.id}`} class="block">
										<Card.Root
											class="group bg-background/80 hover:bg-background h-full cursor-pointer transition-all duration-200 hover:shadow-md"
										>
											<Card.Content class="p-4">
												<div class="flex items-center justify-between">
													<h3
														class="text-primary font-semibold transition-colors group-hover:text-blue-600"
													>
														{capability.name}
													</h3>
													<ChevronRight
														class="text-muted-foreground h-4 w-4 transition-colors group-hover:text-blue-600"
													/>
												</div>
											</Card.Content>
										</Card.Root>
									</HoverCard.Trigger>
									<HoverCard.Content>
										<div
											class="bg-background border-border pointer-events-none fixed z-50 w-96 rounded-lg border p-4 shadow-lg"
										>
											<div class="space-y-3">
												<div>
													<h4 class="text-primary mb-1 font-semibold">{capability.name}</h4>
													<p class="text-muted-foreground text-sm">{capability.definition}</p>
												</div>

												<div>
													<h5 class="text-primary mb-2 font-medium">Examples:</h5>
													<div class="flex flex-wrap gap-1">
														{#each capability.examples.slice(0, 3) as example}
															<Badge id={example} variant="secondary" class="text-xs">
																{example}
															</Badge>
														{/each}
													</div>
												</div>

												<div>
													<h5 class="text-primary mb-2 font-medium">Key Benefits:</h5>
													<ul class="text-muted-foreground space-y-1 text-sm">
														{#each capability.benefits.slice(0, 2) as benefit}
															<li id={benefit} class="flex items-center gap-2">
																<div class="h-1 w-1 rounded-full bg-slate-400"></div>
																{benefit}
															</li>
														{/each}
													</ul>
												</div>

												<div class="border-t pt-2">
													<p class="text-muted-foreground text-xs">
														Click to view detailed information
													</p>
												</div>
											</div>

											<div
												class="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent"
											></div>
										</div>
									</HoverCard.Content>
								</HoverCard.Root>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<!-- Summary Stats -->
		<div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
			{#each architectureLayers as layer}
				<Card.Root id={layer.id} class="p-4 text-center">
					<div class="text-primary text-2xl font-bold">{layer.capabilities.length}</div>
					<div class="text-muted-foreground text-sm">{layer.name.split(' ')[0]} Capabilities</div>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
