import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { contactSchema } from './contact-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		title: 'The Kiba Group - Elite Security Solutions',
		meta: {
			description:
				'Elite security solutions for government and state contracts. Mission planning, tactics, and execution expertise.',
			keywords: 'security, government contracts, tactical operations, mission planning'
		},
		form: await superValidate(zod(contactSchema))
	};
};

export const actions: Actions = {
	contact: async (event) => {
		const form = await superValidate(event, zod(contactSchema));
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
