// Imports your SCSS stylesheet
import "./styles/index.scss";

import cars from "./js/data/car-dataset.json";

const yearDropdown = document.querySelector("#year-dropdown");
const makeDropdown = document.querySelector("#make-dropdown");
const modelDropdown = document.querySelector("#model-dropdown");

const makeLabel = document.querySelector("label[for='make-dropdown'");
const modelLabel = document.querySelector("label[for='model-dropdown'");

const makeFieldset = document.querySelector("#make-fieldset");
const modelFieldset = document.querySelector("#model-fieldset");

const years = [...new Set(cars.map(car => car.year))].sort();
years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
});

// Add listener for the year dropown
yearDropdown.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const isDisabled = e.target.value === "";
    const legend = makeFieldset.querySelector("legend");

    makeDropdown.disabled = isDisabled;
    makeDropdown.innerHTML = '<option value="">Select Make</option>';
    modelDropdown.disabled = true;
    modelDropdown.innerHTML = '<option value="">Select Model</option>';
    modelFieldset.classList.remove("blue-fieldset");
    modelLabel.classList.add("text-disabled");

    if (isDisabled) {
        modelDropdown.classList.add("text-disabled");
        makeLabel.classList.add("text-disabled");
        makeFieldset.classList.remove("blue-fieldset");
        legend.classList.add("text-disabled");
    } else {
        modelDropdown.classList.remove("text-disabled");
        makeLabel.classList.remove("text-disabled");
        makeFieldset.classList.add("blue-fieldset");
        legend.classList.remove("text-disabled");
    }

    const makes = [...new Set(
        cars
            .filter(car => car.year === parseInt(yearDropdown.value))
            .map(car => car.Manufacturer)
    )].sort();

    makes.forEach(make => {
        const option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeDropdown.appendChild(option);
    });
});

// Add listener for the make (Manufacturer) dropown
makeDropdown.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const legend = modelFieldset.querySelector("legend");
    const isDisabled = e.target.value === "";

    modelDropdown.disabled = isDisabled;
    modelDropdown.innerHTML = '<option value="">Select Model</option>';


    if (isDisabled) {
        modelLabel.classList.add("text-disabled");
        modelFieldset.classList.remove("blue-fieldset");
        legend.classList.add("text-disabled");
    } else {
        modelLabel.classList.remove("text-disabled");
        modelFieldset.classList.add("blue-fieldset");
        legend.classList.remove("text-disabled");
    }

    const models = [...new Set(
        cars
            .filter(car =>
                car.year === parseInt(yearDropdown.value) &&
                car.Manufacturer === makeDropdown.value
            )
            .map(car => car.model)
    )].sort();

    models.forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelDropdown.appendChild(option);
    });
});

// Add listener for the model dropown
modelDropdown.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const selectedCar = cars.find(car =>
        car.year === parseInt(yearDropdown.value) &&
        car.Manufacturer === makeDropdown.value &&
        car.model === modelDropdown.value
    );
    console.log(selectedCar);
});
