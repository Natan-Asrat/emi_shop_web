<template>

  <div class="container">
  
    <h1 class="ml-3 mb-4 mt-2">Categories</h1>
    <div class="accordion" id="accordionFlushExample">
      <AccordionItem
        v-for="(category, index) in categories"
        :key="category.id"
        :item="category"
        :index="index"
        @loadSubcategories="fetchSubcategories"
      />
    </div>
  </div>
</template>

<script>
import AccordionItem from './AccordionItem.vue';
import { BASE_URL } from '../config.js';

export default {
  components: { AccordionItem },
  data() {
    return {
      categories: [
        // Placeholder data until actual categories load
        { id: 0, name: 'Loading...', subcategories: [], isPlaceholder: true }
      ]
    };
  },
  async created() {
    try {
      const response = await fetch(`${BASE_URL}/categories_anonymous/`);
      this.categories = await response.json();
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },
  methods: {
    async fetchSubcategories(item) {
      if (item.isPlaceholder) return; // Skip loading for placeholder items

      try {
        const response = await fetch(item.children);
        const data = await response.json();
        item.subcategories = data;
      } catch (error) {
        console.error('Failed to load subcategories:', error);
        item.subcategories = []; // Ensure it's not undefined
      }
    }
  }
};
</script>
