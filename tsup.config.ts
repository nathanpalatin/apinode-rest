import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src'],
	splitting: false,
	sourcemap: true,
	clean: true,
	external: ['mock-aws-s3', 'aws-sdk', 'nock', '#async_hooks'],
	target: 'es2020'
})
