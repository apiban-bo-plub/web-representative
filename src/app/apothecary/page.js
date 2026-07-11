"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import ImageSlot from '@/components/ImageSlot';

/* ---- Nav (identical to Portal Page) -------------------------------- */
function PortalNav({ go }) {
  const [open, setOpen] = useState(false);
  const L = (id, t, extra) => (
    <a
      onClick={() => {
        go(id);
        setOpen(false);
      }}
      className={"pn__link " + (extra || "")}
      style={{ cursor: 'pointer' }}
    >
      {t}
    </a>
  );
  return (
    <header className="pn">
      <nav className="pn__side">
        {L("collection", "Collection")}
        {L("story", "Heritage")}
        {L("apothecary", "The Apothecary")}
      </nav>
      <a onClick={() => go("top")} className="pn__logo" style={{ cursor: 'pointer' }}>
        <Logo width={150} />
      </a>
      <div className="pn__side pn__side--right">
        <span className="pn__link" style={{ cursor: 'pointer' }}>Search</span>
      </div>
      <button className="pn__burger" aria-label="Menu" onClick={() => setOpen(v => !v)}>
        <span></span><span></span><span></span>
      </button>
      {open && (
        <div className="pn__drawer">
          {L("collection", "Collection", "pn__drawerLink")}
          {L("story", "Heritage", "pn__drawerLink")}
          {L("apothecary", "The Apothecary", "pn__drawerLink")}
          <a className="pn__link pn__drawerLink" onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}>
            Search
          </a>
        </div>
      )}
    </header>
  );
}

/* ---- Footer (identical to Portal Page) ------------------------------ */
function PortalFooter() {
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
          <p className="pf__blurb">Heritage Thai apothecary. Herbal self-care rituals, crafted in Songkhla.</p>
        </div>
        {col("Explore", ["Collection", "The Red Book", "Heritage", "Journal"])}
        {col("Company", ["Our story", "Stockists", "Corporate & gifting", "Contact"])}
        {col("Connect", ["@ApibanAPB", "LINE @apibanapb", "apibanapb@gmail.com"])}
      </div>
      <div className="pf__base">
        <span>© 2024 Apiban Bo Plup. Product of Songkhla, Thailand.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}

/* ---- S1 Grand Exhibition ------------------------------------------- */
function Exhibition() {
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
        <div className="apb-eyebrow exh__eyebrow">The Grand Apothecary</div>
        <h1 className="exh__h1">Ancient Wisdom,<br/>Modern Rituals.</h1>
        <p className="exh__sub">Discover our artisanal collection. Rooted in the 150-year-old archive of Khun Apiban Bo Plup, each formula is crafted to bring balance to your daily life. Choose your ritual.</p>
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
  return (
    <section className="profiles" id="apothecary">
      <Profile
        tone="warm"
        slotA="apo-thep-inhaler"
        slotB="apo-thep-oil"
        phA="Thepprasit inhaler — warm light"
        phB="Thepprasit oil bottle"
        tagline="The Awakener"
        title="THEPPRASIT"
        notes={["Thai Bergamot", "Clove", "Warm"]}
        vibe="For days that demand clarity. A bold citrus symphony designed to refresh the mind and awaken your senses."
        reverse={false}
      />
      <Profile
        tone="cool"
        reverse={true}
        slotA="apo-phet-inhaler"
        slotB="apo-phet-oil"
        phA="Phetmongkol inhaler — cool dusk light"
        phB="Phetmongkol oil bottle"
        tagline="The Restorer"
        title="PHETMONGKOL"
        notes={["Jasmine", "Ylang-Ylang", "Water Jasmine"]}
        vibe="For moments of exhaustion. A delicate floral embrace crafted to soothe the spirit and bring inner calm."
      />
    </section>
  );
}

/* ---- S3 Art of Application ------------------------------------------ */
function Application() {
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
            <div className="apb-eyebrow">Inhale</div>
            <p>Keep it close. Perfect for your pocket, workspace, or bedside.</p>
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
            <div className="apb-eyebrow">Apply</div>
            <p>Roll the Workday Oil on pulse points or temples for instant serenity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- S4 Strategic Crossroads ----------------------------------------- */
function Crossroads() {
  return (
    <section className="cross">
      <div className="cross__grid">
        <div className="cross__card cross__card--b2c">
          <div className="apb-eyebrow" style={{ color: "var(--brand-gold)" }}>Personal Rituals</div>
          <h3 className="cross__h">Bring the Wisdom Home.</h3>
          <p className="cross__b">Elevate your daily routine with the APB collection.</p>
          <div className="cross__cta">
            <Button size="lg">Shop on Shopee</Button>
            <Button size="lg" variant="secondary">Find us in Stores</Button>
          </div>
        </div>
        <div className="cross__card cross__card--b2b">
          <div className="apb-eyebrow" style={{ color: "var(--spring-wood-300)" }}>The Artifact of Choice</div>
          <h3 className="cross__h cross__h--light">Share the Legacy.</h3>
          <p className="cross__b cross__b--light">Trusted by embassies, consulates, and premium corporate clients. Our collection is the perfect meaningful gift for global distribution, hospitality amenities, weddings, and life's significant milestones.</p>
          <div className="cross__cta">
            <Button size="lg" variant="secondary" style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }}>Corporate &amp; Gifting Inquiries</Button>
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
