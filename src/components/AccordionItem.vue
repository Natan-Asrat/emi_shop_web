<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="`flush-heading-${index}`">
      <div class="header-content">
        <router-link :to="{ name: 'posts', params: { categoryId: item.id } }">
          <button class="btn btn-success me-2 gotopost">
            Posts
          </button>
        </router-link>
        <button
          class="accordion-button collapsed"
          type="button"
          :data-bs-toggle="'collapse'"
          :data-bs-target="`#flush-collapse-${index}`"
          aria-expanded="false"
          :aria-controls="`flush-collapse-${index}`"
          @click="toggleAccordion"
          :disabled="item.isPlaceholder"
        >
          {{ item.name }}
        </button>
      </div>
    </h2>
    <div
      :id="`flush-collapse-${index}`"
      class="accordion-collapse collapse"
      :aria-labelledby="`flush-heading-${index}`"
      :data-bs-parent="`#accordionFlushExample-${index}`"
    >
      <div class="accordion-body">
        <div v-if="loading">Loading subcategories...</div>
        <div v-else-if="!item.subcategories || item.subcategories.length === 0">
          <p>No subcategories available.</p>
        </div>
        <div v-else>
          <div class="accordion" :id="`accordionFlushExample-${index}`">
            <AccordionItem
              v-for="(sub, subIndex) in item.subcategories"
              :key="sub.id"
              :item="sub"
              :index="`${index}-${subIndex}`"
              @loadSubcategories="$emit('loadSubcategories', sub)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async toggleAccordion() {
      if (!this.item.subcategories && !this.item.isPlaceholder) {
        this.loading = true;
        await this.$emit('loadSubcategories', this.item);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.accordion-button {
  cursor: pointer;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-content .btn {
  margin-right: 8px; /* Adjust spacing between the buttons */
}

.gotopost{
    height: 40px;
    margin: 4px;
    text-align: center;
}
</style>
