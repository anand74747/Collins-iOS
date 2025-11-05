import React, { useState, useEffect, useCallback, useRef } from "react";
import "./VideoPopup.css";

const VideoPopup = ({ isOpen, onClose, scanData }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef(null);
  const MAX_RETRIES = 3;

  const VIDEO_BASE_URL = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/public/videos/`
    : "http://192.168.2.2:81/api/v1/public/videos/";

  const getVideoUrl = useCallback(() => {
    if (!scanData) return null;

    // Check for video_urls array first (new backend response format)
    const videoUrls = scanData?.data?.video_urls || scanData?.video_urls;
    if (videoUrls && Array.isArray(videoUrls) && videoUrls.length > 0) {
      const firstVideoUrl = videoUrls[0];
      if (
        firstVideoUrl.startsWith("http://") ||
        firstVideoUrl.startsWith("https://")
      ) {
        return firstVideoUrl;
      } else {
        // Construct the correct URL - keep the full path including 'public/'
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://192.168.2.2:81/api/v1";
        return `${baseUrl}/${firstVideoUrl}`;
      }
    }

    // Fallback to old format for backward compatibility
    const backendVideoUrl = scanData?.data?.video_url || scanData?.video_url;
    const backendVideoId = scanData?.data?.video_id || scanData?.video_id;

    let finalUrl = null;

    if (backendVideoUrl) {
      if (
        backendVideoUrl.startsWith("http://") ||
        backendVideoUrl.startsWith("https://")
      ) {
        finalUrl = backendVideoUrl;
      } else {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://192.168.2.2:81/api/v1";
        finalUrl = baseUrl + "/" + backendVideoUrl;
      }
    } else if (backendVideoId) {
      finalUrl = VIDEO_BASE_URL + backendVideoId + ".mp4";
    } else {
      const testVideoId = "ac25bbb0-72ce-437c-82ad-ad4747790405";
      finalUrl = VIDEO_BASE_URL + testVideoId + ".mp4";
    }
    return finalUrl;
  }, [scanData, VIDEO_BASE_URL]);

  // Get all video URLs for potential future use (multiple video support)
  // eslint-disable-next-line no-unused-vars
  const getAllVideoUrls = useCallback(() => {
    if (!scanData) return [];

    const videoUrls = scanData?.data?.video_urls || scanData?.video_urls;
    if (videoUrls && Array.isArray(videoUrls)) {
      return videoUrls.map((url) => {
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        } else {
          // Keep the full path including 'public/'
          const baseUrl =
            import.meta.env.VITE_API_BASE_URL || "http://192.168.2.2:81/api/v1";
          return `${baseUrl}/${url}`;
        }
      });
    }

    // Fallback to single video URL
    const singleUrl = getVideoUrl();
    return singleUrl ? [singleUrl] : [];
  }, [scanData, getVideoUrl]);

  useEffect(() => {
    if (isOpen) {
      setIsVideoLoaded(false);
      setVideoError(false);
      setUseIframe(false);
      setShowPlayButton(true);
      setIsPlaying(false);
      setRetryCount(0);
    }
  }, [isOpen]);

  if (!isOpen || !scanData) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setShowPlayButton(false);
    setIsPlaying(true);

    // Automatically play the video when it loads
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay failed:", error);
        // If autoplay fails, show the play button
        setShowPlayButton(true);
        setIsPlaying(false);
      });
    }
  };

  const handleVideoError = () => {
    console.error("Video loading error, retry count:", retryCount);

    if (retryCount < MAX_RETRIES) {
      // Retry loading the video
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      // After max retries, try iframe fallback
      setVideoError(true);
      setUseIframe(true);
    }
  };

  const handlePlayButtonClick = () => {
    setShowPlayButton(false);
    setIsPlaying(true);

    // Find and play the video element
    if (videoRef.current && videoRef.current.play) {
      videoRef.current.play();
    }
  };

  return (
    <div className="video-popup-overlay" onClick={handleBackdropClick}>
      <div className="video-popup-content video-popup-no-header">
        <div className="video-container">
          {getVideoUrl() ? (
            <>
              {showPlayButton && !isPlaying && (
                <div
                  className="play-button-overlay"
                  onClick={handlePlayButtonClick}
                ></div>
              )}

              {!isVideoLoaded && !videoError && !useIframe && (
                <div className="video-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading video...</p>
                </div>
              )}

              {!useIframe ? (
                <video
                  ref={videoRef}
                  controls={!showPlayButton}
                  muted
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="video-player"
                  poster=""
                  onLoadedData={handleVideoLoaded}
                  onLoadedMetadata={() => {
                    console.log("Video metadata loaded");
                  }}
                  onCanPlay={() => {
                    console.log("Video can play");
                  }}
                  onError={(e) => {
                    console.error("Video error:", e);
                    handleVideoError();
                  }}
                  onPlay={() => {
                    setShowPlayButton(false);
                    setIsPlaying(true);
                  }}
                  style={{ display: isVideoLoaded ? "block" : "none" }}
                  crossOrigin="anonymous"
                  webkit-playsinline="true"
                >
                  <source src={getVideoUrl()} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={getVideoUrl()}
                  title="Video Player"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="video-player"
                  style={{ width: "100%", height: "100%" }}
                  onLoad={() => {
                    setIsVideoLoaded(true);
                  }}
                />
              )}

              {videoError && !useIframe && (
                <div className="video-error">
                  <p>Failed to load video. Trying alternative method...</p>
                </div>
              )}
            </>
          ) : (
            <div className="no-video">
              <p>No video available for this item</p>
            </div>
          )}
          <button
            className="close-btn close-btn-bottom"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
