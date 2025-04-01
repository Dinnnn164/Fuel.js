document.addEventListener("DOMContentLoaded", async () => {
    const fuelTypeSelect = document.getElementById("fuelType");
    const fuelLitersInput = document.getElementById("fuelLiters");
    const totalPriceSpan = document.getElementById("totalPrice");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const cartList = document.querySelector(".cart-container ul");
    const cartTotalSpan = document.getElementById("cartTotal");
    const clearCartBtn = document.getElementById("clearCartBtn");
    const burgerMenu = document.querySelector(".burger-menu");
    const cartContainer = document.querySelector(".cart-container");
    let fuelData = [];
    let cart = [];

    try {
        const response = await fetch("/data.json");
        fuelData = await response.json();
        populateFuelOptions();
    } catch (error) {
        console.error("Помилка завантаження даних:", error);
    }

    function populateFuelOptions() {
        fuelData.forEach(fuel => {
            const option = document.createElement("option");
            option.value = fuel.type;
            option.textContent = `${fuel.type} - ${fuel.price} грн/л`;
            fuelTypeSelect.appendChild(option);
        });
    }

    document.getElementById("calculateBtn").addEventListener("click", () => {
        const selectedFuel = fuelData.find(f => f.type === fuelTypeSelect.value);
        const liters = parseFloat(fuelLitersInput.value);
        if (selectedFuel && liters > 0) {
            const totalPrice = (liters * parseFloat(selectedFuel.price)).toFixed(2);
            totalPriceSpan.textContent = totalPrice;
        }
    });

    addToCartBtn.addEventListener("click", () => {
        const selectedFuel = fuelData.find(f => f.type === fuelTypeSelect.value);
        const liters = parseFloat(fuelLitersInput.value);
        if (selectedFuel && liters > 0) {
            const totalPrice = (liters * parseFloat(selectedFuel.price)).toFixed(2);
            cart.push({ type: selectedFuel.type, liters, totalPrice });
            updateCart();
        }
    });

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.type}: ${item.liters} л - ${item.totalPrice} грн`;
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.onclick = () => removeFromCart(index);
            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += parseFloat(item.totalPrice);
        });
        cartTotalSpan.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    burgerMenu.addEventListener("click", () => {
        cartContainer.classList.toggle("open");
    });
});
