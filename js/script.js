// document.addEventListener('DOMContentLoaded', () => {
//     const updateTotalPrice = () => {
//         let total = 0;
//         document.querySelectorAll('.card').forEach(card => {
//             const quantity = parseInt(card.querySelector('.quantity').innerText);
//             const unitPrice = parseFloat(card.querySelector('.unit-price').innerText.replace('$', ''));
//             total += quantity * unitPrice;
//         });
//         document.querySelector('.total').innerText = `${total} $`;
//     };

//     document.querySelectorAll('.fa-plus-circle').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const quantityElement = event.target.parentElement.querySelector('.quantity');
//             let quantity = parseInt(quantityElement.innerText);
//             quantityElement.innerText = ++quantity;
//             updateTotalPrice();
//         });
//     });

//     document.querySelectorAll('.fa-minus-circle').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const quantityElement = event.target.parentElement.querySelector('.quantity');
//             let quantity = parseInt(quantityElement.innerText);
//             if (quantity > 0) {
//                 quantityElement.innerText = --quantity;
//                 updateTotalPrice();
//             }
//         });
//     });

//     document.querySelectorAll('.fa-trash-alt').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const card = event.target.closest('.card-body');
//             card.remove();
//             updateTotalPrice();
//         });
//     });

//     document.querySelectorAll('.fa-heart').forEach(button => {
//         button.addEventListener('click', (event) => {
//             event.target.classList.toggle('liked');
//         });
//     });

//     updateTotalPrice();
// });

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Calcul du prix total de cet élément
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Ajouter un produit au panier
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Si l'élément existe déjà, on met à jour la quantité
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
    }

    // Supprimer un produit du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Obtenir le total des prix des éléments dans le panier
    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Afficher les éléments du panier dans la console
    showItems() {
        this.items.forEach(item => {
            console.log(`${item.product.name} x ${item.quantity} - ${item.getTotalPrice()} $`);
        });
    }
}

  // Créer des produits
const product1 = new Product(1, "Baskets", 100);
const product2 = new Product(2, "Socks", 20);
const product3 = new Product(3, "Bag", 50);

// Créer un panier
const shoppingCart = new ShoppingCart();

// Fonction pour afficher le total du panier dans le DOM
function updateTotalPrice() {
    const totalPrice = shoppingCart.getTotal();
    document.querySelector(".total").textContent = `${totalPrice} $`;
}

// Fonction pour ajouter des produits au panier à partir des événements
document.querySelectorAll(".fa-plus-circle").forEach((button, index) => {
    button.addEventListener("click", () => {
        if (index === 0) shoppingCart.addItem(product1, 1);
        if (index === 1) shoppingCart.addItem(product2, 1);
        if (index === 2) shoppingCart.addItem(product3, 1);

        updateTotalPrice();
    });
});

// Fonction pour supprimer des produits du panier
document.querySelectorAll(".fa-trash-alt").forEach((button, index) => {
    button.addEventListener("click", () => {
        if (index === 0) shoppingCart.removeItem(product1.id);
        if (index === 1) shoppingCart.removeItem(product2.id);
        if (index === 2) shoppingCart.removeItem(product3.id);

    updateTotalPrice();
});
});

