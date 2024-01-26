'use client';
import React, { useState } from 'react';

import { useAppDispatch } from '@/app/lib/redux/hooks';
import { newPass } from '@/app/lib/data/authThunk';

import { useParams } from 'next/navigation';

const ResetPassword = () => {
  const params = useParams<{ ['reset-link']: string }>();
  const resetToken: string = params['reset-link'];

  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');

  const handlePasswordReset = async () => {
    try {
      if (!resetToken) {
        console.error('Reset token is missing');
        return;
      }

      await dispatch(newPass(password, resetToken));
    } catch (error) {
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
