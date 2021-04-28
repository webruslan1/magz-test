<template>
  <div class="navbar">
    <div class="container">
      <h1 class="navbar__logo">TestList</h1>
      <a href="#" @click="someFunc()" class="navbar__basket basket">
        <img src="@/static/basket.svg" alt="" />
        <div class="navbar__basket-counter" v-if="lenghtFunc(baskets) > 0">
          <span>{{ lenghtFunc(baskets) }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      baskets: "baskets",
    }),
  },
  methods: {
    ...mapActions({
      changeShowBasket: "changeShowBasket",
    }),
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;

      if (addRemoveClass === "addClass") {
        setTimeout(function () {
          el.classList.add(className);
        }, 1000);
      } else {
        setTimeout(function () {
          el.classList.remove(className);
        }, 1000);
      }
    },
    someFunc() {
      this.changeShowBasket(true);
      this.toggleBodyClass("addClass", "noScroll");
    },
    lenghtFunc(obj) {
      var size = 0,
        key;
      // Бегаем по ключам и считаем их
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      // Возвращаем размер
      return size;
    },
  },
  mounted() {
    this.changeShowBasket(false);
  },
};
</script>

<style>
.navbar {
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  height: 66px;
  padding: 18px 0 20px 0;
}

.navbar .container{
  display: flex;
}

.navbar__logo {
  font-family: PT Sans;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  color: #59606d;
  text-decoration: none;
}

.navbar__basket {
  margin-left: auto;
  position: relative;
}

.navbar__basket-counter {
  position: absolute;
  width: 12px;
  height: 12px;
  top: -4px;
  right: -6px;
  background: #959dad;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar__basket-counter span {
  font-weight: bold;
  font-size: 8px;
  line-height: 9px;
  color: #ffffff;
}
</style>