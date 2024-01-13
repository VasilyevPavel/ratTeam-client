'use client';
import React, { useState } from 'react';

import { useAppDispatch } from '@/app/lib/redux/hooks';
import { newPass } from '@/app/lib/data/authThunk';

import { useParams } from 'next/navigation';

const ResetPassword = () => {
  const params = useParams<{ ['reset-link']: string }>();
  const resetToken: string = params['reset-link'];
  console.log('resetToken', resetToken);
  // const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  // const resetToken = searchParams.get('resetToken');
  const [password, setPassword] = useState('');

  const handlePasswordReset = async () => {
    try {
      if (!resetToken) {
        // Обработка ошибки, если токен отсутствует
        console.error('Reset token is missing');
        return;
      }

      // Вызываем Thunk-действие для отправки нового пароля на сервер
      await dispatch(newPass(password, resetToken));

      // После успешной смены пароля перенаправляем пользователя на другую страницу
      // router.push('/login'); // Например, перенаправляем на страницу входа
    } catch (error) {
      // Обработка ошибок, если что-то пошло не так
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      <h2>Смена пароля</h2>
      <input
        type="password"
        placeholder="Введите новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Сменить пароль</button>
    </div>
  );
};

export default ResetPassword;
