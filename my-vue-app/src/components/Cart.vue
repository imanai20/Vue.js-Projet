<template>
    <aside class="cart-sidebar" :class="{ 'is-open': isOpen }">
      <h2>Your Cart</h2>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="Product image" class="product-image">
          <div>
            <h3>{{ item.nom }}</h3>
            <p>\{{ item.prix | currency }}</p>
          </div>
          <button @click="removeFromCart(item)">Remove</button>
        </li>
      </ul>
      <div class="cart-total">
        <p>Total: \{{ calculateTotal() | currency }}</p>
        <button @click="checkout">Checkout</button>
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
    },
    data() {
      return {
        cartItems: [],
      };
    },
    methods: {
      removeFromCart(item) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
      },
      calculateTotal() {
        return this.cartItems.reduce((acc, item) => acc + item.prix, 0);
      },
      checkout() {
        // Implement checkout logic here
        alert('Checkout process goes here.');
      },
    },
    filters: {
      currency(value) {
        return `$${parseFloat(value).toFixed(2)}`;
      },
    },
    created() {
      // Example: Load cart items from local storage or global state
      this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    }
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  </style>
  
  
  <style scoped>
  /* All your styles here */
  .checkout-btn {
    background-color: #4CAF50; /* Green background for checkout button */
    color: white;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background-color: #45a049; /* Darker green on hover */
  }
  </style>
  