<template>
  <div class="container mt-3">
    <div class="mx-auto mb-3">
      <a href="/emishopapp.apk" target="_blank" download onclick="showFallback('viewer')">
          <img src="/download_apk.png" alt="Download APK" class="img-fluid mt-3" style="max-width: 50%;" />
        </a>
      <p id="fallback-viewer" class="fallback-message" style="display: none;">
          If the download doesn't start, <a href="/emishopapp.apk" target="_blank">click here</a> to download Location Viewer.
        </p>
    </div>
    <div class="image-container-background" :style="{ backgroundColor: imgLoaded ? 'transparent' : '#e0e0e0' }">
    <div class="row justify-content-center">
      <div 
        :class="getColumnClass(postData.images.length)" 
        v-for="(image, index) in postData.images" 
        :key="index"
        class="mb-4 image-container"
      >
        <img :src="image" class="img-fluid image-fit" :alt="'Image ' + (index + 1)" 
        :class="{ 'img-error': !imgLoaded }"
        @load="imgLoaded = true"
        @error="imgLoaded = false" />
      </div>
      </div>
    </div>

    <!-- Card 1 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body px-4 py-3">
        <h5 class="card-title mb-0">{{ postData.title }}</h5>
        <span class="fs-5 pr-3" :class="[
            'text-muted', 
            'mt-2', 
            'mb-0',
            { 'text-decoration-line-through': postData.hasDiscount }
          ]" >{{ postData.originalPrice }}</span> &nbsp &nbsp
        <span class="text-muted mt-2 mb-0 fw-bold" v-if="postData.hasDiscount" :class="{ 'discounted-price': postData.hasDiscount }">{{ postData.discountedPrice }}</span>
        
        <button class="btn btn-success w-100 mt-4" @click="handleCallButtonClick">Call</button>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card mb-4 shadow-sm" style="height: 180px;">
      <div class="card-body d-flex flex-column px-4 py-3">
        <h6 class="card-subtitle text-muted mb-2">Description</h6>
        <p class="card-text flex-grow-1">{{ postData.description }}</p>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body d-flex align-items-center">
        <img :src="postData.sellerId.profilePicture" class="rounded-circle" alt="Profile" style="width: 60px; height: 60px; margin-right: 16px;">
        <div>
          <p class="mb-0">{{ postData.sellerId.brandName }}</p>
          <small class="text-muted">{{ getLastSeenText(postData.sellerId.last_seen) }}</small>
        </div>
        <button class="btn btn-link ms-auto p-0">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>


  </div>
</template>

<script>
import {BASE_URL } from '../config.js';
import axios from 'axios';
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
        slide: 0,
        imgLoaded: false,
      postData: {
        title: 'Loading...',
        description: 'Loading...',
        originalPrice: 'Loading...',
        discountedPrice: '',
        hasDiscount: false,
        sellerId: {
          profilePicture: '',
          brandName: 'Loading...',
          last_seen: 'Loading...',
          phoneNumber: ''
        },
        images: [''],
        showSimilarPosts: false,
      },
    };
  },
  mounted() {
    this.fetchPostData();
  },
  methods: {
    async fetchPostData() {
      const postId = this.$route.query.p;
      try {
        const response = await axios.get(BASE_URL + '/posts_anonymous/' + postId + '/');
        this.postData = response.data;
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    },
    onSlideStart(slide) {
      console.log('Slide started:', slide);
    },
    onSlideEnd(slide) {
      console.log('Slide ended:', slide);
    },
    getColumnClass(imageCount) {
      if (imageCount === 1) {
        return 'col-12 col-md-6 col-lg-4 text-center mb-4';
      } else if (imageCount === 2) {
        return 'col-6 col-md-4 col-lg-3 text-center mb-4';
      } else {
        return 'col-6 col-md-4 col-lg-3 mb-4';
      }
    },
    updatePrice() {
      this.postData.hasDiscount = !!this.postData.discountedPrice; // Assume if discountedPrice exists, there's a discount
    },
    getLastSeenText(hours) {
      if (hours === 0) return 'Last seen in an hour';
      if (hours === 1) return 'Last seen 1 hour ago';
      if (hours < 24) return `Last seen ${hours} hours ago`;
      if (hours < 48) return 'Last seen 1 day ago';
      if (hours < 168) return `Last seen ${Math.floor(hours / 24)} days ago`;
      if (hours < 336) return 'Last seen 1 week ago';
      if (hours < 720) return `Last seen ${Math.floor(hours / 168)} weeks ago`;
      if (hours < 1440) return 'Last seen 1 month ago';
      if (hours < 8760) return `Last seen ${Math.floor(hours / 720)} months ago`;
      if (hours < 17520) return 'Last seen 1 year ago';
      return 'Last seen a long time ago';
    },
    async handleCallButtonClick() {
    const phoneNumber = this.postData.sellerId.phoneNumber;

    try {
        // Directly open the phone app with the number to call
        window.location.href = `tel:${phoneNumber}`;
    } catch (error) {
        console.error('Error initiating call:', error);
        // Optionally handle the error, e.g., display a message
    }
}
,

    isAppInstalled(appPackage) {
      return new Promise((resolve, reject) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `intent://${appPackage}#Intent;scheme=app;package=${appPackage};end`;

        document.body.appendChild(iframe);

        setTimeout(() => {
          document.body.removeChild(iframe);
          resolve(false); // Assume app is not installed
        }, 100);

        iframe.onload = () => {
          resolve(true); // App is installed
        };

        iframe.onerror = () => {
          reject(false); // App is not installed
        };
      });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.card-subtitle {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 22px;
}
.image-fit {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.image-container{
    max-height: 50vh;
}
.image-container-background{
    height: 200px; /* Set this to your desired height */
  overflow: hidden;
}

.text-muted {
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.05em;
}

.similar-posts img {
  height: 120px;
  object-fit: cover;
}
.img-error {
  display: none;
}
</style>