import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { contactSchema } from './contact-schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
	IP: [10, 'h'], // IP address limiter
	IPUA: [5, 'm'] // IP + User Agent limiter
});

export const load: PageServerLoad = async () => {
	return {
		title: 'The Kiba Group - Elite Security Solutions',
		meta: {
			description:
				'Elite security solutions for government and state contracts. Mission planning, tactics, and execution expertise.',
			keywords: 'security, government contracts, tactical operations, mission planning'
		},
		form: await superValidate(zod4(contactSchema))
	};
};

export const actions: Actions = {
	contact: async (event) => {
		if (await limiter.isLimited(event)) error(429);
		const form = await superValidate(event, zod4(contactSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
