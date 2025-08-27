<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { contactSchema, type ContactSchema } from './contact-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<ContactSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(contactSchema as any),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`Form submitted!`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form
	class="flex w-full max-w-lg flex-col gap-6 rounded-xl border border-white/20 bg-gradient-to-b from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-sm"
	method="POST"
	action="?/contact"
	use:enhance
	id="contact"
>
	<div class="space-y-2">
		<h2 class="text-3xl font-bold text-white">Secure Contact</h2>
		<p class="text-sm leading-relaxed text-gray-300">
			Exclude classified specifics. We will establish a secure channel if required.
		</p>
	</div>

	<div class="hidden">
		<label
			>Do not fill
			<input name="honeypot" bind:value={$formData.honeypot} tabindex="-1" autocomplete="off" />
		</label>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="mb-2 block text-sm font-medium text-white">Name *</Form.Label>
					<Input
						class="w-full rounded-lg border border-gray-600/50 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						placeholder="Your full name"
						autocomplete="name"
						{...props}
						bind:value={$formData.name}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-xs text-red-400" />
		</Form.Field>
		<Form.Field {form} name="organization">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="mb-2 block text-sm font-medium text-white">Organization *</Form.Label>
					<Input
						class="w-full rounded-lg border border-gray-600/50 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						placeholder="Your organization"
						autocomplete="organization"
						{...props}
						bind:value={$formData.organization}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-xs text-red-400" />
		</Form.Field>
	</div>
	<div class="grid gap-6 md:grid-cols-2">
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="mb-2 block text-sm font-medium text-white">Email *</Form.Label>
					<Input
						class="w-full rounded-lg border border-gray-600/50 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						placeholder="your.email@organization.com"
						autocomplete="email"
						type="email"
						{...props}
						bind:value={$formData.email}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-xs text-red-400" />
		</Form.Field>
		<Form.Field {form} name="phone">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="mb-2 block text-sm font-medium text-white">Phone</Form.Label>
					<Input
						class="w-full rounded-lg border border-gray-600/50 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						placeholder="+1 (555) 123-4567"
						autocomplete="tel"
						type="tel"
						{...props}
						bind:value={$formData.phone}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-xs text-red-400" />
		</Form.Field>
	</div>
	<Form.Field {form} name="classification">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="mb-2 block text-sm font-medium text-white">
					Classification Context
				</Form.Label>
				<div class="w-full">
					<Select.Root
						type="single"
						bind:value={$formData.classification as string}
						name={props.name}
					>
						<Select.Trigger
							{...props}
							class="w-full rounded-lg border border-gray-600/50 bg-gray-900/80 px-4 py-3 text-left text-white transition-all duration-200 focus:border-blue-400 focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						>
							<span class={$formData.classification ? 'text-white' : 'text-gray-400'}>
								{$formData.classification
									? $formData.classification
									: 'Select Classification Level'}
							</span>
						</Select.Trigger>
						<Select.Content class="rounded-lg border border-gray-600 bg-gray-900 shadow-xl">
							<Select.Item value="Unclassified" class="px-4 py-2 text-white hover:bg-gray-800"
								>Unclassified</Select.Item
							>
							<Select.Item value="CUI" class="px-4 py-2 text-white hover:bg-gray-800"
								>CUI (Controlled)</Select.Item
							>
							<Select.Item value="Secret" class="px-4 py-2 text-white hover:bg-gray-800"
								>Secret</Select.Item
							>
							<Select.Item value="Top Secret" class="px-4 py-2 text-white hover:bg-gray-800"
								>Top Secret (Request Secure Channel)</Select.Item
							>
						</Select.Content>
					</Select.Root>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors class="mt-1 text-xs text-red-400" />
	</Form.Field>

	<Form.Field {form} name="message">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="mb-2 block text-sm font-medium text-white">Message *</Form.Label>
				<Textarea
					{...props}
					name="message"
					class="w-full resize-none rounded-lg border border-gray-600/50 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					placeholder="Describe your security requirements or consultation needs..."
					rows={4}
					bind:value={$formData.message as string}
					minlength={20}
				></Textarea>
				<p class="mt-1 text-xs text-gray-400">Minimum 20 characters. Exclude sensitive details.</p>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors class="mt-1 text-xs text-red-400" />
	</Form.Field>

	<Form.Button
		class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:from-blue-600 disabled:hover:to-blue-700"
		>Submit Secure Contact Request</Form.Button
	>
</form>
