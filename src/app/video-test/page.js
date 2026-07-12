"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoTestPage() {
  const router = useRouter();
  const iframeRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [showMuteOverlay, setShowMuteOverlay] = useState(false);

  // YouTube Shorts ID: JKFGev-fdqw
  const videoId = 'JKFGev-fdqw';
  
  // Build the embed URL with parameters:
  // - autoplay=1: Autoplay on load
  // - mute=1: Mute initially so browsers allow autoplay
  // - loop=1 & playlist=ID: Standard YouTube looping
  // - controls=0: Hide YouTube player controls
  // - modestbranding=1: Hide YouTube branding
  // - rel=0: No related videos
  // - enablejsapi=1: Allows programmatic control via postMessage
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1`;

  // Programmatically send commands to the YouTube player via postMessage
  const postCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: func,
            args: args
          }),
          '*'
        );
      } catch (err) {
        console.error('Failed to send postMessage to YouTube player:', err);
      }
    }
  };

  // Toggle play/pause
  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      postCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      postCommand('playVideo');
      setIsPlaying(true);
    }
    // Show a quick visual confirmation in the center
    setShowPlayOverlay(true);
  };

  // Toggle mute/unmute
  const toggleMute = (e) => {
    e.stopPropagation();
    if (isMuted) {
      postCommand('unMute');
      setIsMuted(false);
    } else {
      postCommand('mute');
      setIsMuted(true);
    }
    setShowMuteOverlay(true);
  };

  // Auto-fade the central play/pause indicator and sound indicator
  useEffect(() => {
    if (showPlayOverlay) {
      const timer = setTimeout(() => setShowPlayOverlay(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showPlayOverlay]);

  useEffect(() => {
    if (showMuteOverlay) {
      const timer = setTimeout(() => setShowMuteOverlay(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showMuteOverlay]);

  return (
    <main className="video-page">
      {/* Self-contained styling for layout, cropping, and custom controls */}
      <style dangerouslySetInnerHTML={{ __html: `
        .video-page {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          background-color: #0b0d0c; /* Deep dark heritage tone */
          overflow: hidden;
          position: relative;
        }

        /* Ambient glowing background */
        .video-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(107, 126, 114, 0.08) 0%, rgba(0,0,0,0) 70%);
          z-index: 1;
          pointer-events: none;
        }

        /* Main Container: crops top, bottom, and side YouTube overlays */
        .video-container {
          position: relative;
          overflow: hidden;
          z-index: 2;
          background-color: #000;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.8);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Desktop Layout: 70vh height with 9:16 aspect ratio */
        @media (min-width: 901px) {
          .video-container {
            height: 70vh;
            width: calc(70vh * 9 / 16);
            border-radius: 16px;
            border: 1px solid rgba(203, 181, 147, 0.25); /* Subtle gold frame */
          }
        }

        /* Mobile Layout: Full page */
        @media (max-width: 900px) {
          .video-container {
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            border: none;
          }
        }

        /* 
           The Iframe Wrapper:
           Scales and shifts the iframe to crop out YouTube UI.
           By scaling to 1.25x and setting overflow hidden on container,
           the top title/channel header and bottom YouTube logo are pushed out of frame.
        */
        .iframe-cropper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform: scale(1.22); /* Push YouTube headers & footers past container boundaries */
          transform-origin: center center;
        }

        .video-iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border: none;
          pointer-events: none; /* Block direct clicks to the YouTube player */
        }

        /* Transparent click capture overlay to play/pause */
        .click-capture-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          cursor: pointer;
        }

        /* Central micro-animation feedback indicators */
        .feedback-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          background: rgba(11, 13, 12, 0.75);
          border: 1px solid rgba(203, 181, 147, 0.3);
          color: #f0ebe2;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 6;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feedback-indicator.active {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* Clean corner sound toggle button */
        .sound-toggle-btn {
          position: absolute;
          bottom: 24px;
          right: 24px;
          z-index: 10;
          background: rgba(11, 13, 12, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 181, 147, 0.3);
          color: #f0ebe2;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .sound-toggle-btn:hover {
          background: #3e5044;
          border-color: #cbb593;
          transform: scale(1.05);
        }

        /* Go Back Floating Button */
        .video-back-btn {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 10;
          background: rgba(11, 13, 12, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 181, 147, 0.3);
          color: #f0ebe2;
          padding: 12px 20px;
          border-radius: 9999px;
          font-family: var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .video-back-btn:hover {
          background: #3e5044;
          border-color: #cbb593;
          transform: translateY(-2px);
        }
      ` }} />

      {/* Floating Back Button */}
      <button 
        className="video-back-btn" 
        onClick={() => router.push('/')}
        aria-label="Go Back to Portal"
      >
        <ArrowLeft size={16} />
        <span>Back to Portal</span>
      </button>

      {/* Glowing background */}
      <div className="video-bg-glow" />

      {/* Video Container */}
      <div className="video-container">
        
        {/* Click-capture layer to capture play/pause clicks, preventing native YouTube interface activation */}
        <div className="click-capture-overlay" onClick={togglePlay} />

        {/* Central Play/Pause visual feedback */}
        <div className={`feedback-indicator ${showPlayOverlay ? 'active' : ''}`}>
          {isPlaying ? <Play size={28} style={{ marginLeft: 4 }} /> : <Pause size={28} />}
        </div>

        {/* Sound toggle feedback */}
        <div className={`feedback-indicator ${showMuteOverlay ? 'active' : ''}`}>
          {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
        </div>

        {/* Dynamic sound control toggle */}
        <button 
          className="sound-toggle-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Iframe wrapper implementing visual crops */}
        <div className="iframe-cropper">
          <iframe
            ref={iframeRef}
            className="video-iframe"
            src={embedUrl}
            title="Apiban Bo Plup YouTube Video"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            tabIndex="-1"
          />
        </div>
      </div>
    </main>
  );
}
