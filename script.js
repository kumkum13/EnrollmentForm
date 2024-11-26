const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.querySelector(".progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

/* Event Listener for Next Button */
nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (validateStep()) {
            formStepsNum++;
            updateFormSteps();
            updateProgressbar();
        }
    });
});

/* Event Listener for Back Button */
prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
    });
});

/* Validate the current step */
function validateStep() {
    const currentStep = formSteps[formStepsNum];
    const inputs = currentStep.querySelectorAll("input, select, textarea");

    for (let input of inputs) {
        if (!input.checkValidity()) {
            alert("Please fill out all required fields.");
            input.focus(); // Focus on the first invalid field
            return false;
        }
    }
    return true;
}

/* Updates Form Steps */
function updateFormSteps() {
    formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });
    formSteps[formStepsNum].classList.add("form-step-active");
}

/* Updates Progress Bar */
function updateProgressbar() {
    progressSteps.forEach((progressStep, index) => {
        if (index < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active');
        } else {
            progressStep.classList.remove('progress-step-active');
        }
    });
    progress.style.width = ((formStepsNum) / (progressSteps.length - 1)) * 100 + "%";
}
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/submit-enrollment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);  // Show a success message
        resetForm();  // Call the reset function to clear the form
    })
    .catch(error => console.error('Error:', error));
});

// Function to reset the form fields
function resetForm() {
    const form = document.querySelector('form');
    form.reset();  // This will clear all the form fields
     // Reset to the first form step
     const formSteps = document.querySelectorAll('.form-step');
     const progressSteps = document.querySelectorAll('.progress-step');
     const progress = document.querySelector('.progress');
 
     // Remove active class from all steps
     formSteps.forEach(step => step.classList.remove('form-step-active'));
     progressSteps.forEach(step => step.classList.remove('progress-step-active'));
 
     // Add active class to the first form step and progress step
     formSteps[0].classList.add('form-step-active');
     progressSteps[0].classList.add('progress-step-active');
 
     // Reset the progress bar to 0%
     progress.style.width = '0%';
}
