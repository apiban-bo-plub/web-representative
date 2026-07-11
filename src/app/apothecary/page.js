"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

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
            <LanguageSelector />
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

/* ---- S1 Grand Exhibition ------------------------------------------- */
function Exhibition() {
  const { t } = useLanguage();
  return (
    <section className="exh" id="collection">
      <div className="exh__media">
        <ImageSlot
          id="apo-exhibition"
          shape="rect"
          fit="cover"
          placeholder="Group shot — all inhalers & oils on dark stone podiums, dramatic spotlighting"
        />
        <div className="exh__scrim" />
      </div>
      <div className="exh__inner">
        <div className="apb-eyebrow exh__eyebrow">{t("apothecary.h1_1")}</div>
        <h1 className="exh__h1">{t("apothecary.h1_2")}</h1>
        <p className="exh__sub">{t("apothecary.sub")}</p>
      </div>
    </section>
  );
}

/* ---- S2 Immersive Profiles (Z-pattern) ----------------------------- */
function Profile({ reverse, tone, slotA, slotB, phA, phB, tagline, title, notes, vibe }) {
  return (
    <div className={"prof prof--" + tone + (reverse ? " prof--rev" : "")}>
      <div className="prof__media">
        <div className="prof__shot">
          <ImageSlot
            id={slotA}
            shape="rect"
            fit="cover"
            placeholder={phA}
          />
        </div>
        <div className="prof__shot prof__shot--sm">
          <ImageSlot
            id={slotB}
            shape="rect"
            fit="cover"
            placeholder={phB}
          />
        </div>
      </div>
      <div className="prof__text">
        <div className="prof__tagline">{tagline}</div>
        <h2 className="prof__title">{title}</h2>
        <div className="prof__notes">
          {notes.map(n => (
            <Tag key={n} tone={tone === "warm" ? "gold" : "green"}>
              {n}
            </Tag>
          ))}
        </div>
        <p className="prof__vibe">{vibe}</p>
      </div>
    </div>
  );
}

function Profiles() {
  const { t } = useLanguage();
  const thepNotes = t("apothecary.thep.notes");
  const phetNotes = t("apothecary.phet.notes");
  return (
    <section className="profiles" id="apothecary">
      <Profile
        tone="warm"
        slotA="apo-thep-inhaler"
        slotB="apo-thep-oil"
        phA="Thepprasit inhaler — warm light"
        phB="Thepprasit oil bottle"
        tagline={t("apothecary.thep.tagline")}
        title={t("home.apothecary.title_thep")}
        notes={Array.isArray(thepNotes) ? thepNotes : []}
        vibe={t("apothecary.thep.vibe")}
        reverse={false}
      />
      <Profile
        tone="cool"
        reverse={true}
        slotA="apo-phet-inhaler"
        slotB="apo-phet-oil"
        phA="Phetmongkol inhaler — cool dusk light"
        phB="Phetmongkol oil bottle"
        tagline={t("apothecary.phet.tagline")}
        title={t("home.apothecary.title_phet")}
        notes={Array.isArray(phetNotes) ? phetNotes : []}
        vibe={t("apothecary.phet.vibe")}
      />
    </section>
  );
}

/* ---- S3 Art of Application ------------------------------------------ */
function Application() {
  const { t } = useLanguage();
  return (
    <section className="app-sec">
      <div className="app-sec__grid">
        <div className="app-card">
          <ImageSlot
            id="apo-app-inhale"
            shape="rect"
            fit="cover"
            placeholder="Editorial macro — hand holding the inhaler in a modern workspace"
          />
          <div className="app-card__cap">
            <div className="apb-eyebrow">{t("apothecary.app.inhale.title")}</div>
            <p>{t("apothecary.app.inhale.desc")}</p>
          </div>
        </div>
        <div className="app-card">
          <ImageSlot
            id="apo-app-apply"
            shape="rect"
            fit="cover"
            placeholder="Editorial macro — applying the Workday Oil to pulse points"
          />
          <div className="app-card__cap">
            <div className="apb-eyebrow">{t("apothecary.app.apply.title")}</div>
            <p>{t("apothecary.app.apply.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- S4 Strategic Crossroads ----------------------------------------- */
function Crossroads() {
  const { t } = useLanguage();
  return (
    <section className="cross">
      <div className="cross__grid">
        <div className="cross__card cross__card--b2c">
          <div className="apb-eyebrow" style={{ color: "var(--brand-gold)" }}>{t("apothecary.crossroads.personal.eyebrow")}</div>
          <h3 className="cross__h">{t("apothecary.crossroads.personal.title")}</h3>
          <p className="cross__b">{t("apothecary.crossroads.personal.desc")}</p>
          <div className="cross__cta">
            <Button size="lg">{t("apothecary.crossroads.personal.button1")}</Button>
            <Button size="lg" variant="secondary">{t("apothecary.crossroads.personal.button2")}</Button>
          </div>
        </div>
        <div className="cross__card cross__card--b2b">
          <div className="apb-eyebrow" style={{ color: "var(--spring-wood-300)" }}>{t("apothecary.crossroads.b2b.eyebrow")}</div>
          <h3 className="cross__h cross__h--light">{t("apothecary.crossroads.b2b.title")}</h3>
          <p className="cross__b cross__b--light">{t("apothecary.crossroads.b2b.desc")}</p>
          <div className="cross__cta">
            <Button size="lg" variant="secondary" style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }}>{t("apothecary.crossroads.b2b.button")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Main Page Component ----------------------------------------------- */
export default function App() {
  const router = useRouter();
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
    <div className="portal apothecary-page">
      <PortalNav go={go} />
      <Exhibition />
      <Profiles />
      <Application />
      <Crossroads />
      <PortalFooter />
    </div>
  );
}
