<template>
  <div class="card" style="max-width: 320px;">
    <div class="image-container" :style="{ backgroundColor: imgLoaded ? 'transparent' : '#e0e0e0' }">
      <img
        :src="imgSrc"
        alt="Card image"
        class="card-img-top"
        :class="{ 'img-error': !imgLoaded }"
        @load="imgLoaded = true"
        @error="imgLoaded = false"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <a :href="buttonLink" :class="buttonClass">{{ buttonText }}</a>
    </div>
  </div>
</template>
<style scoped>
.image-container {
  height: 200px; /* Set this to your desired height */
  overflow: hidden;
}
.img-error {
  display: none;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #e0e0e0; /* Placeholder color */
  transition: background-color 0.3s;
}
</style>
<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      default: 'D' 
    },
    followLink: {
      type: String,
      default: '' // URL for 'Follow link' button type
    },
    postId: {
      type: [String, Number],
      default: '' // Post ID for 'View details' button type
    }
  },
  methods: {
    handleClick() {
      this.$emit('button-clicked');
    }
  },
  data() {
    return {
      imgLoaded: false,
    };
  },
  computed: {
    buttonText() {
      return this.buttonType === 'L' ? 'Follow link' : this.buttonType === 'N' ? 'Loading...' : 'View details';
    },
    buttonLink() {
      if (this.buttonType === 'L') {
        return this.followLink;
      } else {
        return `/post/?p=${this.postId}`;
      }
    },
    buttonClass() {
      return this.buttonType === 'L' ? 'btn btn-primary' : this.buttonType === 'N' ? 'btn btn-secondary' : 'btn btn-success';
    }
  }
};
</script>

