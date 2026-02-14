<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class NewResetPassword extends ResetPassword
{
  protected function buildMailMessage($url)
  {
    return (new MailMessage)
      ->subject('パスワード再設定のご案内')
      ->greeting('パスワード再設定のリクエストを受け付けました。')
      ->line('下のボタンから新しいパスワードを設定してください。')
      ->action('パスワードを再設定する', $url)
      ->line('このメールに心当たりがない場合は、このまま破棄してください。');
  }
}
