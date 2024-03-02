// index.js

document.addEventListener("DOMContentLoaded", function() {
    var carModels = {
        "BMW": [
            { model: "X1", price: 35000 },
            { model: "X3", price: 45000 },
            { model: "X5", price: 60000 }
        ],
        "Ford": [
            { model: "Fiesta", price: 20000 },
            { model: "Focus", price: 25000 },
            { model: "Mustang", price: 40000 }
        ],
        "Toyota": [
            { model: "Corolla", price: 22000 },
            { model: "Camry", price: 30000 },
            { model: "Rav4", price: 35000 }
        ],
        "Dodge": [
            { model: "Charger", price: 40000 },
            { model: "Challenger", price: 45000 },
            { model: "Durango", price: 50000 }
        ],
        "Volkswagen": [
            { model: "Golf", price: 28000 },
            { model: "Jetta", price: 32000 }
        ]
    };

    function showCarModels(searchQuery) {
        var carModelsDiv = document.getElementById("carModelsDiv");
        var modelsHTML = "";

        if (searchQuery.trim() === "") {
            carModelsDiv.innerHTML = "Please enter a search query.";
            return;
        }

        Object.keys(carModels).forEach(function(brand) {
            carModels[brand].forEach(function(car) {
                if (car.model.toLowerCase().includes(searchQuery.toLowerCase())) {
                    modelsHTML += `<div><a href="#" onclick="showCarPrice('${brand}', '${car.model}')">${brand} - ${car.model}</a></div>`;
                }
            });
        });

        carModelsDiv.innerHTML = modelsHTML || "No matching models found.";
    }

    window.showCarPrice = function(brand, model) {
        var carPriceDiv = document.getElementById("carPriceDiv");
        var price = carModels[brand].find(function(car) {
            return car.model === model;
        }).price;

        carPriceDiv.textContent = `Price of ${brand} ${model}: $${price.toLocaleString()}`;
    }

    window.clearOutputs = function() {
        var carModelsDiv = document.getElementById("carModelsDiv");
        var carPriceDiv = document.getElementById("carPriceDiv");
        var searchInput = document.getElementById("searchInput");

        carModelsDiv.innerHTML = ""; 
        carPriceDiv.textContent = ""; 
        searchInput.value = ""; 
    }

    window.compareCarPrices = function() {
        var car1Brand = prompt("Enter the brand of the first car:");
        var car1Model = prompt("Enter the model of the first car:");
        var car2Brand = prompt("Enter the brand of the second car:");
        var car2Model = prompt("Enter the model of the second car:");

        if (carModels[car1Brand] && carModels[car2Brand]) {
            var car1Price = carModels[car1Brand].find(function(car) {
                return car.model === car1Model;
            });
            var car2Price = carModels[car2Brand].find(function(car) {
                return car.model === car2Model;
            });

            if (car1Price && car2Price) {
                if (car1Price.price < car2Price.price) {
                    alert(`${car1Brand} ${car1Model} is cheaper than ${car2Brand} ${car2Model}.`);
                } else if (car1Price.price > car2Price.price) {
                    alert(`${car1Brand} ${car1Model} is more expensive than ${car2Brand} ${car2Model}.`);
                } else {
                    alert(`${car1Brand} ${car1Model} and ${car2Brand} ${car2Model} have the same price.`);
                }
            } else {
                alert("One or both of the entered car models were not found.");
            }
        } else {
            alert("One or both of the entered car brands were not found.");
        }
    }

    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function(event) {
        var searchQuery = event.target.value.trim();
        showCarModels(searchQuery);
    });

    // Adding event listener to all car items
    var carItems = document.querySelectorAll('.car-item');
    carItems.forEach(function(carItem) {
        carItem.addEventListener('click', function() {
            var brand = carItem.getAttribute('data-brand');
            var model = carItem.getAttribute('data-model');
            showCarPrice(brand, model);
        });
    });
});
