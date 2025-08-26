<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import ContactForm from './contact-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta name="keywords" content={data.meta.keywords} />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<main
	class="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 px-4 text-white"
>
	<section class="relative flex flex-col items-center gap-8 pt-28 pb-20">
		<div
			class="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
		>
			<div
				class="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-indigo-900/20"
			></div>
		</div>
		<img src={logo} alt="Kiba Group Logo" class="h-32 w-32 drop-shadow-xl" />
		<h1
			class="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent md:text-7xl"
		>
			The Kiba Group
		</h1>
		<p class="max-w-3xl text-center text-xl leading-relaxed text-gray-300 md:text-2xl">
			Elite security solutions for government and state contracts. We deliver mission-critical
			expertise in planning, tactics, and execution—trusted by agencies where security is paramount.
		</p>
		<div class="flex flex-col gap-4 sm:flex-row">
			<a
				href="#contact"
				class="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
			>
				Contact Us
			</a>
			<a
				href="#what-we-do"
				class="inline-block rounded-lg bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-white/20"
			>
				Our Capabilities
			</a>
		</div>
		<div
			class="grid grid-cols-2 gap-8 pt-10 text-center text-sm tracking-wide text-gray-400 uppercase md:grid-cols-4"
		>
			<div><span class="block text-3xl font-bold text-white">24/7</span>Readiness</div>
			<div><span class="block text-3xl font-bold text-white">98%</span>Retention</div>
			<div><span class="block text-3xl font-bold text-white">15+</span>Years Experience</div>
			<div><span class="block text-3xl font-bold text-white">100%</span>Mission Focus</div>
		</div>
	</section>

	<section id="what-we-do" class="relative mx-auto grid max-w-6xl gap-16 py-20 md:grid-cols-2">
		<div
			class="pointer-events-none absolute -inset-x-10 -inset-y-8 rounded-[4rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/0 md:-inset-x-20"
		></div>
		<div class="flex flex-col gap-6">
			<h2 class="mb-2 text-3xl font-bold">What We Do</h2>
			<ul class="space-y-4 text-lg text-gray-200">
				<li>
					<span class="font-semibold text-white">Mission Planning:</span> Strategic security planning
					for high-stakes government and state operations.
				</li>
				<li>
					<span class="font-semibold text-white">Tactical Operations:</span> Deployment of highly trained
					teams for on-site and remote security needs.
				</li>
				<li>
					<span class="font-semibold text-white">Risk Assessment:</span> Comprehensive threat analysis
					and mitigation for sensitive projects.
				</li>
				<li>
					<span class="font-semibold text-white">Consulting & Training:</span> Empowering agencies with
					advanced security knowledge and best practices.
				</li>
			</ul>
			<div class="mt-6">
				<h3 class="mb-1 text-2xl font-semibold">Why Government & State Agencies Choose Us</h3>
				<ul class="list-inside list-disc space-y-1 text-base text-gray-300">
					<li>Proven track record with sensitive and classified contracts</li>
					<li>Discreet, reliable, and rapid response teams</li>
					<li>Custom solutions for unique mission requirements</li>
					<li>Strict compliance with all regulatory and security standards</li>
				</ul>
			</div>
		</div>
		<div class="relative z-10 flex flex-col items-center justify-center">
			<ContactForm />
		</div>
	</section>

	<section id="process" class="mx-auto max-w-6xl py-24">
		<h2 class="mb-10 text-center text-3xl font-bold">Operational Process</h2>
		<ol class="relative ml-4 space-y-10 border-l border-white/15">
			<li class="ml-6">
				<span
					class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold"
					>1</span
				>
				<h3 class="mb-1 text-xl font-semibold">Intelligence & Assessment</h3>
				<p class="text-sm text-gray-400 md:text-base">
					We gather mission parameters, constraints, and threat landscape to build an operational
					picture.
				</p>
			</li>
			<li class="ml-6">
				<span
					class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold"
					>2</span
				>
				<h3 class="mb-1 text-xl font-semibold">Strategic Planning</h3>
				<p class="text-sm text-gray-400 md:text-base">
					Custom tactical frameworks, resource allocation, and contingency matrices are produced.
				</p>
			</li>
			<li class="ml-6">
				<span
					class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold"
					>3</span
				>
				<h3 class="mb-1 text-xl font-semibold">Execution & Oversight</h3>
				<p class="text-sm text-gray-400 md:text-base">
					Teams deploy with real-time communication, adaptive decision support, and continuous
					monitoring.
				</p>
			</li>
			<li class="ml-6">
				<span
					class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold"
					>4</span
				>
				<h3 class="mb-1 text-xl font-semibold">After Action Review</h3>
				<p class="text-sm text-gray-400 md:text-base">
					Detailed debrief, risk deltas, and optimization recommendations for sustained readiness.
				</p>
			</li>
		</ol>
	</section>

	<section class="relative mx-auto max-w-5xl py-24 text-center">
		<div
			class="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-900/20 via-transparent to-indigo-900/20"
		></div>
		<blockquote
			class="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-2xl leading-relaxed font-semibold text-transparent md:text-3xl"
		>
			"Precision, discipline, and unwavering commitment—The Kiba Group elevates every mission
			profile they touch."
		</blockquote>
		<div class="mt-6 text-sm tracking-wide text-gray-400 uppercase">Federal Program Liaison</div>
	</section>

	<section class="mx-auto max-w-3xl pb-24 text-center text-base text-gray-400">
		<p class="leading-relaxed">
			The Kiba Group is committed to safeguarding your mission. Contact us for a confidential
			consultation and discover how our expertise can support your agency’s objectives.
		</p>
	</section>
</main>
