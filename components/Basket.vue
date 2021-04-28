<template>
  <div
    :class="[{ show: this.showBasket, fade: !this.showBasket }, 'basket-form']"
  >
    <div class="basket-form__wrapper" @click="someFunc()"></div>
    <form class="basket-form__content">
      <div class="basket-form__title">
        <h2>Корзина</h2>
        <img src="@/static/close.svg" alt="" @click="someFunc()" />
      </div>
      <div v-if="changeContent(this.allBaskets)">
        <span class="basket-form__subtitle">Товары в корзине</span>
        <div class="basket-list">
          <div
            class="basket-list__item"
            v-for="(basket, index) of allBaskets"
            :key="index"
          >
            <img
              class="basket-list__img"
              :src="'https://frontend-test.idaproject.com' + basket.photo"
              alt=""
            />
            <div class="basket-list__content">
              <h3 class="basket-list__title">{{ basket.name }}</h3>

              <span class="basket-list__price"
                >{{ basket.price | formattedPrice }} ₽</span
              >
              <div class="basket-list__star">
                <img src="../static/star.svg" alt="" />
                <span class="basket-list__rating">{{ basket.rating }}</span>
              </div>
            </div>
            <img
              @click="deleteBasket(index)"
              class="basket-form__remove"
              src="../static/remove.svg"
              alt=""
            />
          </div>
        </div>
        <div class="basket-inputs">
          <span class="basket-inputs__title">Оформить заказ</span>
          <fieldset><input type="text" placeholder="Ваше имя" /></fieldset>
          <fieldset>
            <input
              type="tel"
              v-mask="'+7 ### ###-##-##'"
              placeholder="Телефон"
            />
          </fieldset>
          <fieldset><input type="text" placeholder="Адрес" /></fieldset>
          <button type="submit" @click.prevent="sendData(allBaskets)">
            Отправить
          </button>
        </div>
      </div>
      <div v-else-if="!showThanks" class="basket-form__clear ">
        <span>Пока что вы ничего не добавили в корзину.</span>
        <button @click.prevent="someFunc()">Перейти к выбору</button>
      </div>
      <div v-else class="basket-form__thanks">
        <img src="@/static/thanks.svg" alt="">
        <h2>Заявка успешно отправлена</h2>
        <span>Вскоре наш менеджер свяжется с Вами</span>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import formattedPrice from "@/filters/formattedPrice.js";
import Navbar from "../components/Navbar";
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  filters: {
    formattedPrice,
  },
  data(){
    return {
      showThanks: false
    }
  },
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["showBasket"]),
    ...mapGetters(["allBaskets"]),
  },
  methods: {
    ...mapActions(["changeShowBasket", "changeBaskets"]),
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
      this.changeShowBasket(false);
      this.toggleBodyClass("removeClass", "noScroll");
    },
    deleteBasket(card) {
      this.allBaskets.splice(card, 1);
      this.showThanks = false
    },
    sendData(card) {
      this.showThanks = true
      this.allBaskets.splice(card, 100);
    },
    changeContent(some) {
      return Navbar.methods.lenghtFunc(some);
    }
  },
};
</script>

<style>
.noScroll {
  overflow: hidden;
}
.hide{
  display: none;
}
.basket-inputs {
  margin-top: 32px;
}

.basket-inputs__title {
  display: inline-block;
  font-size: 18px;
  line-height: 23px;
  color: #59606d;
  margin-bottom: 16px;
}

.basket-form__thanks{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}

.basket-form__thanks h2{
  font-weight: bold;
  font-size: 24px;
  line-height: 31px;
  color: #000000;
}

.basket-form__thanks span{
  font-size: 16px;
  line-height: 21px;
  color: #59606D;
}

.basket-form__thanks img{
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.basket-inputs fieldset {
  padding: 14px 5px 15px 14px;
  background: #f8f8f8;
  border-radius: 8px;
  border: none;
}
.basket-inputs input {
  font-size: 16px;
  line-height: 21px;
  color: #1f1f1f;
  width: 100%;
  border: none;
  background: transparent;
}

.basket-inputs input:focus {
  outline: none;
}

.basket-inputs input::placeholder {
  color: #959dad;
}

.basket-inputs fieldset:not(:last-child) {
  margin-bottom: 16px;
}

.basket-form__clear {
  margin-top: 24px;
}

.basket-form__clear span {
  display: inline-block;
  font-size: 22px;
  line-height: 28px;
  color: #000000;
  margin-bottom: 24px;
}

.basket-form__clear button,
.basket-inputs button {
  width: 364px;
  height: 50px;
  background: #1f1f1f;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

.basket-form__clear button:hover,
.basket-inputs button:hover {
  background: #59606d;
  transition: 300ms;
}
button:focus {
  outline: none;
}

.basket-form__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
}
.basket-form__content {
  position: absolute;
  overflow-y: scroll;
  top: 0;
  right: 0;
  background: #fff;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0px 0px 8px;
  height: 100vh;
  width: 460px;
  padding: 52px 48px 0 34px;
  z-index: 4;
}
.basket-form__title {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
}
.basket-form__title h2 {
  font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  color: #000000;
  margin-right: auto;
}
.basket-form__title img:hover {
  opacity: 0.7;
  cursor: pointer;
}
.basket-form__subtitle {
  display: inline-block;
  margin-top: 24px;
  font-family: "PT Sans";
  font-size: 18px;
  line-height: 23px;
  color: #59606d;
  margin-bottom: 16px;
}
.basket-list__item {
  width: 364px;
  height: 120px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: start;
  padding: 15px 0 15px 25px;
  position: relative;
}

.basket-list__item:not(:last-child) {
  margin-bottom: 12px;
}

.basket-list__img {
  width: 70px;
  height: 75px;
  margin-right: 35px;
}
.basket-list__content {
  position: relative;
  display: flex;
  height: 90px;
  flex-direction: column;
}
.basket-form__remove {
  position: absolute;
  top: 49px;
  right: 22px;
  cursor: pointer;
  width: 20px;
  height: 22px;
  opacity: 0.3;
}

.basket-form__remove:hover {
  opacity: 1;
  transition: 300ms;
}
.basket-list__title {
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: flex-end;
  color: #59606d;
  margin-bottom: 6px;
}

.basket-list__price {
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: #1f1f1f;
}

.basket-list__star {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.basket-list__rating {
  font-weight: bold;
  font-size: 10px;
  line-height: 13px;
  color: #f2c94c;
}

.basket-form.show .basket-form__content {
  animation: basketShowContent 1s ease-in-out;
}

.basket-form.fade .basket-form__content {
  animation: basketFadeContent 1s ease-in-out;
}

.basket-form.show {
  animation: basketShow 1s ease-in-out;
}

.basket-form.fade {
  animation: basketFade 1 ease-in-out;
  visibility: hidden;
  transition: visibility 1000ms;
}

@keyframes basketFade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes basketShowContent {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes basketShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes basketFadeContent {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>