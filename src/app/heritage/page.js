"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
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
  return (
    <section className="hintro" id="top-heritage">
      <div className="apb-eyebrow hintro__eyebrow">The Heritage</div>
      <h1 className="hintro__h1">Chronicles of the<br/>Red Book</h1>
      <p className="hintro__sub">A quiet museum of one family's 150-year dialogue with nature — scroll to walk through it.</p>
    </section>
  );
}

/* ---- Final CTA ------------------------------------------------------ */
function HeritageFinale({ go }) {
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
        <h2 className="hfin__h">From the Archive<br/>to Your Pocket.</h2>
        <Button size="lg" onClick={() => go("apothecary")}>Explore the Apothecary Collection</Button>
      </div>
    </section>
  );
}

/* ---- Main Page Component ------------------------------------------ */
export default function App() {
  const router = useRouter();
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
        kicker="The Discovery"
        slotId="heritage-discovery"
        ph="Macro shot — The Red Book, antique paper texture"
        headline="150 Years in the Shadows."
        body="It began with a single, crimson-bound volume. A 19th-century medical journal belonging to Khun Apiban Bo Plup (APB), a sanitation officer during the transformative reign of King Rama V. Within its weathered pages lay a forgotten dialogue between nature and the human spirit—a collection of botanical rituals used to maintain the balance of life."
        reverse={false}
      />
      <Chapter
        id="guardian"
        index="02"
        kicker="The Guardian"
        slotId="heritage-guardian"
        reverse={true}
        ph="Historical portrait or Old Songkhla city view"
        headline="The Visionary of Old Songkhla."
        body="Khun Apiban Bo Plup was more than a practitioner; he was a guardian of wellness in an era of change. As a public health pioneer in Old Town Songkhla, he understood that true restoration comes from the harmony of the senses. His “Red Book” was not just a record of herbs, but a map to self-healing—a practice where one takes the power of well-being into their own hands."
      />
      <Chapter
        id="philosophy"
        index="03"
        kicker="Philosophy"
        slotId="heritage-philosophy"
        ph="Raw Thai herbs, dramatic lighting"
        headline="Ancient Wisdom for the Modern Soul."
        body="In the 19th century, self-care was an intuitive ritual. Today, we bring that intuition back. We believe that the modern fast-paced world needs the slow, deliberate magic of ancestral Thai botanicals. Our philosophy is simple: Modern Rituals rooted in Ancient Truths. We provide the tools; you perform the ritual."
        reverse={false}
      />
      <Chapter
        id="collective"
        index="04"
        kicker="The Collective"
        slotId="heritage-collective"
        reverse={true}
        ph="Songkhla family portraits / behind-the-scenes"
        headline="A Legacy Reborn Through Family."
        body="APB is not a solo journey. It is a collaborative revival by the descendants of the Songkhla family. Uniting multiple households, we have come together to breathe life into our ancestor's archives. Each bottle is a testament to our family's shared commitment to preserving our artisanal heritage and sharing it with a global generation."
      />
      <HeritageFinale go={go} />
      <PortalFooter />
    </div>
  );
}
