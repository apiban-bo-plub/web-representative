"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Wind } from 'lucide-react';

import Logo from '@/components/brand/Logo';
import PortalFooter from '@/components/brand/PortalFooter';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import ImageSlot from '@/components/ImageSlot';
import LanguageSelector from '@/components/LanguageSelector';

/* ---- Nav (identical to Portal Page) -------------------------------- */
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
        {L("contact", "nav.contact")}
      </nav>
      <a onClick={() => go("top")} className="pn__logo" style={{ cursor: 'pointer' }}>
        <Logo width={150} />
      </a>
      <div className="pn__side pn__side--right" style={{ gap: '16px' }}>
        <LanguageSelector />
      </div>
      <button className="pn__burger" aria-label={t("nav.menu")} onClick={() => setOpen(v => !v)}>
        <span></span><span></span><span></span>
      </button>
      {open && (
        <div className="pn__drawer">
          {L("collection", "nav.collection", "pn__drawerLink")}
          {L("story", "nav.heritage", "pn__drawerLink")}
          {L("apothecary", "nav.apothecary", "pn__drawerLink")}
          {L("contact", "nav.contact", "pn__drawerLink")}
          <div className="pn__drawerLink" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <LanguageSelector align="left" />
          </div>
        </div>
      )}
    </header>
  );
}

/* ---- Footer (identical to Portal Page) ------------------------------ */

/* ---- Apothecary Hero ------------------------------------------- */
function ApothecaryHero() {
  const { t } = useLanguage();
  return (
    <section className="apothecary-hero reveal" id="top-apothecary">
      <div className="apothecary-hero__bg" style={{ backgroundImage: "url('/images/products/hands-holding-inhaler-and-oil.jpg')" }} />
      <div className="apothecary-hero__scrim" />
      <div className="apothecary-hero__inner">
        <div className="apb-eyebrow apothecary-hero__eyebrow">{t("apothecary.eyebrow")}</div>
        <h1 className="apothecary-hero__h1">
          {t("apothecary.h1_1")}<br/>
          {t("apothecary.h1_2")}
        </h1>
        <p className="apothecary-hero__sub">{t("apothecary.sub")}</p>
      </div>
    </section>
  );
}

/* ---- Breathing Guide Component ----------------------------------- */
function RespirationGuide() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState("idle"); // idle, inhale, holdIn, exhale, holdOut
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }

    const sequence = [
      { name: "inhale", duration: 4 },
      { name: "holdIn", duration: 4 },
      { name: "exhale", duration: 4 },
      { name: "holdOut", duration: 4 }
    ];

    let currentStep = 0;
    setPhase(sequence[currentStep].name);
    setCountdown(sequence[currentStep].duration);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          currentStep = (currentStep + 1) % sequence.length;
          setPhase(sequence[currentStep].name);
          return sequence[currentStep].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active]);

  // Phase names double as locale keys: apothecary.breath.{inhale,holdIn,exhale,holdOut,idle}
  const getPhaseText = () => t(`apothecary.breath.${phase || "idle"}`);

  return (
    <div className="respiration-tool paper-texture">
      <button
        type="button"
        className={`respiration-orb-container respiration-orb-container--${phase}`}
        onClick={() => setActive(!active)}
        aria-label={t("apothecary.breath.toggle")}
        aria-pressed={active}
      >
        <div className="respiration-orb-outer"></div>
        <div className="respiration-orb-middle"></div>
        <div className="respiration-orb-inner">
          <Wind size={24} className="respiration-orb-icon" />
          <span className="respiration-orb-countdown">{active ? `${countdown}s` : ""}</span>
        </div>
      </button>
      <div className="respiration-tool-label">
        <h4 className="respiration-tool-title">{getPhaseText()}</h4>
        <p className="respiration-tool-desc">
          {active
            ? t("apothecary.breath.desc_active")
            : t("apothecary.breath.desc_idle")
          }
        </p>
      </div>
    </div>
  );
}

