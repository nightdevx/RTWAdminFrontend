import React, { useState, useRef } from "react";

function VideoPreview({ videoUrl }) {
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    // Videonun ilk karesini canvas üzerine çiziyoruz
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Canvas'ı base64 görüntüsüne çevirip state'e kaydediyoruz
    const dataUrl = canvas.toDataURL("image/png");
    setThumbnail(dataUrl);
  };

  return (
    <div>
      {thumbnail ? (
        // Eğer önizleme resmi varsa göster
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        // Eğer önizleme resmi yoksa yükleniyor mesajı göster
        <p>Önizleme yükleniyor...</p>
      )}

      {/* Gizli video elementi */}
      <video
        ref={videoRef}
        src={videoUrl}
        style={{ display: "none" }}
        onLoadedData={captureThumbnail} // Video yüklendiğinde thumbnail'i çek
      />
    </div>
  );
}

export default VideoPreview;
