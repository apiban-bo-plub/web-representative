"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollText, Sparkles, Users } from 'lucide-react';
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

/* ---- Nav ---------------------------------------------------------- */
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

/* ---- S1 Hero ------------------------------------------------------ */
function Hero({ go }) {
  const { t } = useLanguage();
  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
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

/* ---- S1.5 Prestige marquee --------------------------------------- */
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

/* ---- S2 Pillars --------------------------------------------------- */
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

/* ---- S3 Red Book -------------------------------------------------- */
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

/* ---- S4 Apothecary 50/50 ----------------------------------------- */
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

/* ---- S4.5 Gallery -------------------------------------------------- */
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

/* ---- S5 Continuum ------------------------------------------------- */
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

/* ---- Footer ------------------------------------------------------- */
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

/* ---- Main Page Component ------------------------------------------ */
export default function App() {
  const router = useRouter();
  const go = (id) => {
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "story") {
      router.push("/heritage");
      return;
    }
    if (id === "apothecary") {
      router.push("/apothecary");
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };
  return (
    <div className="portal">
      <PortalNav go={go} />
      <Hero go={go} />
      <Prestige />
      <Pillars />
      <RedBook go={go} />
      <Apothecary go={go} />
      <Gallery />
      <Continuum />
      <PortalFooter />
    </div>
  );
}
