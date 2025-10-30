import React, { useState } from "react";
import CameraScanner from "../components/CameraScanner";
import VideoPopup from "../components/VideoPopup";
import ImagePopup from "../components/ImagePopup";
import TextDescriptionPopup from "../components/TextDescriptionPopup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ScannerPage.css";
const ScannerPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // 0: video, 1: image
  const [scanResult, setScanResult] = useState(null);

  const handleScanSuccess = (data) => {
    setScanResult(data);
    setIsPopupOpen(true);
    setActiveSlide(0);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setScanResult(null);
    setActiveSlide(0);
  };

  // Extract reference_image_paths from scanResult
  const getReferenceImagePaths = () => {
    if (!scanResult) return null;
    return (
      scanResult?.data?.reference_image_paths ||
      scanResult?.reference_image_paths
    );
  };

  // No longer needed: handleShowImagePopup

  return (
    <div className="scanner-page">
      <div className="app-header">
        <div className="logo-container">
          <img src="/logo 2.png" alt="Collins Aerospace" className="logo" />
        </div>
      </div>

      <CameraScanner onScanSuccess={handleScanSuccess} />

      {/* Swiper for popups */}
      {isPopupOpen && (
        <Swiper
          initialSlide={activeSlide}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          pagination={{ clickable: true }}
          navigation={false}
          spaceBetween={50}
          slidesPerView={1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 2000,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <VideoPopup
              isOpen={true}
              onClose={handleClosePopup}
              scanData={scanResult}
            />
          </SwiperSlide>
          {getReferenceImagePaths() && getReferenceImagePaths().length > 0 && (
            <SwiperSlide>
              <ImagePopup
                referenceImagePaths={getReferenceImagePaths()}
                onClose={handleClosePopup}
              />
            </SwiperSlide>
          )}
          {scanResult?.data?.text_description && (
            <SwiperSlide>
              <TextDescriptionPopup
                text={scanResult.data.text_description}
                title={scanResult.data.title}
                onClose={handleClosePopup}
              />
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ScannerPage;
