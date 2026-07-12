"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Moon, Sun, Wind } from 'lucide-react';

import Logo from '@/components/brand/Logo';
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

/* ---- Footer (identical to Portal Page) ------------------------------ */
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

/* ---- Apothecary Hero ------------------------------------------- */
function ApothecaryHero() {
  const { t } = useLanguage();
  return (
    <section className="apothecary-hero reveal" id="top-apothecary">
      <div className="apothecary-hero__bg" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
      <div className="apothecary-hero__scrim" />
      <div className="apothecary-hero__inner">
        <div className="apb-eyebrow apothecary-hero__eyebrow">{t("apothecary.h1_1")}</div>
        <h1 className="apothecary-hero__h1">{t("apothecary.h1_2")}</h1>
        <p className="apothecary-hero__sub">{t("apothecary.sub")}</p>
      </div>
    </section>
  );
}

/* ---- Botanical Matrix Data --------------------------------------- */
const BOTANICALS_DATA = {
  warm: [
    {
      id: "kaffir-lime",
      name: "Citrus bergamia (Kaffir Lime)",
      thaiName: "ผิวมะกรูด",
      role: "Solar Uplift",
      origin: "Songkhla Highlands",
      process: "Cold-press peel extraction",
      benefit: "Clears respiratory passages, promotes alert mental focus, and calms emotional tension.",
      sketch: (
        <svg viewBox="0 0 100 100" className="matrix-sketch-svg">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
          <path d="M 50 20 Q 40 35 50 50 Q 60 35 50 20 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <circle cx="50" cy="42" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "clove",
      name: "Syzygium aromaticum (Clove)",
      thaiName: "กานพลู",
      role: "Thermal Depth",
      origin: "Southern Plantations",
      process: "Steam-distilled flower buds",
      benefit: "Provides warming depth, eases physical fatigue, and acts as an organic air purifier.",
      sketch: (
        <svg viewBox="0 0 100 100" className="matrix-sketch-svg">
          <path d="M 50 85 L 50 45" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 45 45 C 45 35, 55 35, 55 45 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <circle cx="50" cy="35" r="7" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 45 35 L 55 35 M 50 30 L 50 40" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      )
    },
    {
      id: "cinnamon",
      name: "Cinnamomum verum (Cinnamon)",
      thaiName: "อบเชย",
      role: "Spiced Grounding",
      origin: "Ancient Forest Wilds",
      process: "Sun-cured bark infusion",
      benefit: "Stimulates cognitive focus, delivers a comforting aroma, and targets mental lethargy.",
      sketch: (
        <svg viewBox="0 0 100 100" className="matrix-sketch-svg">
          <rect x="38" y="25" width="24" height="55" rx="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 44 25 L 44 80 M 50 25 L 50 80 M 56 25 L 56 80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,1" />
        </svg>
      )
    }
  ],
  cool: [
    {
      id: "jasmine",
      name: "Jasminum sambac (Jasmine)",
      thaiName: "มะลิลา",
      role: "Lunar Soothing",
      origin: "Songkhla Smallholds",
      process: "Night-harvest extraction",
      benefit: "Soothes the central nervous system, relieves restlessness, and brings peace to the spirit.",
      sketch: (
        <svg viewBox="0 0 100 100" className="matrix-sketch-svg">
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <path d="M 50 40 C 45 25, 55 25, 50 40 Z M 50 60 C 45 75, 55 75, 50 60 Z M 40 50 C 25 45, 25 55, 40 50 Z M 60 50 C 75 45, 75 55, 60 50 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </svg>
      )
    },
    {
      id: "ylang-ylang",
      name: "Cananga odorata (Ylang-Ylang)",
      thaiName: "กระดังงา",
      role: "Ethereal Release",
      origin: "Coastal Ranong Groves",
      process: "Fractional distillation",
      benefit: "Reduces acute heart rate responses to stress, slows hyperventilation, and melts fatigue.",
      sketch: (
        <svg viewBox="0 0 100 100" className="matrix-sketch-svg">
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <path d="M 50 47 Q 35 30 50 15 Q 65 30 50 47 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 50 53 Q 35 70 50 85 Q 65 70 50 53 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 47 50 Q 30 35 15 50 Q 30 65 47 50 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 53 50 Q 70 35 85 50 Q 70 65 53 50 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </svg>
      )
    },
    {
      id: "patchouli",
      name: "Pogostemon cablin (Patchouli)",
      thaiName: "พิมเสนใบ",
      role: "Earthy Anchor",
      origin: "Evergreen Foothills",
      process: "Shade-cured leaf steam",
      benefit: "Provides a dark woody baseline, grounds overactive thoughts, and stabilizes vital energy.",
      sketch: (
        <svg viewBox="0 0 100 100" className="matrix-sketch-svg">
          <path d="M 50 90 L 50 15 M 50 25 L 30 45 L 50 50 L 70 45 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 50 50 L 35 65 L 50 70 L 65 65 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </svg>
      )
    }
  ]
};

/* ---- Breathing Guide Component ----------------------------------- */
function RespirationGuide() {
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

  const getPhaseText = () => {
    switch (phase) {
      case "inhale": return "Inhale Slowly";
      case "holdIn": return "Hold Breath";
      case "exhale": return "Exhale Softly";
      case "holdOut": return "Hold Empty";
      default: return "Tap to Begin";
    }
  };

  return (
    <div className="respiration-tool paper-texture">
      <div 
        className={`respiration-orb-container respiration-orb-container--${phase}`}
        onClick={() => setActive(!active)}
      >
        <div className="respiration-orb-outer"></div>
        <div className="respiration-orb-middle"></div>
        <div className="respiration-orb-inner">
          <Wind size={24} className="respiration-orb-icon" />
          <span className="respiration-orb-countdown">{active ? `${countdown}s` : ""}</span>
        </div>
      </div>
      <div className="respiration-tool-label">
        <h4 className="respiration-tool-title">{getPhaseText()}</h4>
        <p className="respiration-tool-desc">
          {active 
            ? "Sync your breath with the expanding rhythm to open your sensory olfactory gates." 
            : "Engage the pranayama breath trainer to elevate your apothecary ritual experience."
          }
        </p>
      </div>
    </div>
  );
}

/* ---- Sensory Showcase --------------------------------------------- */
function SensoryShowcase({ activeTab, setActiveTab }) {
  const { t } = useLanguage();
  const [selectedBotanical, setSelectedBotanical] = useState(null);

  const activeNotes = activeTab === "warm" 
    ? t("apothecary.thep.notes") 
    : t("apothecary.phet.notes");

  // Automatically reset selected botanical when tab changes
  useEffect(() => {
    setSelectedBotanical(BOTANICALS_DATA[activeTab][0]);
  }, [activeTab]);

  return (
    <section className="sensory-section reveal">
      <div className="sensory-title-block">
        <span className="apb-eyebrow" style={{ color: 'var(--basil-green-700)', display: 'block', marginBottom: '12px' }}>
          Sensory Exploration
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', margin: 0 }}>
          {activeTab === "warm" ? "The Solar Awakening" : "The Lunar Restorative"}
        </h2>
      </div>

      <div className="sensory-tabs">
        <button
          className={`sensory-tab-btn ${activeTab === 'warm' ? 'sensory-tab-btn--active-warm' : ''}`}
          onClick={() => setActiveTab("warm")}
        >
          {t("home.apothecary.title_thep")} (Warm)
        </button>
        <button
          className={`sensory-tab-btn ${activeTab === 'cool' ? 'sensory-tab-btn--active-cool' : ''}`}
          onClick={() => setActiveTab("cool")}
        >
          {t("home.apothecary.title_phet")} (Cool)
        </button>
      </div>

      <div className={`sensory-content-box ${activeTab === 'cool' ? 'sensory-content-box--rev' : ''}`}>
        <div className="sensory-gallery">
          <div className="sensory-gallery__img">
            <ImageSlot
              id={activeTab === 'warm' ? 'apo-thep-inhaler' : 'apo-phet-inhaler'}
              shape="rect"
              fit="cover"
              placeholder={activeTab === 'warm' ? 'Thepprasit Inhaler' : 'Phetmongkol Inhaler'}
            />
          </div>
          <div className="sensory-gallery__img">
            <ImageSlot
              id={activeTab === 'warm' ? 'apo-thep-oil' : 'apo-phet-oil'}
              shape="rect"
              fit="cover"
              placeholder={activeTab === 'warm' ? 'Thepprasit Oil' : 'Phetmongkol Oil'}
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
          <p className="sensory-profile__vibe">
            {activeTab === 'warm' ? t("apothecary.thep.vibe") : t("apothecary.phet.vibe")}
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {Array.isArray(activeNotes) && activeNotes.map(n => (
              <Tag key={n} tone={activeTab === "warm" ? "gold" : "green"}>
                {n}
              </Tag>
            ))}
          </div>

          <div className="sensory-specs">
            <div className="sensory-spec-row">
              <span className="sensory-spec-label">Aromatic Profile</span>
              <span className="sensory-spec-val">
                {activeTab === 'warm' ? 'Citrus, Camphoraceous, Warm Spice' : 'Sweet White Floral, Herbaceous, Cool Breeze'}
              </span>
            </div>
            <div className="sensory-spec-row">
              <span className="sensory-spec-label">Key Botanicals</span>
              <span className="sensory-spec-val">
                {activeTab === 'warm' ? 'Citrus bergamia, Syzygium aromaticum, Cinnamon' : 'Jasminum sambac, Cananga odorata, Patchouli'}
              </span>
            </div>
            <div className="sensory-spec-row">
              <span className="sensory-spec-label">Optimal Hour</span>
              <span className="sensory-spec-val">
                {activeTab === 'warm' ? '09:00 AM – 02:00 PM (Focus & Focus Peaks)' : '06:00 PM – 11:00 PM (Sunset Wind-down)'}
              </span>
            </div>
            <div className="sensory-spec-row">
              <span className="sensory-spec-label">Energetic Effect</span>
              <span className="sensory-spec-val">
                {activeTab === 'warm' ? 'Cognitive awakening, focus booster' : 'Nervous system soothing, calm inducer'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensory Botanical Matrix Interactivity */}
      <div className="botanical-matrix-wrapper">
        <h3 className="botanical-matrix-title">Active Botanical Matrix</h3>
        <p className="botanical-matrix-desc">Select an ingredient to reveal its ancestral origin and therapeutic extraction process.</p>
        
        <div className="botanical-matrix-grid">
          <div className="botanical-swatches">
            {BOTANICALS_DATA[activeTab].map((botanical) => (
              <button
                key={botanical.id}
                className={`botanical-swatch-btn ${selectedBotanical?.id === botanical.id ? 'botanical-swatch-btn--active' : ''}`}
                onClick={() => setSelectedBotanical(botanical)}
              >
                <div className="botanical-swatch-sketch">
                  {botanical.sketch}
                </div>
                <div className="botanical-swatch-text">
                  <span className="botanical-swatch-role">{botanical.role}</span>
                  <span className="botanical-swatch-name">{botanical.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="botanical-detail-card paper-texture">
            {selectedBotanical ? (
              <div className="botanical-detail-content">
                <div className="botanical-detail-header">
                  <div>
                    <span className="botanical-detail-thai">{selectedBotanical.thaiName}</span>
                    <h4 className="botanical-detail-name">{selectedBotanical.name}</h4>
                  </div>
                  <span className="botanical-detail-tag">{selectedBotanical.role}</span>
                </div>
                <div className="botanical-detail-divider"></div>
                <div className="botanical-detail-rows">
                  <div className="botanical-detail-row">
                    <span className="botanical-detail-lbl">Origin:</span>
                    <span className="botanical-detail-val">{selectedBotanical.origin}</span>
                  </div>
                  <div className="botanical-detail-row">
                    <span className="botanical-detail-lbl">Extraction:</span>
                    <span className="botanical-detail-val">{selectedBotanical.process}</span>
                  </div>
                  <div className="botanical-detail-row">
                    <span className="botanical-detail-lbl">Wellness Benefit:</span>
                    <span className="botanical-detail-val">{selectedBotanical.benefit}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="botanical-detail-empty">
                Select a botanical swatch on the left to read details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Ritual Section --------------------------------------------- */
function RitualSection() {
  const { t } = useLanguage();
  return (
    <section className="ritual-section reveal">
      <div className="ritual-header-block">
        <span className="apb-eyebrow" style={{ color: 'var(--basil-green-700)', display: 'block', marginBottom: '12px' }}>
          Daily Application
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', margin: '0 0 16px' }}>
          The Art of the Ritual
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
          Transform simple application into an intentional moment of self-restoration. Blend our formulas with three conscious steps.
        </p>
      </div>

      <div className="ritual-main-grid">
        <div className="ritual-steps">
          <div className="ritual-card">
            <span className="ritual-card__num">I</span>
            <h3 className="ritual-card__title">Prepare & Centering</h3>
            <p className="ritual-card__desc">
              Cleanse your sensory field. Sit upright, drop your shoulders, and close your eyes. Take one deep breath to reset your system.
            </p>
          </div>

          <div className="ritual-card">
            <span className="ritual-card__num">II</span>
            <h3 className="ritual-card__title">Deep Inhalation</h3>
            <p className="ritual-card__desc">
              Hold the pocket herbal inhaler one inch below the nose. Inhale slowly through the diaphragm for 4 seconds, hold for 4, and release.
            </p>
          </div>

          <div className="ritual-card">
            <span className="ritual-card__num">III</span>
            <h3 className="ritual-card__title">Dermal Application</h3>
            <p className="ritual-card__desc">
              Glide the cooling herb oil onto your temples and pulse points. Massage in small circles, letting your body heat release the botanicals.
            </p>
          </div>
        </div>
        
        <div className="ritual-interactive">
          <RespirationGuide />
        </div>
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
          <Button variant="gold" size="lg" onClick={() => router.push("/shop")}>
            {t("apothecary.crossroads.personal.button1")}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => router.push("/shop?inquiry=stores")}>
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
            onClick={() => router.push("/shop?inquiry=corporate")}
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
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <div className={`portal apothecary-page apothecary-page--${activeTab}`}>
      <PortalNav go={go} />
      
      <ApothecaryHero />
      
      <SensoryShowcase activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <RitualSection />
      
      <EditorialCrossroads go={go} />
      
      <PortalFooter />
    </div>
  );
}
