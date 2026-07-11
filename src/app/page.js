"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollText, Sparkles, Users } from 'lucide-react';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import Divisions from '@/components/brand/Divisions';
import ImageSlot from '@/components/ImageSlot';

const iconMap = {
  'scroll-text': ScrollText,
  'sparkles': Sparkles,
  'users': Users
};

/* ---- Nav ---------------------------------------------------------- */
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

/* ---- S1 Hero ------------------------------------------------------ */
function Hero({ go }) {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
      <div className="hero__scrim" />
      <div className="hero__inner">
        <div className="apb-eyebrow hero__eyebrow">Heritage Thai Apothecary · Est. 1870s</div>
        <h1 className="hero__h1">150 Years of Wisdom.<br/>Reimagined for Your<br/>Modern Rituals.</h1>
        <p className="hero__sub">Step into the world of APB—where ancient Thai wisdom meets modern artistic expression. Artisan essentials born from a heritage archive, crafted for your daily well-being.</p>
        <div className="hero__cta">
          <Button size="lg" onClick={() => go("collection")}>Discover the Collection</Button>
          <Button size="lg" variant="secondary" onClick={() => go("story")} style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }}>Our Story</Button>
        </div>
      </div>
      <div className="hero__scroll">Scroll</div>
    </section>
  );
}

/* ---- S1.5 Prestige marquee --------------------------------------- */
function Prestige() {
  const line = "Honored to be the heritage gift of choice for Embassies, Consulates, and Life's Meaningful Ceremonies.";
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
  const data = [
    {
      icon: "scroll-text",
      t: "Authentic Legacy",
      b: "Directly descended from the archives of Khun Apiban Bo Plup (APB) during the era of King Rama V."
    },
    {
      icon: "sparkles",
      t: "Modern Magic",
      b: "Traditional Thai botanicals transformed into stylish, portable essentials for the fast-paced urban life."
    },
    {
      icon: "users",
      t: "Collective Craft",
      b: "A collaborative revival by the Songkhla family, uniting generations to preserve artisanal heritage."
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
        <div className="apb-eyebrow" style={{ marginBottom: 16 }}>The Secret</div>
        <h2 className="redbook__h">Ancient Roots,<br/>Modern Balance.</h2>
        <p className="redbook__b">We offer a 150-year-old dialogue between nature and the senses. Our formulas use the exact high-quality Thai botanicals recorded in the legendary Red Book, optimized to restore your balance today. From the old streets of Songkhla to your pocket.</p>
        <Button variant="secondary" onClick={() => go("story")}>Uncover the Red Book</Button>
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
  return (
    <section className="apo" id="apothecary">
      <div className="apo__split">
        <ApothecarySide
          tone="green"
          slotId="portal-thepprasit"
          ph="Thepprasit — product shot"
          tagline="The Awakener"
          title="THEPPRASIT"
          body="A bold, citrusy symphony of cloves and Thai bergamot. Designed to clear the mind and uplift your spirit during demanding hours."
        />
        <ApothecarySide
          tone="gold"
          slotId="portal-phetmongkol"
          ph="Phetmongkol — product shot"
          tagline="The Restorer"
          title="PHETMONGKOL"
          body="Delicate Jasmine and Ylang-Ylang. A floral embrace that soothes the senses and brings inner calm after a long day."
        />
      </div>
      <div className="apo__cta">
        <Button size="lg" onClick={() => go("collection")}>Explore the Rituals</Button>
      </div>
    </section>
  );
}

/* ---- S4.5 Gallery -------------------------------------------------- */
function Gallery() {
  const items = [
    { id: "portal-gallery-1", cap: "Flagship Pop-up — Bangkok" },
    { id: "portal-gallery-2", cap: "Corporate Gifting — Embassy of Thailand" },
    { id: "portal-gallery-3", cap: "Craft Exhibition — Songkhla Heritage Fair" },
    { id: "portal-gallery-4", cap: "Retail Activation — ICONSIAM" },
    { id: "portal-gallery-5", cap: "Wedding Favors — Private Ceremony" },
    { id: "portal-gallery-6", cap: "Trade Show — Thailand Beauty Expo" },
    { id: "portal-gallery-7", cap: "Hotel Amenity Partnership — Luxury Resort" },
    { id: "portal-gallery-8", cap: "Workshop — The Red Book Archive Tour" }
  ];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const t = setInterval(() => setI(v => (v + 1) % items.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="gallery"
      id="gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="gallery__head">
        <div className="apb-eyebrow">The Gallery</div>
        <h2 className="gallery__h">Where Heritage Meets the World.</h2>
        <p className="gallery__b">From embassy gifting suites to craft fairs in Old Songkhla — a look at APB out in the world, one occasion at a time.</p>
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
        <h2 className="cont__h">Begin Your Ritual.</h2>
        <p className="cont__b">Bring the Songkhla legacy into your daily life, or share the authentic Thai wellness experience with the world.</p>
        <div className="cont__cta">
          <Button size="lg" onClick={() => router.push('/shop')}>Shop the Collection</Button>
          <Button size="lg" variant="secondary" style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }}>Corporate &amp; Gifting Inquiries</Button>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ------------------------------------------------------- */
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
