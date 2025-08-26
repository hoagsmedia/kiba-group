<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	// Svelte 5 runes for reactive state
	let name = $state('');
	let email = $state('');
	let organization = $state('');
	let phone = $state('');
	let message = $state('');
	let classification = $state<'Unclassified' | 'CUI' | 'Secret' | 'Top Secret'>('Unclassified');
	let honeypot = $state('');

	let loading = $state(false);
	let submitted = $state(false);
	let error = $state<string | null>(null);
	let successMsg = $state('');

	// Form enhancement for progressive enhancement
	const submitForm: SubmitFunction = ({ formData, cancel }) => {
		// Client-side validation
		if (honeypot) {
			cancel();
			return;
		}

		const nameVal = formData.get('name')?.toString()?.trim();
		const emailVal = formData.get('email')?.toString()?.trim();
		const messageVal = formData.get('message')?.toString()?.trim();

		if (!nameVal || !emailVal || !messageVal) {
			error = 'All required fields must be completed.';
			cancel();
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if (!emailRegex.test(emailVal)) {
			error = 'Please enter a valid email address.';
			cancel();
			return;
		}

		if (messageVal.length < 20) {
			error = 'Please provide at least 20 characters of detail.';
			cancel();
			return;
		}

		loading = true;
		error = null;

		return async ({ result }) => {
			loading = false;

			if (result.type === 'success') {
				submitted = true;
				successMsg =
					result.data?.message || 'Thank you for reaching out. We will respond promptly.';
				// Reset form
				name = '';
				email = '';
				organization = '';
				phone = '';
				message = '';
				classification = 'Unclassified';
			} else if (result.type === 'failure') {
				error = result.data?.error || 'An unexpected error occurred.';
				// Restore form values if they were returned
				if (result.data?.name) name = result.data.name;
				if (result.data?.email) email = result.data.email;
				if (result.data?.organization) organization = result.data.organization;
				if (result.data?.phone) phone = result.data.phone;
				if (result.data?.message) message = result.data.message;
				if (result.data?.classification) classification = result.data.classification;
			}
		};
	};
</script>

<form
	class="flex w-full max-w-lg flex-col gap-5 rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl"
	method="POST"
	action="?/contact"
	use:enhance={submitForm}
	id="contact"
	aria-describedby={error ? 'contact-error' : submitted ? 'contact-success' : undefined}
>
	<h2 class="text-2xl font-bold text-white">Secure Contact</h2>
	<p class="-mt-2 text-xs text-gray-400">
		Exclude classified specifics. We will establish a secure channel if required.
	</p>

	{#if error}
		<div id="contact-error" class="text-sm text-red-400" role="alert">{error}</div>
	{/if}
	{#if submitted}
		<div id="contact-success" class="text-base font-semibold text-green-400" role="status">
			{successMsg}
		</div>
	{/if}

	{#if !submitted}
		<div class="hidden">
			<label
				>Do not fill
				<input name="honeypot" bind:value={honeypot} tabindex="-1" autocomplete="off" />
			</label>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			<label class="flex flex-col gap-1 text-sm text-white">
				Name *
				<input
					name="name"
					class="rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={name}
					required
					autocomplete="name"
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm text-white">
				Organization
				<input
					name="organization"
					class="rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={organization}
					autocomplete="organization"
				/>
			</label>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			<label class="flex flex-col gap-1 text-sm text-white">
				Email *
				<input
					name="email"
					type="email"
					class="rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={email}
					required
					autocomplete="email"
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm text-white">
				Phone
				<input
					name="phone"
					type="tel"
					class="rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={phone}
					autocomplete="tel"
				/>
			</label>
		</div>
		<label class="flex flex-col gap-1 text-sm text-white">
			Classification Context
			<select
				name="classification"
				class="rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				bind:value={classification}
			>
				<option value="Unclassified">Unclassified</option>
				<option value="CUI">CUI (Controlled)</option>
				<option value="Secret">Secret</option>
				<option value="Top Secret">Top Secret (Request Secure Channel)</option>
			</select>
		</label>
		<label class="flex flex-col gap-1 text-sm text-white">
			Message *
			<textarea
				name="message"
				class="rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				rows="5"
				bind:value={message}
				required
				minlength={20}
			></textarea>
			<span class="text-[10px] text-gray-500">Min 20 characters. Exclude sensitive details.</span>
		</label>
		<button
			type="submit"
			class="mt-2 inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:opacity-60"
			disabled={loading}
		>
			{#if loading}
				<span class="relative flex h-4 w-4">
					<span
						class="absolute inset-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
					></span>
				</span>
				Sending...
			{:else}
				Send Secure Request
			{/if}
		</button>
	{/if}
</form>
