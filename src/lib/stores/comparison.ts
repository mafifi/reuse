import { writable, derived } from 'svelte/store';

export interface SelectedOffering {
	id: string;
	name: string;
}

const MAX_SELECTIONS = 4;

function createComparisonStore() {
	const store = writable<SelectedOffering[]>([]);
	const { subscribe, set, update } = store;

	return {
		subscribe,
		addOffering: (offering: SelectedOffering) => {
			update(selections => {
				if (selections.length >= MAX_SELECTIONS) {
					return selections;
				}
				if (selections.find(s => s.id === offering.id)) {
					return selections;
				}
				return [...selections, offering];
			});
		},
		removeOffering: (offeringId: string) => {
			update(selections => selections.filter(s => s.id !== offeringId));
		},
		clearSelections: () => set([])
	};
}

export const comparisonStore = createComparisonStore();

export const canCompare = derived(
	comparisonStore,
	$selections => $selections.length >= 2
);

export const selectionCount = derived(
	comparisonStore,
	$selections => $selections.length
);

export const isMaxSelections = derived(
	comparisonStore,
	$selections => $selections.length >= MAX_SELECTIONS
);