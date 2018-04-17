window.onload = function() {
	const nameField = document.querySelector('#name');
	const jobRoleField = document.querySelector('#title');
	// const shirtSection = document.querySelector('.shirt');
	const shirtSize = document.querySelector('#size');
	const shirtDesign = document.querySelector('#design');
	const shirtColor = document.querySelector('#color');
	console.log(shirtDesign.childNodes);
	
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
}