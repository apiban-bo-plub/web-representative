"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// YouTube Short — 9:16 source. `playlist` is what makes `loop` work on a
// single video. `enablejsapi` is what lets the mute button postMessage in.
const VIDEO_ID = 'JKFGev-fdqw';
const EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}` +
  `&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1&playsinline=1`;

/**
 * Cold-open background loop, served by YouTube.
 *
 * Two things the embed forces on us:
 *  - Player chrome (title card, progress bar) still paints with controls=0,
 *    so the iframe is over-scaled and the frame clips it. That is the
 *    `scale: 1.22` on `.cold-open__yt`.
 *  - There is no `video.muted` to set, so mute goes over postMessage. Any
 *    command sent before the player is ready is dropped, which is fine —
 *    the only command is user-initiated.
 *
 * Starts muted on purpose: mobile Chrome and Safari refuse to autoplay an
 * unmuted video, and an unmuted default has already been reverted once on
 * this project for exactly that reason.
 */
export default function HeroVideo() {
  const { t } = useLanguage();
  const iframeRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(false), 800);
    return () => clearTimeout(timer);
  }, [feedback]);

  const command = (func, args = []) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    try {
      win.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
    } catch {
      /* cross-origin frame not ready yet — the command is simply dropped */
    }
  };

  const toggleMute = () => {
    const next = !muted;
    command(next ? 'mute' : 'unMute');
    if (!next) command('playVideo');
    setMuted(next);
    setFeedback(true);
  };

  return (
    <>
      {/* Still underlay: covers the gap before the embed paints, and stands
          in entirely if YouTube is blocked on the viewer's network. */}
      <Image
        className="cold-open__still"
        src="/images/products/hands-holding-inhaler-and-oil.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        quality={85}
        style={{ objectFit: 'cover' }}
      />

      <iframe
        ref={iframeRef}
        className="cold-open__yt"
        src={EMBED_URL}
        title={t("home.hero.videoAlt")}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />

      <div className={`cold-open__feedback${feedback ? ' is-on' : ''}`} aria-hidden="true">
        {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </div>

      <button
        type="button"
        className="cold-open__sound"
        onClick={toggleMute}
        aria-pressed={!muted}
        aria-label={muted ? t("home.hero.unmute") : t("home.hero.mute")}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </>
  );
}
