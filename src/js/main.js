import { commomHeaderFooter } from "./utils.mjs";

commomHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload
        const location = document.getElementById("location").value;
        // Do something with the location, for example:
        console.log("Searching for:", location);
        // You can call a function here to fetch weather, etc.
    });
});

