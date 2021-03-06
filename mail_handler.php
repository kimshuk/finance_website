<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');
//print_r(EMAIL_USER);

$mail = new PHPMailer;
$mail->SMTPDebug = false;//3;                                 // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                              // Enable SMTP authentication


$mail->Username = EMAIL_USER;                        // SMTP username
$mail->Password = EMAIL_PASS;                        // SMTP password
$mail->SMTPSecure = 'tls';                           // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                   // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,    
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = 'smartbizfundserver@gmail.com';            //your email sending account
$mail->FromName = 'CNC SmartBizFund Server';                //your email sending account name
$mail->addAddress('contact@smartbizfund.com');     // Add a recipient   /*your email address, or the email the sender if you are sending confirmation*/         /*email address user name*/
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo($_POST["email"]); /*email address of the person sending the message, so you can reply*/
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

//$mail->Subject = $_POST['subject'];
$mail->Body    = $_POST['body'];
$mail->AltBody = htmlentities($_POST['body']);
$mail->IsHTML(true); 

if(!$mail->send()) {
    //echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    echo "fail";
} else {
    //echo 'Message has been sent';
    //$output['success'] = 'email successfully sent';
    //print_r(json_encode($output));
    echo "success";
}
?>
