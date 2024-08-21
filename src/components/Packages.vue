<template>
<div class="container">

    <h1 class="ml-3 mb-4 mt-2">Packages</h1>
<div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
    <PackageItem 
        v-for = "(package_item, index) in packages_list"
        :key = "package_item.id"
        :coin_amount_in_words = "package_item.coin_amount_in_words"
        :hasDiscount = "package_item.hasDiscount"
        :original_price_in_words = "package_item.original_price_in_words"
        :discounted_price_in_words = "package_item.discounted_price_in_words"
        :level_of_payment_1_through_4 = "package_item.level_of_payment_1_through_4"
    />
    </div>
    </div>
</template>

<script>
import PackageItem from './PackageItem.vue';
import axios from 'axios';
import {BASE_URL} from '../config.js';

export default {
    components: {
        PackageItem
    },
    data() {
        return {
            packages_list: [
                {
        "id": 5,
        "coin_amount_in_words": "Loading...",
        "hasDiscount": false,
        "original_price_in_words": "Loading...",
        "discounted_price_in_words": "",
        "level_of_payment_1_through_4": 1
    },
    {
        "id": 4,
        "coin_amount_in_words": "Loading...",
        "hasDiscount": true,
        "original_price_in_words": "Loading...",
        "discounted_price_in_words": "Loading...",
        "level_of_payment_1_through_4": 2
    },
    {
        "id": 3,
        "coin_amount_in_words": "Loading...",
        "hasDiscount": true,
        "original_price_in_words": "Loading...",
        "discounted_price_in_words": "Loading...",
        "level_of_payment_1_through_4": 3
    },
    {
        "id": 2,
        "coin_amount_in_words": "Loading...",
        "hasDiscount": true,
        "original_price_in_words": "Loading...",
        "discounted_price_in_words": "Loading...",
        "level_of_payment_1_through_4": 3
    },
    {
        "id": 1,
        "coin_amount_in_words": "Loading..",
        "hasDiscount": true,
        "original_price_in_words": "Loading...",
        "discounted_price_in_words": "Loading...",
        "level_of_payment_1_through_4": 4,
    }
            ],  // Start with an empty array for cards
      apiEndpoint: `${BASE_URL}/packages_anonymous/`
        }
    },
    async created() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                let url = this.apiEndpoint;
                const response = await axios.get(url);
                this.packages_list = response.data;  // Load the fetched data into cards

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
}

</script>