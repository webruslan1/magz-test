<template>
    <div class="catalog">
        <h2 class="catalog__title">Каталог</h2>
        <ul class="links">
          <li class="links__item">
            <a :class="{active: this.category[0].isActive}" @click="mounted(1)">{{ this.category[0].name }}</a>
          </li>
          <li class="links__item">
            <a :class="{active: this.category[1].isActive}" @click="mounted(2)">{{ this.category[1].name }}</a>
          </li>
          <li class="links__item">
            <a :class="{active: this.category[2].isActive}" @click="mounted(3)">{{ this.category[2].name }}</a>
          </li>
        </ul>
      </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
export default {
  computed: mapGetters(['allCards']),
  computed: mapState(['category']),
  methods: {
    ...mapActions({
      fetchCards: 'fetchCards',
    }),
    mounted(some){
      this.fetchCards(some)
    },
  },
  
}
</script>

<style scoped>

.catalog {
  margin-top: 32px;
  width: 161px;
}

.catalog__title {
  font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  color: #1f1f1f;
  margin-bottom: 24px;
}

.links {
  list-style-type: none;
  padding: 0;
  width: 161px;
}

.links__item a {
  font-family: "PT Sans";
  font-size: 16px;
  line-height: 21px;
  color: #959dad;
  text-decoration: none;
  transition: 200ms;
  cursor: pointer;
}

.links__item:hover a {
  color: #59606d;
  transition: 200ms;
}

.links__item:not(:last-child) {
  margin-bottom: 16px;
}

.links__item a.active {
  text-decoration-line: underline;
  color: #1f1f1f;
}
</style>