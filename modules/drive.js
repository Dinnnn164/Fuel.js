document.addEventListener("DOMContentLoaded", function () {
    const fuelPrices = {
        "95": 50,
        "92": 47,
        "diesel": 45,
        "gas": 30
    };

    const services = [
        { name: "Мийка авто", price: 100 },
        { name: "Перевірка шин", price: 50 },
        { name: "Долив масла", price: 80 }
    ];

    const fuelTypeSelect = document.getElementById("fuel-type");
    const fuelAmountInput = document.getElementById("fuel-amount");
    const calculatePriceButton = document.getElementById("calculate-price");
    const totalPriceDisplay = document.getElementById("total-price");
    const addToCartButton = document.getElementById("add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const serviceList = document.getElementById("service-list");

    function updateServiceList() {
        serviceList.innerHTML = "";
        services.forEach((service, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<input type="checkbox" id="service-${index}" data-price="${service.price}">
                                  <label for="service-${index}">${service.name} - ${service.price} грн</label>`;
            serviceList.appendChild(listItem);
        });
    }

    calculatePriceButton.addEventListener("click", function () {
        const selectedFuel = fuelTypeSelect.value;
        const amount = parseFloat(fuelAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert("Введіть коректну кількість літрів!");
            return;
        }
        const totalPrice = fuelPrices[selectedFuel] * amount;
        totalPriceDisplay.textContent = `Вартість: ${totalPrice} грн`;
    });

    addToCartButton.addEventListener("click", function () {
        const selectedFuel = fuelTypeSelect.options[fuelTypeSelect.selectedIndex].text;
        const amount = parseFloat(fuelAmountInput.value);
        const selectedServices = [];

        document.querySelectorAll("input[type=checkbox]:checked").forEach(checkbox => {
            selectedServices.push({
                name: checkbox.nextSibling.textContent,
                price: parseFloat(checkbox.dataset.price)
            });
        });

        if (isNaN(amount) || amount <= 0) {
            alert("Введіть коректну кількість літрів!");
            return;
        }

        const totalFuelPrice = fuelPrices[fuelTypeSelect.value] * amount;
        let totalServicePrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
        let finalPrice = totalFuelPrice + totalServicePrice;

        const cartItem = document.createElement("li");
        cartItem.textContent = `${selectedFuel}, ${amount} л - ${totalFuelPrice} грн`;

        if (selectedServices.length > 0) {
            cartItem.textContent += ` (Послуги: ${selectedServices.map(s => s.name).join(", ")} - ${totalServicePrice} грн)`;
        }

        cartItem.textContent += ` | Загальна сума: ${finalPrice} грн`;
        cartItemsList.appendChild(cartItem);
    });

    updateServiceList();
});
