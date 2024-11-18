
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const itemsGrid = document.querySelector('.items-grid');
const cartTotal = document.querySelector('.cart-total');
const successMessage = document.querySelector('.success');
const alertMessage = document.querySelector('.alert');
const searchInput = document.getElementById('searchInput');
const sortButton = document.querySelector('.sort-btn');
const sortButtonBack = document.querySelector('.sort-btnBack');

let items = [
    {
        id: 1,
        name: 'Al Rihla',
        price: 50,
        year: 2022,
    },
    {
        id: 2,
        name: 'Telstar 18',
        price: 55,
        year: 2018,
    },
    {
        id: 3,
        name: 'Brazuca',
        price: 60,
        year: 2014,
    },
    {
        id: 4,
        name: 'Jabulani',
        price: 65,
        year: 2010,
    },
    {
        id: 5,
        name: 'Teamgeist',
        price: 80,
        year: 2006,
    },
    {
        id: 6,
        name: 'Fevernova',
        price: 100,
        year: 2002,
    },
    {
        id: 7,
        name: 'Tricolore',
        price: 120,
        year: 1998,
    },
    {
        id: 8,
        name: 'Questra',
        price: 112,
        year: 1994,
    },
    {
        id: 9,
        name: 'Etrusco Unico',
        price: 120,
        year: 1990,
    },
    {
        id: 10,
        name: 'Azteca',
        price: 125,
        year: 1986,
    },
    {
        id: 11,
        name: 'Tango Espana',
        price: 134,
        year: 1982,
    },
    {
        id: 12,
        name: 'Tango Durlast',
        price: 158,
        year: 1978,
    },
    {
        id: 13,
        name: 'Telstar Durlast',
        price: 213,
        year: 1974,
    },
    {
        id: 14,
        name: 'Telstar',
        price: 196,
        year: 1970,
    },
    {
        id: 15,
        name: 'Challenge 4-star',
        price: 190,
        year: 1966,
    },
    {
        id: 16,
        name: 'Crack Top Star',
        price: 200,
        year: 1962,
    },
    {
        id: 17,
        name: 'Top Star',
        price: 250,
        year: 1958,
    },
    {
        id: 18,
        name: 'Swiss',
        price: 234,
        year: 1954,
    },
    {
        id: 19,
        name: 'Duplo T',
        price: 300,
        year: 1950,
    },
    {
        id: 20,
        name: 'Allen',
        price: 255,
        year: 1938,
    },
    {
        id: 21,
        name: 'Federale 102',
        price: 250,
        year: 1934,
    },
    {
        id: 22,
        name: 'T-Model',
        price: 250,
        year: 1930,
    },
    
    
];

let cart = [];
let totalPrice = 0;
let counter = 0;



function addToCart(itemId) {
    const selectedItem = items.find(item => item.id === itemId);

    
    const cartItemIndex = cart.findIndex(item => item.id === itemId);

    if (cartItemIndex !== -1) {
        
        cart[cartItemIndex].quantity++;
    } else {
       
        cart.push({
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: 1
        });
    }
    
 
    cartBadge.innerHTML = cart.length;

    
    displayItems();
}


function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity--; 
        
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
       
        
        counter = cart.length;
        cartBadge.innerHTML = counter;
        
        displayItems();
    }
}


function displayItems() {
   
    cartItemsList.innerHTML = '';
    totalPrice = 0;
    
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h2>${item.name}</h2>
            <p id="price">$${item.price}</p>
            <p id="quantity">${item.quantity}</p>
            <button class="remove" data-id="${item.id}"><i class="fa fa-trash" aria-hidden="true"></i></button>
        `;
        
        cartItemsList.appendChild(itemElement);
        itemElement.querySelector('.remove').addEventListener('click', (event) => {
            removeFromCart(item.id);
        });
        
        totalPrice += item.price * item.quantity; 
    });
    cartTotal.innerHTML = `$${totalPrice}`;
}

function toggleAlert(){
    toggleModal();
    alertMessage.style.cssText = "display:block";
    setTimeout(() => {
        alertMessage.style.cssText = "display:none";
    }, 2000); 
}
function buyItems() {
    if (cart.length === 0) {
       toggleAlert();
        return;
    }
    
    cart = [];
   
    counter = 0;
    cartBadge.innerHTML = counter;
    
    cartItemsList.innerHTML = '';
    
    cartTotal.innerHTML = '$0';

    successMessage.style.cssText = "display:block";
    setTimeout(() => {
        successMessage.style.cssText = "display:none";
    }, 2000); 
    
}




function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
        
    );

    itemsGrid.innerHTML = '';

    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="img/ball${item.id}.png" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.year}</p>
            <p>Price: $${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemElement.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(item.id));
        itemsGrid.appendChild(itemElement);
    });
}
function sortItemsByYear() {
    
    items.sort((a, b) => a.year - b.year);
    itemsGrid.innerHTML = '';
    fillItemsGrid();
    
}
function sortBack(){
    items.sort((a, b) => b.year - a.year);
    itemsGrid.innerHTML = '';
    fillItemsGrid();
}






function fillItemsGrid() {
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="img/ball${item.id}.png" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.year}</p>
            <p>Price: $${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemElement.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(item.id));
        itemsGrid.appendChild(itemElement);
    });
}


// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
    modal.classList.toggle('show-modal');
}
function toggleSuccess() {
    successMessage.classList.toggle('show');
}

// Event listeners
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
buyButton.addEventListener('click', buyItems);
searchInput.addEventListener('input', filterItems);
sortButton.addEventListener('click', sortItemsByYear);
sortButtonBack.addEventListener('click', sortBack);

// Call fillItemsGrid function when page loads
fillItemsGrid();
