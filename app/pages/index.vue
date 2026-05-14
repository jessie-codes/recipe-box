<script setup lang="ts">
const { data: recipes } = await useAsyncData('recipes', () =>
  queryCollection('recipes')
    .select('path', 'title', 'description', 'prepTime', 'cookTime', 'servings', 'tags', 'author')
    .order('title', 'ASC')
    .all()
)

const searchQuery = ref('')
const showSuggestions = ref(false)

const allTags = computed(() => {
  const tagSet = new Set<string>()
  recipes.value?.forEach(r => r.tags?.forEach(t => tagSet.add(t)))
  return [...tagSet].sort()
})

const suggestedTags = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return allTags.value
  return allTags.value.filter(t => t.toLowerCase().includes(q))
})

function selectTag(tag: string) {
  searchQuery.value = tag
  showSuggestions.value = false
}

const filteredRecipes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q || !recipes.value) return recipes.value ?? []
  return recipes.value.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.tags?.some(t => t.toLowerCase().includes(q))
  )
})

useHead({ title: 'All Recipes | Recipe Box' })
</script>

<template>
  <div>
    <h1 class="page-title">All Recipes</h1>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search by name or tag..."
        class="search-input"
        @focus="showSuggestions = true"
        @blur="showSuggestions = false"
      />
      <ul v-if="showSuggestions && suggestedTags.length" class="tag-suggestions">
        <li class="tag-suggestions__header">Tags</li>
        <li
          v-for="tag in suggestedTags"
          :key="tag"
          class="tag-suggestions__item"
          @mousedown.prevent="selectTag(tag)"
        ><span class="tag-suggestions__hash">#</span>{{ tag }}</li>
      </ul>
    </div>
    <p class="page-subtitle">
      {{ filteredRecipes.length }} recipe{{ filteredRecipes.length !== 1 ? 's' : '' }}
      <template v-if="searchQuery"> matching "{{ searchQuery }}"</template>
      <template v-else>in the box</template>
    </p>
    <div v-if="filteredRecipes.length" class="recipe-grid">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.path"
        :recipe="recipe"
        @tag-click="searchQuery = $event"
      />
    </div>
    <p v-else-if="searchQuery">No recipes match your search.</p>
    <p v-else>No recipes yet. Check back soon!</p>
  </div>
</template>
