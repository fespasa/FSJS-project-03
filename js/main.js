window.onload = function() {
	const nameField = document.querySelector('#name');
	const jobRoleField = document.querySelector('#title');
	// const shirtSection = document.querySelector('.shirt');
	const shirtSize = document.querySelector('#size');
	const shirtDesign = document.querySelector('#design');
	const shirtColor = document.querySelector('#color');
	const activities = document.querySelector('.activities');
	const activitiesInputs = document.querySelectorAll('.activities input');
	
	let total = 0;
	
	nameField.focus();
	
	/* ---------- JOB ROLE SECTION ---------- */
	jobRoleField.addEventListener("change", () => {
		if(document.querySelector('#other-title')) {
			document.querySelector('#other-title').style.display = "none";
		}
		if(jobRoleField.value === "other") {
			const jobTextField = document.createElement("INPUT");
			jobTextField.setAttribute("type", "text");
			jobTextField.setAttribute("id", "other-title");
			jobTextField.setAttribute("placeholder", "Your Job Role");
			jobRoleField.after(jobTextField);
		}
	});
	
	/* ---------- T-SHIRT INFO SECTION ---------- */
	const defaultOption = document.createElement("OPTION");
	defaultOption.text = "<-- Please select a T-shirt theme"
	shirtColor.childNodes[0].before(defaultOption);
	shirtDesign.addEventListener("change", () => {
		for(let i = 1; i < shirtColor.childNodes.length; i = i + 2){
			shirtColor.childNodes[i].style.display = "";	
			if( shirtDesign.value === "js puns"){
				if(i >= 6){
					shirtColor.childNodes[i].style.display = "none";
				}
			} else if (shirtDesign.value === "heart js"){
				if(i < 6){
					shirtColor.childNodes[i].style.display = "none";
				}
			}
		}
	});
	
	/* ---------- ACTIVITIES SECTION ---------- */
	for(let i = 0; i < activitiesInputs.length; i++) {
		// Add and event listener to a checkbox state change	
		activitiesInputs[i].addEventListener("change", () => {
			addAmount(i); // Call the function that adds the correct ammount to the total
			isActivityAvaliable(i); // Call a function that check other activities availability
			console.log(total);
			// checks if there is a previous ammount on the screen and deletes it
			if(activities.childNodes.length > 16){
				activities.removeChild(activities.childNodes[16]);
			}
			// creates a new ammount and we add to the DOM
			if(total !== 0) {
				let totalAmmount = document.createElement("H3");
				totalAmmount.innerHTML = "Total: $" + total;
				activities.appendChild(totalAmmount);
			}
		});
	}
	
	function addAmount(index){
		 
		if(index === 0) {
			// if it's the first activity the function adds 200 when is checked. If it's not checked the function substract 200.
			if(activitiesInputs[0].checked){
				total = total + 200;
			} else {
				total = total - 200;
			}
		} else {
			// if it's any other activity the function adds 100 when is checked. If it's not checked the function substract 100.
			if(activitiesInputs[index].checked){
				total = total + 100;
			} else {
				total = total - 100;
			}
		}
	}
	
	function isActivityAvaliable(index){
		/* I've created this function that is comproving which activities are available after one of them has been checked. In every case, it calls a function called disableEnableActivity which will enable or disable activities when it's necessary. */
		switch(index) {
			case 1:
				disableEnableActivity(3);
				disableEnableActivity(5);
				break;
			case 2:
				disableEnableActivity(4);
				disableEnableActivity(6);
				break;
			case 3:
				disableEnableActivity(1);
				disableEnableActivity(5);
				break;
			case 4:
				disableEnableActivity(2);
				disableEnableActivity(6);
				break;
			case 5:
				disableEnableActivity(1);
				disableEnableActivity(3);
				break;
			case 6:
				disableEnableActivity(2);
				disableEnableActivity(4);
				break;
		}
		
		function disableEnableActivity(activityIndex){
			let activityLabel = activitiesInputs[activityIndex].parentNode;
			// the function enables the activity and the checkbox if it's disabled and does the opposite when is enabled.
			if(activitiesInputs[activityIndex].hasAttribute("disabled")){
				activitiesInputs[activityIndex].removeAttribute("disabled");
				activityLabel.removeAttribute("style");
			} else {
				activitiesInputs[activityIndex].setAttribute("disabled", true);
				activityLabel.setAttribute("style", "text-decoration: line-through; opacity: 0.6;");
			}
		}
	}
}