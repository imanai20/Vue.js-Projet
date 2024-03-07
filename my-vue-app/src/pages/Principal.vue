<template>
    <main>
        <h1>Products</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="error">Error loading data</div>
            <div v-else>
                <div v-if="tops.length === 0 && sneakers.length === 0">No products found</div>
                <div v-else>
                    <h2>Tops</h2>
                    <ul class="product-list">
                        <li v-for="top in tops" :key="top.id" class="product-item">
                            <h3>{{ top.nom }}</h3>
                            <p>{{ top.prix }}</p>
                            <img :src="top.image" alt="Product image" class="product-image">
                            <button @click="addItemToCart(top)">Add to Cart</button>
                        </li>
                    </ul>
                    <h2>Sneakers</h2>
                    <ul class="product-list">
                        <li v-for="sneaker in sneakers" :key="sneaker.id" class="product-item">
                            <h3>{{ sneaker.nom }}</h3>
                            <p>{{ sneaker.prix }}</p>
                            <img :src="sneaker.image" alt="Sneaker image" class="product-image">
                            <button @click="addItemToCart(sneaker)">Add to Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <cart-sidebar-component
            :cart-items="cartItems"
            :is-open="isCartOpen"
            @remove-from-cart="removeItemFromCart"
            @checkout="proceedToCheckout"
        />
        <div class="cart-icon" @click="toggleCart">
            <i class="fas fa-shopping-cart"></i>
        </div>
    </main>
</template>

<script>
import apolloClient from '../apollo/apollo-client';
import { GET_TOPS, GET_SNEAKERS } from '../stores/queries';
import CartSidebarComponent from '../components/Cart.vue';
import { useUserStore } from '../stores/userStore';

export default {
    components: {
        CartSidebarComponent
    },
    data() {
        return {
            loading: false,
            error: null,
            tops: [],
            sneakers: [],
            isCartOpen: false,
            cartItems: []
        };
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        userStore() {
            return useUserStore();
        }
    },
    methods: {
        async fetchData() {
            try {
                this.loading = true;
                const topsResponse = await apolloClient.query({ query: GET_TOPS });
                this.tops = topsResponse.data.tops;

                const sneakersResponse = await apolloClient.query({ query: GET_SNEAKERS });
                this.sneakers = sneakersResponse.data.sneakers;

                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.error = error.message;
                console.error('Error fetching data:', error);
            }
        },
        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
        },
        addItemToCart(item) {
            if (!this.userStore.isAuthenticated) {
                alert('Please log in to add items to the cart.');
                return;
            }
            this.cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },
        removeItemFromCart(item) {
            const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
            if (index > -1) {
                this.cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            }
        },
        proceedToCheckout() {
            if (!this.userStore.isAuthenticated) {
                alert('Please log in to proceed to checkout.');
                return;
            }
            // Add logic to navigate to payment page or payment process here.
            this.toggleCart(); // Close the cart
        }
    }
};
</script>

<style>
* {
    padding: 20px;
}

h1, h2, h3 {
    padding: 0%;
    text-align: center;
    color: black;
    font-family: 'Helvetica Neue', sans-serif;
}

.product-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.product-item {
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.product-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

h3 {
    color: black;
    margin: 10px 0;
}

p {
    text-align: center;
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: bold; 
}

@media (max-width: 768px) {
    .product-list {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
}

.cart-icon {
    position: fixed;
    top: 40px;
    right: 20px;
    background-color: black;
    padding: 10px;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    z-index: 100;
}

.cart-icon:hover {
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    transition: 0.3s;
    
}
</style>
