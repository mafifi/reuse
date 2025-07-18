import capabilities from '$lib/data';
import offerings from '$lib/data/offerings.json';
import { comparisonStore } from '$lib/stores/comparison';
import { get } from 'svelte/store';

export interface CapabilityComparison {
	id: string;
	name: string;
	definition: string;
	category: string;
	subcategory?: string;
	layer: string;
	levels: { [offeringId: string]: number | undefined };
}

export interface ComparisonSection {
	type: 'similarities' | 'differences';
	title: string;
	capabilities: CapabilityComparison[];
}

export interface OfferingComparisonViewModel {
	selectedOfferings: any[];
	comparisonSections: ComparisonSection[];
	hasSelections: boolean;
	clearSelections: () => void;
}

export function createOfferingComparisonViewModel(): OfferingComparisonViewModel {
	const selectedOfferingIds = get(comparisonStore);
	const selectedOfferings = selectedOfferingIds.map(selected => 
		offerings.offerings.find(offering => offering.id === selected.id)
	).filter(Boolean);

	const hasSelections = selectedOfferings.length >= 2;

	function getAllCapabilities(): CapabilityComparison[] {
		const allCapabilities: CapabilityComparison[] = [];
		
		for (const layer of capabilities) {
			for (const category of layer.categories) {
				if (category.subcategories) {
					for (const subcategory of category.subcategories) {
						for (const capability of subcategory.capabilities) {
							const levels: { [offeringId: string]: number | undefined } = {};
							
							selectedOfferings.forEach(offering => {
								if (offering) {
									const capabilityLevel = offering.capabilities.find(
										(c: any) => c.id === capability.id
									)?.level;
									levels[offering.id] = capabilityLevel;
								}
							});

							allCapabilities.push({
								id: capability.id,
								name: capability.name,
								definition: capability.definition,
								category: category.name,
								subcategory: subcategory.name,
								layer: layer.name,
								levels
							});
						}
					}
				} else {
					for (const capability of category.capabilities) {
						const levels: { [offeringId: string]: number | undefined } = {};
						
						selectedOfferings.forEach(offering => {
							if (offering) {
								const capabilityLevel = offering.capabilities.find(
									(c: any) => c.id === capability.id
								)?.level;
								levels[offering.id] = capabilityLevel;
							}
						});

						allCapabilities.push({
							id: capability.id,
							name: capability.name,
							definition: capability.definition,
							category: category.name,
							layer: layer.name,
							levels
						});
					}
				}
			}
		}
		
		return allCapabilities;
	}

	function createComparisonSections(): ComparisonSection[] {
		if (!hasSelections) {
			return [];
		}

		const allCapabilities = getAllCapabilities();
		const similarities: CapabilityComparison[] = [];
		const differences: CapabilityComparison[] = [];

		allCapabilities.forEach(capability => {
			const levels = Object.values(capability.levels);
			const hasAnyLevel = levels.some(level => level !== undefined);
			
			if (!hasAnyLevel) {
				// Skip capabilities where no offering has any level
				return;
			}

			const uniqueLevels = [...new Set(levels)];
			
			if (uniqueLevels.length === 1) {
				// All offerings have the same level (including undefined)
				similarities.push(capability);
			} else {
				// Offerings have different levels
				differences.push(capability);
			}
		});

		return [
			{
				type: 'similarities' as const,
				title: 'Similarities',
				capabilities: similarities
			},
			{
				type: 'differences' as const,
				title: 'Differences',
				capabilities: differences
			}
		];
	}

	function clearSelections() {
		comparisonStore.clearSelections();
	}

	return {
		selectedOfferings,
		comparisonSections: createComparisonSections(),
		hasSelections,
		clearSelections
	};
}