$(document).ready(function(){
    applyClickHandlerSubmit();
});
function createSecondFormPage(okayToProceed){
    if(okayToProceed){
        
    }else{
        
    }
}
function checkFormType(formElement){
    //document.getElementById('firstInputSet');
    if(formElement == 'firstInputSet'){
        //testing for first set
        var proceedToNext = validateFirstForms();
        createSecondFormPage(proceed);
    }else if(formElement == 'secondInputSet'){
        //testing for second set
    }else{
        //testing for final submit
    }
}
function validateFirstForms(){
    var fName = $('#fName').val();
    var lName = $('#lName').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    console.log(fName,lName,email,phone);
    //return true or false based on the inputted value
    return true;
}


function applyClickHandlerSubmit(){
    $('.form__wrapper').on("click",'.enter',function(){
        checkFormType($('.reqForms').attr('id'));
    })
}