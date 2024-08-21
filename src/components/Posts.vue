<template>
  <div class="container">
    <h1 class="ml-3 mb-4 mt-2">Posts</h1>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="card in cards" :key="card.postId">
        <Card
          :imgSrc="card.image"
          :title="card.title"
          :description="card.description"
          :buttonText="card.buttonText"
          :buttonType="card.nextIconAction"
          :followLink="card.link"
          :postId="card.postId"
          @button-clicked="handleCardClick(card.postId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import axios from 'axios';
import { BASE_URL } from '../config.js';

export default {
  components: {
    Card
  },
  data() {
    return {
      cards: [],  // Start with an empty array for cards
      apiEndpoint: `${BASE_URL}/posts_anonymous/`
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const categoryId = this.$route.params.categoryId;  // Get categoryId from route params
        let url = this.apiEndpoint;

        if (categoryId) {
          url = `${this.apiEndpoint}?category=${categoryId}`; // Append categoryId to endpoint if present
        }

        const response = await axios.get(url);
        this.cards = response.data['results'];  // Load the fetched data into cards

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    handleCardClick(cardId) {
      console.log('Card clicked:', cardId);
    }
  }
};
</script>
