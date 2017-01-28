$(document).ready(function () {
    applyClickHandler($('.form__wrapper'), '.enter', createSecondFormPage);
});

function applyClickHandler(parentElement, childClassName, functionToPerform) {
    parentElement.on("click", childClassName, function () {
        functionToPerform();
    })
}

function createSecondFormPage() {
    var timeInBizSelect = $('<select id="timeInBiz" class="form-control" form="inputSet">'),
        timeInBizOption0 = $('<option value="" disabled selected>TIME IN BUSINESS</option>'),
        timeInBizOption1 = $('<option value="10 years or longer">').text('10 years or longer'),
        timeInBizOption2 = $('<option value="5 - 9 years">').text('5 - 9 years'),
        timeInBizOption3 = $('<option value="2 - 4 years">').text('2 - 4 years'),
        timeInBizOption4 = $('<option value="1 year">').text('1 year'),
        timeInBizOption5 = $('<option value="6 months">').text('6 months'),
        timeInBizOption6 = $('<option value="less than 6 months">').text('less than 6 months'),
        timeInBiz = timeInBizSelect.append(timeInBizOption0).append(timeInBizOption1).append(timeInBizOption2).append(timeInBizOption3).append(timeInBizOption4).append(timeInBizOption5).append(timeInBizOption6);

    var desiredAmtSelect = $('<select id="desiredAmt" class="form-control" form="inputSet">'),
        desiredAmtOption0 = $('<option value="" disabled selected>LOAN AMOUNT</option>'),
        desiredAmtOption1 = $('<option value="$500,000+">').text('$500,000+'),
        desiredAmtOption2 = $('<option value="$200,000-$500,000">').text('$200,000-$500,000'),
        desiredAmtOption3 = $('<option value="$50,000-$200,000">').text('$50,000-$200,000'),
        desiredAmtOption4 = $('<option value="$25,000-$50,000">').text('$25,000-$50,000'),
        desiredAmtOption5 = $('<option value="$5000-$25000">').text('$5000-$25000'),
        desiredAmtOption6 = $('<option value="Unknown">').text('Not Sure Yet'),
        desiredAmt = desiredAmtSelect.append(desiredAmtOption0).append(desiredAmtOption1).append(desiredAmtOption2).append(desiredAmtOption3).append(desiredAmtOption4).append(desiredAmtOption5).append(desiredAmtOption6);

    var annualSales = $('<input id="annualSales" class="form-control" type="text" placeholder="ANNUAL GROSS SALES">');
    var bizAddress = $('<input id="address" class="form-control" type="text" placeholder="BUSINESS ADDRESS">');
    var city = $('<input id="city" class="form-control" type="text" placeholder="CITY">');
    var state = $('<input id="state" class="form-control" type="text" placeholder="STATE">');
    var zipCode = $('<input id="zip" class="form-control" type="text" placeholder="ZIP" pattern="[0-9]*" maxlength="5" required name="zip">');

    $('.enterDiv').before($('<div class="col-xs-12 form--div">')
        .append($('<div class="col-md-3">').append(timeInBiz))
        .append($('<div class="col-md-3">').append(desiredAmt))
        .append($('<div class="col-md-3">').append(annualSales)));

    $('.enterDiv').before($('<div class="col-xs-12 form--div">')
        .append($('<div class="col-md-3">').append(bizAddress))
        .append($('<div class="col-md-3">').append(city))
        .append($('<div class="col-md-3">').append(state))
        .append($('<div class="col-md-3">').append(zipCode))
    );

    $('#step2').addClass('filled');
    $('.enter').text('SUBMIT').addClass('submit').removeClass('enter');
    $('#fName').attr('disabled', 'disabled');
    $('#lName').attr('disabled', 'disabled');
    $('#bizName').attr('disabled', 'disabled');
    $('#email').attr('disabled', 'disabled');
    $('#phone').attr('disabled', 'disabled');
    //    collectFormData1(); 
    var emptyFormList = validateEmptyText('fName', 'lName', 'bizName', 'email', 'phone');
    if (emptyFormList) {
        console.log(emptyFormList);
        //some forms are empty
        //need to indicate the form to turn red
    } else {
        applyClickHandler($('.form__wrapper'), '.submit', createContactFormReceivedPage);
    }
}

function createRequiredFormWarning() {

}

function createContactFormReceivedPage() {
    $('.reqForms').remove();
    $('#complete').addClass('filled');
    var confirmationPage = $('<div>').addClass('contactConfirmation col-xs-12').text('Thank you');
    $('.form__wrapper').append(confirmationPage);
}

function validateEmptyText(id) {
    var emptyInputList = [];
    var i;
    for (i = 0; i < arguments.length; i++) {
        if ($('#' + arguments[i]).val() == null || $('#' + arguments[i]).val() == "") {
            emptyInputList.push(arguments[i]);
        }
    }
    if (emptyInputList.length != 0) {
        return emptyInputList;
    } else {
        return false;
    }
}

function collectFormData1() {
    var contactObj = new Object;
    contactObj.firstName = $('#fName').val();
    contactObj.lastName = $('#lName').val();
    contactObj.bizName = $('#bizName').val();
    contactObj.email = $('#email').val();
    contactObj.phone = $('#phone').val();
    console.log(contactObj);
}

//Nav JS

function stickyNav() {
    var scrollTop = $(this).scrollTop();
    var secNav = $('.section--navigation');
    if (scrollTop > 0) {
        secNav.addClass('nav__main-sticky');
    } else {
        secNav.removeClass('nav__main-sticky');
    }
}