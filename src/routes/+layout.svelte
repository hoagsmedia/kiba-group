<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '../app.css';
	import favicon from '$lib/assets/logo.svg';
	import logo from '$lib/assets/logo.svg';

	let { children } = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/#what-we-do', label: 'Capabilities' },
		{ href: '/#process', label: 'Process' },
		{ href: '/#contact', label: 'Contact' }
	];

	let scrolled = $state(false);
	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
</svelte:head>
<Toaster />

<a
	href="#main"
	class="sr-only rounded bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
>
	Skip to content
</a>

<header class="fixed inset-x-0 top-0 z-50">
	<div
		class={`relative transition-colors duration-300 ${scrolled ? 'border-b border-white/10 bg-black/70 backdrop-blur' : 'border-b border-transparent bg-transparent'}`}
	>
		<div
			class="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)] select-none"
		>
			<div class="h-full w-full bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
		</div>
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
			<a href="/" class="flex items-center gap-2 text-lg font-bold tracking-wide drop-shadow">
				<img src={logo} alt="Kiba Group" class="h-8 w-8" />
				<span class={`${scrolled ? 'text-white' : 'text-white/95'} transition-colors`}
					>The Kiba Group</span
				>
			</a>
			<nav class="hidden items-center gap-8 text-sm md:flex">
				{#each nav as item}
					<a
						href={item.href}
						class={`font-medium drop-shadow-sm transition-colors ${scrolled ? 'text-gray-300 hover:text-white' : 'text-white/80 hover:text-white'}`}
						>{item.label}</a
					>
				{/each}
			</nav>
		</div>
	</div>
</header>

<div id="main" class="flex min-h-[calc(100vh-4rem)] flex-col">
	{@render children?.()}
</div>

<footer class="relative mt-0 overflow-hidden border-t border-white/10 bg-[#0b0f17] text-gray-400">
	<div
		class="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top_left,rgba(47,76,138,0.35),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(24,56,128,0.25),transparent_65%)]"
	></div>
	<div
		class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"
	></div>
	<div class="relative mx-auto grid max-w-7xl gap-10 px-6 pt-10 pb-14 md:grid-cols-3">
		<div class="space-y-4">
			<div class="flex items-center gap-2 font-semibold text-white">
				<img src={logo} alt="Kiba Group" class="h-8 w-8" />
				<span>The Kiba Group</span>
			</div>
			<p class="max-w-sm text-sm leading-relaxed text-gray-400">
				Mission-ready security solutions for government and state agencies. Precision planning,
				disciplined execution.
			</p>
		</div>
		<nav class="space-y-3 text-sm">
			<h3 class="text-xs font-semibold tracking-wide text-white uppercase">Navigate</h3>
			<div class="flex flex-col gap-2">
				{#each nav as item}
					<a href={item.href} class="transition-colors hover:text-blue-300">{item.label}</a>
				{/each}
			</div>
		</nav>
		<div class="space-y-3 text-sm">
			<h3 class="text-xs font-semibold tracking-wide text-white uppercase">Contact</h3>
			<p class="text-gray-400">Secure liaison available 24/7 for priority mission requests.</p>
			<a
				href="#contact"
				class="inline-block rounded bg-blue-600/80 px-4 py-2 text-xs font-medium tracking-wide text-white shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400/60 focus:outline-none"
				>Request Briefing</a
			>
		</div>
	</div>
	<div class="relative border-t border-white/10">
		<div
			class="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between"
		>
			<p>&copy; {new Date().getFullYear()} The Kiba Group. All rights reserved.</p>
			<p class="tracking-wide text-gray-400">Secure • Precise • Mission‑Ready</p>
		</div>
	</div>
</footer>
