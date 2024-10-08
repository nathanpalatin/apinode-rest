import { z } from 'zod'

export const getTokenHeaderSchema = z.object({
	userId: z.string()
})

export const getRefreshTokenSchema = z.object({
	refreshToken: z.string()
})

export const createUserSchemaBody = z.object({
	name: z.string(),
	cpf: z.string(),
	birthdate: z.string(),
	password: z.string().min(6),
	email: z.string().email(),
	phone: z.string()
})

export const getUserParamsSchema = z.object({
	username: z.string()
})

export const getUserCredentialSchema = z.object({
	credential: z.string()
})

export const updateUserSchemaBody = z.object({
	name: z.string().optional(),
	username: z.string().optional(),
	phone: z.string().optional(),
	avatar: z.string().optional()
})

export const createLoginSchemaBody = z.object({
	credential: z.string(),
	password: z.string().min(6)
})

export const createWalletSchema = z.object({
	balance: z.number(),
	coinType: z.string(),
	country: z.string()
})
