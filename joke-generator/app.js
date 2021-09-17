const submitBtn = document.querySelector('input[type="submit"]'),
	slider = document.getElementById("number"),
	jokesDisplayContainer = document.querySelector("div.display-jokes");

submitBtn.addEventListener("click", getJokes);

async function getJokes(event) {
	event.preventDefault();
	jokesDisplayContainer.innerHTML = "";
	jokesDisplayContainer.className = "display-jokes";

	const requestString = getRequestString(),
		response = await fetch(requestString),
		dataObject = await response.json();

	if (dataObject.error) {
		displayError(dataObject.message);
	} else {
		if (dataObject.jokes) {
			//Multiple jokes requested
			dataObject.jokes.forEach((item) => {
				if (item.type == "single") {
					displayJoke(item.joke);
				} else {
					displayJoke(item.setup, item.delivery);
				}
			});
		} else if (dataObject.type == "single") {
			displayJoke(dataObject.joke);
		} else {
			displayJoke(dataObject.setup, dataObject.delivery);
		}
	}
}

function getRequestString() {
	const category = document.getElementById("category").value,
		number = document.getElementById("number").value,
		type = document.getElementById("type"),
		blockedJokes = Array.from(document.getElementsByName("block"));

	let block = "";

	if (
		blockedJokes.some((item) => {
			return item.checked;
		})
	) {
		blockedJokes.forEach((item) => {
			if (item.checked) {
				block += `${item.value},`;
			}
		});
		block = "&blacklistFlags=".concat(block.substr(0, block.length - 1));
	}

	let jokeType, amount;

	type.value.includes("any") ? (jokeType = "") : (jokeType = `&type=${type.value}`);
	+number > 1 ? (amount = `&amount=${number}`) : (amount = "");

	const result = [category, block, jokeType, amount];
	let unique = "";

	result.forEach((item) => {
		if (item) {
			unique += item;
		}
	});

	unique = unique.replace("&", "?");
	return "https://v2.jokeapi.dev/joke/".concat(unique);
}

slider.addEventListener("input", showSliderValue);

function showSliderValue(event) {
	const inputValue = event.target.value,
		numberPosition = event.target.previousElementSibling.previousElementSibling;
	numberPosition.style.right = 111 - 12.3 * (inputValue - 1) + "px";
	numberPosition.textContent = inputValue;
}

function displayJoke(firstLine, secondLine = "") {
	const jokeContainer = document.createElement("div");
	jokeContainer.className = "display";
	const lineOne = document.createElement("p");
	lineOne.innerText = firstLine;
	const lineTwo = document.createElement("p");
	lineTwo.innerText = secondLine;

	jokeContainer.append(lineOne);
	jokeContainer.append(lineTwo);

	jokesDisplayContainer.append(jokeContainer);
}

/*
<div class="display-jokes">
	<div class="display">
		<p>Joke</p>
		<p>Joke</p>
	</div> 
</div>
*/

function displayError(firstLine) {
	jokesDisplayContainer.className = "error";
	const jokeContainer = document.createElement("div");
	const lineOne = document.createElement("p");
	lineOne.innerText = firstLine.concat(". Try another filter.");
	jokeContainer.append(lineOne);
	jokesDisplayContainer.append(jokeContainer);
}

/*
<div class="display-jokes error">
	<div class="display">
		<p>Joke</p>
		<p>Joke</p>
	</div> 
</div>
*/
