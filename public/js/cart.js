const payBtn = document.querySelector(".checkout-btn");

if (payBtn) {
    payBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const items = JSON.parse(localStorage.getItem("cartItems")) || [];

        if (items.length === 0) {
            alert("Your cart is empty");
            return;
        }

        fetch("/stripe-checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Invalid URL received from server:", data.url);
            }
        })
        .catch((err) => console.error(err));
    });
}