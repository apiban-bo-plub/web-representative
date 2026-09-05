"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ScrollText, Sparkles, Users, MoveRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import Logo from '@/components/brand/Logo';
import PortalFooter from '@/components/brand/PortalFooter';
import Button from '@/components/core/Button';
import ImageSlot from '@/components/ImageSlot';
import LanguageSelector from '@/components/LanguageSelector';
import HeroVideo from '@/components/HeroVideo';
import ParallaxLayer from '@/components/ParallaxLayer';
import useScrollReveal from '@/hooks/useScrollReveal';

const iconMap = {
  'scroll-text': ScrollText,
  'sparkles': Sparkles,
  'users': Users
};

/* Swap these two for the hi-res replacements once they land in public/images. */
const HERO_STILL = '/images/products/hands-holding-inhaler-and-oil.jpg';
const FOUNDER_PORTRAIT = '/images/store/founder-portrait.jpg';

/* ---- Navigation ---- */

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
      <button className="pn__burger" aria-label="Menu" onClick={() => setOpen(v => !v)}>
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

/* ---- Botanical cutout layers ----------------------------------------
   Uses transparent PNGs from public/images/cutouts when supplied; falls
   back to line art in the same house style as the /apothecary sketches.
   ------------------------------------------------------------------- */

function SprigSketch() {
  return (
    <svg viewBox="0 0 100 140" className="hero-cutout__sketch" role="presentation">
      <path d="M50 136 C50 100 50 60 50 8" />
      <path d="M50 112 C34 108 24 96 22 82 C38 84 48 96 50 112 Z" />
      <path d="M50 92 C66 88 76 76 78 62 C62 64 52 76 50 92 Z" />
      <path d="M50 68 C34 64 24 52 22 38 C38 40 48 52 50 68 Z" />
      <path d="M50 44 C66 40 76 28 78 14 C62 16 52 28 50 44 Z" />
    </svg>
  );
}

function StarAniseSketch() {
  return (
    <svg viewBox="0 0 100 100" className="hero-cutout__sketch" role="presentation">
      <circle cx="50" cy="50" r="11" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <path key={a} d="M50 40 L58 16 L50 6 L42 16 Z" transform={`rotate(${a} 50 50)`} />
      ))}
    </svg>
  );
}

function PodSketch() {
  return (
    <svg viewBox="0 0 100 120" className="hero-cutout__sketch" role="presentation">
      <path d="M50 8 C74 32 78 76 50 112 C22 76 26 32 50 8 Z" />
      <path d="M50 14 L50 106" />
      <path d="M36 44 C44 50 56 50 64 44" />
      <path d="M34 68 C44 76 56 76 66 68" />
    </svg>
  );
}

const CUTOUTS = [
  { cls: 'hero-cutout--a', speed: 'mid',  src: '/images/cutouts/sprig.png',      Fallback: SprigSketch },
  { cls: 'hero-cutout--b', speed: 'fast', src: '/images/cutouts/star-anise.png', Fallback: StarAniseSketch },
  { cls: 'hero-cutout--c', speed: 'slow', src: '/images/cutouts/pod.png',        Fallback: PodSketch }
];

function HeroCutout({ item }) {
  // The PNG set is user-supplied; if a file is missing we fall through to the
  // line-art sketch rather than leaving a broken-image box in the hero.
  const [failed, setFailed] = useState(false);
  const { Fallback } = item;
  return (
    <ParallaxLayer speed={item.speed} className={`hero-cutout ${item.cls}`}>
      {failed ? (
        <Fallback />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={item.src} alt="" onError={() => setFailed(true)} />
      )}
    </ParallaxLayer>
  );
}

/* ---- Sections ---- */

