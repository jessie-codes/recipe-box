<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  prepTime?: string
  cookTime?: string
  servings?: number
  tags?: string[]
  author?: string
}>()
</script>

<template>
  <div class="recipe-header">
    <NuxtLink to="/" class="back-link">← All Recipes</NuxtLink>
    <h1 class="recipe-header__title">{{ title }}</h1>
    <p v-if="description" class="recipe-header__description">{{ description }}</p>
    <p v-if="author" class="recipe-header__author">By {{ author }}</p>
    <div class="recipe-header__stats">
      <div v-if="prepTime" class="recipe-header__stat">
        <label>Prep Time</label>
        <span>{{ prepTime }}</span>
      </div>
      <div v-if="cookTime" class="recipe-header__stat">
        <label>Cook Time</label>
        <span>{{ cookTime }}</span>
      </div>
      <div v-if="servings" class="recipe-header__stat">
        <label>Servings</label>
        <span>{{ servings }}</span>
      </div>
    </div>
    <div v-if="tags?.length" class="tags" style="margin-top: 1rem">
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>
