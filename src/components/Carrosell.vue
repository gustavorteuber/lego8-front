<template>
  <div class="carousel-container">
    <div class="carousel">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="getClass(index)"
      >
        <img :src="image" alt="Carousel Image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        require("@/assets/image1.jpg"),
        require("@/assets/image2.jpg"),
        require("@/assets/image3.jpg"),
        require("@/assets/image4.jpg"),
        require("@/assets/image5.jpg"),
        require("@/assets/image6.jpg"),
        require("@/assets/image7.jpg"),
        require("@/assets/image8.jpg"),
        require("@/assets/image9.jpg"),
        require("@/assets/image10.jpg"),
      ],
    };
  },
  computed: {
    totalImages() {
      return this.images.length;
    },
  },
  methods: {
    getClass(index) {
      if (index === this.currentIndex) {
        return "carousel-slide active";
      } else if (
        (index === 0 && this.currentIndex === this.totalImages - 1) ||
        index === this.currentIndex - 1
      ) {
        return "carousel-slide prev";
      } else if (
        (index === this.totalImages - 1 && this.currentIndex === 0) ||
        index === this.currentIndex + 1
      ) {
        return "carousel-slide next";
      } else {
        return "carousel-slide";
      }
    },
    moveCarousel(index) {
      this.currentIndex = index;
    },
    next() {
      if (this.currentIndex < this.totalImages - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.totalImages - 1;
      }
    },
  },
  mounted() {
    setInterval(() => {
      this.next();
    }, 5000);
  },
};
</script>
