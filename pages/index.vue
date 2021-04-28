<template>
  <div class="main-content">
    <div class="sort-item">
      <span class="sort-item__title">
        Сортировать по:
        <a class="sort-item__select" @click="showOrFade()">
          <span>{{ selectedGet }} </span>
          <img src="@/static/arrow.svg" alt="" />
        </a>
        <ul class="sort-item__options fade">
          <li
            v-for="option in this.options"
            :value="option.value"
            :key="option.id"
            @click="changeOptionSelected(option.value)"
          >
            {{ option.text }}
          </li>
        </ul>
      </span>
    </div>
    <div class="card-list">
      <div class="card-list__item" v-for="card of allCards" :key="card.id">
        <div class="card-list__top">
          <div class="card-list__star">
            <img src="@/static/star.svg" alt="" />
            <span class="card-list__rating">{{ card.rating }}</span>
          </div>
          <img
            class="card-list__img"
            :src="'https://frontend-test.idaproject.com' + card.photo"
            alt=""
          />
          <div class="card-list__basket" @click="addToBasket(card)">
            <svg
              width="12"
              height="13"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.84 0.48C4.06663 0.177833 4.42229 0 4.8 0H19.2C19.5777 0 19.9334 0.177833 20.16 0.48L23.76 5.28C23.9158 5.48772 24 5.74036 24 6V22.8C24 23.7548 23.6207 24.6705 22.9456 25.3456C22.2705 26.0207 21.3548 26.4 20.4 26.4H3.6C2.64522 26.4 1.72955 26.0207 1.05442 25.3456C0.379285 24.6705 0 23.7548 0 22.8V6C0 5.74036 0.0842134 5.48772 0.24 5.28L3.84 0.48ZM5.4 2.4L2.4 6.4V22.8C2.4 23.1183 2.52643 23.4235 2.75147 23.6485C2.97652 23.8736 3.28174 24 3.6 24H20.4C20.7183 24 21.0235 23.8736 21.2485 23.6485C21.4736 23.4235 21.6 23.1183 21.6 22.8V6.4L18.6 2.4H5.4Z"
                fill="#959DAD"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 6C0 5.33726 0.537258 4.8 1.2 4.8H22.8C23.4627 4.8 24 5.33726 24 6C24 6.66274 23.4627 7.2 22.8 7.2H1.2C0.537258 7.2 0 6.66274 0 6Z"
                fill="#959DAD"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.2 9.6C7.86274 9.6 8.4 10.1373 8.4 10.8C8.4 11.7548 8.77928 12.6705 9.45442 13.3456C10.1295 14.0207 11.0452 14.4 12 14.4C12.9548 14.4 13.8705 14.0207 14.5456 13.3456C15.2207 12.6705 15.6 11.7548 15.6 10.8C15.6 10.1373 16.1373 9.6 16.8 9.6C17.4627 9.6 18 10.1373 18 10.8C18 12.3913 17.3679 13.9174 16.2426 15.0426C15.1174 16.1679 13.5913 16.8 12 16.8C10.4087 16.8 8.88258 16.1679 7.75736 15.0426C6.63214 13.9174 6 12.3913 6 10.8C6 10.1373 6.53726 9.6 7.2 9.6Z"
                fill="#959DAD"
              />
            </svg>
          </div>
        </div>
        <div class="card-list__content">
          <h3 class="card-list__title">{{ card.name }}</h3>
          <span class="card-list__subtitle"
            >{{ card.price | formattedPrice }} ₽</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formattedPrice from "@/filters/formattedPrice.js";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  filters: {
    formattedPrice,
  },
  computed: {
    ...mapState({
      selected: "selected",
      options: "options",
      category: "category",
    }),
    ...mapGetters({
      allCards: "allCards",
      selectedGet: "selectedGet",
      allBaskets: "allBaskets",
    })
  },
  methods: {
    ...mapActions({
      fetchCards: "fetchCards",
      changeSelected: "changeSelected",
    }),
    addToBasket(card) {
      this.allBaskets.push(card);
    },
    showOrFade() {
      const selectSome = document.querySelector(".sort-item__options");
      selectSome.classList.toggle("fade");
    },
    changeOptionSelected(some) {
      this.changeSelected(some);
      this.showOrFade();

      if (this.category[0].isActive) {
        this.fetchCards("1");
      } else if (this.category[1].isActive) {
        this.fetchCards("2");
      } else if (this.category[2].isActive) {
        this.fetchCards("3");
      } else console.error("error");
    },
  },
  mounted() {
    this.fetchCards("1");
    this.changeSelected("цене");
  },
};
</script>

<style>
.fade {
  visibility: hidden;
}
.main-content {
  margin-top: 42px;
}
.container{
  width: 1285px;
  margin: 0 auto;
}

.sort-item {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 34px;
  position: relative;
}
.sort-item__title {
  font-size: 16px;
  line-height: 21px;
  color: #1f1f1f;
  display: flex;
}

.sort-item__select {
  display: flex;
  align-items: center;
  color: #59606d;
  margin-left: 5px;
  cursor: pointer;
}

.sort-item__options {
  position: absolute;
  top: 23px;
  right: 0;
  width: 160px;
  height: 68px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  list-style-type: none;
  padding: 8px 0;
  z-index: 3;
  background: #fff;
}

.sort-item__options li {
  font-size: 14px;
  line-height: 18px;
  color: #959dad;
  padding: 4px 0 4px 12px;
  height: 26px;
  cursor: pointer;
}

.sort-item__options li:hover {
  background: #f8f8f8;
  color: #1f1f1f;
}

.sort-item__select span {
  margin-right: 4px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
}

.card-list__item {
  width: 264px;
  height: 272px;
  padding: 18px 18px 0 16px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-right: 16px;
  margin-bottom: 16px;
}

.card-list__img {
  width: 142px;
  height: 142px;
}

.card-list__title {
  display: inline-block;
  font-family: "PT Sans";
  font-size: 14px;
  line-height: 18px;
  color: #59606d;
  margin-bottom: 6px;
}

.card-list__subtitle {
  display: block;
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: #1f1f1f;
}

.card-list__top {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.card-list__star {
  margin-right: 11px;
  display: flex;
  align-items: center;
}

.card-list__basket {
  margin-left: 30px;
  cursor: pointer;
}

.card-list__basket:hover path {
  fill: #1f1f1f;
}

.card-list__rating {
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 10px;
  line-height: 13px;
  color: #f2c94c;
}
</style>
