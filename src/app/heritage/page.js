"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ArrowRight } from 'lucide-react';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
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

/* ---- Museum chapter: image one side, text the other, alternating -- */
function TimelineChapter({ index, kicker, headline, body, slotId, ph, reverse }) {
  return (
    <div className={`timeline-chapter ${reverse ? 'timeline-chapter--rev' : ''} reveal`}>
      <div className="timeline-node"></div>
      <div className="museum-media-wrapper">
        <div className="museum-frame-corner museum-frame-corner--tl"></div>
        <div className="museum-frame-corner museum-frame-corner--tr"></div>
        <div className="museum-frame-corner museum-frame-corner--bl"></div>
        <div className="museum-frame-corner museum-frame-corner--br"></div>
        <div className="museum-media">
          <ImageSlot
            id={slotId}
            shape="rect"
            fit="cover"
            placeholder={ph}
          />
        </div>
      </div>
      <div className="museum-card paper-texture">
        <div className="museum-card__frame">
          <span className="museum-card__badge">{kicker}</span>
          <span className="museum-card__num">{index}</span>
          <h2 className="museum-card__title">{headline}</h2>
          <div className="museum-card__divider"></div>
          <p className="museum-card__body">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ---- Museum intro band --------------------------------------------- */
function HeritageHero() {
  const { t } = useLanguage();
  return (
    <section className="heritage-hero reveal paper-texture" id="top-heritage">
      <div className="heritage-hero__glow"></div>
      <img className="heritage-hero__crest" src="/images/motif.svg" alt="" />
      <div className="apb-eyebrow" style={{ color: 'var(--basil-green-700)', marginBottom: '16px', letterSpacing: '0.15em' }}>{t("heritage.kicker")}</div>
      <h1 className="heritage-hero__title">
        {t("heritage.h1_1")}<br/>
        {t("heritage.h1_2")}
      </h1>
      <p className="heritage-hero__sub">{t("heritage.sub")}</p>
      <div className="heritage-hero__botanical-accent"></div>
    </section>
  );
}

/* ---- Archives Section --------------------------------------------- */
function ArchivesSection() {
  const { t } = useLanguage();
  
  return (
    <section className="archive-section reveal paper-texture">
      <div className="archive-inner">
        <h2 className="archive-title">{t("heritage.archives.title")}</h2>
        <p className="archive-desc">{t("heritage.archives.desc")}</p>
        
        <div className="accordion-group">
          {/* Section 1 */}
          <details className="premium-details" name="red-book-recipes" open>
            <summary className="premium-summary">
              <span className="premium-summary__text">
                <span className="premium-summary__num">01 /</span> {t("heritage.archives.recipe1.title")}
              </span>
              <span className="premium-summary__icon">
                <ChevronDown size={18} />
              </span>
            </summary>
            <div className="premium-details__content">
              <div className="ledger-grid">
                <div className="ledger-info">
                  <h4 className="ledger-section-title">Ingredients & Proportions</h4>
                  <table className="ledger-table">
                    <tbody>
                      <tr>
                        <td>Camphor (การบูร)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">30%</td>
                      </tr>
                      <tr>
                        <td>Borneol (พิมเสน)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">25%</td>
                      </tr>
                      <tr>
                        <td>Menthol (เกล็ดสะระแหน่)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">20%</td>
                      </tr>
                      <tr>
                        <td>14 Sun-Dried Herbs (สมุนไพร 14 ชนิด)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">25%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="ledger-desc">{t("heritage.archives.recipe1.body")}</p>
                </div>
                <div className="ledger-visual">
                  <div className="botanical-sketch">
                    <svg viewBox="0 0 120 120" className="sketch-svg">
                      {/* Detailed Clove & Leaves sketch */}
                      <path d="M 60 110 C 60 110, 60 70, 65 60 C 70 50, 85 45, 95 45 C 95 45, 80 55, 75 70 C 72 80, 68 100, 68 110" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      <path d="M 60 85 C 60 85, 55 60, 42 50 C 30 40, 20 45, 15 50 C 15 50, 30 55, 38 68 C 45 80, 50 90, 52 100" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      {/* Clove buds */}
                      <circle cx="65" cy="40" r="4" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      <path d="M 61 40 L 61 50 M 69 40 L 69 50" stroke="var(--spring-wood-700)" strokeWidth="0.8" />
                      <path d="M 65 36 C 63 32, 67 32, 65 36 Z" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      <circle cx="58" cy="45" r="3" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <div className="ledger-notes">
                    <span className="ledger-notes__label">Guardian's Note:</span>
                    <p className="ledger-notes__script">
                      "Dry the blossoms for three noon phases until they release their light soul. Blend with oil in unglazed clay."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Section 2 */}
          <details className="premium-details" name="red-book-recipes">
            <summary className="premium-summary">
              <span className="premium-summary__text">
                <span className="premium-summary__num">02 /</span> {t("heritage.archives.recipe2.title")}
              </span>
              <span className="premium-summary__icon">
                <ChevronDown size={18} />
              </span>
            </summary>
            <div className="premium-details__content">
              <div className="ledger-grid">
                <div className="ledger-info">
                  <h4 className="ledger-section-title">Ingredients & Infusion Details</h4>
                  <table className="ledger-table">
                    <tbody>
                      <tr>
                        <td>Lemongrass Stalks (ตะไคร้หอม)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">Aromatics</td>
                      </tr>
                      <tr>
                        <td>Fresh Kaffir Lime Zest (ผิวมะกรูด)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">Citrus base</td>
                      </tr>
                      <tr>
                        <td>Plai Root (เหง้าไพล)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">Anti-inflammatory</td>
                      </tr>
                      <tr>
                        <td>Cold-Pressed Coconut Oil (น้ำมันมะพร้าว)</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">Carrier medium</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="ledger-desc">{t("heritage.archives.recipe2.body")}</p>
                </div>
                <div className="ledger-visual">
                  <div className="botanical-sketch">
                    <svg viewBox="0 0 120 120" className="sketch-svg">
                      {/* Lemongrass stalks & Lime sketch */}
                      {/* Lime */}
                      <circle cx="45" cy="75" r="18" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" strokeDasharray="1,1" />
                      <path d="M 45 57 C 42 55, 48 55, 45 57" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      {/* Lemongrass stalks */}
                      <path d="M 75 110 L 95 30 M 70 110 L 90 20 M 80 110 L 105 40" stroke="var(--spring-wood-700)" strokeWidth="0.8" />
                      <path d="M 73 90 C 76 80, 84 82, 88 78" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <div className="ledger-notes">
                    <span className="ledger-notes__label">Guardian's Note:</span>
                    <p className="ledger-notes__script">
                      "Age the infusion under shelter for thirty-three days to allow the earth properties to stabilize."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Section 3 */}
          <details className="premium-details" name="red-book-recipes">
            <summary className="premium-summary">
              <span className="premium-summary__text">
                <span className="premium-summary__num">03 /</span> {t("heritage.archives.recipe3.title")}
              </span>
              <span className="premium-summary__icon">
                <ChevronDown size={18} />
              </span>
            </summary>
            <div className="premium-details__content">
              <div className="ledger-grid">
                <div className="ledger-info">
                  <h4 className="ledger-section-title">Core Principles</h4>
                  <table className="ledger-table">
                    <tbody>
                      <tr>
                        <td>Tenet I</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">No Synthetic Enhancers</td>
                      </tr>
                      <tr>
                        <td>Tenet II</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">Lunar Cycle Gathering</td>
                      </tr>
                      <tr>
                        <td>Tenet III</td>
                        <td className="ledger-dots"></td>
                        <td className="ledger-val">Cognitive-Physical Bridge</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="ledger-desc">{t("heritage.archives.recipe3.body")}</p>
                </div>
                <div className="ledger-visual">
                  <div className="botanical-sketch">
                    <svg viewBox="0 0 120 120" className="sketch-svg">
                      {/* Mortar & Pestle sketch */}
                      <path d="M 30 70 C 30 95, 90 95, 90 70 C 90 60, 30 60, 30 70 Z" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      <path d="M 35 70 C 35 85, 85 85, 85 70" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                      <path d="M 50 35 L 75 75" stroke="var(--spring-wood-700)" strokeWidth="0.8" />
                      <path d="M 45 40 L 70 80" stroke="var(--spring-wood-700)" strokeWidth="0.8" />
                      <path d="M 45 40 C 42 36, 52 32, 50 35 Z" stroke="var(--spring-wood-700)" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <div className="ledger-notes">
                    <span className="ledger-notes__label">Guardian's Note:</span>
                    <p className="ledger-notes__script">
                      "The breath is the first gate of wellness. Cleanse it, and the spirit shall follow."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

/* ---- Final CTA ------------------------------------------------------ */
function HeritageFinale({ go }) {
  const { t } = useLanguage();
  return (
    <section className="hfin reveal">
      <div className="hfin__media">
        <ImageSlot
          id="heritage-finale"
          shape="rect"
          fit="cover"
          placeholder="Fusion shot — the Red Book beside modern product packaging"
        />
        <div className="hfin__scrim" />
      </div>
      <div className="hfin__panel">
        <img className="hfin__mark" src="/images/motif.svg" alt="" />
        <h2 className="hfin__h">
          {t("heritage.finale.title_1")}<br/>
          {t("heritage.finale.title_2")}
        </h2>
        <Button size="lg" onClick={() => go("apothecary")}>
          {t("heritage.finale.button")} <ArrowRight size={16} style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
        </Button>
      </div>
    </section>
  );
}

/* ---- Main Page Component ------------------------------------------ */
export default function HeritagePage() {
  const router = useRouter();
  const { t } = useLanguage();

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
    if (id === "apothecary") {
      router.push("/apothecary");
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
    <div className="portal heritage">
      <PortalNav go={go} />
      
      <HeritageHero />

      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        <TimelineChapter
          index="01"
          kicker={t("heritage.c1.kicker")}
          slotId="heritage-discovery"
          ph="Macro shot — The Red Book, antique paper texture"
          headline={t("heritage.c1.headline")}
          body={t("heritage.c1.body")}
          reverse={false}
        />
        
        <TimelineChapter
          index="02"
          kicker={t("heritage.c2.kicker")}
          slotId="heritage-guardian"
          reverse={true}
          ph="Historical portrait or Old Songkhla city view"
          headline={t("heritage.c2.headline")}
          body={t("heritage.c2.body")}
        />
        
        <TimelineChapter
          index="03"
          kicker={t("heritage.c3.kicker")}
          slotId="heritage-philosophy"
          ph="Raw Thai herbs, dramatic lighting"
          headline={t("heritage.c3.headline")}
          body={t("heritage.c3.body")}
          reverse={false}
        />
        
        <TimelineChapter
          index="04"
          kicker={t("heritage.c4.kicker")}
          slotId="heritage-collective"
          reverse={true}
          ph="Songkhla family portraits / behind-the-scenes"
          headline={t("heritage.c4.headline")}
          body={t("heritage.c4.body")}
        />
      </div>

      <ArchivesSection />

      <HeritageFinale go={go} />
      
      <PortalFooter />
    </div>
  );
}
