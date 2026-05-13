<script setup lang="ts">
defineProps<{
  recipe: {
    path: string
    title: string
    description?: string
    prepTime?: string
    cookTime?: string
    servings?: number
    tags?: string[]
    author?: string
  }
}>()
</script>

<template>
  <NuxtLink :to="recipe.path" class="recipe-card">
    <div class="recipe-card__title">{{ recipe.title }}</div>
    <div v-if="recipe.description" class="recipe-card__description">
      {{ recipe.description }}
    </div>
    <div class="recipe-card__meta">
      <span v-if="recipe.prepTime">Prep: {{ recipe.prepTime }}</span>
      <span v-if="recipe.cookTime"> · Cook: {{ recipe.cookTime }}</span>
      <span v-if="recipe.servings"> · Serves {{ recipe.servings }}</span>
    </div>
    <div v-if="recipe.author" class="recipe-card__author">By {{ recipe.author }}</div>
    <div v-if="recipe.tags?.length" class="tags">
      <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </NuxtLink>
</template>
