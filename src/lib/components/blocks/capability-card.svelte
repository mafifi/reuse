<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { ChevronRight } from '@lucide/svelte';

	let { capability, compact = false } = $props();
</script>

<HoverCard.Root>
	<HoverCard.Trigger href={`/capability/${capability.id}`} class="block">
		<Card.Root
			class="group bg-background/60 hover:bg-background/80 cursor-pointer transition-all duration-200 hover:shadow-sm border-dashed"
		>
			<Card.Content class={compact ? "p-2" : "p-3"}>
				<div class="flex items-center justify-between">
					<h3
						class="text-primary text-sm font-medium transition-colors group-hover:text-blue-600"
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
						{#each capability.examples?.slice(0, 3) || [] as example}
							<Badge id={example} variant="secondary" class="text-xs">
								{example}
							</Badge>
						{/each}
					</div>
				</div>

				<div>
					<h5 class="text-primary mb-2 font-medium">Key Benefits:</h5>
					<ul class="text-muted-foreground space-y-1 text-sm">
						{#each capability.benefits?.slice(0, 2) || [] as benefit}
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