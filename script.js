$(document).ready(function(){
    addClick();
    //applyClickHandler($('.form__wrapper'),'.enter',validateFirstInputSet);
});
jQuery(function($){
    $("#phone").mask("(999) 999-9999");
    $("#zipCode").mask("99999");
});
function applyClickHandler(parentElement,childClassName,functionToPerform){
    parentElement.on("click",childClassName,function(){
        functionToPerform();
    })
}
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

function clearRequiredError(id){
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(v){
        $('#'+v).removeClass('required');
    });
    $('.errorMsg').remove();
}
function createRequiredFormWarning(emptyFormsList){
    emptyFormsList.forEach(function(v){
        $("#"+v).addClass('required');
        $("#"+v).after($('<div>').addClass('errorMsg').text('Required'));
    })
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
    var bizAddress = $('<input id="bizAddress" class="form-control" type="text" placeholder="BUSINESS ADDRESS">');
    var city = $('<input id="city" class="form-control" type="text" placeholder="CITY">');
    var state = $('<input id="state" class="form-control" type="text" placeholder="STATE">');
    var zipCode = $('<input id="zipCode" class="form-control" type="text" placeholder="ZIP" pattern="[0-9]*" maxlength="5" required name="zip">');


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

    applyClickHandler($('.form__wrapper'), '.submit', validateSecondInputSet);

}

function createContactFormReceivedPage(){
    $('.reqForms').remove();
    $('#complete').addClass('filled');
    var confirmationPage = $('<div class="contactConfirmation col-xs-8 col-xs-offset-2">');
    var confirmationMsgWrapper = $('<div class="confirmationMsgWrapper">');
    var msgBox = $('<div class="msgBox">');
    var msg = $('<p>').text('Thank you for contacting CNC.');
    var msg2 = $('<p>').text('One of our associates will be contact with you shortly.');
    $('.form__wrapper').append(confirmationPage.append(confirmationMsgWrapper.append(msgBox.append(msg).append(msg2))));   
}

function collectFormData1(){
    var contactObj = new Object;
    contactObj.firstName = $('#fName').val();
    contactObj.lastName = $('#lName').val();
    contactObj.bizName = $('#bizName').val();
    contactObj.email = $('#email').val();
    contactObj.phone = $('#phone').val();
    console.log(contactObj);
}


















		function addClick(){
			$('.btn-primary').click(function(){
				console.log($('textarea[name="body"]').val());
				console.log($('input[name="name1"]').val());
				console.log($('input[name="email1"]').val());
//				if($('textarea[name="body"]').val() ==''|| $('input[name="name"]').val() == ""||$('input[name="email"]').val()== ""){
//					alert("Please input all 3 information");
//					return;
//				}
				$.ajax({
					method:'post',
					url:'mail_handler.php',
					type:'json',
					data : {
						name : $('input[name="name1"]').val(),
						email : $('input[name="email1"]').val(),
						body : $('textarea[name="body"]').val()
					},
					success: function(response){
						//var stringResponse = response.substring(4);
						var stringResponse = response;
						console.log(stringResponse);
						if(stringResponse == "success"){
							addThankyou();
							setTimeout(removeThankyou,2000);
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


