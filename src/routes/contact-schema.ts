import { z } from 'zod/v3';
import { type ZodObjectType } from 'sveltekit-superforms/adapters';

// export const classificationSchema = ['Unclassified', 'CUI', 'Secret', 'Top Secret'] as const;

export const contactSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.min(2, 'Name must be at least 2 characters')
			.max(100, 'Name must be less than 100 characters'),
		email: z
			.string({ required_error: 'Email is required' })
			.min(5, 'Email must be at least 5 characters')
			.max(100, 'Email must be less than 100 characters')
			.email('Please enter a valid email address'),
		organization: z
			.string({ required_error: 'Organization is required' })
			.min(2, 'Organization name must be at least 2 characters')
			.max(100, 'Organization name must be less than 100 characters'),
		phone: z
			.string({ required_error: 'Phone number is required' })
			.min(10, 'Phone number must be at least 10 digits')
			.max(15, 'Phone number must be less than 15 digits')
			.regex(/^[\d\s\-+().]+$/, 'Please enter a valid phone number'),
		classification: z
			.string({ required_error: 'Classification is required' })
			.min(1, 'Please select a classification level'),
		message: z
			.string({ required_error: 'Message is required' })
			.min(10, 'Message must be at least 10 characters for security review')
			.max(1000, 'Message must be less than 1000 characters'),
		honeypot: z.string().optional()
	})
	.strip() as unknown as ZodObjectType;

export type ContactSchema = typeof contactSchema;
