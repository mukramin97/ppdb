import React, { useState, useEffect } from 'react';

const ImagePreview = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Make the API call to retrieve the image data
    fetch(`http://ppdb.test/api/v1/preview_pasfoto/${props.auth.user.id}`)
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.imageUrl);
      });
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Preview" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImagePreview;
