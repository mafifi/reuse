<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, CheckCircle, Target, Lightbulb } from '@lucide/svelte';
	import capabilities from '$lib/data/capabilities';
	import CapabilityMarkdown from '$lib/components/ui/capability-markdown.svelte';

	let { capabilityId } = $props();

	// Find the capability, its category/subcategory, and layer in the nested structure
	let capability: any = $state(undefined);
	let category: any = $state(undefined);
	let subcategory: any = $state(undefined);
	let layer: any = $state(undefined);

	let found = false;
	for (const archLayer of capabilities) {
		for (const archCategory of archLayer.categories) {
			if (archCategory.subcategories) {
				// 3-level hierarchy (Infrastructure)
				for (const archSubcategory of archCategory.subcategories) {
					const cap = archSubcategory.capabilities.find((cap: any) => cap.id === capabilityId);
					if (cap) {
						capability = cap;
						category = archCategory;
						subcategory = archSubcategory;
						layer = archLayer;
						found = true;
						break;
					}
				}
			} else {
				// 2-level hierarchy (other layers)
				const cap = archCategory.capabilities.find((cap: any) => cap.id === capabilityId);
				if (cap) {
					capability = cap;
					category = archCategory;
					layer = archLayer;
					found = true;
					break;
				}
			}
			if (found) break;
		}
		if (found) break;
	}
</script>

