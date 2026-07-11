"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import Divisions from '@/components/brand/Divisions';
import LanguageSelector from '@/components/LanguageSelector';

/* ---- Data ---------------------------------------------------------- */
const PRODUCTS = [
  { id: "cooling", tone: "green", price: 320, vol: "20 ml" },
  { id: "inhaler", tone: "sand", price: 180, vol: "2 ml" },
  { id: "floral", tone: "gold", price: 480, vol: "100 ml" },
  { id: "kaffir", tone: "green", price: 480, vol: "100 ml" }
];

const toneBg = {
  green: "var(--basil-green-800)",
  sand: "var(--makara-300)",
  gold: "var(--spring-wood-600)"
};

const toneInk = {
  green: "#f0ebe2",
  sand: "var(--brown-600)",
  gold: "var(--brown-700)"
};

const baht = n => "฿" + n;

/* ---- Packaging visual (CSS label mock) ----------------------------- */
function ProductVisual({ p, size = "md" }) {
  const { t } = useLanguage();
  const h = size === "lg" ? 460 : 300;
  const cream = p.tone !== "sand";
  
  const pName = t("shop.products." + p.id + ".name");
  const pTh = t("shop.products." + p.id + ".th");

  return (
    <div
      style={{
        position: "relative",
        height: h,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: toneBg[p.tone],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        textAlign: "center"
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -70,
          bottom: -70,
          width: 240,
          height: 240,
          opacity: 0.12,
          background: "url('/images/motif.svg') center/contain no-repeat",
          filter: cream ? "brightness(0) invert(1)" : "none"
        }}
      />
      <div
        style={{
          position: "relative",
          border: `1px solid ${cream ? "rgba(240,235,226,.5)" : "rgba(57,48,45,.35)"}`,
          borderRadius: 8,
          padding: size === "lg" ? "40px 34px" : "26px 22px",
          width: "82%"
        }}
      >
        <div
          style={{
            font: "var(--type-caption)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: toneInk[p.tone],
            opacity: 0.8,
            marginBottom: 12
          }}
        >
          Apiban Bo Plup
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif-thai)",
            fontSize: size === "lg" ? 30 : 22,
            color: toneInk[p.tone],
            marginBottom: 6
          }}
        >
          {pTh}
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: size === "lg" ? 34 : 24,
            letterSpacing: "0.02em",
            color: toneInk[p.tone],
            lineHeight: 1.1
          }}
        >
          {pName}
        </div>
        <div
          style={{
            width: 40,
            height: 1,
            background: toneInk[p.tone],
            opacity: 0.5,
            margin: "16px auto"
          }}
        />
        <div
          style={{
            font: "var(--type-caption)",
            letterSpacing: "0.12em",
            color: toneInk[p.tone],
            opacity: 0.85
          }}
        >
          {p.vol} · Songkhla
        </div>
      </div>
    </div>
  );
}

/* ---- Nav ------------------------------------------------------------ */
function Nav({ route, go, cart }) {
  const { t } = useLanguage();
  const link = (id, labelKey) => (
    <a
      onClick={() => go(id)}
      style={{
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: route === id ? "var(--basil-green-800)" : "var(--text-body)"
      }}
    >
      {t(labelKey)}
    </a>
  );
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(240,235,226,0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border-hairline)"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <nav style={{ display: "flex", gap: 28, flex: 1, alignItems: 'center' }}>
          {link("home", "nav.collection")}
          {link("story", "shop.story.eyebrow")}
        </nav>
        <a onClick={() => go("home")} style={{ cursor: "pointer" }}>
          <Logo width={150} />
        </a>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 22,
            alignItems: "center",
            flex: 1
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-body)",
              cursor: "pointer"
            }}
          >
            {t("nav.search")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--basil-green-800)",
              fontWeight: 600
            }}
          >
            {t("nav.cart")} ({cart})
          </span>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}

/* ---- Hero ----------------------------------------------------------- */
function Hero({ go }) {
  const { t } = useLanguage();
  return (
    <section
      style={{
        position: "relative",
        minHeight: 560,
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}
    >
      <div
        style={{
          padding: "96px 40px 96px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 620
        }}
      >
        <div className="apb-eyebrow" style={{ marginBottom: 20 }}>{t("home.hero.eyebrow")}</div>
        <h1 style={{ fontSize: 68, lineHeight: 1.04, margin: "0 0 24px" }}>
          {t("shop.hero.title_1")}<br/>
          {t("shop.hero.title_2")}
        </h1>
        <p
          style={{
            font: "var(--type-lead)",
            color: "var(--text-body)",
            maxWidth: 460,
            marginBottom: 32
          }}
        >
          {t("shop.hero.sub")}
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          <Button onClick={() => go("home")}>{t("shop.hero.button_shop")}</Button>
          <Button variant="secondary" onClick={() => go("story")}>{t("shop.hero.button_story")}</Button>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          background: "url('/images/hero.jpg') center/cover"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, var(--makara-100) 0%, rgba(240,235,226,0) 24%)"
          }}
        />
      </div>
    </section>
  );
}

