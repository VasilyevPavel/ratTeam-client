'use client';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

export default function ResetPassword({
  params,
}: {
  params: { resetLink: string };
}) {
  // const { resetToken } = useParams();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordReset = () => {
    // Отправка запроса на сервер с токеном и новым паролем
    // ...
  };

  // useEffect(() => {
  //   // Здесь можно выполнить проверку токена или другие необходимые действия
  //   // ...
  // }, [resetToken]);

  return (
    <div>
      <h2>Смена пароля</h2>
      <input
        type="password"
        placeholder="Введите новый пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handlePasswordReset}>Сменить пароль</button>
    </div>
  );
}
