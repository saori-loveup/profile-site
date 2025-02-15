<?php
// メール送信 ///////////////////////////////////////////////////////////////
header("Content-type: application/json; charset=UTF-8");

// 送信内容の取得
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// エラーチェック
$error = "";

if(empty($name)) {
    $error .= '「お名前」が入力されていません。\n';
}
if(empty($email)) {
    $error .= '「メールアドレス」が入力されていません。\n';
}
$regex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
if(preg_match($regex, $email) !== 1) {
    $error .= '「メールアドレス」の形式が正しくありません。\n';
}
if(empty($message)) {
    $error .= '「お問い合わせ内容」が入力されていません。\n';
}
// エラーがあった場合は送信せずにエラーを返す
if($error) {
    echo json_encode(['success' => false, 'error' => $error]);
    exit;
}

// メール送信用データを作成
$to = 'saori@itoo.info';
$subject = 'お問い合わせフォームからのメッセージ';
$headers = "From: $email";

$body = "名前: $name\n";
$body .= "メールアドレス: $email\n";
$body .= "メッセージ:\n$message\n";

// メールを送信
mb_language("Japanese");
mb_internal_encoding("UTF-8");

$result = mb_send_mail($to, $subject, $body, $headers);
if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'メール送信に失敗しました。']);
}