{#if !capability}
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
	>
		<Card.Root class="mx-auto max-w-md p-8 text-center">
			<Card.Content>
				<h2 class="text-primary mb-4 text-2xl font-bold">Capability Not Found</h2>
				<p class="text-muted-foreground mb-6">The requested capability could not be found.</p>
				<Button href="/">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Architecture Overview
				</Button>
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
		<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div class="container mx-auto px-4 py-8">
				<!-- Navigation -->
				<div class="mb-8">
					<Button href="/" variant="ghost" class="mb-4">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Architecture Overview
					</Button>
				</div>

				<!-- Header -->
				<div class="mb-8">
					<div class="mb-4 flex items-center gap-3">
						<Badge variant="outline" class="text-sm">
							{layer?.name || 'Unknown Layer'}
						</Badge>
						<span class="text-muted-foreground">→</span>
						<Badge variant="outline" class="text-sm">
							{category?.name || 'Unknown Category'}
						</Badge>
						{#if subcategory}
							<span class="text-muted-foreground">→</span>
							<Badge variant="outline" class="text-sm">
								{subcategory?.name || 'Unknown Subcategory'}
							</Badge>
						{/if}
					</div>
					<h1 class="text-primary mb-4 text-4xl font-bold">{capability.name}</h1>
					<p class="text-muted-foreground max-w-4xl text-xl">{capability.definition}</p>
				</div>

				<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<!-- Main Content -->
					<div class="space-y-8 lg:col-span-2">
						<!-- Description -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex items-center gap-2">
									<Target class="h-5 w-5" />
									Overview
								</Card.Title>
							</Card.Header>
							<Card.Content>
								<p class="text-primary leading-relaxed">{capability.description}</p>
							</Card.Content>
						</Card.Root>

						<!-- Examples -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex items-center gap-2">
									<Lightbulb class="h-5 w-5" />
									Examples & Use Cases
								</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
									{#each capability.examples || [] as example, index}
										<div
											id={index.toString()}
											class="flex items-center gap-2 rounded-lg bg-slate-50 p-3"
										>
											<CheckCircle class="text-watercourse-600 h-4 w-4 flex-shrink-0" />
											<span class="text-primary">{example}</span>
										</div>
									{/each}
								</div>
							</Card.Content>
						</Card.Root>

						<!-- Benefits -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex items-center gap-2">
									<CheckCircle class="h-5 w-5" />
									Key Benefits
								</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									{#each capability.benefits || [] as benefit, index}
										<div
											id={index.toString()}
											class="border-watercourse-200 bg-watercourse-50 flex items-start gap-3 rounded-lg border p-4"
										>
											<div class="bg-watercourse-600 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
											<span class="text-primary">{benefit}</span>
										</div>
									{/each}
								</div>
							</Card.Content>
						</Card.Root>

						<!-- Maturity Levels -->
						{#if capability.maturityLevels}
							<Card.Root>
								<Card.Header>
									<Card.Title>Maturity Assessment</Card.Title>
									<Card.Description>
										Evaluate your organization's current maturity level for this capability
									</Card.Description>
								</Card.Header>
								<Card.Content>
									<div class="space-y-4">
										{#if capability.maturityLevels.plan}
											<div class="flex items-start gap-4 rounded-lg border p-4">
												<div
													class="bg-midnight-blue-100 text-midnight-blue-700 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
												>
													P
												</div>
												<div class="flex-1">
													<div class="mb-1 flex items-center gap-2">
														<h4 class="text-primary font-semibold">Plan</h4>
														{#if capability.maturityLevels.plan.available}
															<Badge variant="secondary" class="bg-green-100 text-xs text-green-800"
																>Available</Badge
															>
														{:else}
															<Badge variant="secondary" class="bg-red-100 text-xs text-red-800"
																>Not Available</Badge
															>
														{/if}
													</div>
													<p class="text-muted-foreground text-sm">
														{capability.maturityLevels.plan.description}
													</p>
												</div>
											</div>
										{/if}
										{#if capability.maturityLevels.build}
											<div class="flex items-start gap-4 rounded-lg border p-4">
												<div
													class="bg-midnight-blue-100 text-midnight-blue-700 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
												>
													B
												</div>
												<div class="flex-1">
													<div class="mb-1 flex items-center gap-2">
														<h4 class="text-primary font-semibold">Build</h4>
														{#if capability.maturityLevels.build.available}
															<Badge variant="secondary" class="bg-green-100 text-xs text-green-800"
																>Available</Badge
															>
														{:else}
															<Badge variant="secondary" class="bg-red-100 text-xs text-red-800"
																>Not Available</Badge
															>
														{/if}
													</div>
													<p class="text-muted-foreground text-sm">
														{capability.maturityLevels.build.description}
													</p>
												</div>
											</div>
										{/if}
										{#if capability.maturityLevels.operate}
											<div class="flex items-start gap-4 rounded-lg border p-4">
												<div
													class="bg-midnight-blue-100 text-midnight-blue-700 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
												>
													O
												</div>
												<div class="flex-1">
													<div class="mb-1 flex items-center gap-2">
														<h4 class="text-primary font-semibold">Operate</h4>
														{#if capability.maturityLevels.operate.available}
															<Badge variant="secondary" class="bg-green-100 text-xs text-green-800"
																>Available</Badge
															>
														{:else}
															<Badge variant="secondary" class="bg-red-100 text-xs text-red-800"
																>Not Available</Badge
															>
														{/if}
													</div>
													<p class="text-muted-foreground text-sm">
														{capability.maturityLevels.operate.description}
													</p>
												</div>
											</div>
										{/if}
										{#if capability.maturityLevels.score}
											<div class="mt-4 rounded-lg bg-slate-50 p-4">
												<div class="flex items-center justify-between">
													<span class="text-sm font-medium">Overall Possible Score</span>
													<Badge variant="outline" class="px-3 py-1 text-lg"
														>{capability.maturityLevels.score}</Badge
													>
												</div>
											</div>
										{/if}
									</div>
								</Card.Content>
							</Card.Root>
						{/if}

						<!-- Implementation Guide (Markdown Content) -->
						<CapabilityMarkdown {capabilityId} />
					</div>

					<!-- Sidebar -->
					{#if capability.keyComponents || capability.technologies}
						<div class="space-y-6">
							<!-- Key Components -->
							{#if capability.keyComponents}
								<Card.Root>
									<Card.Header>
										<Card.Title class="text-lg">Key Components</Card.Title>
									</Card.Header>
									<Card.Content>
										<div class="space-y-2">
											{#each capability.keyComponents || [] as component, index}
												<Badge
													id={index.toString()}
													variant="secondary"
													class="block py-2 text-center"
												>
													{component}
												</Badge>
											{/each}
										</div>
									</Card.Content>
								</Card.Root>
							{/if}

							<!-- Technologies -->
							{#if capability.technologies}
								<Card.Root>
									<Card.Header>
										<Card.Title class="text-lg">Common Technologies</Card.Title>
									</Card.Header>
									<Card.Content>
										<div class="space-y-2">
											{#each capability.technologies || [] as tech, index}
												<div
													id={index.toString()}
													class="text-primary rounded bg-slate-50 p-2 text-center text-sm"
												>
													{tech}
												</div>
											{/each}
										</div>
									</Card.Content>
								</Card.Root>
							{/if}

							{#if capability.actions}
								<!-- Actions -->
								<Card.Root>
									<Card.Header>
										<Card.Title class="text-lg">Actions</Card.Title>
									</Card.Header>
									<Card.Content class="space-y-3">
										<Button class="w-full bg-transparent" variant="outline"
											>Compare Solutions</Button
										>
										<Button class="w-full bg-transparent" variant="outline">
											View Related Capabilities
										</Button>
										<Button class="w-full bg-transparent" variant="outline">Export Details</Button>
									</Card.Content>
								</Card.Root>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
