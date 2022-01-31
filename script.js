/*
*   Name: Tracy Salak
*   Date: 2021-04-17
*   Description: Mainly used to make the navigation bar and check form.
*/

/*
* Shows the entire navigation links.
*/
function navBar(){
    var x = document.getElementById("nav-links");
    if(x.style.display === "block"){
        x.style.display = "none";
    }
    else{
        x.style.display = "block";
    }
}

/* Shows picture slides */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
}

function currentSlide(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("slides");
    if (n > slides.length){
        slideIndex = 1
    }
    if (n < 1){
        slideIndex = slides.length
    }
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

/* Module 8 Form Validation */

/*
 * Handles the submit event of the survey form
 *
 * param e  : A reference to the submit event
 * return   : True if no validation errors; False if the form has validation errors
 */
function validate(e)
{
	hideAllErrors();
	if(formHasErrors()){
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e : A reference to the reset event
 * return  : True allows the reset to happen; False prevents the browser from resetting the form.
 */
function resetForm(e){
	if ( confirm('Clear survey?') )
	{
		hideAllErrors();
		document.getElementById("fname").focus();
		return true;
	}
	e.preventDefault();
	return false;
}

/*
 * Displays the error for an invalid form field.
 *
 * param formField : A reference to the form field that caused a validation error.
 * param errorId   : The id of the error element to display.
 * param errorFlag : True (an error has already occured), False (no errors have occured thus far)
 */
function showError(formField, errorId, errorFlag){
	document.getElementById(errorId).style.display = "block";
	if ( !errorFlag )
	{
		formField.focus();
		
		if ( formField.type == "text" )
		{
			formField.select();
		}		
	}
}

/*
 * Does all the error checking for the form.
 *
 * return : True if an error was found; False if no errors were found
 */
function formHasErrors(){
	let errorFlag = false;

	let requiredFields = ["fname", "lname", "email"];
	for(let i = 0; i < requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
	}
	return errorFlag;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors(){
	let errorFields = document.getElementsByClassName("error");
	for(let i=0; i < errorFields.length; i++){
		errorFields[i].style.display = "none";
	}

}

/*
 * Removes white space from a string value.
 *
 * return  : A string with leading and trailing white-space removed.
 */
function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement : A text field input element object
 * return               : True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement){
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		return false;
	}
	return true;
}

/**
 * Handles the load event of the document.
 */
function load(){
	document.getElementById("contact-form").addEventListener("submit", validate);
	document.getElementById("contact-form").reset();
	document.getElementById("contact-form").addEventListener("reset", resetForm);
}
document.addEventListener("DOMContentLoaded", load);
