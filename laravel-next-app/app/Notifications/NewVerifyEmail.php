<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class NewVerifyEmail extends VerifyEmail
{
  protected function buildMailMessage($url)
  {
    return (new MailMessage)
      ->subject('メールアドレスのご確認')
      ->greeting('ご登録ありがとうございます。')
      ->line('新しい会員様が増えて、嬉しいです！！')
      ->line('下のボタンを押して、メールアドレスの確認を完了してください。')
      ->action('このボタンをクリック', $url)
      ->line('このメールに心当たりがない場合は、そのまま破棄してください。');
  }
}
