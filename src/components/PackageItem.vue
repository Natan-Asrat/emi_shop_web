<template>
    <div class="col mt-3 mb-3">
        <div class="card mb-4 rounded-3 shadow-sm" :class="{ 'border-primary': level_of_payment_1_through_4 >= 2 }">
            <div class="card-header py-3" :class = "{ 'text-bg-primary border-primary' : level_of_payment_1_through_4 >=3 }">
            <img v-if="level_of_payment_1_through_4==1" width="60" height="60" src="/two_coins.png"/>
            <img v-else-if="level_of_payment_1_through_4==2" width="60" height="60" src="/column coins.png"/>
            <img v-else-if="level_of_payment_1_through_4==3" width="60" height="60" src="/multiple_coins.png"/>
            <img v-else-if="level_of_payment_1_through_4==4" width="60" height="60" src="/bag_coins.png"/>
            <h4 class="my-0 fw-normal">{{coin_amount_in_words}}</h4>
            </div>
            <div class="card-body">
            <div v-if="hasDiscount" >
                <h1 class="text-body-secondary fw-light"><del>{{original_price_in_words}}</del><br><small class="card-title pricing-card-title fw-bold">&nbsp {{discounted_price_in_words}}</small></h1>
            </div>
            <div v-else>
                <h1 class="card-title pricing-card-title">{{original_price_in_words}}</h1>
            </div>
            
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
        coin_amount_in_words: {
            type: String,
            required: true
        },
        hasDiscount: {
            type: Boolean,
            required: true
        },
        original_price_in_words: {
            type: String,
            required: true

        },
        discounted_price_in_words: {
            type: String,
            required: false,
        },
        level_of_payment_1_through_4: {
            type: Number,
            required: true
        },

    },
    data() {
        return {

        }
    }
}
</script>