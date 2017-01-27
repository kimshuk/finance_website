$(document).ready(function(){
//    applyClickHandler($('.form__wrapper'),'.enter',validateFirstInputSet);
});
jQuery(function($){
    $("#phone").mask("(999) 999-9999");
    $("#zipCode").mask("99999");
});

//click event applying function
function applyClickHandler(parentElement,childClassName,functionToPerform){
    parentElement.on("click",childClassName,function(){
        functionToPerform();
    })
}
//checks for empty inputs based on ids
function checkForEmptyInput(id){
    var emptyInputList = [];
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(v){
        if($('#'+v).val()== null || $('#'+v).val()==""){
            emptyInputList.push(v);
        }
    });
    if(emptyInputList.lsength != 0){
        return emptyInputList;
    }else{
        return false;
    }
}
//adds 'required' error msg to the input
function createRequiredFormWarning(emptyFormsList){
    emptyFormsList.forEach(function(v){
        $("#"+v).addClass('required');
        $("#"+v).after($('<div>').addClass('errorMsg').text('Required'));
    })
}
//remove 'required' error msg
function clearRequiredError(id){
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(v){
        $('#'+v).removeClass('required');
    });
    $('.errorMsg').remove();
}







function validateFirstInputSet(){
    clearRequiredError('fName','lName','bizName','email','phone');
    var emptyFormList = checkForEmptyInput('fName','lName','bizName','email','phone');
    if(emptyFormList.length == 0){
        createSecondFormPage();
    }else{
        createRequiredFormWarning(emptyFormList);
    }
}
function validateSecondInputSet(){
    clearRequiredError('timeInBiz','desiredAmt','annualSales','bizAddress','city','state','zipCode');
    var emptyFormList = checkForEmptyInput('timeInBiz','desiredAmt','annualSales','bizAddress','city','state','zipCode');
    if(emptyFormList.length == 0){
        //need ajax call
        createContactFormReceivedPage();    
    }else{
        createRequiredFormWarning(emptyFormList);
    }
}






function createSecondFormPage() {
    $('#step2').addClass('filled');
    $('.enter').text('SUBMIT').addClass('submit').removeClass('enter');
    $('#fName').attr('disabled', 'disabled');
    $('#lName').attr('disabled', 'disabled');
    $('#bizName').attr('disabled', 'disabled');
    $('#email').attr('disabled', 'disabled');
    $('#phone').attr('disabled', 'disabled');

    applyClickHandler($('.form__wrapper'), '.submit', validateSecondInputSet);

}
function createContactFormReceivedPage(){
    $('.reqForms').remove();
    $('#complete').addClass('filled');
}




function addClick(){
    $('.btn-primary').click(function(){
        console.log($('input[name="body"]').val());
        console.log($('input[name="name1"]').val());
        console.log($('input[name="email1"]').val());
        $.ajax({
            method:'post',
            url:'mail_handler.php',
            type:'json',
            data : {
                name : $('input[name="name1"]').val(),
                email : $('input[name="email1"]').val(),
                body : $('input[name="body"]').val()
            },
            success: function(response){
                var stringResponse = response;
                console.log(stringResponse);
                if(stringResponse == "success"){
                    addThankyou();
                }else{
                    addErrorMsg();
                }
            },
            error : function(response){
                console.log(response,'your ajax failed');
                addErrorMsg();
            }
        })
    })
}
function addThankyou(){
    var thankYouDiv = $('<div id="thankyou">').html("Thank You. <br> Message has been sent.");
    $('#sendingGifContainer').append(thankYouDiv);
}
function addErrorMsg(){
    var errorMsg = $('<div id="errorMsg">').text("Message was not successful");
    $('#sendingGifContainer').append(errorMsg);
}


