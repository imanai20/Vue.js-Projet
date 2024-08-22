<template>
  <aside class="cart-sidebar" :class="{ 'is-open': isOpen }">
    <h2>Your Cart</h2>
    <ul class="cart-items">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" alt="Product image" class="product-image">
        <div>
          <h3>{{ item.nom }}</h3>
          <p>{{ item.prix | currency }}</p>
        </div>
        <button @click="emitRemoveFromCart(item)">Remove</button>
      </li>
    </ul>
    <div class="cart-total">
      <p>Total: {{ calculateTotal() | currency }}</p>
      <button @click="$emit('checkout')">Checkout</button>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    cartItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    emitRemoveFromCart(item) {
      this.$emit('remove-from-cart', item);
    },
    calculateTotal() {
      return this.cartItems.reduce((acc, item) => acc + item.prix, 0);
    },
  },
  filters: {
    currency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    },
  },
};
</script>

<style>
.cart-sidebar {
    position: fixed;
    right: -100%;
    top: 0;
    width: 300px;
    height: 100%;
    background-color: white;
    transition: right 0.3s ease-in-out;
    z-index: 200; 
}

.cart-sidebar.is-open {
    right: 0;
}
</style>

  
