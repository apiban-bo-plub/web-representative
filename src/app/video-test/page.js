"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ScrollText, Sparkles, Users, ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import Divisions from '@/components/brand/Divisions';
import ImageSlot from '@/components/ImageSlot';
import LanguageSelector from '@/components/LanguageSelector';

const iconMap = {
  'scroll-text': ScrollText,
  'sparkles': Sparkles,
  'users': Users
};

/* ---- Replicated Sub-components from Home Page ---- */

function PortalNav({ go }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const L = (id, tKey, extra) => (
    <a
      onClick={() => {
        go(id);
        setOpen(false);
      }}
      className={"pn__link " + (extra || "")}
      style={{ cursor: 'pointer' }}
    >
      {t(tKey)}
    </a>
  );
  return (
    <header className="pn">
      <nav className="pn__side">
        {L("collection", "nav.collection")}
        {L("story", "nav.heritage")}
        {L("apothecary", "nav.apothecary")}
      </nav>
      <a onClick={() => go("top")} className="pn__logo" style={{ cursor: 'pointer' }}>
        <Logo width={150} />
      </a>
      <div className="pn__side pn__side--right" style={{ gap: '16px' }}>
        <LanguageSelector />
      </div>
      <button className="pn__burger" aria-label="Menu" onClick={() => setOpen(v => !v)}>
        <span></span><span></span><span></span>
      </button>
      {open && (
        <div className="pn__drawer">
          {L("collection", "nav.collection", "pn__drawerLink")}
          {L("story", "nav.heritage", "pn__drawerLink")}
          {L("apothecary", "nav.apothecary", "pn__drawerLink")}
          <div className="pn__drawerLink" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <LanguageSelector align="left" />
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ go }) {
  const { t } = useLanguage();
  return (
    <section className="hero" id="top">
      <div className="hero__bg">
        <Image
          src="/images/hero.jpg"
          alt="Apiban Bo Plup Apothecary Heritage Hero Background"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero__scrim" />
      <div className="hero__inner">
        <div className="apb-eyebrow hero__eyebrow">{t("home.hero.eyebrow")}</div>
        <h1 className="hero__h1">
          {t("home.hero.h1_1")}<br/>
          {t("home.hero.h1_2")}<br/>
          {t("home.hero.h1_3")}
        </h1>
        <p className="hero__sub">{t("home.hero.sub")}</p>
        <div className="hero__cta">
          <Button size="lg" onClick={() => go("collection")}>{t("home.hero.discover")}</Button>
          <Button size="lg" variant="secondary" onClick={() => go("story")} style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }}>{t("home.hero.story")}</Button>
        </div>
      </div>
      <div className="hero__scroll">{t("home.hero.scroll")}</div>
    </section>
  );
}