/* ---- Product grid --------------------------------------------------- */
function ProductCard({ p, go }) {
  const { t } = useLanguage();
  const pName = t("shop.products." + p.id + ".name");
  const pTagline = t("shop.products." + p.id + ".tagline");

  return (
    <div
      onClick={() => go("product:" + p.id)}
      style={{ cursor: "pointer" }}
      className="apb-pcard"
    >
      <ProductVisual p={p} />
      <div style={{ padding: "18px 4px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <h3 style={{ fontSize: 22, margin: 0 }}>{pName}</h3>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-body)" }}>
            {baht(p.price)}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--text-muted)", margin: "6px 0 0" }}>
          {pTagline}
        </p>
      </div>
    </div>
  );
}

function ShopContent({ go }) {
  const { t } = useLanguage();
  return (
    <main>
      <Hero go={go} />
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="apb-eyebrow" style={{ marginBottom: 12 }}>{t("home.gallery.eyebrow")}</div>
          <h2 style={{ fontSize: 44, margin: 0 }}>{t("shop.h2")}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} p={p} go={go} />
          ))}
        </div>
      </section>
      <HeritageStrip go={go} />
      <Newsletter />
    </main>
  );
}

/* ---- Heritage strip ------------------------------------------------- */
function HeritageStrip({ go }) {
  const { t } = useLanguage();
  return (
    <section style={{ background: "var(--surface-green)", color: "var(--text-on-dark)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 40px",
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 64,
          alignItems: "center"
        }}
      >
        <div
          style={{
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            aspectRatio: "4/5",
            background: "url('/images/product-26.jpg') center/cover"
          }}
        />
        <div>
          <div style={{ color: "var(--makara-300)", marginBottom: 18 }} className="apb-eyebrow">
            {t("shop.strip.eyebrow")}
          </div>
          <h2 style={{ color: "#fff", fontSize: 44, margin: "0 0 22px" }}>
            {t("shop.strip.title")}
          </h2>
          <p style={{ font: "var(--type-lead)", color: "var(--makara-100)", marginBottom: 16 }}>
            {t("shop.strip.desc1")}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--makara-200)", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
            {t("shop.strip.desc2")}
          </p>
          <Button variant="gold" onClick={() => go("story")}>
            {t("shop.strip.button")}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---- Newsletter ----------------------------------------------------- */
function Newsletter() {
  const { t } = useLanguage();
  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "84px 40px", textAlign: "center" }}>
      <img
        src="/images/motif.svg"
        style={{ width: 46, opacity: 0.85, marginBottom: 22, marginLeft: 'auto', marginRight: 'auto' }}
        alt=""
      />
      <h2 style={{ fontSize: 38, margin: "0 0 14px" }}>{t("shop.news.title")}</h2>
      <p style={{ font: "var(--type-lead)", color: "var(--text-body)", marginBottom: 28 }}>
        {t("shop.news.desc")}
      </p>
      <div style={{ display: "flex", gap: 12, maxWidth: 460, margin: "0 auto" }}>
        <input
          placeholder={t("shop.news.placeholder")}
          style={{
            flex: 1,
            padding: "13px 18px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--makara-500)",
            background: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--text-body)"
          }}
        />
        <Button>{t("shop.news.button")}</Button>
      </div>
    </section>
  );
}

/* ---- Product detail ------------------------------------------------- */
function ProductDetail({ id, go, add }) {
  const { t } = useLanguage();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  
  const pName = t("shop.products." + p.id + ".name");
  const pTagline = t("shop.products." + p.id + ".tagline");
  const pDesc = t("shop.products." + p.id + ".desc");
  const pTags = t("shop.products." + p.id + ".tags");

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 96px" }}>
      <a
        onClick={() => go("home")}
        style={{
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-muted)"
        }}
      >
        {t("shop.back")}
      </a>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 24, alignItems: "start" }}>
        <ProductVisual p={p} size="lg" />
        <div style={{ paddingTop: 12 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {Array.isArray(pTags) && pTags.map(tLabel => (
              <Tag key={tLabel} tone="green">
                {tLabel}
              </Tag>
            ))}
          </div>
          <h1 style={{ fontSize: 52, margin: "0 0 6px" }}>{pName}</h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--brand-green)", margin: "0 0 24px" }}>
            {pTagline}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 30, color: "var(--text-strong)" }}>
              {baht(p.price)}
            </span>
            <Tag>{p.vol}</Tag>
          </div>
          <p style={{ font: "var(--type-body)", fontSize: 15, color: "var(--text-body)", marginBottom: 28 }}>
            {pDesc}
          </p>
          <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
            <Button size="lg" onClick={add}>
              {t("apothecary.crossroads.b2c.button") || "Add to cart"}
            </Button>
            <Button size="lg" variant="secondary">
              {t("shop.detail.save")}
            </Button>
          </div>
          <Divisions label={t("shop.detail.use_title")} />
          <p style={{ font: "var(--type-body)", fontSize: 14, color: "var(--text-body)" }}>
            {t("shop.detail.use_body")}
          </p>
          <Divisions label={t("shop.detail.ing_title")} />
          <p style={{ fontFamily: "var(--font-sans-thai)", fontSize: 14, color: "var(--text-body)" }}>
            {t("shop.detail.ing_body")}
          </p>
        </div>
      </div>
    </main>
  );
}

