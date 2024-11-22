const URL = 'https://api.api-ninjas.com/v1/quotes?category=';
const key = "3nG4ESDW5FLv1KQnyC1dBA==hG4dFwaPBjW9cYdk";

$(document).ready(function() {
    $("button").click(function() {
        const category = $("#categoryInput").val(); // Get the category from the select element

        // Check if the category input is not empty
        if (category) {
            const requestUrl = URL + encodeURIComponent(category) ; // Encode the category for URL
            $.ajax({
                type: "GET",
                url: requestUrl,  // Use the user-provided category in the URL
                headers: { "X-Api-Key": key },  // Sending the API key in headers
                success: function(data) {
                    if (data && data.length > 0) {
                        // Assuming the data returned is an array of quotes
                        $("#quoteWrite").text(data[0].quote);
                        console.log(data) // Display the first quote
                    } else {
                        $("#quoteWrite").text("No quotes found for this category.");
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error:", status, error);  // Error handling
                    $("#quoteWrite").text("An error occurred. Please try again.");
                }
            });
        } else {
            alert("Please select a category!");
        }
    });
});
