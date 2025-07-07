<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, CheckCircle, Target, Lightbulb } from '@lucide/svelte';

	// This would typically come from a database or API
	const capabilityData = {
		'customer-management': {
			name: 'Customer Management',
			layer: 'Business Architecture',
			definition:
				'Capability to acquire, retain, and manage customer relationships throughout their lifecycle, ensuring optimal customer experience and business value creation.',
			description:
				'Customer Management encompasses all processes, technologies, and strategies used to interact with customers across all touchpoints. This capability enables organizations to understand customer needs, deliver personalized experiences, and build long-term relationships that drive business growth.',
			examples: [
				'Customer Relationship Management (CRM) systems',
				'Customer onboarding processes',
				'Loyalty and rewards programs',
				'Customer service and support',
				'Customer segmentation and targeting',
				'Customer feedback management'
			],
			benefits: [
				'Improved customer satisfaction and loyalty',
				'Increased customer lifetime value',
				'Better customer insights and analytics',
				'Enhanced customer experience',
				'Reduced customer acquisition costs',
				'Improved customer retention rates'
			],
			keyComponents: [
				'Customer data management',
				'Interaction tracking',
				'Service delivery',
				'Feedback collection',
				'Relationship analytics'
			],
			technologies: [
				'Salesforce CRM',
				'Microsoft Dynamics 365',
				'HubSpot',
				'Oracle CX Cloud',
				'SAP Customer Experience'
			],
			maturityLevels: [
				{ level: 'Basic', description: 'Manual customer tracking, limited integration' },
				{ level: 'Developing', description: 'CRM system in place, some automation' },
				{ level: 'Defined', description: 'Integrated customer processes, analytics' },
				{ level: 'Managed', description: 'Advanced analytics, personalization' },
				{ level: 'Optimized', description: 'AI-driven insights, predictive analytics' }
			]
		}
	};

	let { capabilityId } = $props();

	const capability = capabilityData[capabilityId as keyof typeof capabilityData];
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
							{capability.layer}
						</Badge>
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
									{#each capability.examples as example, index}
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
									{#each capability.benefits as benefit, index}
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
						<Card.Root>
							<Card.Header>
								<Card.Title>Maturity Assessment</Card.Title>
								<Card.Description>
									Evaluate your organization's current maturity level for this capability
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="space-y-4">
									{#each capability.maturityLevels as level, index}
										<div id={index.toString()} class="flex items-start gap-4 rounded-lg border p-4">
											<div
												class="bg-midnight-blue-100 text-midnight-blue-700 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
											>
												{index + 1}
											</div>
											<div>
												<h4 class="text-primary mb-1 font-semibold">{level.level}</h4>
												<p class="text-muted-foreground text-sm">{level.description}</p>
											</div>
										</div>
									{/each}
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<!-- Sidebar -->
					<div class="space-y-6">
						<!-- Key Components -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="text-lg">Key Components</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="space-y-2">
									{#each capability.keyComponents as component, index}
										<Badge id={index.toString()} variant="secondary" class="block py-2 text-center">
											{component}
										</Badge>
									{/each}
								</div>
							</Card.Content>
						</Card.Root>

						<!-- Technologies -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="text-lg">Common Technologies</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="space-y-2">
									{#each capability.technologies as tech, index}
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

						<!-- Actions -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="text-lg">Actions</Card.Title>
							</Card.Header>
							<Card.Content class="space-y-3">
								<Button class="w-full bg-transparent" variant="outline">Compare Solutions</Button>
								<Button class="w-full bg-transparent" variant="outline">
									View Related Capabilities
								</Button>
								<Button class="w-full bg-transparent" variant="outline">Export Details</Button>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
