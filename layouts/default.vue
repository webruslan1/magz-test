<template>
  <div>
    <Navbar />
    <main class="main">
      <div class="container">
        <Catalog />
        <div class="cards">
          <nuxt />
        </div>
      </div>
    </main>
    <Basket />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Catalog from "@/components/Catalog";
import Basket from "@/components/Basket";

export default {
  components: {
    Navbar,
    Catalog,
    Basket,
  },
};
</script>
<style>
html {
  font-family: "PT Sans", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main .container{
  display: flex;
}
</style>
