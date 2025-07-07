<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Building2, Layers, Database, Server, Shield, ChevronRight } from '@lucide/svelte';

	// Sample capability data following TOGAF layers
	const architectureLayers = [
		{
			id: 'business',
			name: 'Business Capabilities',
			description: 'Business capabilities, processes, and organizational structures',
			icon: Building2,
			color: 'bg-midnight-blue-50 border-midnight-blue-200 hover:bg-midnight-blue-100',
			capabilities: [
				{
					id: 'customer-management',
					name: 'Customer Management',
					definition:
						'Capability to acquire, retain, and manage customer relationships throughout their lifecycle',
					examples: ['CRM systems', 'Customer onboarding', 'Loyalty programs'],
					benefits: ['Improved customer satisfaction', 'Increased retention', 'Better insights']
				},
				{
					id: 'financial-management',
					name: 'Financial Management',
					definition:
						'Capability to manage financial planning, budgeting, and reporting across the organization',
					examples: ['Budget planning', 'Financial reporting', 'Cost management'],
					benefits: ['Better financial control', 'Compliance', 'Strategic planning']
				},
				{
					id: 'supply-chain',
					name: 'Supply Chain Management',
					definition: 'End-to-end management of goods and services from suppliers to customers',
					examples: ['Procurement', 'Inventory management', 'Logistics'],
					benefits: ['Cost reduction', 'Efficiency', 'Risk mitigation']
				},
				{
					id: 'human-resources',
					name: 'Human Resources',
					definition:
						'Management of workforce planning, talent acquisition, and employee development',
					examples: ['Recruitment', 'Performance management', 'Training'],
					benefits: ['Talent retention', 'Productivity', 'Compliance']
				},
				{
					id: 'risk-management',
					name: 'Risk Management',
					definition: 'Identification, assessment, and mitigation of business risks',
					examples: ['Risk assessment', 'Compliance monitoring', 'Business continuity'],
					benefits: ['Risk reduction', 'Regulatory compliance', 'Business resilience']
				},
				{
					id: 'product-development',
					name: 'Product Development',
					definition: 'Innovation and development of new products and services',
					examples: ['R&D processes', 'Product lifecycle', 'Innovation labs'],
					benefits: ['Market competitiveness', 'Revenue growth', 'Innovation']
				}
			]
		},
		{
			id: 'application',
			name: 'Application Capabilities',
			description: 'Software applications and their interactions within the enterprise',
			icon: Layers,
			color: 'bg-watercourse-50 border-watercourse-200 hover:bg-watercourse-100',
			capabilities: [
				{
					id: 'enterprise-resource-planning',
					name: 'Enterprise Resource Planning',
					definition: 'Integrated software platform managing core business processes',
					examples: ['SAP', 'Oracle ERP', 'Microsoft Dynamics'],
					benefits: ['Process integration', 'Data consistency', 'Operational efficiency']
				},
				{
					id: 'customer-relationship-management',
					name: 'Customer Relationship Management',
					definition: 'Technology for managing customer interactions and relationships',
					examples: ['Salesforce', 'HubSpot', 'Microsoft CRM'],
					benefits: ['Customer insights', 'Sales automation', 'Service improvement']
				},
				{
					id: 'business-intelligence',
					name: 'Business Intelligence',
					definition: 'Analytics and reporting capabilities for data-driven decision making',
					examples: ['Tableau', 'Power BI', 'Qlik'],
					benefits: ['Data insights', 'Better decisions', 'Performance monitoring']
				},
				{
					id: 'collaboration-tools',
					name: 'Collaboration Tools',
					definition: 'Platforms enabling team communication and collaboration',
					examples: ['Microsoft Teams', 'Slack', 'SharePoint'],
					benefits: ['Team productivity', 'Remote work', 'Knowledge sharing']
				},
				{
					id: 'content-management',
					name: 'Content Management',
					definition: 'Systems for creating, managing, and publishing digital content',
					examples: ['SharePoint', 'Drupal', 'WordPress'],
					benefits: ['Content control', 'Brand consistency', 'Publishing efficiency']
				},
				{
					id: 'integration-platform',
					name: 'Integration Platform',
					definition: 'Middleware connecting disparate systems and applications',
					examples: ['MuleSoft', 'Dell Boomi', 'Azure Logic Apps'],
					benefits: ['System connectivity', 'Data flow', 'Process automation']
				}
			]
		},
		{
			id: 'data',
			name: 'Data Capabilities',
			description: 'Data assets, storage, and management across the organization',
			icon: Database,
			color: 'bg-purple-heart-50 border-purple-heart-200 hover:bg-purple-heart-100',
			capabilities: [
				{
					id: 'data-warehousing',
					name: 'Data Warehousing',
					definition: 'Centralized repository for storing and analyzing large volumes of data',
					examples: ['Snowflake', 'Amazon Redshift', 'Azure Synapse'],
					benefits: ['Centralized data', 'Analytics performance', 'Historical analysis']
				},
				{
					id: 'master-data-management',
					name: 'Master Data Management',
					definition: 'Unified, consistent view of critical business data across systems',
					examples: ['Informatica MDM', 'IBM InfoSphere', 'Talend'],
					benefits: ['Data consistency', 'Single source of truth', 'Data quality']
				},
				{
					id: 'data-lake',
					name: 'Data Lake',
					definition: 'Storage repository for raw data in native format until needed',
					examples: ['Azure Data Lake', 'Amazon S3', 'Hadoop HDFS'],
					benefits: ['Flexible storage', 'Cost efficiency', 'Big data analytics']
				},
				{
					id: 'real-time-analytics',
					name: 'Real-time Analytics',
					definition: 'Processing and analyzing data as it arrives for immediate insights',
					examples: ['Apache Kafka', 'Azure Stream Analytics', 'Amazon Kinesis'],
					benefits: ['Immediate insights', 'Faster decisions', 'Operational efficiency']
				},
				{
					id: 'data-governance',
					name: 'Data Governance',
					definition: 'Framework for managing data availability, usability, and security',
					examples: ['Collibra', 'Alation', 'Apache Atlas'],
					benefits: ['Data quality', 'Compliance', 'Risk management']
				},
				{
					id: 'backup-recovery',
					name: 'Backup & Recovery',
					definition: 'Protection and restoration of critical business data',
					examples: ['Veeam', 'Commvault', 'Azure Backup'],
					benefits: ['Data protection', 'Business continuity', 'Disaster recovery']
				}
			]
		},
		{
			id: 'infrastructure',
			name: 'Infrastructure Capabilities',
			description: 'Physical and virtual infrastructure supporting business operations',
			icon: Server,
			color: 'bg-mariner-50 border-mariner-200 hover:bg-mariner-100',
			capabilities: [
				{
					id: 'cloud-computing',
					name: 'Cloud Computing',
					definition: 'On-demand delivery of computing services over the internet',
					examples: ['AWS', 'Microsoft Azure', 'Google Cloud'],
					benefits: ['Scalability', 'Cost efficiency', 'Global reach']
				},
				{
					id: 'virtualization',
					name: 'Virtualization',
					definition: 'Creation of virtual versions of computing resources',
					examples: ['VMware vSphere', 'Hyper-V', 'KVM'],
					benefits: ['Resource optimization', 'Cost reduction', 'Flexibility']
				},
				{
					id: 'network-infrastructure',
					name: 'Network Infrastructure',
					definition: 'Hardware and software resources enabling network connectivity',
					examples: ['Cisco networking', 'SD-WAN', 'Load balancers'],
					benefits: ['Connectivity', 'Performance', 'Reliability']
				},
				{
					id: 'storage-systems',
					name: 'Storage Systems',
					definition: 'Hardware and software for storing and managing data',
					examples: ['SAN', 'NAS', 'Object storage'],
					benefits: ['Data availability', 'Performance', 'Scalability']
				},
				{
					id: 'monitoring-management',
					name: 'Monitoring & Management',
					definition: 'Tools and processes for monitoring infrastructure health',
					examples: ['Nagios', 'SCOM', 'Datadog'],
					benefits: ['Proactive monitoring', 'Issue resolution', 'Performance optimization']
				},
				{
					id: 'disaster-recovery',
					name: 'Disaster Recovery',
					definition: 'Strategies and tools for recovering from infrastructure failures',
					examples: ['Site replication', 'Backup systems', 'Failover clusters'],
					benefits: ['Business continuity', 'Risk mitigation', 'Recovery assurance']
				}
			]
		},
		{
			id: 'security',
			name: 'Security Capabilities',
			description: 'Security controls, policies, and technologies protecting the enterprise',
			icon: Shield,
			color: 'bg-golf-50 border-golf-200 hover:bg-golf-100',
			capabilities: [
				{
					id: 'identity-access-management',
					name: 'Identity & Access Management',
					definition: 'Framework for managing digital identities and access permissions',
					examples: ['Active Directory', 'Okta', 'Azure AD'],
					benefits: ['Access control', 'Security compliance', 'User management']
				},
				{
					id: 'endpoint-protection',
					name: 'Endpoint Protection',
					definition: 'Security solutions protecting end-user devices and endpoints',
					examples: ['CrowdStrike', 'Symantec', 'Microsoft Defender'],
					benefits: ['Malware protection', 'Threat detection', 'Device security']
				},
				{
					id: 'network-security',
					name: 'Network Security',
					definition: 'Technologies protecting network infrastructure from threats',
					examples: ['Firewalls', 'IPS/IDS', 'VPN'],
					benefits: ['Network protection', 'Threat prevention', 'Secure connectivity']
				},
				{
					id: 'security-monitoring',
					name: 'Security Monitoring',
					definition: 'Continuous monitoring and analysis of security events',
					examples: ['SIEM', 'SOC', 'Security analytics'],
					benefits: ['Threat detection', 'Incident response', 'Compliance monitoring']
				},
				{
					id: 'data-protection',
					name: 'Data Protection',
					definition: 'Technologies and processes protecting sensitive data',
					examples: ['Encryption', 'DLP', 'Data masking'],
					benefits: ['Data confidentiality', 'Privacy compliance', 'Risk reduction']
				},
				{
					id: 'vulnerability-management',
					name: 'Vulnerability Management',
					definition: 'Process of identifying and remediating security vulnerabilities',
					examples: ['Nessus', 'Qualys', 'Rapid7'],
					benefits: ['Risk reduction', 'Proactive security', 'Compliance']
				}
			]
		}
	];
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
				{@const IconComponent = layer.icon}
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
