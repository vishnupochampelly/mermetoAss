const searchBar = document.getElementById('searchBar');
const productContainer = document.getElementById('productContainer');
const men = document.getElementById('men')
const women = document.getElementById('women')
const kids = document.getElementById('kids')
let isGridLayout = true;
let c = 0
let classNameBtn = false


function calculateDiscount(price, compare_at_Price) {
    const discountPercentage = ((compare_at_Price - price) / compare_at_Price) * 100;
    return discountPercentage.toFixed(0);
}



console.log(c)

function displayProducts(products) {
    productContainer.innerHTML = '';
    const productCard = document.createElement('div');

    productCard.className = `productCard ${isGridLayout ? 'gridLayout' : ''}`;
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = `productCard ${isGridLayout ? 'gridLayout' : ''}`;
        productCard.innerHTML = `
            <div class="image-container">
        <img src=${product.image} alt= ${product.title} class="image">
        <div class="warped-text">
          <p>${product.badge_text}</p>
        </div>
            <h3>${product.title}</h3>
            <p>.${product.vendor}</p>
            <p class='price'>Price: ${parseInt(product.price)}</p>
            <p class='compare-at-price'>RS ${parseInt(product.compare_at_price)}</p>
            <p class='discount'>${calculateDiscount(parseInt(product.price), parseInt(product.compare_at_price))}% OFF</p>
            <button class="addToCartButton" >Add to Cart</button>
        `;
        const button = productCard.querySelector('.addToCartButton');
        button.addEventListener('click', function() {
            updateButtonStyle(button);
            // Add any other logic related to the clicked button
        });

        productContainer.appendChild(productCard);
    });


}

function updateButtonStyle(clickedButton) {
    // Remove the 'clicked' class from all buttons
    document.querySelectorAll('.addToCartButton').forEach(button => {
        button.classList.remove('clicked');
    });

    // Add the 'clicked' class to the clicked button
    clickedButton.classList.add('clicked');
}


async function fetchData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        let data = await response.json();

        switch (c) {
            case 0:
                displayProducts(data.categories[0].category_products); // Men
                break;
            case 1:
                displayProducts(data.categories[1].category_products); // Women
                break;
            case 2:
                displayProducts(data.categories[2].category_products); // Kids
                break;
            default:
                console.error('Invalid category:', c);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

men.addEventListener('click', function() {
    c = 0;
    fetchData(); // Update the displayed product
});

women.addEventListener('click', function() {
    c = 1;
    fetchData(); // Update the displayed products
});

kids.addEventListener('click', function() {
    c = 2;
    fetchData(); // Update the displayed products
});

// Initial fetch and display
fetchData();