function Hero({ go }) {
  const { t } = useLanguage();
  return (
    <section className="hero hero-px" id="top">
      <ParallaxLayer speed="slow" className="hero__bg">
        <Image
          src={HERO_STILL}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover' }}
        />
      </ParallaxLayer>

      <div className="hero-cutouts">
        {CUTOUTS.map(item => <HeroCutout key={item.cls} item={item} />)}
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

/* Counts a number up the first time it scrolls into view. Reduced motion and
   the no-IntersectionObserver path both land on the final value immediately —
   the figure is content, not decoration, so it may never be withheld. */
function CountUp({ value, suffix }) {
  const target = Number(value);
  const ref = useRef(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const from = target > 1000 ? target - 60 : 0;
      const tick = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(Math.round(from + (target - from) * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setShown(from);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  return <span ref={ref}>{Number.isFinite(target) ? shown : value}{suffix}</span>;
}

function LegacyNumbers() {
  const { t } = useLanguage();
  const items = ["n1", "n2", "n3"];
  return (
    <section className="legacy" aria-labelledby="legacy-title">
      <ParallaxLayer speed="down" as="img" className="legacy__mark" src="/images/motif.svg" alt="" />
      <div className="legacy__grid">
        {items.map((id, i) => (
          <div className={`legacy__item reveal reveal-delay-${i}`} key={id}>
            <p className="legacy__num">
              <CountUp
                value={t(`home.numbers.items.${id}.value`)}
                suffix={t(`home.numbers.items.${id}.suffix`)}
              />
            </p>
            <p className="legacy__label">{t(`home.numbers.items.${id}.label`)}</p>
            <p className="legacy__note">{t(`home.numbers.items.${id}.note`)}</p>
          </div>
        ))}
      </div>
      <h2 id="legacy-title" className="apb-sr-only">{t("home.numbers.title")}</h2>
    </section>
  );
}

function Pillars() {
  const { t } = useLanguage();
  const data = [
    { icon: "scroll-text", t: t("home.pillars.legacy.title"), b: t("home.pillars.legacy.desc") },
    { icon: "sparkles",    t: t("home.pillars.magic.title"),  b: t("home.pillars.magic.desc") },
    { icon: "users",       t: t("home.pillars.craft.title"),  b: t("home.pillars.craft.desc") }
  ];
  return (
    <section className="pillars">
      <div className="pillars__grid">
        {data.map((p, i) => {
          const Icon = iconMap[p.icon];
          return (
            <React.Fragment key={p.t}>
              <div className={`pillar reveal reveal-delay-${i}`}>
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

/* The page's only pinned section. The media column sticks while three text
   chapters scroll past it, cross-fading a photograph per chapter. Pinning is
   released below 900px in parallax.css — it fights native scroll on touch. */
const RBOOK_CHAPTERS = [
  { id: "c1", slot: "portal-rbook-1" },
  { id: "c2", slot: "portal-rbook-2" },
  { id: "c3", slot: "portal-rbook-3" }
];

function RedBookChapters({ go }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const stageRefs = useRef([]);

  useEffect(() => {
    const els = stageRefs.current.filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.stage));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rbook" id="story">
      <div className="rbook__inner">
        <div className="rbook__sticky">
          <div className="rbook__media">
            {RBOOK_CHAPTERS.map((c, i) => (
              <div
                key={c.id}
                className={`rbook__frame${i === active ? ' is-active' : ''}`}
                aria-hidden={i !== active}
              >
                <ImageSlot
                  id={c.slot}
                  shape="rect"
                  fit="cover"
                  placeholder={t(`home.redbook.chapters.${c.id}.title`)}
                />
              </div>
            ))}
            <div className="rbook__mark" aria-hidden="true" />
          </div>
        </div>

        <div className="rbook__stages">
          <div className="apb-eyebrow rbook__eyebrow">{t("home.redbook.eyebrow")}</div>
          {RBOOK_CHAPTERS.map((c, i) => (
            <article
              className="rbstage reveal"
              key={c.id}
              data-stage={i}
              ref={(el) => { stageRefs.current[i] = el; }}
            >
              <div className="rbstage__idx">{t(`home.redbook.chapters.${c.id}.idx`)}</div>
              <div className="rbstage__rule" aria-hidden="true" />
              <h2 className="rbstage__h">{t(`home.redbook.chapters.${c.id}.title`)}</h2>
              <p className="rbstage__b">{t(`home.redbook.chapters.${c.id}.body`)}</p>
              {i === RBOOK_CHAPTERS.length - 1 && (
                <div>
                  <Button variant="secondary" onClick={() => go("story")}>
                    {t("home.redbook.button")}
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROVENANCE = ["p1", "p2", "p3", "p4", "p5", "p6"];

function Provenance() {
  const { t } = useLanguage();
  return (
    <section className="prov" aria-labelledby="prov-title">
      <div className="prov__head reveal">
        <div>
          <div className="apb-eyebrow">{t("home.provenance.eyebrow")}</div>
          <h2 className="prov__title" id="prov-title">{t("home.provenance.title")}</h2>
        </div>
        <p className="prov__hint">
          {t("home.provenance.hint")}
          <MoveRight size={15} aria-hidden="true" />
        </p>
      </div>

      {/* A plain scroll container: keyboard-reachable, snap-aligned, and no
          JS carousel timer to fight the user's own scrolling. */}
      <ul className="prov__track" tabIndex={0} aria-label={t("home.provenance.title")}>
        {PROVENANCE.map((id, i) => (
          <li className="prov__card" key={id}>
            <div className="prov__media">
              <ImageSlot
                id={`portal-prov-${i + 1}`}
                shape="rect"
                fit="cover"
                placeholder={t(`home.provenance.items.${id}.name`)}
              />
            </div>
            <div className="prov__body">
              <div className="prov__idx">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="prov__name">{t(`home.provenance.items.${id}.name`)}</h3>
              <p className="prov__origin">{t(`home.provenance.items.${id}.origin`)}</p>
              <p className="prov__desc">{t(`home.provenance.items.${id}.desc`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ApothecarySide({ tone, tagline, title, body, slotId, ph }) {
  return (
    <div className={"apo__side apo__side--" + tone}>
      <div className="apo__media">
        <ParallaxLayer speed="slow" style={{ position: 'absolute', inset: '-8% 0' }}>
          <ImageSlot id={slotId} shape="rect" fit="cover" placeholder={ph} />
        </ParallaxLayer>
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
        <Button size="lg" onClick={() => go("rituals")}>{t("home.apothecary.button")}</Button>
      </div>
    </section>
  );
}

function FounderQuote() {
  const { t } = useLanguage();
  return (
    <section className="fquote grain">
      <div className="fquote__bg px-zoom">
        <Image
          src={FOUNDER_PORTRAIT}
          alt={t("home.quote.alt")}
          fill
          loading="lazy"
          sizes="100vw"
          quality={85}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="fquote__scrim" aria-hidden="true" />
      <blockquote className="fquote__inner reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="fquote__mark" src="/images/motif.svg" alt="" />
        <p className="fquote__text">{t("home.quote.text")}</p>
        <footer>
          <p className="fquote__attrib">{t("home.quote.attrib")}</p>
          <p className="fquote__role">{t("home.quote.role")}</p>
        </footer>
      </blockquote>
    </section>
  );
}

const GALLERY_ITEMS = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"];

function GalleryTrack() {
  const { t } = useLanguage();
  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Progress bar only — the scrolling itself is native CSS scroll-snap, so
  // there is no timer competing with the user for control of the track.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = null;
    const measure = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setProgress(max > 0 ? rail.scrollLeft / max : 1);
      raf = null;
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(measure); };
    measure();
    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="gtrack" id="gallery" aria-labelledby="gtrack-title">
      <div className="gtrack__head reveal">
        <div className="apb-eyebrow">{t("home.gallery.eyebrow")}</div>
        <h2 className="gtrack__h" id="gtrack-title">{t("home.gallery.title")}</h2>
        <p className="gtrack__b">{t("home.gallery.desc")}</p>
      </div>

      <ul className="gtrack__rail" ref={railRef} tabIndex={0} aria-label={t("home.gallery.title")}>
        {GALLERY_ITEMS.map((id, i) => (
          <li className="gtrack__item" key={id}>
            <ImageSlot
              id={`portal-gallery-${i + 1}`}
              shape="rect"
              fit="cover"
              placeholder={t(`home.gallery.items.${id}`)}
            />
            <div className="gtrack__scrim" aria-hidden="true" />
            <p className="gtrack__cap">{t(`home.gallery.items.${id}`)}</p>
          </li>
        ))}
      </ul>

      <div className="gtrack__bar" aria-hidden="true">
        <div>
          <div
            className="gtrack__progress"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
          />
        </div>
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
        <ParallaxLayer speed="slow" style={{ position: 'absolute', inset: '-8% 0' }}>
          <ImageSlot
            id="portal-lifestyle"
            shape="rect"
            fit="cover"
            placeholder="Lifestyle — a modern professional using the product in a premium setting"
          />
        </ParallaxLayer>
      </div>
      <div className="cont__panel reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cont__mark" src="/images/motif.svg" alt="" />
        <h2 className="cont__h">{t("home.continuum.title")}</h2>
        <p className="cont__b">{t("home.continuum.desc")}</p>
        <div className="cont__cta">
          <Button size="lg" onClick={() => router.push('/contact')}>{t("home.continuum.button_contact")}</Button>
          <Button size="lg" variant="secondary" style={{ color: "#f0ebe2", borderColor: "rgba(240,235,226,.6)" }} onClick={() => router.push('/contact?inquiry=corporate')}>{t("home.continuum.button_gift")}</Button>
        </div>
      </div>
    </section>
  );
}

/* ---- Page ---- */

export default function Home() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const rootRef = useRef(null);

  // Coarse booleans only. `--p` carries the continuous value; these two flip
  // at most a handful of times per session, so React never renders per frame.
  const [pastColdOpen, setPastColdOpen] = useState(false);

  useScrollReveal([language]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = null;
    let lastPast = false;

    const tick = () => {
      raf = null;
      const h = window.innerHeight || 800;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      root.style.setProperty('--p', String(p));

      const past = p >= 0.9;
      if (past !== lastPast) { lastPast = past; setPastColdOpen(past); }

    };

    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Heritage and the Apothecary live on their own routes; everything else is
  // an in-page scroll so the teaser sections keep their anchors.
  const go = (id) => {
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "story") return router.push("/heritage");
    if (id === "rituals") return router.push("/apothecary");
    if (id.startsWith("contact")) return router.push(`/${id}`);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <div className="px-page" ref={rootRef}>
      <div className={`px-nav${pastColdOpen ? ' is-on' : ''}`}>
        <PortalNav go={go} />
      </div>

      {/* Fixed cold open. Lives outside `.portal` on purpose: that element sets
          container-type, which makes it a containing block for fixed children. */}
      <div className="cold-open" aria-hidden={pastColdOpen}>
        <div className="cold-open__frame">
          <HeroVideo />
        </div>
        <div className="hero__scroll cold-open__cue">{t("home.hero.scroll")}</div>
      </div>

      <div className="px-scroll">
        <div className="px-spacer" />

        <div className="portal px-portal">
          <div className="px-hero-wrap">
            <Hero go={go} />
          </div>

          <div className="px-sections">
            <Prestige />
            <LegacyNumbers />
            <Pillars />
            <RedBookChapters go={go} />
            <Provenance />
            <Apothecary go={go} />
            <FounderQuote />
            <GalleryTrack />
            <Continuum />
            <PortalFooter go={go} />
          </div>
        </div>
      </div>

    </div>
  );
}
