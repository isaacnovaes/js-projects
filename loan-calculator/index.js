const calculate = document.getElementById("calculate");
const inputs = document.querySelectorAll("div.input");
const loader = document.getElementById("loader");
const results = document.querySelector("div.results-container");

calculate.addEventListener("click", () => {
	loader.style.display = "none";
	results.style.display = "none";
	let keepGoing = true;
	//CHECK IF INPUTS ARE VALID
	inputs.forEach((element) => {
		if (!parseFloat(element.querySelector("input").value)) {
			element.lastElementChild.style.display = "block";
			setTimeout(() => {
				element.lastElementChild.style.display = "none";
			}, 2500);
			keepGoing = false;
		}
	});
	//DISPLAY LOADER AND RESULTS
	if (keepGoing) {
		//CALCULATE RESULTS!!!!!!!!!!!!
		const amount = parseFloat(document.getElementById("amount").value);
		const interest = parseFloat(document.getElementById("interest").value);
		const year = parseFloat(document.getElementById("year").value);

		const totalPayment = document.getElementById("total");
		const monthlyPayment = document.getElementById("monthly");
		const totalInterest = document.getElementById("total-interest");
		const total = amount * (1 + interest / 100) ** year;

		totalPayment.innerText = (total).toFixed(3);
		monthlyPayment.innerText = (total / year / 12).toFixed(3);
		totalInterest.innerText = ((total / amount) * 100 - 100).toFixed(3) + "%";

		loader.style.display = "block";
		results.style.display = "none";
		setTimeout(() => {
			loader.style.display = "none";
			results.style.display = "block";
		}, 1500);
	}
});

// const loader = document.getElementById("loader");
// const resultsContainer = document.querySelector("div.results-container");