/* ---- Sensory Showcase --------------------------------------------- */
function SensoryShowcase({ activeTab, setActiveTab }) {
  const { t } = useLanguage();
  const activeNotes = activeTab === "warm" 
    ? t("apothecary.thep.notes") 
    : t("apothecary.phet.notes");
  const specs = t("apothecary.specs");

  return (
    <section className="sensory-section reveal">
      <div className="sensory-title-block">
        <span className="apb-eyebrow" style={{ color: 'var(--basil-green-700)', display: 'block', marginBottom: '12px' }}>
          {t("apothecary.sensory.eyebrow")}
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', margin: 0 }}>
          {activeTab === "warm" ? t("apothecary.sensory.title_warm") : t("apothecary.sensory.title_cool")}
        </h2>
      </div>

      <div className="sensory-tabs">
        <button
          className={`sensory-tab-btn ${activeTab === 'warm' ? 'sensory-tab-btn--active-warm' : ''}`}
          onClick={() => setActiveTab("warm")}
        >
          {t("home.apothecary.title_thep")} {t("apothecary.tabs.warm")}
        </button>
        <button
          className={`sensory-tab-btn ${activeTab === 'cool' ? 'sensory-tab-btn--active-cool' : ''}`}
          onClick={() => setActiveTab("cool")}
        >
          {t("home.apothecary.title_phet")} {t("apothecary.tabs.cool")}
        </button>
      </div>

      <div className={`sensory-content-box ${activeTab === 'cool' ? 'sensory-content-box--rev' : ''}`}>
        <div className="sensory-gallery">
          <div className="sensory-gallery__img">
            <ImageSlot
              id={activeTab === 'warm' ? 'apo-thep-inhaler' : 'apo-phet-inhaler'}
              shape="rect"
              fit="cover"
              placeholder={activeTab === 'warm' ? t("apothecary.alt.inhaler_warm") : t("apothecary.alt.inhaler_cool")}
            />
          </div>
          <div className="sensory-gallery__img">
            <ImageSlot
              id={activeTab === 'warm' ? 'apo-thep-oil' : 'apo-phet-oil'}
              shape="rect"
              fit="cover"
              placeholder={activeTab === 'warm' ? t("apothecary.alt.oil_warm") : t("apothecary.alt.oil_cool")}
            />
          </div>
        </div>

        <div className="sensory-profile">
          <span className={`sensory-profile__badge sensory-profile__badge--${activeTab}`}>
            {activeTab === 'warm' ? t("apothecary.thep.tagline") : t("apothecary.phet.tagline")}
          </span>
          <h3 className="sensory-profile__title">
            {activeTab === 'warm' ? t("home.apothecary.title_thep") : t("home.apothecary.title_phet")}
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {Array.isArray(activeNotes) && activeNotes.map(n => (
              <Tag key={n} tone={activeTab === "warm" ? "gold" : "green"}>
                {n}
              </Tag>
            ))}
          </div>

          <p className="sensory-profile__vibe">
            {activeTab === 'warm' ? t("apothecary.thep.vibe") : t("apothecary.phet.vibe")}
          </p>

          <div className="sensory-specs">
            {(Array.isArray(specs) ? specs : []).map((spec) => (
              <div className="sensory-spec-row" key={spec.label}>
                <span className="sensory-spec-label">{spec.label}</span>
                <span className="sensory-spec-val">{spec[activeTab]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

/* ---- Ritual Section ---------------------------------------------
   Three-step ritual beside the breathing guide, then the Inhale/Apply
   pair from the Grand Apothecary reference — that copy lives in
   `apothecary.app.*` and had never been rendered. -- */
const APPLICATION_CARDS = [
  { key: "inhale", slot: "apo-app-inhale" },
  { key: "apply",  slot: "apo-app-apply" },
];

function RitualSection() {
  const { t } = useLanguage();
  const steps = t("apothecary.ritual.steps");

  return (
    <section className="ritual-section reveal">
      <div className="ritual-header-block">
        <span className="apb-eyebrow" style={{ color: 'var(--basil-green-700)', display: 'block', marginBottom: '12px' }}>
          {t("apothecary.ritual.eyebrow")}
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', margin: '0 0 16px' }}>
          {t("apothecary.ritual.title")}
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
          {t("apothecary.ritual.desc")}
        </p>
      </div>

      <div className="ritual-main-grid">
        <div className="ritual-steps">
          {(Array.isArray(steps) ? steps : []).map((step) => (
            <div className="ritual-card" key={step.numeral}>
              <span className="ritual-card__num">{step.numeral}</span>
              <h3 className="ritual-card__title">{step.title}</h3>
              <p className="ritual-card__desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="ritual-interactive">
          <RespirationGuide />
        </div>
      </div>

      <div className="application-grid">
        {APPLICATION_CARDS.map(({ key, slot }) => (
          <div className="application-card" key={key}>
            <div className="application-card__media">
              <ImageSlot
                id={slot}
                shape="rect"
                fit="cover"
                placeholder={t(`apothecary.app.${key}.alt`)}
                style={{ aspectRatio: "4 / 3", minHeight: 0 }}
              />
            </div>
            <div className="application-card__cap">
              <div className="apb-eyebrow">{t(`apothecary.app.${key}.title`)}</div>
              <p>{t(`apothecary.app.${key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Editorial Crossroads ----------------------------------------- */
function EditorialCrossroads({ go }) {
  const { t } = useLanguage();
  const router = useRouter();
  
  return (
    <section className="editorial-crossroads reveal">
      <div className="crossroads-card crossroads-card--personal">
        <div>
          <span className="crossroads-card__badge">{t("apothecary.crossroads.personal.eyebrow")}</span>
          <h3 className="crossroads-card__h">{t("apothecary.crossroads.personal.title")}</h3>
          <p className="crossroads-card__b">{t("apothecary.crossroads.personal.desc")}</p>
        </div>
        <div className="crossroads-card__cta">
          <Button variant="gold" size="lg" onClick={() => router.push("/contact?inquiry=wholesale")}>
            {t("apothecary.crossroads.personal.button2")}
          </Button>
        </div>
      </div>

      <div className="crossroads-card crossroads-card--b2b">
        <div>
          <span className="crossroads-card__badge">{t("apothecary.crossroads.b2b.eyebrow")}</span>
          <h3 className="crossroads-card__h">{t("apothecary.crossroads.b2b.title")}</h3>
          <p className="crossroads-card__b">{t("apothecary.crossroads.b2b.desc")}</p>
        </div>
        <div className="crossroads-card__cta">
          <Button
            size="lg"
            style={{ background: 'var(--spring-wood-300)', color: 'var(--basil-green-900)', border: 'none' }}
            onClick={() => router.push("/contact?inquiry=corporate")}
          >
            {t("apothecary.crossroads.b2b.button")} <ArrowRight size={16} style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---- Main Page Component ----------------------------------------------- */
export default function ApothecaryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("warm"); // warm, cool

  // Scroll reveal IntersectionObserver setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const go = (id) => {
    if (id === "top") {
      router.push("/");
      return;
    }
    if (id === "story") {
      router.push("/heritage");
      return;
    }
    if (id === "collection") {
      router.push("/#collection");
      return;
    }
    if (id.startsWith("contact")) {
      router.push(`/${id}`);
      return;
    }
    // The hero section is id="top-apothecary"; without this the nav's own
    // "The Apothecary" item fell through to a getElementById("apothecary") no-op.
    if (id === "apothecary") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <div className={`portal apothecary-page apothecary-page--${activeTab}`}>
      <PortalNav go={go} />
      
      <ApothecaryHero />
      
      <SensoryShowcase activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* <RitualSection /> */}
      
      <EditorialCrossroads go={go} />
      
      <PortalFooter go={go} />
    </div>
  );
}
