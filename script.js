$(document).ready(function () {
    applyClick();
});
//apply click handler to the 'next' button
//when next button clicks
//see if any form is missing information or form input is incorrect
//if yes, mark error, return
//else
//remove handler
//fill step2 status bar
//save 1st set of inputs, 
//disable 1st input set
//unhide 2nd set
//handler to the second set next button
//when second next button clicks
//see if any form is missing information or form input is incorrect
//if yes, mark error, return
//else
//save 2nd set of inputs, 
//disable 2nd input set
        
        //show review page
        //if confirm clicked
            //send email
                //stringify collected obj form data and make it body
                //use name email and body and call ajax
            //show confirmation
                //either failed or successful
            //reset the forms
        //else
            //allow edit which ever edit button clicked - edit img on the form
            //once changed and confirm clicked,
            //validate the form
                //if okay,
                    //send email
                        //stringify collected obj form data and make it body
                        //use name email and body and call ajax
                    //show confirmation
                        //either failed or successful
                    //show confirmation
                    //reset the forms
                //else
                    //show error
                    //return




var firstFormSetId = ['fName', 'lName', 'bizName', 'email', 'phone'];
var secondFormSetId = ['timeInBiz', 'desiredAmt', 'annualSales', 'bizAddress', 'city', 'state', 'zipCode'];
var formInputData = {};
jQuery(function ($) {
    $("#phone").mask("(999) 999-9999");
    $("#zipCode").mask("99999");
});

function applyClick(){
    $('.enter').click(function(){
        validateFirstFormSet();
    });
    $('.submit').click(function(){
        validateSecondFormSet();
    })
    
}



//checks for empty inputs based on ids
function checkForEmptyInput(idArr) {
    var emptyInputList = [];
    //var args = Array.prototype.slice.call(arguments);
    idArr.forEach(function (v) {
        if ($('#' + v).val() == null || $('#' + v).val() == "") {
            emptyInputList.push(v);
        }
    });
    if (emptyInputList.length != 0) {
        return emptyInputList;
    } else {
        return false;
    }
}

//adds 'required' error msg to the input
function createRequiredFormWarning(emptyFormsList) {
    emptyFormsList.forEach(function (v) {
        $("#" + v).addClass('required');
        $("#" + v).after($('<div>').addClass('errorMsg').text('Required'));
    })
}
//remove 'required' error msg
function clearRequiredError(idArr) {
    //var args = Array.prototype.slice.call(arguments);
    idArr.forEach(function (v) {
        $('#' + v).removeClass('required');
    });
    $('.errorMsg').remove();
}

//collect input data
function collectInputData(idArr){
    idArr.forEach(function(v){
        formInputData[v] = $('#'+v).val();
    })
    console.log('form input data inserted into the object',formInputData);
}

//disable input form
function diableInput(idArr){
    idArr.forEach(function(v){
        $('#'+v).attr('disabled', 'disabled');
    })
}

//hides an element
function hideElement(className){
    $('.'+className).addClass('hidden');
}
//show hidden element
function showHiddenElement(className){
    $('.'+className).removeClass('hidden');
}

function addOrRemoveClass(targetElement,action,className){
    if(action == "add"){
        $('.'+targetElement).addClass(className);
    }else{
        $('.'+targetElement).removeClass(className);
    }
}

function validateFirstFormSet(){
    clearRequiredError(firstFormSetId);
    var checkForms = checkForEmptyInput(firstFormSetId);
    if(checkForms){
        console.log('incorrect forms',checkForms);
        createRequiredFormWarning(checkForms);
    }else{
        console.log('forms all clear',checkForms);
        collectInputData(firstFormSetId);
        diableInput(firstFormSetId);
        addOrRemoveClass('enterDiv','add','hidden');
        addOrRemoveClass('second-set','remove','hidden');
        addOrRemoveClass('submitDiv','remove','hidden');
        addOrRemoveClass('step2','add','filled');
    }
}
function validateSecondFormSet(){
    clearRequiredError(secondFormSetId);
    var checkForms = checkForEmptyInput(secondFormSetId);
    if(checkForms){
        console.log('incorrect forms',checkForms);
        createRequiredFormWarning(checkForms);
    }else{
        console.log('forms all clear',checkForms);
        collectInputData(secondFormSetId);
        diableInput(secondFormSetId);
        addOrRemoveClass('step2','add','filled');
        addOrRemoveClass('submitDiv','add','hidden');
        sendMail(createTableForEmail());
        //createTableForEmail();
        
        addOrRemoveClass('third-set','remove','hidden');
        addOrRemoveClass('review','add','filled');
        addOrRemoveClass('complete','add','filled');  
    }
}

function createTableForEmail(){
    var tableStart = '<table>'; 
    var tableEnd = '</table>';
    var trStart = '<tr><td>';
    var td = '</td><td>';
    var trEnd = '</td></tr>';    
    for(data in formInputData){
        tableStart += trStart+data+td+formInputData[data]+trEnd
    }
    tableStart += tableEnd;
    return(tableStart)
}








function sendMail(body) {
        console.log(formInputData.fName+" "+formInputData.lName);
        console.log(formInputData.email);
        console.log(body);
        $.ajax({
            method: 'post',
            url: 'mail_handler.php',
            type: 'json',
            data: {
                name: formInputData.fName+" "+formInputData.lName,
                email: formInputData.email,
                body: body
            },
            success: function (response) {
                var stringResponse = response;
                if (stringResponse == "success") {
                    //addThankyou();
                    console.log(stringResponse);
                } else {
                    //addErrorMsg();
                    console.log(stringResponse);
                }
            },
            error: function (response) {
                console.log(response, 'your ajax failed');
                //addErrorMsg();
            }
        })
}

function addThankyou() {
    var thankYouDiv = $('<div id="thankyou">').html("Thank You. <br> Message has been sent.");
    $('#sendingGifContainer').append(thankYouDiv);
}

function addErrorMsg() {
    var errorMsg = $('<div id="errorMsg">').text("Message was not successful");
    $('#sendingGifContainer').append(errorMsg);
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