function Prestige() {
  const { t } = useLanguage();
  const line = t("home.prestige.line");
  return (
    <section className="prestige" aria-label="Recognition">
      <div className="prestige__track">
        {[0, 1, 2, 3].map(i => (
          <span className="prestige__item" key={i}>
            {line}
            <span className="prestige__sep">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Pillars() {
  const { t } = useLanguage();
  const data = [
    {
      icon: "scroll-text",
      t: t("home.pillars.legacy.title"),
      b: t("home.pillars.legacy.desc")
    },
    {
      icon: "sparkles",
      t: t("home.pillars.magic.title"),
      b: t("home.pillars.magic.desc")
    },
    {
      icon: "users",
      t: t("home.pillars.craft.title"),
      b: t("home.pillars.craft.desc")
    }
  ];
  return (
    <section className="pillars">
      <div className="pillars__grid">
        {data.map((p, i) => {
          const Icon = iconMap[p.icon];
          return (
            <React.Fragment key={p.t}>
              <div className="pillar">
                {Icon && <Icon className="pillar__icon" />}
                <h3 className="pillar__t">{p.t}</h3>
                <p className="pillar__b">{p.b}</p>
              </div>
              {i < 2 && <div className="pillar__rule" aria-hidden="true" />}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

function RedBook({ go }) {
  const { t } = useLanguage();
  return (
    <section className="redbook" id="story">
      <div className="redbook__media">
        <ImageSlot
          id="portal-redbook"
          shape="rounded"
          radius="14"
          fit="cover"
          placeholder="Drop 'The Red Book' — aged paper texture + herbs"
        />
        <div className="redbook__mark" />
      </div>
      <div className="redbook__text">
        <div className="apb-eyebrow" style={{ marginBottom: 16 }}>{t("home.redbook.eyebrow")}</div>
        <h2 className="redbook__h">
          {t("home.redbook.title_1")}<br/>
          {t("home.redbook.title_2")}
        </h2>
        <p className="redbook__b">{t("home.redbook.body")}</p>
        <Button variant="secondary" onClick={() => go("story")}>{t("home.redbook.button")}</Button>
      </div>
    </section>
  );
}

function ApothecarySide({ id, tone, tagline, title, body, slotId, ph }) {
  return (
    <div className={"apo__side apo__side--" + tone}>
      <div className="apo__media">
        <ImageSlot
          id={slotId}
          shape="rect"
          fit="cover"
          placeholder={ph}
        />
      </div>
      <div className="apo__body">
        <div className="apo__tagline">{tagline}</div>
        <h3 className="apo__title">{title}</h3>
        <p className="apo__desc">{body}</p>
      </div>
    </div>
  );
}

function Apothecary({ go }) {
  const { t } = useLanguage();
  return (
    <section className="apo" id="apothecary">
      <div className="apo__split">
        <ApothecarySide
          tone="green"
          slotId="portal-thepprasit"
          ph="Thepprasit — product shot"
          tagline={t("home.apothecary.tagline_thep")}
          title={t("home.apothecary.title_thep")}
          body={t("home.apothecary.body_thep")}
        />
        <ApothecarySide
          tone="gold"
          slotId="portal-phetmongkol"
          ph="Phetmongkol — product shot"
          tagline={t("home.apothecary.tagline_phet")}
          title={t("home.apothecary.title_phet")}
          body={t("home.apothecary.body_phet")}
        />
      </div>
      <div className="apo__cta">
        <Button size="lg" onClick={() => go("collection")}>{t("home.apothecary.button")}</Button>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useLanguage();
  const items = [
    { id: "portal-gallery-1", cap: t("home.gallery.items.g1") },
    { id: "portal-gallery-2", cap: t("home.gallery.items.g2") },
    { id: "portal-gallery-3", cap: t("home.gallery.items.g3") },
    { id: "portal-gallery-4", cap: t("home.gallery.items.g4") },
    { id: "portal-gallery-5", cap: t("home.gallery.items.g5") },
    { id: "portal-gallery-6", cap: t("home.gallery.items.g6") },
    { id: "portal-gallery-7", cap: t("home.gallery.items.g7") },
    { id: "portal-gallery-8", cap: t("home.gallery.items.g8") }
  ];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const tTimer = setInterval(() => setI(v => (v + 1) % items.length), 4200);
    return () => clearInterval(tTimer);
  }, [paused, items.length]);

  return (
    <section
      className="gallery"
      id="gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="gallery__head">
        <div className="apb-eyebrow">{t("home.gallery.eyebrow")}</div>
        <h2 className="gallery__h">{t("home.gallery.title")}</h2>
        <p className="gallery__b">{t("home.gallery.desc")}</p>
      </div>
      <div className="gallery__stage">
        {items.map((it, idx) => (
          <div className={"gallery__slide" + (idx === i ? " is-active" : "")} key={it.id}>
            <ImageSlot
              id={it.id}
              shape="rect"
              fit="cover"
              placeholder={it.cap}
            />
          </div>
        ))}
        <div className="gallery__scrim" />
        <div className="gallery__caption">{items[i].cap}</div>
        <div className="gallery__nav">
          <button
            className="gallery__arrow"
            aria-label="Previous"
            onClick={() => setI(v => (v - 1 + items.length) % items.length)}
          >
            ‹
          </button>
          <button
            className="gallery__arrow"
            aria-label="Next"
            onClick={() => setI(v => (v + 1) % items.length)}
          >
            ›
          </button>
        </div>
      </div>
      <div className="gallery__thumbs">
        {items.map((it, idx) => (
          <button
            key={it.id}
            className={"gallery__thumb" + (idx === i ? " is-active" : "")}
            aria-label={it.cap}
            onClick={() => setI(idx)}
          >
            <ImageSlot
              id={it.id}
              shape="rect"
              fit="cover"
              placeholder={String(idx + 1)}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function Continuum() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <section className="cont" id="collection">
      <div className="cont__media">
        <ImageSlot
          id="portal-lifestyle"
          shape="rect"
          fit="cover"
          placeholder="Lifestyle — a modern professional using the product in a premium setting"
        />
      </div>
      <div className="cont__panel">
        <img className="cont__mark" src="/images/motif.svg" alt="" />
        <h2 className="cont__h">{t("home.continuum.title")}</h2>
        <p className="cont__b">{t("home.continuum.desc")}</p>
        <div className="cont__cta">
          <Button size="lg" onClick={() => router.push('/shop')}>{t("home.continuum.button_shop")}</Button>
          <Button size="lg" variant="secondary" style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }}>{t("home.continuum.button_gift")}</Button>
        </div>
      </div>
    </section>
  );
}

function PortalFooter() {
  const { t } = useLanguage();
  const col = (h, items) => (
    <div key={h}>
      <div className="pf__h">{h}</div>
      {items.map(i => <div className="pf__i" key={i}>{i}</div>)}
    </div>
  );
  return (
    <footer className="pf">
      <div className="pf__grid">
        <div>
          <Logo width={170} color="#f0ebe2" />
          <p className="pf__blurb">{t("footer.blurb")}</p>
        </div>
        {col(t("footer.explore"), [t("nav.collection"), t("home.redbook.button"), t("nav.heritage"), "Journal"])}
        {col(t("footer.company"), [t("shop.story.eyebrow"), "Stockists", "Corporate & gifting", "Contact"])}
        {col(t("footer.connect"), [t("footer.connectItems.0"), t("footer.connectItems.1"), t("footer.connectItems.2")])}
      </div>
      <div className="pf__base">
        <span>{t("footer.copy")}</span>
        <span>{t("footer.privacy")}</span>
      </div>
    </footer>
  );
}

/* ---- Main Parallax Reveal Page Component ---- */

export default function VideoParallaxPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const iframeRef = useRef(null);
  
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(800);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [showMuteOverlay, setShowMuteOverlay] = useState(false);

  // Setup scroll and height measurements on client side
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // YouTube Shorts ID: JKFGev-fdqw
  const videoId = 'JKFGev-fdqw';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1`;

  // Programmatic API triggers
  const postCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: func, args: args }),
          '*'
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      postCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      postCommand('playVideo');
      setIsPlaying(true);
    }
    setShowPlayOverlay(true);
  };

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

  // Page anchor scroll handler
  const go = (id) => {
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "story") {
      const el = document.getElementById("story");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
      return;
    }
    if (id === "apothecary") {
      const el = document.getElementById("apothecary");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  // Parallax Scroll calculations: transition completes over 1 full viewport scroll
  const scrollThreshold = windowHeight > 0 ? windowHeight : 800;
  const progress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);

  // Video transitions derived from progress:
  // - Opacity: fades from 1.0 down to 0.0
  // - Scaling/Expansion (Desktop only): expands outwards slightly as you scroll
  const desktopWidth = `calc( (70vh * 9 / 16) + (100vw - (70vh * 9 / 16)) * ${progress} )`;
  const desktopHeight = `calc( 70vh + (100vh - 70vh) * ${progress} )`;
  const desktopRadius = `${16 * (1 - progress)}px`;
  const desktopShadow = `0 ${24 * (1 - progress)}px ${70 * (1 - progress)}px rgba(0, 0, 0, ${0.8 * (1 - progress)})`;
  
  // Visibility threshold: hide fixed video layer completely once faded to save browser rendering resources
  const isVideoHidden = progress >= 0.99;

  return (
    <div className="portal parallax-reveal-page">
      {/* Dynamic Navbar Wrapper: Fades in and slides down once the video section ends */}
      <div className="video-page-nav-wrapper" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: progress >= 0.9 ? 1 : 0,
        transform: `translateY(${progress >= 0.9 ? '0' : '-100%'})`,
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: progress >= 0.9 ? 'auto' : 'none',
      }}>
        <PortalNav go={go} />
      </div>

      {/* 
        Sticky Video Layer (Fixed behind the scrolling homepage contents):
        Fades out and expands on desktop, fades out on mobile.
      */}
      {!isVideoHidden && (
        <div 
          className="parallax-video-sticky" 
          style={{ opacity: 1 - progress }}
        >
          {/* Main Expanding Video container */}
          <div className="scroll-video-box" style={{
            '--d-width': desktopWidth,
            '--d-height': desktopHeight,
            '--d-radius': desktopRadius,
            '--d-shadow': desktopShadow
          }}>
            {/* Click-capture overlay to intercept pointer clicks */}
            <div className="scroll-video-click-layer" onClick={togglePlay} />

            {/* Visual indicators */}
            <div className={`feedback-indicator ${showPlayOverlay ? 'active' : ''}`}>
              {isPlaying ? <Play size={28} style={{ marginLeft: 4 }} /> : <Pause size={28} />}
            </div>
            <div className={`feedback-indicator ${showMuteOverlay ? 'active' : ''}`}>
              {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
            </div>

            {/* Corner audio trigger (fades with scrolling) */}
            <button 
              className="sound-toggle-btn"
              onClick={toggleMute}
              style={{ opacity: 1 - progress, pointerEvents: progress > 0.8 ? 'none' : 'auto' }}
              aria-label={isMuted ? "Unmute Video" : "Mute Video"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Cropped YouTube Embed Frame */}
            <div className="scroll-iframe-cropper">
              <iframe
                ref={iframeRef}
                className="scroll-video-iframe"
                src={embedUrl}
                title="Apiban Bo Plup YouTube Video"
                allow="autoplay; encrypted-media; gyroscope"
                tabIndex="-1"
              />
            </div>
          </div>

          {/* Floating Back Button (fades as user scrolls) */}
          <button 
            className="video-back-btn" 
            onClick={() => router.push('/')}
            style={{ opacity: 1 - progress, pointerEvents: progress > 0.8 ? 'none' : 'auto' }}
            aria-label="Go Back to Portal"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          
          {/* Centered Scroll Prompt (fades as user scrolls) */}
          <div className="hero__scroll scroll-hero-cue" style={{ opacity: 1 - progress }}>
            {t("home.hero.scroll")}
          </div>
        </div>
      )}

      {/* 
        Scrolling Content Layer (Slides UP on top of the fixed background video):
      */}
      <div className="parallax-scroll-content">
        
        {/* 
          1st Section: Transparent spacer of 100vh.
          Allows the fixed video layer to be fully seen initially.
          Clicks at scroll=0 pass directly through this transparent container to the video.
        */}
        <div className="parallax-spacer-section" />

        {/* 
          2nd Section: The actual homepage Hero section.
          Slides up over the video as the user scrolls, initiating the parallax transition.
        */}
        <div className="parallax-homepage-hero" style={{ opacity: progress }}>
          <Hero go={go} />
        </div>

        {/* Remaining homepage sections scroll naturally */}
        <div className="parallax-other-sections">
          <Prestige />
          <Pillars />
          <RedBook go={go} />
          <Apothecary go={go} />
          <Gallery />
          <Continuum />
          <PortalFooter />
        </div>
      </div>

      {/* Styled layouts for parallax mechanisms */}
      <style dangerouslySetInnerHTML={{ __html: `
        .parallax-reveal-page {
          overflow-x: hidden;
          background-color: #0b0d0c;
        }

        .parallax-reveal-page .pillars {
          background: #0d0f0e; /* Deep charcoal background block */
          border-top: 1px solid rgba(203, 181, 147, 0.12);
          border-bottom: 1px solid rgba(203, 181, 147, 0.12);
        }
        .parallax-reveal-page .pillar__rule {
          background: rgba(203, 181, 147, 0.12);
        }
        .parallax-reveal-page .pillar__t {
          color: var(--text-on-dark-strong, #ffffff);
        }
        .parallax-reveal-page .pillar__b {
          color: var(--text-on-dark, #f0ebe2);
          opacity: 0.85;
        }

        /* Fixed Background Video view */
        .parallax-video-sticky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: #0b0d0c;
          pointer-events: auto; /* Allow interactions on the click overlays */
          transition: opacity 0.1s linear;
        }

        /* Scrolling content overlay */
        .parallax-scroll-content {
          position: relative;
          z-index: 2;
          width: 100%;
          pointer-events: none; /* Let pointer pass through the transparent sections to the video */
        }

        /* Transparent initial spacer section (100vh viewport) */
        .parallax-spacer-section {
          height: 100vh;
          height: 100dvh;
          width: 100%;
          pointer-events: none; /* Non-blocking */
        }

        /* The Hero section and subsequent parts block pointer actions for normal page buttons */
        .parallax-homepage-hero,
        .parallax-other-sections {
          position: relative;
          pointer-events: auto; /* Normal interaction for text buttons and navigation links */
          background-color: #0b0d0c; /* Cover the background video */
        }

        /* Expanding Video element styles */
        .scroll-video-box {
          position: absolute;
          background-color: #000;
          overflow: hidden;
        }

        .scroll-video-click-layer {
          position: absolute;
          inset: 0;
          z-index: 5;
          cursor: pointer;
        }

        .scroll-iframe-cropper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform: scale(1.22);
          transform-origin: center center;
        }

        .scroll-video-iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border: none;
          pointer-events: none;
        }

        .scroll-hero-cue {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9;
          transition: opacity 0.2s ease;
        }

        /* Desktop Layout specifications using variables */
        @media (min-width: 901px) {
          .scroll-video-box {
            width: var(--d-width);
            height: var(--d-height);
            border-radius: var(--d-radius);
            box-shadow: var(--d-shadow);
          }
        }

        /* Mobile Layout specifications */
        @media (max-width: 900px) {
          .scroll-video-box {
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            border-radius: 0px;
          }
        }

        /* Central interaction indicators */
        .feedback-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          background: rgba(11, 13, 12, 0.8);
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

        /* Corner audio button styling */
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
    </div>
  );
}
