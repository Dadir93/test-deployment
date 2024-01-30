document.addEventListener('DOMContentLoaded', () => {
    const api = 'https://v6.exchangerate-api.com/v6/3fa3a3e54d573aa4e217d524/latest/USD';
    const fromDropDown = document.getElementById('from-currency-select');
    const toDropDown = document.getElementById('to-currency-select');
    const result = document.getElementById('result');
    const productList = document.getElementById('product-list');
    const itemCountSpan = document.getElementById('item-count');
    const totalPriceSpan = document.getElementById('total-price');

    let cart = [];

    // iPhone data with images and prices
    const iPhoneData = [
        { id: 1, name: 'iPhone 12', image: 'iphone12.jpeg', price: 799.99 },
        { id: 2, name: 'iPhone 12 Pro', image: 'iphone12pro.jpg', price: 999.99 },
        { id: 3, name: 'iPhone SE', image: 'iphonese.jpg', price: 399.99 },
        { id: 4, name: 'iPhone 11', image: 'iphone11.jpg', price: 699.99 },
        { id: 5, name: 'iPhone XR', image: 'iphonexr.jpg', price: 599.99 },
    ];

    currencies.forEach((currency) => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromDropDown.add(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.text = currency;
        toDropDown.add(optionTo);
    });

    fromDropDown.value = 'USD';
    toDropDown.value = 'INR';

    let convertCurrency = async () => {
        const amount = document.querySelector("#amount").value;
        const fromCurrency = fromDropDown.value;
        const toCurrency = toDropDown.value;

        if (amount.length != 0) {
            try {
                const response = await fetch(api);
                const data = await response.json();

                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            alert("Please fill in the amount");
        }
    };

    document.querySelector('#convert-button').addEventListener('click', convertCurrency);
    window.addEventListener('load', convertCurrency);

    displayProducts(iPhoneData);

    function displayProducts(products) {
        productList.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>$${product.price.toFixed(2)}</p>
                
                <!-- Quantity dropdown -->
                <select class="quantity-dropdown" id="quantity${product.id}" name="quantity">
                    ${generateQuantityOptions()}
                </select>
                
                <!-- Buy button -->
                <button class="buy-button" data-product-id="${product.id}">Buy</button>
            `;
            productList.appendChild(productCard);
        });

        // Add event listeners to Buy buttons
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', handleBuyButtonClick);
        });
    }

    function generateQuantityOptions() {
        let options = '';
        for (let i = 1; i <= 10; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        return options;
    }

    function handleBuyButtonClick(event) {
        const productId = event.target.dataset.productId;
        const quantity = parseInt(document.getElementById(`quantity${productId}`).value, 10);
        const selectedProduct = iPhoneData.find(product => product.id === parseInt(productId, 10));

        // Update cart and display summary
        cart.push({ ...selectedProduct, quantity });
        updateCartSummary();
    }

    function updateCartSummary() {
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        itemCountSpan.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
    }
});


let apiKey = "3fa3a3e54d573aa4e217d524";

currencies = [
    "AED",
    "AFN",
    "AUD",
    "KES",
    "USD",
];