// ===================================
// STUDENTDEALS
// CAMPUS MARKET JOURNAL
// ===================================


// OUR SAMPLE SHOP DATABASE

const shops = [

    {
        id: 1,
        name: "Campus Bites",
        category: "Food",
        discount: "15% OFF",
        type: "Local Store",
        address: "Campus Road",
        claim: "Present your student ID",
        description: "Affordable meals and snacks for students."
    },

    {
        id: 2,
        name: "PageTurn Books",
        category: "Books",
        discount: "10% OFF",
        type: "Local Store",
        address: "University Market",
        claim: "Show your student ID",
        description: "Books and academic materials."
    },

    {
        id: 3,
        name: "Urban Threads",
        category: "Fashion",
        discount: "20% OFF",
        type: "Local Store",
        address: "Campus Shopping Centre",
        claim: "Present a valid student ID",
        description: "Fashion and everyday clothing."
    },

    {
        id: 4,
        name: "Tech Corner",
        category: "Electronics",
        discount: "12% OFF",
        type: "Local Store",
        address: "Main Market",
        claim: "Show your student ID",
        description: "Electronics and accessories."
    },

    {
        id: 5,
        name: "Cloud Learning",
        category: "Technology",
        discount: "25% OFF",
        type: "Online",
        address: "Online Store",
        claim: "Register with student eligibility",
        description: "Online learning resources."
    },

    {
        id: 6,
        name: "Fresh Basket",
        category: "Food",
        discount: "10% OFF",
        type: "Local Store",
        address: "Student Market",
        claim: "Present your student ID",
        description: "Groceries and fresh food."
    }

];


// IMPORTANT:
// These are fictional demonstration listings.
// They are not verified real-world offers.

// GET THE RESULTS CONTAINER

const resultsContainer = document.getElementById("shopResults");


// FUNCTION TO DISPLAY SHOPS

function displayShops(shopList) {

    resultsContainer.innerHTML = "";

    if (shopList.length === 0) {

        resultsContainer.innerHTML = `
            <div class="empty-state">
                <span>✳</span>
                <p>No discounts found.</p>
                <small>Try another shop or category.</small>
            </div>
        `;

        return;
    }


    shopList.forEach(shop => {

        const card = document.createElement("article");

        card.className = "shop-card";

        card.innerHTML = `

            <div class="card-top">

                <span class="card-category">
                    ${shop.category}
                </span>

                <span class="card-type">
                    ${shop.type}
                </span>

            </div>


            <div class="card-main">

                <h3>${shop.name}</h3>

                <p>${shop.description}</p>

            </div>


            <div class="discount-value">
                ${shop.discount}
            </div>


            <div class="card-bottom">

                <span>📍 ${shop.address}</span>

                <span>Student offer</span>

            </div>


            <div class="claim-method">

                <strong>HOW TO CLAIM</strong>

                <p>${shop.claim}</p>

            </div>

        `;

        resultsContainer.appendChild(card);

    });

}

// DISPLAY ALL SHOPS WHEN WEBSITE LOADS

displayShops(shops);
// SEARCH FUNCTION

function searchShop() {

    const searchInput =
        document.getElementById("searchInput");

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const filteredShops = shops.filter(shop => {

        return (

            shop.name.toLowerCase().includes(searchValue) ||

            shop.category.toLowerCase().includes(searchValue) ||

            shop.description.toLowerCase().includes(searchValue)

        );

    });


    displayShops(filteredShops);

}


// SEARCH WHEN ENTER IS PRESSED

document.getElementById("searchInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            searchShop();

        }

    });
// CATEGORY FILTERING

const categoryButtons =
    document.querySelectorAll(".category-item, .filter-button");


categoryButtons.forEach(button => {

    button.addEventListener("click", function() {

        const selectedCategory =
            this.dataset.category;

        if (!selectedCategory) return;


        // UPDATE ACTIVE FILTER

        if (this.classList.contains("filter-button")) {

            document.querySelectorAll(".filter-button")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

        }


        // FILTER SHOPS

        if (selectedCategory === "All") {

            displayShops(shops);

        } else {

            const filteredShops = shops.filter(shop => {

                return shop.category === selectedCategory;

            });

            displayShops(filteredShops);

        }


        // MOVE TO DEALS SECTION

        document.getElementById("deals")
            .scrollIntoView({ behavior: "smooth" });

    });

});