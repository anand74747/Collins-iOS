import React, { useState } from "react";
import "./ImagePopup.css";

export default function ImagePopup({ referenceImagePaths, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!referenceImagePaths || referenceImagePaths.length === 0) return null;

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://192.168.2.2:81/api/v1";

  const currentImageUrl = `${baseUrl}/${referenceImagePaths[currentImageIndex]}`;

  const handleNextImage = () => {
    if (currentImageIndex < referenceImagePaths.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="image-popup-overlay">
      <div className="image-popup-content">
        {/* Navigation arrows for multiple images */}
        {currentImageIndex > 0 && (
          <button
            className="image-popup-arrow image-popup-arrow-left"
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              zIndex: 1100,
            }}
            onClick={handlePrevImage}
            aria-label="Previous Image"
          >
            &#8592;
          </button>
        )}
        <img
          src={currentImageUrl}
          alt="Reference"
          className="image-popup-img"
        />
        {currentImageIndex < referenceImagePaths.length - 1 && (
          <button
            className="image-popup-arrow image-popup-arrow-right"
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              zIndex: 1100,
            }}
            onClick={handleNextImage}
            aria-label="Next Image"
          >
            &#8594;
          </button>
        )}
        {/* Image counter */}
        {referenceImagePaths.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              background: "rgba(0,0,0,0.5)",
              padding: "5px 15px",
              borderRadius: "20px",
              zIndex: 1100,
            }}
          >
            {currentImageIndex + 1} / {referenceImagePaths.length}
          </div>
        )}
        <button
          className="image-popup-close image-popup-close-bottom"
          onClick={onClose}
          aria-label="Close"
        >
          <img src="/Close.svg" alt="Close" style={{ width: 58, height: 58 }} />
        </button>
      </div>
    </div>
  );
}
