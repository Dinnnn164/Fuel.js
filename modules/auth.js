const Admin_Credentials = {
    username: "Diana",
    password: "Panchuk"
};

function login() {
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let errorElement = document.getElementById('login-error');

    if (username === Admin_Credentials.username && password === Admin_Credentials.password) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "/page/admin.html";
    } else {
        errorElement.textContent = "Невірний логін або пароль";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("admin.html")) {
        if (localStorage.getItem("isAdmin") !== "true") {
            alert("Ви не авторизовані! Повертаємось на головну...");
            window.location.href = "/page/index.html";
        }
    }

    let logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isAdmin");
            window.location.href = "/page/index.html";
        });
    }
});
