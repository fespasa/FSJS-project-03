window.onload = function() {
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
	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const numRegex = /^[0-9]+$/;
	let total = 0;

    submit.removeAttribute('disabled');

    /* ---------- NAME SECTION ---------- */
	nameField.focus();

	nameField.addEventListener("keyup", nameValidation);


    /* ---------- EMAIL SECTION ---------- */

    emailField.addEventListener("keyup", emailValidation);

	
	/* ---------- JOB ROLE SECTION ---------- */
    document.querySelector('#other-title').style.display = "none";

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
    }

	shirtDesign.addEventListener("change", () => {
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
		// for each diferent value we show the correct div.
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

	cc.addEventListener("keyup", creditCardValidation);
    zip.addEventListener("keyup", zipValidation);
    cvv.addEventListener("keyup", cvvValidation);
	
	/* ---------- FORM VALIDATION ---------- */

	let validation = [false, false, false, false, false, false];

	form.addEventListener("change", () => {
		let isValid = validation.indexOf(false);
        if(isValid !== -1){
            submit.disabled = true;
        } else {
            submit.disabled = false;
        }
	});



	submit.addEventListener("click", () => {
		alert("Submited!")
        console.log(validation.indexOf(false));
        console.log(validation);
        if(validation.indexOf(false) !== -1){
            submit.disabled = true;
        }
	});

    function nameValidation(){
        if(nameField.value.length > 0){
            validate(nameField, 0, true);
        } else {
            validate(nameField, 0, false);
            let errorMessage = document.createElement("H3");
            errorMessage.innerHTML = "Name can't be blank";
            errorMessage.style.color = "red";
        }
    }

    function emailValidation(){
        let valEmail = emailRegex.test(emailField.value);

        if(valEmail){
            validate(emailField, 1, true);
        } else {
            validate(emailField, 1, false);
        }
    }

    function activitiesValidation() {
        let isSomethingChecked = false;
        for(let i = 0; i < activitiesInputs.length; i++){
            if(activitiesInputs[i].checked){
                isSomethingChecked = true;
            }
        }
        if(isSomethingChecked === false){
            validation[2] = false;
        } else {
            validation[2] = true;
        }
    }

    function creditCardValidation(){
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
    	if(eval === false){
            obj.style.border = "solid red";
		} else {
            obj.style.border = "solid green";
		}
    	validation[pos] = eval;
	}
}