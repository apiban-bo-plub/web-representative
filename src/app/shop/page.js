"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import Divisions from '@/components/brand/Divisions';

/* ---- Data ---------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "cooling",
    name: "Cooling Thai Oil",
    th: "ยาหม่องน้ำ",
    tone: "green",
    tagline: "Inspired by Khun Apiban's herbal recipe",
    desc: "Cool your senses, relax deeply, and find relief from office syndrome — all in one soothing herbal oil.",
    price: 320,
    vol: "20 ml",
    tags: ["Herbal", "Cooling"]
  },
  {
    id: "inhaler",
    name: "Herbal Inhaler",
    th: "ยาดม",
    tone: "sand",
    tagline: "A breath of the forest, anywhere",
    desc: "A bright, camphor-forward inhalant blended from native Thai herbs to clear the mind and settle the breath.",
    price: 180,
    vol: "2 ml",
    tags: ["Herbal", "Uplifting"]
  },
  {
    id: "floral",
    name: "Floral Massage Oil",
    th: "น้ำมันนวดดอกไม้",
    tone: "gold",
    tagline: "Petals pressed into calm",
    desc: "A warming massage oil carrying jasmine and ylang, drawn from the family's floral traditions.",
    price: 480,
    vol: "100 ml",
    tags: ["Massage", "Floral"]
  },
  {
    id: "kaffir",
    name: "Kaffir Massage Oil",
    th: "น้ำมันนวดมะกรูด",
    tone: "green",
    tagline: "Green, citrus, grounding",
    desc: "Kaffir lime and lemongrass in a nourishing base oil — a bright, grounding ritual for tired muscles.",
    price: 480,
    vol: "100 ml",
    tags: ["Massage", "Citrus"]
  }
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
  const h = size === "lg" ? 460 : 300;
  const cream = p.tone !== "sand";
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
          {p.th}
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
          {p.name}
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
  const link = (id, label) => (
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
      {label}
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
        <nav style={{ display: "flex", gap: 28, flex: 1 }}>
          {link("home", "Shop")}
          {link("story", "Our Story")}
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
            Search
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
            Cart ({cart})
          </span>
        </div>
      </div>
    </header>
  );
}

/* ---- Hero ----------------------------------------------------------- */
function Hero({ go }) {
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
        <div className="apb-eyebrow" style={{ marginBottom: 20 }}>Heritage Thai Apothecary</div>
        <h1 style={{ fontSize: 68, lineHeight: 1.04, margin: "0 0 24px" }}>
          Ancient remedies,<br/>gently reimagined.
        </h1>
        <p
          style={{
            font: "var(--type-lead)",
            color: "var(--text-body)",
            maxWidth: 460,
            marginBottom: 32
          }}
        >
          Wisdom once written in a family's red book — now blended into refined self-care rituals for modern living.
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          <Button onClick={() => go("home")}>Shop the ritual</Button>
          <Button variant="secondary" onClick={() => go("story")}>Read our story</Button>
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
  return (
    <div
      onClick={() => go("product:" + p.id)}
      style={{ cursor: "pointer" }}
      className="apb-pcard"
    >
      <ProductVisual p={p} />
      <div style={{ padding: "18px 4px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <h3 style={{ fontSize: 22, margin: 0 }}>{p.name}</h3>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-body)" }}>
            {baht(p.price)}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--text-muted)", margin: "6px 0 0" }}>
          {p.tagline}
        </p>
      </div>
    </div>
  );
}

function ShopContent({ go }) {
  return (
    <main>
      <Hero go={go} />
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="apb-eyebrow" style={{ marginBottom: 12 }}>The Collection</div>
          <h2 style={{ fontSize: 44, margin: 0 }}>Four rituals, one lineage</h2>
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
            Est. from a 150-year heritage
          </div>
          <h2 style={{ color: "#fff", fontSize: 44, margin: "0 0 22px" }}>
            The red-bound manuscript
          </h2>
          <p style={{ font: "var(--type-lead)", color: "var(--makara-100)", marginBottom: 16 }}>
            Over a century and a half ago, our ancestor Khun Apiban recorded his healing knowledge in a red-bound manuscript — a quiet testament to Thailand's botanical wisdom.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--makara-200)", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
            Today we revive that heritage for a new generation, transforming ancient remedies into rituals that invite you to slow down and reconnect.
          </p>
          <Button variant="gold" onClick={() => go("story")}>
            Discover the lineage
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---- Newsletter ----------------------------------------------------- */
function Newsletter() {
  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "84px 40px", textAlign: "center" }}>
      <img
        src="/images/motif.svg"
        style={{ width: 46, opacity: 0.85, marginBottom: 22, marginLeft: 'auto', marginRight: 'auto' }}
        alt=""
      />
      <h2 style={{ fontSize: 38, margin: "0 0 14px" }}>Join the ritual</h2>
      <p style={{ font: "var(--type-lead)", color: "var(--text-body)", marginBottom: 28 }}>
        Seasonal blends, botanical notes, and quiet moments — to your inbox.
      </p>
      <div style={{ display: "flex", gap: 12, maxWidth: 460, margin: "0 auto" }}>
        <input
          placeholder="Your email"
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
        <Button>Subscribe</Button>
      </div>
    </section>
  );
}

