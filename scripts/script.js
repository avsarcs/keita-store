document.addEventListener("DOMContentLoaded", loadListings);

function newProduct() {

    let product = [];
    let title = document.getElementById("p-title");
    let price = document.getElementById("p-price");
    let thumbnail = document.getElementById("p-thumbnail");
    const reader = new FileReader();

    console.log(thumbnail.files[0]);
    product.push(title.value);
    product.push(price.value);

    reader.addEventListener("load", () => {
        product.push( reader.result );
        sessionStorage.setItem("product-" + sessionStorage.length, JSON.stringify(product) );
        loadListings();
    });

    if ( thumbnail.files.length ) {
        reader.readAsDataURL( thumbnail.files[0] );
    } else {
        product.push("./images/product-thumbnails/fallback.png");
        sessionStorage.setItem("product-" + sessionStorage.length, JSON.stringify(product) );
        loadListings();
    }
};

function loadListings() {
    let product;
    let newListing, title, price, thumbnail;

    for (let i = 0; i < sessionStorage.length; i++) {

        // sessionStorage.getItem returns an array where index [0] is product title,
        // [1] is price and [2] is thumbnail.
        product = JSON.parse( sessionStorage.getItem( "product-" + i ) );
        console.log(product);
        newListing = document.createElement("div");
        newListing.setAttribute("class", "listing");
        newListing.setAttribute("id", "product-" + i);

        title = document.createElement("div");
        title.setAttribute("class", "product-title");
        title.innerText = product[0];

        price = document.createElement("div");
        price.setAttribute("class", "product-price");
        price.innerText = product[1] + "$";

        thumbnail = document.createElement("img");
        thumbnail.setAttribute("class", "product-thumbnail");
        thumbnail.setAttribute("alt", "thumbnail");
        thumbnail.setAttribute("src", product[2]);

        newListing.append(thumbnail);
        newListing.append(title);
        newListing.append(price);

        document.querySelector(".listing-panel").append(newListing);
    }

}

function toggleOverlay() {

    if ( document.querySelector(".overlay-panel").style.display == "none" ) {
        document.querySelector(".overlay-panel").style.display = "block";
        document.querySelector(".container").style.display = "none";
    } else {
        document.querySelector(".overlay-panel").style.display = "none";
        document.querySelector(".container").style.display = "flex";
    }

}