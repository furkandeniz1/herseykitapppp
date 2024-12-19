const books = {
    'Korku-Gerilim': [
        {id: 1, title: 'Dracula', author: 'Bram Stoker', price: 25.99, img: 'https://via.placeholder.com/150'},
        {id: 2, title: 'It', author: 'Stephen King', price: 30.00, img: 'https://via.placeholder.com/150'}
    ],
    'Macera-Bilim': [
        {id: 3, title: '1984', author: 'George Orwell', price: 20.50, img: 'https://via.placeholder.com/150'},
        {id: 4, title: 'The Martian', author: 'Andy Weir', price: 28.00, img: 'https://via.placeholder.com/150'}
    ],
    'Kişisel-Gelişim': [
        {id: 5, title: 'Atomic Habits', author: 'James Clear', price: 35.00, img: 'https://via.placeholder.com/150'},
        {id: 6, title: 'The Power of Habit', author: 'Charles Duhigg', price: 22.00, img: 'https://via.placeholder.com/150'}
    ],
    'Polisiye': [
        {id: 7, title: 'Sherlock Holmes', author: 'Arthur Conan Doyle', price: 19.99, img: 'https://via.placeholder.com/150'},
        {id: 8, title: 'Gone Girl', author: 'Gillian Flynn', price: 27.50, img: 'https://via.placeholder.com/150'}
    ],
    'Aşk': [
        {id: 9, title: 'Pride and Prejudice', author: 'Jane Austen', price: 18.50, img: 'https://via.placeholder.com/150'}
    ]
};

let cart = [];
let orders = [];
let profile = {
    name: '',
    phone: ''
};

function showBooks(category) {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('book-list').classList.remove('hidden');
    const booksList = books[category];
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    booksList.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <img src="${book.img}" alt="${book.title}" width="100">
            <h3>${book.title}</h3>
            <p>Yazar: ${book.author}</p>
            <p>Fiyat: ${book.price}₺</p>
            <button onclick="addToCart(${book.id})">Sepete Ekle</button>
        `;
        booksContainer.appendChild(bookElement);
    });
}

function goBackToHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('book-list').classList.add('hidden');
}

function addToCart(bookId) {
    const book = Object.values(books).flat().find(b => b.id === bookId);
    cart.push(book);
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(book => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${book.title} - ${book.price}₺`;
        cartItemsContainer.appendChild(cartItem);
        total += book.price;
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
    document.getElementById('cart').classList.remove('hidden');
}

function clearCart() {
    cart = [];
    updateCart();
}

function proceedToPayment() {
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('payment-form').classList.remove('hidden');
}

function validatePersonalInfo() {
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    let valid = true;

    // Temizle tüm hata mesajlarını
    document.getElementById('address-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('phone-error').style.display = 'none';

    if (!address) {
        document.getElementById('address-error').style.display = 'inline';
        valid = false;
    }
    if (!email || !validateEmail(email)) {
        document.getElementById('email-error').style.display = 'inline';
        valid = false;
    }
    if (!phone || !validatePhone(phone)) {
        document.getElementById('phone-error').style.display = 'inline';
        valid = false;
    }

    if (valid) {
        document.getElementById('payment-details').classList.remove('hidden');
    }
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
}

function processOrder() {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const cardHolderName = document.getElementById('card-holder-name').value;

    if (cardNumber && expiryDate && cvv && cardHolderName) {
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const order = {
            orderId,
            address: document.getElementById('address').value,
            contact: `${document.getElementById('email').value}, ${document.getElementById('phone').value}`,
            cardNumber,
            cardHolderName
        };
        orders.push(order);
        alert(`Siparişiniz alındı: ${orderId}`);
        document.getElementById('order-id').textContent = `Sipariş ID: ${orderId}`;
        document.getElementById('order-address').textContent = `Adres: ${order.address}`;
        document.getElementById('order-contact').textContent = `İletişim: ${order.contact}`;
        document.getElementById('order-card-last4').textContent = `Kart Son 4: ${cardNumber.slice(-4)}`;
        document.getElementById('order-card-type').textContent = `Kart Sahibi: ${cardHolderName}`;
        document.getElementById('payment-form').classList.add('hidden');
        document.getElementById('order-confirmation').classList.remove('hidden');
    } else {
        document.getElementById('payment-error').style.display = 'inline';
    }
}

document.getElementById('account-btn').addEventListener('click', showAccountInfo);
document.getElementById('orders-btn').addEventListener('click', showOrders);
document.getElementById('campaigns-btn').addEventListener('click', showCampaigns);

function showAccountInfo() {
    document.getElementById('profile').classList.remove('hidden');
    document.getElementById('orders').classList.add('hidden');
    document.getElementById('campaigns').classList.add('hidden');
}

function showOrders() {
    document.getElementById('orders').classList.remove('hidden');
    document.getElementById('profile').classList.add('hidden');
    document.getElementById('campaigns').classList.add('hidden');
}

function showCampaigns() {
    document.getElementById('campaigns').classList.remove('hidden');
    document.getElementById('profile').classList.add('hidden');
    document.getElementById('orders').classList.add('hidden');
}

function saveProfile() {
    profile.name = document.getElementById('profile-name').value;
    profile.phone = document.getElementById('profile-phone').value;
    alert('Bilgileriniz kaydedildi.');
}
