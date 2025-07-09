<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	let currentPath = $derived(page.url.pathname);

	let { children } = $props();
</script>

<nav
	class="border-border sticky top-0 z-50 border-b bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm"
>
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 justify-between">
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex shrink-0 items-center">
					<img class="h-8 w-auto" src="./favicon.svg" alt="Architecture Overview" />
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<a
						href="/"
						class={cn(
							'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700',
							currentPath === '/' &&
								'border-midnight-blue-500 text-midnight-blue-700 hover:border-midnight-blue-500 hover:text-midnight-blue-700'
						)}>Architecture</a
					>
					<a
						href="/offerings"
						class={cn(
							'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700',
							currentPath === '/offerings' &&
								'border-midnight-blue-500 text-midnight-blue-700 hover:border-midnight-blue-500 hover:text-midnight-blue-700'
						)}>Offerings</a
					>
				</div>
			</div>
		</div>
	</div>
</nav>

{@render children()}
