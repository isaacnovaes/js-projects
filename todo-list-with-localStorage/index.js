const form = document.querySelector("form");
const container = document.querySelector("div.tasks-box");
const buttonClearTasks = document.getElementById("button-clear");
const filter = document.getElementById("filter");

function createTask(text) {
	const divContainer = document.createElement("div");
	const divItem = document.createElement("div");
	const para = document.createElement("p");
	const button = document.createElement("button");
	divContainer.appendChild(divItem);
	divItem.appendChild(para);
	divItem.appendChild(button);
	divContainer.className = "list-items-container";
	divItem.className = "item";
	button.className = "item-button";
	para.innerText = text;
	container.insertBefore(divContainer, document.getElementById("button-clear"));
}

//GET ITEMS FROM LOCAL STORAGE
document.addEventListener("DOMContentLoaded", () => {
	let storage;
	if (localStorage.getItem("storage") !== null) {
		storage = JSON.parse(localStorage.getItem("storage"));
		storage.forEach(createTask);
	}
});

//ADD AN ITEM
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const newInput = document.getElementById("newInput");
	if (newInput.value.trim() === "") {
		document.querySelector("div.input-box").lastElementChild.style.opacity = "1";
		setTimeout(() => {
			document.querySelector("div.input-box").lastElementChild.style.opacity = "0";
		}, 2000);
	} else {
		createTask(newInput.value.trim());
		//ADD TO LOCAL STORAGE
		let storage;
		if (localStorage.getItem("storage") === null) {
			storage = [];
		} else {
			storage = JSON.parse(localStorage.getItem("storage"));
		}
		storage.push(newInput.value.trim());
		localStorage.setItem("storage", JSON.stringify(storage));

		newInput.value = "";
	}
});

//REMOVE AN ITEM
container.addEventListener("click", (event) => {
	const element = event.target;
	if (element.className == "item-button") {
		element.parentElement.parentElement.style.opacity = "0";
		setTimeout(() => {
			element.parentElement.parentElement.remove();
		}, 650);

		//REMOVE ITEM FROM LOCAL STORAGE
		const storage = JSON.parse(localStorage.getItem("storage"));
		storage.forEach((value, index) => {
			if (value == element.previousElementSibling.textContent) {
				storage.splice(index, 1);
			}
		});
		localStorage.setItem("storage", JSON.stringify(storage));
	}
});

//REMOVE ALL ITEMS
buttonClearTasks.addEventListener("click", (event) => {
	const tasks = document.querySelectorAll(".list-items-container");
	const error = event.target.nextElementSibling;
	console.log(tasks);

	if (tasks.length > 0) {
		tasks.forEach((element) => {
			element.remove();
		});
		//REMOVE ITEMS FROM LOCAL STORAGE
		localStorage.removeItem("storage");
	} else {
		error.style.opacity = "1";
		setTimeout(() => {
			error.style.opacity = "0";
		}, 3000);
	}
});

//FILTER ITEMS
filter.addEventListener("keyup", (event) => {
	const input = event.target.value.toLowerCase();
	const tasks = document.querySelectorAll(".list-items-container");
	if (tasks.length > 0) {
		tasks.forEach((element) => {
			if (element.querySelector("p").textContent.toLowerCase().includes(input)) {
				element.style.display = "block";
			} else {
				element.style.display = "none";
			}
		});
	}
});
