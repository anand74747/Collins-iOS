import React from "react";
import "./TextDescriptionPopup.css";

export default function TextDescriptionPopup({ text, title, onClose, onBack }) {
  if (!text) return null;
  return (
    <div className="text-popup-overlay">
      <div className="text-popup-content">
        {onBack && (
          <button
            className="text-popup-arrow text-popup-arrow-left"
            style={{ position: "absolute", top: "50%", zIndex: 1100 }}
            onClick={onBack}
            aria-label="Back"
          >
            &#8592;
          </button>
        )}
        <div className="text-popup-title">{title}</div>
        <div className="text-popup-description">{text}</div>
        <button
          className="text-popup-close text-popup-close-bottom"
          onClick={onClose}
          aria-label="Close"
        >
          <img src="/Close.svg" alt="Close" style={{ width: 58, height: 58 }} />
        </button>
      </div>
    </div>
  );
}
