'use client';
import { uploadAvatarPhoto } from '@/app/lib/data/imageData';
import { useAppDispatch } from '@/app/lib/redux/hooks';
import { setNewAvatar, setUserData } from '@/app/lib/redux/userSlice';
import { Button, CircularProgress } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

export default function Page() {
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setLoadingPhoto(true);

      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await uploadAvatarPhoto(formData);
        console.log('response', response.data);
        if (response) {
          alert('Аватар успешно загружен');
          dispatch(setNewAvatar(response.data.userData.avatar));
        } else {
          alert('Ошибка при загрузке аватара');
        }
      } catch (error) {
        console.error('Ошибка загрузки аватара:', error);
        alert('Произошла ошибка при загрузке аватара');
      } finally {
        setLoadingPhoto(false);
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor="avatar-upload" style={{ display: 'inline-block' }}>
        <input
          accept="image/*"
          id="avatar-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <Button component="span" disabled={loadingPhoto}>
          {loadingPhoto ? <CircularProgress size={24} /> : 'Сменить аватар'}
        </Button>
      </label>

      {/* Если изображение загружено, показываем предпросмотр */}
      {imagePreview && (
        <div>
          <h3>Предпросмотр:</h3>
          <img
            src={imagePreview}
            alt="preview"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </div>
      )}
    </div>
  );
}
