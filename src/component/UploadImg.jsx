import React, { useState } from 'react';
import { apiUploadBulkImg, callApiFormData } from '../js/api';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const chunkSize = 10 * 1024 * 1024; // 10MB mỗi phần
  const file = images[0]; // Chỉ xử lý một file đầu tiên trong array images

  let start = 0;
  let end = chunkSize;

  const handleImageChange = (event) => {
    console.log(images)
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      const formData = new FormData();
      Array.from(images).forEach(file => {
        formData.append('images', file);
      });
      try {
        const response = await callApiFormData(apiUploadBulkImg, formData, '', 'header: ' + 'multipart/form-data');
        alert(response.message);

        start = end;
        end = Math.min(file.size, end + chunkSize);
      } catch (error) {
        console.error('Error uploading chunk:', error);
      }

  };

  return (
    <div>
      <h1>Upload Multiple Images</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
