<script setup lang="ts">
const { data: recipes } = await useAsyncData('recipes', () =>
  queryCollection('recipes')
    .select('path', 'title', 'description', 'prepTime', 'cookTime', 'servings', 'tags', 'author')
    .order('title', 'ASC')
    .all()
)

useHead({ title: 'All Recipes | Recipe Box' })
</script>

<template>
  <div>
    <h1 class="page-title">All Recipes</h1>
    <p class="page-subtitle">{{ recipes?.length ?? 0 }} recipes in the box</p>
    <div v-if="recipes?.length" class="recipe-grid">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.path"
        :recipe="recipe"
      />
    </div>
    <p v-else>No recipes yet. Check back soon!</p>
  </div>
</template>
