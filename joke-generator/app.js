const submitBtn = document.querySelector('input[type="submit"]'),
	slider = document.getElementById("number");

submitBtn.addEventListener("click", getJokes);

function getJokes(event) {
	event.preventDefault();
	const category = document.getElementById("category").value,
		number = document.getElementById("number").value,
		type = document.getElementById("type"),
		blockedJokes = Array.from(document.getElementsByName("block"));

	let block = "",
		jokeType,
		amount;

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
		// Format blocked joke string according to the API requirements
		block = "?blacklistFlags=".concat(block.substr(0, block.length - 1));
	}

	type.value.includes("any") ? (jokeType = "") : (jokeType = `&type=${type.value}`);
	+number > 1 ? (amount = `&amount=${number}`) : (amount = "");

	const requestString = category.concat(block, jokeType, amount);

    //STOPPED HEREEEEEEEEE
    //Now, just fetch data from API with the requestString
}

slider.addEventListener("input", showSliderValue);

function showSliderValue(event) {
	const inputValue = event.target.value,
		numberPosition = event.target.previousElementSibling.previousElementSibling;
	numberPosition.style.right = 111 - 12.3 * (inputValue - 1) + "px";
	numberPosition.textContent = inputValue;
}
