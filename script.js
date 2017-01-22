$(document).ready(function(){
    applyClickHandlerSubmit();
});
function createSecondFormPage(){
    
    var annualSales = $('<input id="annualSales" class="form-control" type="number">');
    var bizAddress = $('<input id="address" class="form-control" type="text">');
    var city = $('<input id="city" class="form-control" type="text">');
    var state = $('<select class="form-control bfh-states" data-country="US" data-state="CA">');
    //<input id="state" class="  bfh-state" data-country="US" type="text">
    //<select class="form-control bfh-states" data-country="US" data-state="CA"></select>
    var zipCode =$('<input type="text" class="form-control" pattern="[0-9]*" maxlength="5" required name="zip" id="zip">');
    
    var timeInBizSelect = $('<select id="timeInBiz" class="form-control" form="inputSet">'),
        timeInBizOption0 = $('<option value="" disabled selected>Time in Business</option>'), 
        timeInBizOption1 = $('<option value="10 years or longer">').text('10 years or longer'),
        timeInBizOption2 = $('<option value="5 - 9 years">').text('5 - 9 years'),
        timeInBizOption3 = $('<option value="2 - 4 years">').text('2 - 4 years'),
        timeInBizOption4 = $('<option value="1 year">').text('1 year'),
        timeInBizOption5 = $('<option value="6 months">').text('6 months'),
        timeInBizOption6 = $('<option value="less than 6 months">').text('less than 6 months'),
        timeInBiz = timeInBizSelect.append(timeInBizOption0).append(timeInBizOption1).append(timeInBizOption2).append(timeInBizOption3).append(timeInBizOption4).append(timeInBizOption5).append(timeInBizOption6);
    
    var desiredAmtSelect = $('<select id="desiredAmt" class="form-control" form="inputSet">'),
        desiredAmtOption0 = $('<option value="" disabled selected>Desired Loan Amount</option>'), 
        desiredAmtOption1 = $('<option value="$500,000+">').text('$500,000+'),
        desiredAmtOption2 = $('<option value="$200,000-$500,000">').text('$200,000-$500,000'),
        desiredAmtOption3 = $('<option value="$50,000-$200,000">').text('$50,000-$200,000'),
        desiredAmtOption4 = $('<option value="$25,000-$50,000">').text('$25,000-$50,000'),
        desiredAmtOption5 = $('<option value="$5000-$25000">').text('$5000-$25000'),
        desiredAmtOption6 = $('<option value="Unknown">').text('Not Sure Yet'),
        desiredAmt = desiredAmtSelect.append(desiredAmtOption0).append(desiredAmtOption1).append(desiredAmtOption2).append(desiredAmtOption3).append(desiredAmtOption4).append(desiredAmtOption5).append(desiredAmtOption6);
    
    $('.enterDiv').before($('<div class="col-xs-12 form--div">')
                          .append($('<div class="col-md-3">').append(timeInBiz))
                          .append($('<div class="col-md-3">').append(desiredAmt))
                          .append($('<div class="col-md-3">').append(state))
                          .append($('<div class="col-md-3">').append(annualSales)));    
                          //.append($('<div class="col-md-3">').append(bizAddress))
                          //.append($('<div class="col-md-3">').append(city))
                          //.append($('<div class="col-md-3">').append(state))
                          //.append($('<div class="col-md-3">').append(zipCode))
                          
                          //);    
}

//function checkFormType(formElement){
//    //document.getElementById('firstInputSet');
//    if(formElement == 'firstInputSet'){
//        //testing for first set
//        var proceedToNext = validateFirstForms();
//        createSecondFormPage(proceed);
//    }else if(formElement == 'secondInputSet'){
//        //testing for second set
//    }else{
//        //testing for final submit
//    }
//}
//function validateFirstForms(){
//    var fName = $('#fName').val();
//    var lName = $('#lName').val();
//    var email = $('#email').val();
//    var phone = $('#phone').val();
//    console.log(fName,lName,email,phone);
//    //return true or false based on the inputted value
//    return true;
//}


function applyClickHandlerSubmit(){
    $('.form__wrapper').on("click",'.enter',function(){
//        checkFormType($('.reqForms').attr('id'));
        createSecondFormPage();
    })
}