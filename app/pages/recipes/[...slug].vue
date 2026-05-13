<script setup lang="ts">
const route = useRoute()
const slugParts = route.params.slug as string[]
const path = '/recipes/' + slugParts.join('/')

const { data: recipe } = await useAsyncData(
  `recipe-${path}`,
  () => queryCollection('recipes').path(path).first()
)

if (!recipe.value) {
  throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
}

useHead({ title: `${recipe.value.title} | Recipe Box` })
</script>

<template>
  <article v-if="recipe">
    <RecipeHeader
      :title="recipe.title"
      :description="recipe.description"
      :prep-time="recipe.prepTime"
      :cook-time="recipe.cookTime"
      :servings="recipe.servings"
      :tags="recipe.tags"
      :author="recipe.author"
    />
    <div class="recipe-body">
      <ContentRenderer :value="recipe" />
    </div>
  </article>
</template>
