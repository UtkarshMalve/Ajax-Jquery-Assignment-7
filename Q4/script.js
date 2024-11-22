'use strict';

const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";
const searchInput = document.querySelector("#search");
const cryptoInfo = document.querySelector(".crypto-info");
const imgTag = document.querySelector("#img");

$(document).ready(function() {
    // Hide the image and crypto info initially
    cryptoInfo.style.display = "none";

    // Fetch Data Button
    $("#fetch-data").click(function() {
        const searchText = searchInput.value.trim().toLowerCase();

        if (searchText) {
            const url = `${baseUrl}&ids=${searchText}`;

            $.getJSON(url, function(data) {
                if (data && data.length > 0) {
                    // Populate the details
                    document.querySelector("#name").innerHTML = `Coin ID: ${data[0].id}`;
                    document.querySelector("#price").innerHTML = `Price: ₹${data[0].current_price}`;
                    document.querySelector("#market-rank").innerHTML = `Market Rank: #${data[0].market_cap_rank}`;
                    imgTag.src = data[0].image;

                    // Show the crypto info
                    cryptoInfo.style.display = "block";
                } else {
                    alert("Cryptocurrency not found. Please try again.");
                }
            }).fail(function() {
                alert("Failed to fetch data. Please check your internet connection or try again.");
            });
        } else {
            alert("Please enter a coin name to search.");
        }
    });

    // Refresh Button
    $("#refresh").click(function() {
        // Clear the input field
        searchInput.value = "";

        // Hide the crypto info again
        cryptoInfo.style.display = "none";

        // Clear image source and text content
        imgTag.src = "";
        document.querySelector("#name").innerHTML = "";
        document.querySelector("#price").innerHTML = "";
        document.querySelector("#market-rank").innerHTML = "";
    });
});