/* ---- Story ---------------------------------------------------------- */
function StorySection() {
  const { t } = useLanguage();
  return (
    <main>
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "80px 40px 40px", textAlign: "center" }}>
        <div className="apb-eyebrow" style={{ marginBottom: 16 }}>{t("shop.story.eyebrow")}</div>
        <h1 style={{ fontSize: 60, margin: "0 0 20px" }}>{t("shop.story.title")}</h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 26, color: "var(--brand-green)", lineHeight: 1.4 }}>
          {t("shop.story.tagline")}
        </p>
      </section>
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "24px 40px 96px" }}>
        <div
          style={{
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            height: 420,
            background: "url('/images/product-26.jpg') center/cover",
            marginBottom: 44
          }}
        />
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ font: "var(--type-lead)", color: "var(--text-body)", marginBottom: 22 }}>
            {t("shop.story.p1")}
          </p>
          <p style={{ font: "var(--type-body)", fontSize: 15, color: "var(--text-body)", marginBottom: 22 }}>
            {t("shop.story.p2")}
          </p>
          <Divisions label={t("shop.story.made_title")} />
          <p style={{ font: "var(--type-body)", fontSize: 15, color: "var(--text-body)" }}>
            {t("shop.story.made_body")}
          </p>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

/* ---- Site footer ---------------------------------------------------- */
function SiteFooter() {
  const { t } = useLanguage();
  const col = (h, items) => (
    <div key={h}>
      <div
        style={{
          font: "var(--type-caption)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--makara-300)",
          marginBottom: 14
        }}
      >
        {h}
      </div>
      {items.map(i => (
        <div
          key={i}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--makara-100)",
            marginBottom: 9,
            opacity: 0.9
          }}
        >
          {i}
        </div>
      ))}
    </div>
  );
  return (
    <footer style={{ background: "var(--surface-ink)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 40px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40
        }}
      >
        <div>
          <Logo width={180} color="#f0ebe2" />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--makara-200)",
              maxWidth: 260,
              marginTop: 18,
              lineHeight: 1.6
            }}
          >
            {t("footer.blurb")}
          </p>
        </div>
        {col(t("shop.footer.shop"), [t("shop.footer.shopItems.0"), t("shop.footer.shopItems.1"), t("shop.footer.shopItems.2"), t("shop.footer.shopItems.3")])}
        {col(t("shop.footer.company"), [t("shop.story.eyebrow"), t("shop.footer.companyItems.1"), t("shop.footer.companyItems.2"), t("shop.footer.companyItems.3")])}
        {col(t("footer.connect"), [t("footer.connectItems.0"), t("footer.connectItems.1"), t("footer.connectItems.2")])}
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 40px" }}>
        <div
          style={{
            borderTop: "1px solid rgba(240,235,226,0.2)",
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            color: "var(--makara-300)"
          }}
        >
          <span>{t("footer.copy")}</span>
          <span>{t("footer.privacy")}</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Main Shop Component ------------------------------------------- */
export default function Storefront() {
  const router = useRouter();
  const [route, setRoute] = useState("home"); // home, story, product:<id>
  const [cart, setCart] = useState(0);

  const go = (target) => {
    if (target === "home" || target === "story") {
      setRoute(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target.startsWith("product:")) {
      setRoute(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // standard link redirect fallbacks
      router.push("/");
    }
  };

  const handleAddToCart = () => {
    setCart(prev => prev + 1);
  };

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <Nav route={route} go={go} cart={cart} />
      {route === "home" && <ShopContent go={go} />}
      {route === "story" && <StorySection />}
      {route.startsWith("product:") && (
        <ProductDetail id={route.split(":")[1]} go={go} add={handleAddToCart} />
      )}
      <SiteFooter />
    </div>
  );
}