/* ---- Product detail ------------------------------------------------- */
function ProductDetail({ id, go, add }) {
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
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
        ← Back to shop
      </a>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 24, alignItems: "start" }}>
        <ProductVisual p={p} size="lg" />
        <div style={{ paddingTop: 12 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {p.tags.map(t => (
              <Tag key={t} tone="green">
                {t}
              </Tag>
            ))}
          </div>
          <h1 style={{ fontSize: 52, margin: "0 0 6px" }}>{p.name}</h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--brand-green)", margin: "0 0 24px" }}>
            {p.tagline}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 30, color: "var(--text-strong)" }}>
              {baht(p.price)}
            </span>
            <Tag>{p.vol}</Tag>
          </div>
          <p style={{ font: "var(--type-body)", fontSize: 15, color: "var(--text-body)", marginBottom: 28 }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
            <Button size="lg" onClick={add}>
              Add to cart
            </Button>
            <Button size="lg" variant="secondary">
              Save
            </Button>
          </div>
          <Divisions label="How to use" />
          <p style={{ font: "var(--type-body)", fontSize: 14, color: "var(--text-body)" }}>
            Warm a few drops between the palms, breathe in, and massage gently into temples, neck or shoulders. Reapply through the day as a grounding pause.
          </p>
          <Divisions label="Ingredients" />
          <p style={{ fontFamily: "var(--font-sans-thai)", fontSize: 14, color: "var(--text-body)" }}>
            Oryza sativa bran oil, caprylic/capric triglyceride, native Thai herbal extracts, menthol, essential oils. Made in small batches in Songkhla, Thailand.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ---- Story ---------------------------------------------------------- */
function StorySection() {
  return (
    <main>
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "80px 40px 40px", textAlign: "center" }}>
        <div className="apb-eyebrow" style={{ marginBottom: 16 }}>Our Story</div>
        <h1 style={{ fontSize: 60, margin: "0 0 20px" }}>อภัยบ่อพลับ</h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 26, color: "var(--brand-green)", lineHeight: 1.4 }}>
          "Wisdom once written in a family's red book, now reimagined for the world."
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
            Over a century and a half ago, our ancestor Khun Apiban recorded his healing knowledge in a red-bound manuscript — a quiet testament to Thailand's botanical wisdom and spiritual balance.
          </p>
          <p style={{ font: "var(--type-body)", fontSize: 15, color: "var(--text-body)", marginBottom: 22 }}>
            Today, Apiban Bo Plup revives that heritage for a new generation, transforming ancient Thai remedies into refined self-care rituals. Rooted in nature, guided by tradition, and crafted for modern living — each creation invites you to slow down, breathe deeply, and reconnect with the serenity that endures across time.
          </p>
          <Divisions label="Made in Songkhla" />
          <p style={{ font: "var(--type-body)", fontSize: 15, color: "var(--text-body)" }}>
            Every blend is prepared in small batches from native Thai botanicals, honouring the recipes and the patience of those who came before.
          </p>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

/* ---- Site footer ---------------------------------------------------- */
function SiteFooter() {
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
            Heritage Thai apothecary. Herbal self-care rituals, crafted in Songkhla.
          </p>
        </div>
        {col("Shop", ["Cooling Thai Oil", "Herbal Inhaler", "Massage Oils", "Gift sets"])}
        {col("Company", ["Our story", "Journal", "Stockists", "Contact"])}
        {col("Connect", ["@ApibanAPB", "LINE @apibanapb", "apibanapb@gmail.com"])}
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
          <span>© 2024 Apiban Bo Plup. Product of Songkhla, Thailand.</span>
          <span>Privacy · Terms</span>
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
