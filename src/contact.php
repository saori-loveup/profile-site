<?php

$name = $_POST['name'];
$mail = $_POST['mail'];
$message = $_POST['message'];

// メール送信
$to = 'saori@itoo.info';
$subject = 'お問い合わせフォームからのメッセージ';
$headers = "From: $mail";

$body = "名前: $name\n";
$body .= "メールアドレス: $mail\n";
$body .= "メッセージ:\n$message\n";

mb_language("Japanese");
mb_internal_encoding("UTF-8");
header("Content-type: application/json; charset=UTF-8");
$result = mb_send_mail($to, $subject, $body, $headers);
if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'メール送信に失敗しました。']);
}