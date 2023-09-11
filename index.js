let data = [];
function tabnName(evt, tabnName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabnName).style.display = "block";
    evt.currentTarget.className += " active";
  }
function validateForm() {
    const name_input = document.forms["registrationFormInput"]["name"].value;
    const age_input = document.forms["registrationFormInput"]["age"].value;
    const allowance_input = document.forms["registrationFormInput"]["allowance"].value;

    if (name_input === "") {
        alert("name cannot be empty");
        document.forms["registrationFormInput"]["name"].focus();
        return false;
    }
    if (name_input.length < 10) {
        alert("name minimum 10 character");
        document.forms["registrationFormInput"]["name"].focus();
        return false;
    }
    if (age_input === "") {
        alert("age cannot be empty ");
        document.forms["registrationFormInput"]["age"].focus();
        return false;
    }
    if (age_input==="" || parseFloat(age_input)< 25) {
        alert("age minimum requared 25 Age");
        document.forms["registrationFormInput"]["age"].focus();
        return false;
    }
    if (allowance_input === "") {
        alert("allowance cannot be empty");
        document.forms["registrationFormInput"]["allowance"].focus();
        return false;
    }
    if (allowance_input === "" || parseFloat(allowance_input) < 100000 || parseFloat(allowance_input) > 1000000) {
        alert("allowance requared range 100.000 - 1000.000 dont use chacarter .(dot)");

        return false;
    }
    return true;


}

class RegistrationForm {
    constructor() {
        this.pendaftarData = [];
    }

    init() {
        this.setupFormSubmit();
    }



async getDataInput() {
    var name = document.getElementById("name").value;
    var age_input = document.getElementById("age").value;
    var allowance_input = document.getElementById("allowance").value;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.pendaftarData.push({ name, age: age_input, allowance: allowance_input });

    var table = document.getElementById("pendaftarTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = age_input;
    cell3.innerHTML = allowance_input;

var totalage = 0;
var totalallowance = 0;
for (var i = 0; i < this.pendaftarData.length; i++) {
    totalage += parseFloat(this.pendaftarData[i].age);
    totalallowance += parseFloat(this.pendaftarData[i].allowance);
}

var avgage = totalage / this.pendaftarData.length;
var avgallowance = totalallowance / this.pendaftarData.length;

var avgageFormatted = Math.round(avgage * 10) / 10; 
var avgallowanceFormatted = Math.round(avgallowance * 10) / 10; 

document.getElementById("avgage").innerText = avgageFormatted.toFixed(1); 
document.getElementById("avgallowance").innerText = avgallowanceFormatted.toFixed(1); 


    document.getElementById("registrationFormInput").reset();
    return false;
}



    setupFormSubmit() {
        const registrationForm = document.getElementById("registrationFormInput");
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            if (validateForm()) {
                await this.getDataInput(); 
            }
        });
    }
}

const registrationForm = new RegistrationForm();
registrationForm.init();
