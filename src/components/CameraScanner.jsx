import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./CameraScanner.css";

const CameraScanner = ({ onScanSuccess }) => {
  const webcamRef = useRef(null);
  const cameraContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const facingMode = "environment";
  const [zoom, setZoom] = useState(1);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);

  // Auto-dismiss error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  };

  const capture = useCallback(async () => {
    // ...existing code...
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setError("Failed to capture image");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // ...existing code...
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      // ...existing code...
      const formData = new FormData();
      formData.append("file", blob, "captured-image.png");

      // Log API configuration for debugging
      const apiUrl =
        import.meta.env.VITE_IMAGE_PROCESSOR_URL ||
        "http://192.168.2.2:81/api/v1/image-processor/scan-image";
      const apiToken = import.meta.env.VITE_API_TOKEN;

      console.log("API Request:", {
        url: apiUrl,
        hasToken: !!apiToken,
        tokenLength: apiToken?.length,
        tokenPreview: apiToken ? `${apiToken.substring(0, 20)}...` : "MISSING",
      });

      // ...existing code...
      const apiResponse = await axios.post(apiUrl, formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // STRICT validation - only show results page for valid product data
      if (apiResponse.data.status && apiResponse.data.data) {
        const responseData = apiResponse.data.data;

        // Validate video data - must have real content, not just "v2/" paths
        const hasValidVideo =
          (responseData?.video_urls &&
            Array.isArray(responseData.video_urls) &&
            responseData.video_urls.length > 0 &&
            responseData.video_urls.some(
              (url) =>
                url &&
                url.length > 10 &&
                !url.endsWith("v2/") &&
                !url.endsWith("v2")
            )) ||
          (responseData?.video_url &&
            responseData.video_url.length > 10 &&
            !responseData.video_url.endsWith("v2/") &&
            !responseData.video_url.endsWith("v2")) ||
          (responseData?.video_id &&
            responseData.video_id.length > 5 &&
            !responseData.video_id.startsWith("v2"));

        // Validate image path - must be a real file path with extension
        const hasValidImage =
          responseData?.image_path &&
          responseData.image_path.length > 10 &&
          !responseData.image_path.endsWith("v2/") &&
          !responseData.image_path.endsWith("v2") &&
          (responseData.image_path.includes(".jpg") ||
            responseData.image_path.includes(".png") ||
            responseData.image_path.includes(".jpeg") ||
            responseData.image_path.includes(".webp"));

        // Validate text description - must have substantial content
        const hasValidText =
          responseData?.text_description &&
          responseData.text_description.trim().length > 20 &&
          responseData.text_description.toLowerCase() !== "v2" &&
          !responseData.text_description.match(/^v2\/?$/i);

        // Validate title - must have meaningful content
        const hasValidTitle =
          responseData?.title &&
          responseData.title.trim().length > 3 &&
          responseData.title.toLowerCase() !== "v2" &&
          !responseData.title.match(/^v2\/?$/i);

        // Require at least TWO valid fields to show results page
        const validFieldsCount = [
          hasValidVideo,
          hasValidImage,
          hasValidText,
          hasValidTitle,
        ].filter(Boolean).length;
        const hasValidData = validFieldsCount >= 2;

        console.log("API Response validation:", {
          hasValidVideo,
          hasValidImage,
          hasValidText,
          hasValidTitle,
          validFieldsCount,
          hasValidData,
          responseData,
        });

        if (hasValidData) {
          // Valid product detected - show results page
          onScanSuccess(apiResponse.data);
        } else {
          // Insufficient valid data - do NOT show results page
          setError(
            "No product detected. Please scan a valid aircraft product."
          );
        }
      } else {
        // API returned unsuccessful status or no data
        const errorMessage =
          apiResponse.data?.message || "Product not recognized";
        setError(`${errorMessage}. Please scan a valid aircraft product.`);
      }
    } catch (error) {
      // Network or parsing error
      console.error("Scan error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        error: error,
      });

      // Provide more specific error message
      let errorMessage = "Failed to scan image. Please try again.";
      if (error.response) {
        // API returned an error response
        errorMessage =
          error.response.data?.message ||
          `Server error (${error.response.status})`;
      } else if (error.request) {
        // Request was made but no response
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [onScanSuccess]);

  // ...existing code...
  const getTouchDistance = (touches) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // ...existing code...
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = getTouchDistance(e.touches);

        if (lastTouchDistance > 0) {
          const delta = currentDistance - lastTouchDistance;
          const zoomFactor = delta > 0 ? 1.02 : 0.98;

          setZoom((prevZoom) => {
            const newZoom = prevZoom * zoomFactor;
            return Math.min(Math.max(newZoom, 1), 3); // Limit zoom between 1x and 3x
          });
        }

        setLastTouchDistance(currentDistance);
      }
    },
    [lastTouchDistance]
  );

  const handleTouchEnd = useCallback(() => {
    setLastTouchDistance(0);
  }, []);

  // ...existing code...
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;

    setZoom((prevZoom) => {
      const newZoom = prevZoom * zoomFactor;
      return Math.min(Math.max(newZoom, 1), 3);
    });
  }, []);

  return (
    <div className="camera-scanner">
      <img src="/logo 2.png" alt="Collins Aerospace Logo" className="logo" />

      <div className="camera-container" ref={cameraContainerRef}>
        <div className="instruction-text">
          <p>
            Please point the camera at the aircraft product to learn more about
            it.
          </p>
        </div>
        <div
          className="camera-frame"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div
            className="webcam-container"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="webcam"
            />
          </div>
          <div className="scan-overlay">
            <div className="scan-box">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
            </div>

            {/* ...existing code... */}

            {/* ...existing code... */}
            <div className="internal-scan-button">
              <button
                className="capture-btn"
                onClick={capture}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <span className="capture-text">SCAN OBJECT</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="instructions"></div>
    </div>
  );
};

export default CameraScanner;
