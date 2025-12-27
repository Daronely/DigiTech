// 1. دیتابیس فرضی محصولات (آرایه‌ای از اشیاء)
const products = [
    {
        id: 1,
        title: "لپ‌تاپ گیمینگ ایسوس",
        price: 45000000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_l7vqkWMPSVcD45qi557iNo_xcCll-wDEw&s"
    },
    {
        id: 2,
        title: "هدفون نویز کنسلینگ",
        price: 3500000,
        image: "https://iranheadphone.com/image/data/product2/Sony/MDR-ZX110NC/1_MDRZX110NC.jpg"
    },
    {
        id: 3,
        title: "ساعت هوشمند اپل",
        price: 12000000,
        image: "https://api2.zoomit.ir/media/66dff8ade404d665a09e0656"
    },
    {
        id: 4,
        title: "دوربین عکاسی کانن",
        price: 25000000,
        image: "https://dkstatics-public.digikala.com/digikala-products/818b2b568c02da1215e5e61fd83b2563420115f0_1752479758.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80"
    },
    {
        id: 5,
        title: "گوشی موبایل سامسونگ",
        price: 38000000,
        image: "https://dkstatics-public.digikala.com/digikala-products/c23b49b0be1c4ae5b2a3d7a3281d2f1731065243_1731924578.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80"
    },
    {
        id: 6,
        title: "کنسول بازی PS5",
        price: 28000000,
        image: "https://api2.zoomit.ir/media/652d05b9eb21a6b54f50a48f?w=1920&q=80"
    }
];

// سبد خرید (آرایه‌ای خالی برای شروع)
let cart = [];

// انتخاب عناصر DOM
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const totalPriceSpan = document.getElementById('total-price');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');

// 2. تابع نمایش محصولات در صفحه
function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // قالب بندی قیمت به صورت ۳ رقم ۳ رقم
        const formattedPrice = product.price.toLocaleString('fa-IR');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <span class="price">${formattedPrice} تومان</span>
                <button class="btn" onclick="addToCart(${product.id})">افزودن به سبد</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// 3. تابع افزودن محصول به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    // باز کردن سبد خرید بعد از اضافه شدن (اختیاری)
    if (!cartSidebar.classList.contains('active')) {
        toggleCart();
    }
}

// 4. تابع حذف محصول از سبد خرید
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 5. بروزرسانی ظاهر سبد خرید و قیمت‌ها
function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">سبد خرید شما خالی است.</p>';
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalCount += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p>${item.quantity} x ${item.price.toLocaleString('fa-IR')}</p>
            </div>
            <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCountSpan.textContent = totalCount.toLocaleString('fa-IR');
    totalPriceSpan.textContent = totalPrice.toLocaleString('fa-IR') + " تومان";
}

// 6. باز و بسته کردن منوی سبد خرید
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// 7. تابع نهایی کردن خرید (شبیه‌سازی)
function checkout() {
    if (cart.length > 0) {
        alert("از خرید شما متشکریم! سفارش شما ثبت شد.");
        cart = [];
        updateCartUI();
        toggleCart();
    } else {
        alert("سبد خرید شما خالی است!");
    }
}

// اجرای اولیه
renderProducts();
