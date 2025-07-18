import capabilities from '$lib/data';
import offerings from '$lib/data/offerings.json';
import { comparisonStore, type SelectedOffering } from '$lib/stores/comparison';
import { get } from 'svelte/store';

export interface OfferingHeatmapViewModel {
	offering: any;
	offeringId: string;
	totalCapabilities: number;
	assessedCapabilities: number;
	completionPercentage: number;
	levelDistribution: {
		level1: number;
		level2: number;
		level3: number;
	};
	layers: any[];
	toggleSelection: () => void;
	getFillColor: (layer: string, level: number | undefined) => string;
}

export function createOfferingHeatmapViewModel(offeringId: string): OfferingHeatmapViewModel {
	const offering = offerings.offerings.find((offering) => offering.id === offeringId);

	if (!offering) {
		throw new Error(`Offering with id ${offeringId} not found`);
	}

	const selectedOffering: SelectedOffering = {
		id: offering.id,
		name: offering.name
	};

	// Simple helper function to check if selected
	function isCurrentlySelected(): boolean {
		const selections = get(comparisonStore);
		return selections.some(s => s.id === offeringId);
	}

	// Calculate summary statistics
	const totalCapabilities = (() => {
		let count = 0;
		for (const layer of capabilities) {
			for (const category of layer.categories) {
				if (category.subcategories) {
					for (const subcategory of category.subcategories) {
						count += subcategory.capabilities.length;
					}
				} else {
					count += category.capabilities.length;
				}
			}
		}
		return count;
	})();

	const assessedCapabilities = offering.capabilities.length;
	const completionPercentage = Math.round((assessedCapabilities / totalCapabilities) * 100);

	const levelDistribution = (() => {
		const distribution = { level1: 0, level2: 0, level3: 0 };
		offering.capabilities.forEach((cap) => {
			if (cap.level === 1) distribution.level1++;
			else if (cap.level === 2) distribution.level2++;
			else if (cap.level === 3) distribution.level3++;
		});
		return distribution;
	})();

	function getFillColor(layer: string, level: number | undefined): string {
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
		return 'bg-transparent';
	}

	function toggleSelection() {
		const currentlySelected = isCurrentlySelected();
		
		if (currentlySelected) {
			comparisonStore.removeOffering(offeringId);
		} else {
			comparisonStore.addOffering(selectedOffering);
		}
	}

	return {
		offering,
		offeringId,
		totalCapabilities,
		assessedCapabilities,
		completionPercentage,
		levelDistribution,
		layers: capabilities,
		toggleSelection,
		getFillColor
	};
}
