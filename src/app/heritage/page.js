"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

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
        <span className="pn__link" style={{ cursor: 'pointer' }}>{t("nav.search")}</span>
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
          <div className="pn__drawerLink" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <span>{t("nav.search")}</span>
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

/* ---- Museum chapter: image one side, text the other, alternating -- */
function Chapter({ id, index, kicker, headline, body, slotId, ph, cta, reverse }) {
  return (
    <section className={"chapter" + (reverse ? " chapter--rev" : "")} id={id}>
      <div className="chapter__media">
        <ImageSlot
          id={slotId}
          shape="rect"
          fit="cover"
          placeholder={ph}
        />
        <div className="chapter__mediaScrim" />
      </div>
      <div className="chapter__text">
        <div className="chapter__index">{index}</div>
        <div className="apb-eyebrow chapter__kicker">{kicker}</div>
        <h2 className="chapter__h">{headline}</h2>
        <p className="chapter__b">{body}</p>
        {cta}
      </div>
    </section>
  );
}

/* ---- Museum intro band --------------------------------------------- */
function HeritageIntro() {
  const { t } = useLanguage();
  return (
    <section className="hintro" id="top-heritage">
      <div className="apb-eyebrow hintro__eyebrow">{t("heritage.kicker")}</div>
      <h1 className="hintro__h1">
        {t("heritage.h1_1")}<br/>
        {t("heritage.h1_2")}
      </h1>
      <p className="hintro__sub">{t("heritage.sub")}</p>
    </section>
  );
}

/* ---- Final CTA ------------------------------------------------------ */
function HeritageFinale({ go }) {
  const { t } = useLanguage();
  return (
    <section className="hfin">
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
        <Button size="lg" onClick={() => go("apothecary")}>{t("heritage.finale.button")}</Button>
      </div>
    </section>
  );
}

/* ---- Main Page Component ------------------------------------------ */
export default function App() {
  const router = useRouter();
  const { t } = useLanguage();
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
      <HeritageIntro />
      <Chapter
        id="discovery"
        index="01"
        kicker={t("heritage.c1.kicker")}
        slotId="heritage-discovery"
        ph="Macro shot — The Red Book, antique paper texture"
        headline={t("heritage.c1.headline")}
        body={t("heritage.c1.body")}
        reverse={false}
      />
      <Chapter
        id="guardian"
        index="02"
        kicker={t("heritage.c2.kicker")}
        slotId="heritage-guardian"
        reverse={true}
        ph="Historical portrait or Old Songkhla city view"
        headline={t("heritage.c2.headline")}
        body={t("heritage.c2.body")}
      />
      <Chapter
        id="philosophy"
        index="03"
        kicker={t("heritage.c3.kicker")}
        slotId="heritage-philosophy"
        ph="Raw Thai herbs, dramatic lighting"
        headline={t("heritage.c3.headline")}
        body={t("heritage.c3.body")}
        reverse={false}
      />
      <Chapter
        id="collective"
        index="04"
        kicker={t("heritage.c4.kicker")}
        slotId="heritage-collective"
        reverse={true}
        ph="Songkhla family portraits / behind-the-scenes"
        headline={t("heritage.c4.headline")}
        body={t("heritage.c4.body")}
      />
      <HeritageFinale go={go} />
      <PortalFooter />
    </div>
  );
}
