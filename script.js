const products = [
    {id: 1, name: 'Produto 1', price: 50},
    {id: 2, name: 'Produto 2', price: 20},
    {id: 3, name: 'Produto 3', price: 15},
];

let cart = [];

//função p exibir a aba de produtos
function showProducts(){
    document.getElementById('products-tab').style.display = 'block';
    document.getElementById('cart-tab').style.display = 'none';    
}

function showCart(){
    document.getElementById('cart-tab').style.display = 'block';
    updateCartDisplay();    
}

//função p add um produto no carrinho
function addToCart(productId){
    const product = products.find((p) => p.id === productId)
    const existingProduct = cart.find((item) => item.id === productId)

    if(existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1})
    }


    document.getElementById('cart-count').innerHTML = cart.length;
    alert(`${product.name} adicionado ao carrinho!`)
}

//function p remover do carrinho
function removeFromCart(productId){
    cart = cart.filter((item) => item.id !== productId)

    document.getElementById('cart-count').innerHTML = cart.length;
    updateCartDisplay();
}

//função p atualizar a qnt de itens no input
function updateQuantity(productId, newQuantity){
    const productInCart = cart.find((item) => item.id === productId)

    if(productInCart){
        productInCart.quantity = parseInt(newQuantity);
    }

    updateCartDisplay();
}

//atualiza a exibição do carrinho
function updateCartDisplay(){
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = ''; //limpar o carrinho

    if(cart.length === 0){
        cartItemsContainer.innerHTML = "</p>O carrinho está vazio.</p>";
        totalPriceElement.innerText = "Total: R$0,00";

        return;
    }

    let total = 0;
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = 
        `
            <h4>${item.name}</h4>
            <p>Preço: R$${item.price.toFixed(2)}</p>
            <label> Quantidade:
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" />
            </label>
            <button onclick="removeFromCart(${item.id})">
                Remover
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    totalPriceElement.innerText = `Total R$${total.toFixed(2)}`
};

//renderizar produtos disponíveis
function renderProducts(){
    const productsList = document.getElementById('products-list');

    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.innerHTML = 
        `   <h3>${product.name}</h3>
            <p>Preço: R$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">
            Adicionar ao Carrinho </button> 
        `;


        productsList.appendChild(productItem);
    });
};

//inicializa a exibição de produtos ao carregar a página.
document.addEventListener("DOMContentLoaded", renderProducts)