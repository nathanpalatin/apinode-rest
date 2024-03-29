import { FastifyInstance } from 'fastify'
import { knex } from '../database'

import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { checkSessionIdExists } from '../middlewares/check-session-id'

export async function productsRoutes(app: FastifyInstance) {

	app.get('/', async () => {
			const products = await knex('Products').select()
			return  { products } 
		}
	)

	app.get('/:slug', async request => {
			const getProductsParamsSchema = z.object({
				slug: z.string()
			})

			const { slug } = getProductsParamsSchema.parse(request.params)

			const product = await knex('Products')
				.where({
					slug
				})
				.first()

			return { product }
		}
	)

	app.post('/', async (request, reply) => {
		const createProductsBodySchema = z.object({
			title: z.string(),
			slug: z.string(),
			description: z.string(),
			price: z.number(),
			image: z.string(),
			featured: z.boolean(),
		})

		const { title, slug, price, image, description, featured } = createProductsBodySchema.parse(request.body)

		await knex('Products').insert({
			id: randomUUID(),
			title,
			slug,
			description,
			price,
			image,
			featured
		})

		return reply.status(201).send('Product created successfully!')
	})

	app.put(
		'/:id',
		{
			preHandler: [checkSessionIdExists]
		},
		async (request, reply) => {
			const getProductsParamsSchema = z.object({
				id: z.string().uuid()
			})

			const createProductsBodySchema = z.object({
				title: z.string(),
				slug: z.string(),
				price: z.number(),
				description: z.string(),
				image: z.string(),
				featured: z.boolean()
			})
			const { id } = getProductsParamsSchema.parse(request.params)

			const { title, price, slug, description, image, featured } = createProductsBodySchema.parse(request.body)

			await knex('Products')
				.update({
					title,
					slug,
					price,
					description,
					image,
					featured
				})
				.where({
					id
				})

			return reply.status(204).send('Product updated successfully!')
		}
	)

	app.delete(
		'/',
		{
			preHandler: [checkSessionIdExists]
		},
		async (request, reply) => {
			const { sessionId } = request.cookies
			await knex('Products').delete().where('session_id', sessionId)

			return reply.status(204).send('All products deleted successfully')
		}
	)

	app.delete('/:id',
	{
		preHandler: [checkSessionIdExists]
	}, async (request, reply) => {
			const getProductsParamsSchema = z.object({
				id: z.string().uuid()
			})

			const { id } = getProductsParamsSchema.parse(request.params)

			await knex('Products').delete().where({
				id,
			})

			return reply.status(204).send('Product deleted successfully')
		}
	)
	
}
