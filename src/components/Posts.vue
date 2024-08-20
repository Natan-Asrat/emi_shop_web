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
          @button-clicked="handleCardClick(card.id)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Card from './Card.vue';
import axios from 'axios';
import {BASE_URL} from '../config.js';
export default {
  components: {
    Card
  },
  data() {
    return {
      cards: [
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 1
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 2
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 3
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 4
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 5
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 6
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 7
        },
        {
          image: '',
          title: 'Loading...',
          description: 'Loading...',
          nextIconAction: 'N',
          link: 'https://example.com',
          postId: 8
        }
        // Add more cards as needed
      ],
      apiEndpoint: `${BASE_URL}/posts_anonymous/`
    };
  },
  async created() {
    await this.fetchData();
  },
  async mounted() {
    try {
      const response = await axios.get(this.apiEndpoint);
      const fetchedCards = response.data['results'];
      console.log(fetchedCards);
      this.cards = fetchedCards;

      // If you want to append the fetched data to the initial cards:
      // this.cards = [...this.cards, ...fetchedCards];

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/posts_anonymous`);
        this.cards = response.data['results'];  // Load the first 8 items initially
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