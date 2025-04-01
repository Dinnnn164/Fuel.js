document.addEventListener("DOMContentLoaded", function () {
    // Перемикання карти
    const toggleMapButton = document.getElementById("toggle-map");
    const mapSection = document.getElementById("map-section");

    if (toggleMapButton && mapSection) {
        toggleMapButton.addEventListener("click", function (event) {
            event.preventDefault();
            mapSection.classList.toggle("hidden");
        });
    }

    // Переходи між сторінками
    const adminLink = document.getElementById("admin-link");
    if (adminLink) {
        adminLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "/page/admin.html";
        });
    }

    const indexLink = document.getElementById("index-link");
    if (indexLink) {
        indexLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "/page/index.html";
        });
    }

    const drivesLink = document.getElementById("drives-link");
    if (drivesLink) {
        drivesLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "/page/drives.html";
        });
    }


    // Робота з таблицею пального
    const fuelTable = document.getElementById("fuel-table")?.getElementsByTagName("tbody")[0];
    const addFuelButton = document.getElementById("add-fuel");

    if (fuelTable && addFuelButton) {
        let fuelData = JSON.parse(localStorage.getItem("fuelData")) || [];

        function saveFuelData() {
            localStorage.setItem("fuelData", JSON.stringify(fuelData));
        }

        function loadFuelData() {
            fuelTable.innerHTML = "";
            fuelData.forEach((fuel, index) => createTableRow(fuel, index));
        }

        function createTableRow(fuel, index) {
            let row = fuelTable.insertRow();
            row.innerHTML = `
                <td contenteditable="true" class="editable">${fuel.type}</td>
                <td contenteditable="true" class="editable">${fuel.price}</td>
                <td contenteditable="true" class="editable">${fuel.quantity}</td>
                <td contenteditable="true" class="editable">${fuel.forCars}</td>
                <td><button class="delete-btn" data-index="${index}">Видалити</button></td>
            `;

            row.querySelectorAll(".editable").forEach((cell) => {
                cell.addEventListener("blur", function () {
                    fuelData[index] = {
                        type: row.cells[0].innerText,
                        price: row.cells[1].innerText,
                        quantity: row.cells[2].innerText,
                        forCars: row.cells[3].innerText
                    };
                    saveFuelData();
                });
            });

            row.querySelector(".delete-btn").addEventListener("click", function () {
                fuelData.splice(index, 1);
                saveFuelData();
                loadFuelData();
            });
        }

        addFuelButton.addEventListener("click", function () {
            let newFuel = {
                type: "Введіть тип",
                price: "0.00",
                quantity: "0",
                forCars: "Універсально"
            };

            fuelData.push(newFuel);
            saveFuelData();
            createTableRow(newFuel, fuelData.length - 1);
        });

        if (fuelData.length === 0) {
            fetch("/data.json")
                .then(response => response.json())
                .then(data => {
                    fuelData = data;
                    saveFuelData();
                    loadFuelData();
                })
                .catch(error => console.error("Помилка завантаження data.json:", error));
        } else {
            loadFuelData();
        }
    }
});
