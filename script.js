$(document).ready(function () {
    applyClick();
});

var firstFormSetId = ['fName', 'lName', 'bizName', 'bizCategory', 'bizPhone', 'cellPhone'];
var secondFormSetId = ['timeInBiz', 'desiredAmt', 'annualSales', 'bizAddress', 'city', 'state', 'zipCode'];
var email = ['email'];

var formInputData = {};
jQuery(function ($) {
    $("#bizPhone").mask("(999) 999-9999");
    $("#cellPhone").mask("(999) 999-9999");
    $("#zipCode").mask("99999");
    $('#annualSales').mask("#,##0.00", {
        reverse: true
    });
    $('#fName').mask("Z", {
        'translation': {
            Z: {
                pattern: /[a-zA-Z*]/,
                recursive: true
            }
        }
    });
    $('#lName').mask("Z", {
        'translation': {
            Z: {
                pattern: /[a-zA-Z*]/,
                recursive: true
            }
        }
    });
    $('#city').mask("Z", {
        'translation': {
            Z: {
                pattern: /^[a-zA-Z\s]*$/,
                recursive: true
            }
        }
    });
});

function applyClick() {
    $('.enter').click(function () {
        validateFirstFormSet();
    });
    $('.submit').click(function () {
        validateSecondFormSet();
    })

}


//{translation: {'Z': { pattern: /\S/, optional: true, recursive: true}},maxlength: false}


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
function collectInputData(idArr) {
    idArr.forEach(function (v) {
        formInputData[v] = $('#' + v).val();
    })
//    console.log('form input data inserted into the object', formInputData);
}

//disable input form
function disableInput(idArr) {
    idArr.forEach(function (v) {
        $('#' + v).attr('disabled', 'disabled');
    })
}

//hides an element
function hideElement(className) {
    $('.' + className).addClass('hidden');
}
//show hidden element
function showHiddenElement(className) {
    $('.' + className).removeClass('hidden');
}

function addOrRemoveClass(targetElement, action, className) {
    if (action == "add") {
        $('.' + targetElement).addClass(className);
    } else {
        $('.' + targetElement).removeClass(className);
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return ['email'];
    } else {
        return false;
    }
}

function validateFirstFormSet() {
    clearRequiredError(firstFormSetId);
    clearRequiredError(email);
    var checkForms = checkForEmptyInput(firstFormSetId);
    var emailCheck = isEmail($('#' + email).val());

    if (checkForms || emailCheck) {
        if (checkForms) {
//            console.log('incorrect forms', checkForms);
            createRequiredFormWarning(checkForms);
        }
        if (emailCheck) {
//            console.log('incorrect forms', emailCheck);
            createRequiredFormWarning(emailCheck);
        }
    } else {
//        console.log('forms all clear', checkForms);
        collectInputData(firstFormSetId);
        collectInputData(email);
        //disableInput(firstFormSetId);
        addOrRemoveClass('enterDiv', 'add', 'hidden');
        addOrRemoveClass('second-set', 'remove', 'hidden');
        addOrRemoveClass('submitDiv', 'remove', 'hidden');
        addOrRemoveClass('step2', 'add', 'filled');
    }
}

function validateSecondFormSet() {
    clearRequiredError(secondFormSetId);
    clearRequiredError(firstFormSetId);
    clearRequiredError(email);
    var checkForms = checkForEmptyInput(firstFormSetId);
    var checkForms2 = checkForEmptyInput(secondFormSetId);
    var emailCheck = isEmail($('#' + email).val());
    if (checkForms || checkForms2 || emailCheck) {
        if (checkForms) {
//            console.log('incorrect forms', checkForms);
            createRequiredFormWarning(checkForms);
        }
        if (checkForms2) {
//            console.log('incorrect forms2', checkForms2);
            createRequiredFormWarning(checkForms2);
        }
        if (emailCheck) {
//            console.log('incorrect forms', emailCheck);
            createRequiredFormWarning(emailCheck);
        }
    } else {
//        console.log('forms all clear', checkForms);
        collectInputData(firstFormSetId);
        collectInputData(secondFormSetId);
        collectInputData(email);
        //disableInput(secondFormSetId);
        addOrRemoveClass('step2', 'add', 'filled');
        addOrRemoveClass('submitDiv', 'add', 'hidden');
        sendMail(createTableForEmail());
        //createTableForEmail();
        addOrRemoveClass('loading-set', 'remove', 'hidden');
    }
}

function createTableForEmail() {
    var tableStart = '<table>';
    var tableEnd = '</table>';
    var trStart = '<tr><td>';
    var td = '</td><td>';
    var trEnd = '</td></tr>';
    for (data in formInputData) {
        tableStart += trStart + data + td + formInputData[data] + trEnd
    }
    tableStart += tableEnd;
    return (tableStart)
}








function sendMail(body) {
//    console.log('name',formInputData.fName + " " + formInputData.lName);
//    console.log('forminputdata',formInputData.email);
//    console.log('body',body);
    disableInput(firstFormSetId);
    disableInput(secondFormSetId);
    $.ajax({
        method: 'post',
        url: 'mail_handler.php',
        type: 'json',
        data: {
            name: formInputData.fName + " " + formInputData.lName,
            email: formInputData.email,
            body: body
        },
        success: function (response) {
            var stringResponse = response;
            if (stringResponse == "success") {
                addOrRemoveClass('loading-set', 'add', 'hidden');
                addOrRemoveClass('third-set', 'remove', 'hidden');
                addOrRemoveClass('complete', 'add', 'filled');
//                console.log(stringResponse);
            } else {
                addOrRemoveClass('loading-set', 'add', 'hidden');
                addOrRemoveClass('third-set-error', 'remove', 'hidden');
                addOrRemoveClass('complete', 'add', 'filled');
//                console.log(stringResponse);
            }
        },
        error: function (response) {
//            console.log(response, 'your ajax failed');
            addOrRemoveClass('loading-set', 'add', 'hidden');
            addOrRemoveClass('third-set-error', 'remove', 'hidden');
            addOrRemoveClass('complete', 'add', 'filled');
        }
    })
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

// Modal js

$('[data-remodal-id="modalOne"], [data-remodal-id="modalTwo"]').remodal({
    modifier: 'wrapper-size'
});