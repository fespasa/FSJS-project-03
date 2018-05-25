window.onload = function() {
	// Create the variables for the DOM elements.
    const form = document.querySelector("form");
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#mail');
    const jobRoleField = document.querySelector('#title');
    const shirtDesign = document.querySelector('#design');
    const shirtColor = document.querySelector('#color');
    const activities = document.querySelector('.activities');
    const activitiesInputs = document.querySelectorAll('.activities input');
    const paymentSection = document.querySelectorAll('fieldset')[3];
    const payment = document.querySelector('#payment');
    const cc = document.querySelector("#cc-num");
    const zip = document.querySelector("#zip");
    const cvv = document.querySelector("#cvv");
    const submit = document.querySelector("button");
    // I use regex for email and fields for CreditCard, ZipCode and CVV
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const numRegex = /^[0-9]+$/;
    // create a veriable called total where total cost of activities will be stored.
    let total = 0;
    // an array called vaidation that will store the state of validation of each field that should be validated.
    let validation = [false, false, false, false, false, false];


    /* ---------- NAME SECTION ---------- */
	nameField.focus(); // start with the cursor in the NameField

	nameField.addEventListener("keyup", nameValidation); // each time you write something in the name field will be validated.


    /* ---------- EMAIL SECTION ---------- */

    emailField.addEventListener("keyup", emailValidation); // each time you write something in the email field will be validated.


    /* ---------- JOB ROLE SECTION ---------- */
    document.querySelector('#other-title').style.display = "none";
	// by defauly job Role field won't be displayed. Only when the value of jobRole changes to other it will be displayed.
	jobRoleField.addEventListener("change", () => {
		if(jobRoleField.value === "other") {
			document.querySelector('#other-title').style.display = "block";
		} else {
            document.querySelector('#other-title').style.display = "none";
		}
	});
	
	/* ---------- T-SHIRT INFO SECTION ---------- */
    if(shirtDesign.value === "Select Theme")
    {
        shirtColor.parentNode.style.display = "none";
    } // Color dropdown is not displayed by default

	shirtDesign.addEventListener("change", () => {
		// Only when the uses selects a theme the color dropdown shows only with the option of that particular theme.
        if(shirtDesign.value === "Select Theme")
        {
            shirtColor.parentNode.style.display = "none";
        } else {
            shirtColor.parentNode.style.display = "block";
		}
		for(let i = 1; i < shirtColor.childNodes.length; i = i + 2){
			shirtColor.childNodes[i].style.display = "";	
			if( shirtDesign.value === "js puns"){
				if(i >= 6) {
                    shirtColor.childNodes[i].style.display = "none";
                }
                shirtColor.childNodes[1].selected = 'selected';
			} else if (shirtDesign.value === "heart js"){
				if(i < 6){
					shirtColor.childNodes[i].style.display = "none";
				}
                shirtColor.childNodes[7].selected = 'selected';
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
            activitiesValidation();// Calls the validation function too validate that something is checked.
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
	
	/* ---------- PAYMENT SECTION ---------- */
	// identify each div
	const creditCardDiv = paymentSection.children[3];
	const payPalDiv = paymentSection.children[4];
	const bitcoinDiv = paymentSection.children[5];
	
	// hide the "Select Payment Method" option and select "Credit Card" as the default option 
	let paymentOptions = payment.children;
	paymentOptions[0].style.display = "none";
	payment.selectedIndex = 1;
	
	// hide divs that haven't had to be displayed with the "Credit Card" option.
	payPalDiv.style.display = "none";
	bitcoinDiv.style.display = "none";
	
	payment.addEventListener("change", () => {
		// for each diferent value we show the correct div. And we validate Credit Card, ZipCode and CVV because we won't use them.
		if(payment.value === "credit card"){
			creditCardDiv.style.display = "block";
			payPalDiv.style.display = "none";
			bitcoinDiv.style.display = "none";
		}
		if(payment.value === "paypal"){
			creditCardDiv.style.display = "none";
			payPalDiv.style.display = "block";
			bitcoinDiv.style.display = "none";
			validation[3]= true;
            validation[4]= true;
            validation[5]= true;
		}
		if(payment.value === "bitcoin") {
            creditCardDiv.style.display = "none";
            payPalDiv.style.display = "none";
            bitcoinDiv.style.display = "block";
            validation[3]= true;
            validation[4]= true;
            validation[5]= true;
        }
	});

	// validates Credit Card, ZipCode and CVV each time you enter a key on it.
	cc.addEventListener("keyup", creditCardValidation);
    zip.addEventListener("keyup", zipValidation);
    cvv.addEventListener("keyup", cvvValidation);
	
	/* ---------- FORM VALIDATION ---------- */
    let isValid; // creates a variable that will check the entire form.

	form.addEventListener("keyup", () => {
		// in each change of the form we will validate the form checking if there
		isValid = validation.indexOf(false);
		// allows submitting again.
        submit.disabled = false;
	});

	submit.addEventListener("click", () => {
		// logs the first position of the validation that is false on the console.
        console.log(validation.indexOf(false));

        // if the form is not valid
        if(isValid !== -1){
        	// disables the submit button
            submit.disabled = true;
            // creates a div where we will store error messages... and remove a previous error div.
            let error = document.querySelector("#errorDiv");
            if(error !== null){
                let parentError = error.parentNode;
                parentError.removeChild(error);
			}
            let errorDiv = document.createElement("DIV");
            errorDiv.setAttribute("id", "errorDiv");
            submit.before(errorDiv);
            // checks whichs fields have an error and shows/create content about the error.
            for(let i = 0; i < validation.length; i++){
                let errorMessage;
                if(validation[i] === false){
                    switch (i){
						case 0:
                        	// Name field option. Creates a message and the border of the text field turns red.
                            errorMessage = document.createElement("H3");
                            errorMessage.innerHTML = "Name can't be blank";
                            errorMessage.style.color = "red";
                            errorDiv.appendChild(errorMessage);
                            nameField.style.border = "solid red";
                            break;
						case 1:
                            // Email field option. Creates a message and the border of the text field turns red.
                            errorMessage = document.createElement("H3");
                            // message should be different if the field is blank or the email format is not valid.
                            if(emailField.value.length === 0){
                                errorMessage.innerHTML = "Email can't be blank";
							}else{
                                errorMessage.innerHTML = "Email should be correctly formatted";
							}
                            errorMessage.style.color = "red";
                            errorDiv.appendChild(errorMessage);
                            emailField.style.border = "solid red";
                            break;
                        case 2:
                            // Activities option. Creates a message and the color of the activities title turns red.
                            errorMessage = document.createElement("H3");
                            errorMessage.innerHTML = "You have to select at least 1 activity";
                            errorMessage.style.color = "red";
                            errorDiv.appendChild(errorMessage);
                            activities.childNodes[1].style.color = "red";
                            break;
                        case 3:
                            // Credit card field option. Creates a message and the border of the text field turns red.
                            errorMessage = document.createElement("H3");
                            errorMessage.innerHTML = "Credit card should have between 13 and 16 numbers.";
                            errorMessage.style.color = "red";
                            errorDiv.appendChild(errorMessage);
                            cc.style.border = "solid red";
                            break;
                        case 4:
                            // Zip Code field option. Creates a message and the border of the text field turns red.
                            errorMessage = document.createElement("H3");
                            errorMessage.innerHTML = "Zip Code should have 5 numbers.";
                            errorMessage.style.color = "red";
                            errorDiv.appendChild(errorMessage);
                            zip.style.border = "solid red";
                            break;
                        case 5:
                            // CVV field option. Creates a message and the border of the text field turns red.
                            errorMessage = document.createElement("H3");
                            errorMessage.innerHTML = "CVV should have 3 numbers.";
                            errorMessage.style.color = "red";
                            errorDiv.appendChild(errorMessage);
                            cvv.style.border = "solid red";
                            break;
                    }
                }
            }
        }
	});

	// Next the functions that are validating each field everytime you change something of it.

    function nameValidation(){
    	// checks if the value is not empty and store true or false in the array.
        if(nameField.value.length > 0){
            validate(nameField, 0, true);
        } else {
            validate(nameField, 0, false);
        }
    }

    function emailValidation(){
    	// checks if the format of the email is correct and store true or false in the array.
        let valEmail = emailRegex.test(emailField.value);

        if(valEmail){
            validate(emailField, 1, true);
        } else {
            validate(emailField, 1, false);
        }
    }

    function activitiesValidation() {
    	// creates a validator call isSomethingChecked and it stores a false.
        let isSomethingChecked = false;
        // checks every checkbox and if there's something checked, changes the validator as true.
        for(let i = 0; i < activitiesInputs.length; i++){
            if(activitiesInputs[i].checked){
                isSomethingChecked = true;
            }
        }
        // if validator is true we store true in the array. Otherwise, we store false.
        if(isSomethingChecked === false){
            validation[2] = false;
        } else {
            validation[2] = true;
            activities.childNodes[1].style.color = "";
        }
    }

    function creditCardValidation(){
    	// checks if all are numbers and the length of it. If it is correct, we store true into the array. Otherwise, we store false.
        let valCC = numRegex.test(cc.value);

        if(valCC){
        	if(cc.value.length < 13 || cc.value.length > 16){
                validate(cc, 3, false);
			} else {
                validate(cc, 3, true);
			}
        } else {
            validate(cc, 3, false);
        }
	}

    function zipValidation(){
        // checks if all are numbers and the length of it. If it is correct, we store true into the array. Otherwise, we store false.
        let valZip = numRegex.test(zip.value);

        if(valZip){
            if(zip.value.length !== 5){
                validate(zip, 4, false);
            } else {
                validate(zip, 4, true);
            }
        } else {
            validate(zip, 4, false);
        }
    }

    function cvvValidation(){
        // checks if all are numbers and the length of it. If it is correct, we store true into the array. Otherwise, we store false.
        let valCvv = numRegex.test(cvv.value);

        if(valCvv){
            if(cvv.value.length !== 3){
                validate(cvv, 5, false);
            } else {
                validate(cvv, 5, true);
            }
        } else {
        	validate(cvv, 5, false);
        }
    }

    function validate(obj, pos, eval){
    	// this function is to avoid repeating code. We change the color of border when the value is valid (green) and when it's not (red).
    	if(eval === false){
            obj.style.border = "solid red";
		} else {
            obj.style.border = "solid green";
		}
    	validation[pos] = eval;
	}
};