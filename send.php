<?php
//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//    $name = $_POST["name"];
//    $email = $_POST["email"];
//    $phone = $_POST["phone"];
//    $message = $_POST["message"];
//
//    $to = "grazion.elizaveta@gmail.com";
//    $subject = "Новое сообщение от $name";
//    $boundary = md5(time());
//    $headers = "MIME-Version: 1.0\r\n";
//    $headers .= "From: $name <$email>\r\n";
//    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
//
//    $body = "--$boundary\n";
//    $body .= "Content-Type: text/plain; charset=UTF-8\n";
//    $body .= "Content-Transfer-Encoding: 8bit\n\n";
//    $body .= "Отправитель: $name\nEmail: $email\nТелефон: $phone\nСообщение:\n$message\n";

//    if (isset($_FILES["file"]) && $_FILES["file"]["error"] == UPLOAD_ERR_OK) {
//        $file_name = $_FILES["file"]["name"];
//        $file_tmp_name = $_FILES["file"]["tmp_name"];
//        $file_type = $_FILES["file"]["type"];
//        $file_size = $_FILES["file"]["size"];
//
//        if ($file_size > 0 && $file_size <= 20 * 1024 * 1024) {
//            $fp = fopen($file_tmp_name, "rb");
//            $file_content = fread($fp, filesize($file_tmp_name));
//            fclose($fp);
//
//            $body .= "--$boundary\n";
//            $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\n";
//            $body .= "Content-Transfer-Encoding: base64\n";
//            $body .= "Content-Disposition: attachment; filename=\"$file_name\"\n\n";
//            $body .= chunk_split(base64_encode($file_content));
//        }
//    }
//
//    mail($to, $subject, $body, $headers);
//}


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

//Load Composer's autoloader
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $boundary = md5(time());

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = 'mail.rusit-po.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'site@rusit-po.ru';
        $mail->Password = 'Vj395vn2u#';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom("$email");
        $mail->addAddress('company@rusaiti.ru');

        $mail->isHTML(true);
        $mail->Subject = "Новое сообщение от $name";
        $mail->Body = "--$boundary\n" .
            "Content-Type: text/plain; charset=UTF-8\n" .
            "Content-Transfer-Encoding: 8bit\n\n" .
            "Отправитель: $name\nEmail: $email\nТелефон: $phone\nСообщение:\n$message\n";

        if (isset($_FILES["file"]) && $_FILES["file"]["error"] == UPLOAD_ERR_OK) {
            $file_name = $_FILES["file"]["name"];
            $file_tmp_name = $_FILES["file"]["tmp_name"];
            $file_type = $_FILES["file"]["type"];
            $file_size = $_FILES["file"]["size"];

            if ($file_size > 0 && $file_size <= 20 * 1024 * 1024) {
                $fp = fopen($file_tmp_name, "rb");
                $file_content = fread($fp, filesize($file_tmp_name));
                fclose($fp);

                $attachment_content_type = mime_content_type($file_tmp_name);
                if (!$attachment_content_type) {
                    throw new Exception("Не удалось определить тип файла.");
                }
                $attachment_base64_content = chunk_split(base64_encode(file_get_contents($file_tmp_name)));
                $mail->Body .= "--$boundary\n" .
                    "Content-Type: {$attachment_content_type}; name=\"$file_name\"\n" .
                    "Content-Transfer-Encoding: base64\n" .
                    "Content-Disposition: attachment; filename=\"$file_name\"\n\n" .
                    "$attachment_base64_content";
            }
        }

        // Отправляем письмо.
        $mail->send();
        echo 'Сообщение отправлено';
    } catch (Exception $e) {
        echo "Сообщение не может быть отправлено. Ошибка отправки письма: {$mail->ErrorInfo}";
    }
}
?>