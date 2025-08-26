import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		title: 'The Kiba Group - Elite Security Solutions',
		meta: {
			description:
				'Elite security solutions for government and state contracts. Mission planning, tactics, and execution expertise.',
			keywords: 'security, government contracts, tactical operations, mission planning'
		}
	};
};

export const actions: Actions = {
	contact: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString()?.trim();
		const email = data.get('email')?.toString()?.trim();
		const organization = data.get('organization')?.toString()?.trim();
		const phone = data.get('phone')?.toString()?.trim();
		const classification = data.get('classification')?.toString() || 'Unclassified';
		const message = data.get('message')?.toString()?.trim();
		const honeypot = data.get('honeypot')?.toString();

		// Bot protection
		if (honeypot) {
			return fail(400, { error: 'Invalid submission' });
		}

		// Validation
		if (!name || !email || !message) {
			return fail(400, {
				error: 'All required fields must be completed.',
				name,
				email,
				organization,
				phone,
				classification,
				message
			});
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				name,
				email,
				organization,
				phone,
				classification,
				message
			});
		}

		if (message.length < 20) {
			return fail(400, {
				error: 'Please provide at least 20 characters of detail.',
				name,
				email,
				organization,
				phone,
				classification,
				message
			});
		}

		try {
			// Log contact submission (in production, send to secure email/database)
			console.log('Contact submission:', {
				name,
				email,
				organization,
				phone,
				classification,
				message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
				timestamp: new Date().toISOString()
			});

			// Simulate processing delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			// In production:
			// - Send secure email notification
			// - Store in encrypted database
			// - Create tracking ticket
			// - Integrate with CRM/case management system

			return {
				success: true,
				message: 'Thank you for reaching out. We will respond promptly through secure channels.'
			};
		} catch (err) {
			console.error('Contact form error:', err);
			return fail(500, {
				error: 'An unexpected error occurred. Please try again or contact us directly.',
				name,
				email,
				organization,
				phone,
				classification,
				message
			});
		}
	}
};
