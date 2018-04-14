window.onload = function() {
	const nameField = document.querySelector('#name');
	const jobRoleField = document.querySelector('#title');
	
	nameField.focus();
	
	/* ---------- JOB ROLE SECTION ---------- */
	jobRoleField.addEventListener("change", () => {
		if(document.querySelector('#other-title')) {
			document.querySelector('#other-title').style.display = 'none';
		}
		if(jobRoleField.value === "other") {
			const jobTextField = document.createElement("INPUT");
			jobTextField.setAttribute("type", "text");
			jobTextField.setAttribute("id", "other-title");
			jobTextField.setAttribute("placeholder", "Your Job Role");
			jobRoleField.after(jobTextField);
		}
	});
}