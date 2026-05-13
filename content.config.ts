import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/*.md',
      schema: z.object({
        description: z.string().optional(),
        servings: z.number().optional(),
        prepTime: z.string().optional(),
        cookTime: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional()
      })
    })
  }
})
