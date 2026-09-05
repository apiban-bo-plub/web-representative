"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { X, Check, ArrowRight } from 'lucide-react';

import Logo from '@/components/brand/Logo';
import Button from '@/components/core/Button';
import Tag from '@/components/core/Tag';
import Divisions from '@/components/brand/Divisions';
import LanguageSelector from '@/components/LanguageSelector';
import ImageSlot from '@/components/ImageSlot';

/* ---- Data ---------------------------------------------------------- */
const PRODUCTS = [
  { id: "cooling", tone: "green", price: 320, vol: "20 ml" },
  { id: "inhaler", tone: "sand", price: 180, vol: "2 ml" },
  { id: "floral", tone: "gold", price: 480, vol: "100 ml" },
  { id: "kaffir", tone: "green", price: 480, vol: "100 ml" }
];

const productImages = {
  cooling: '/images/products/inhaler-and-oil-on-brick.jpg',
  inhaler: '/images/products/thepprasit-inhaler-jar-closed.jpg',
  floral: '/images/products/hands-holding-inhaler-and-oil.jpg',
  kaffir: '/images/products/applying-workday-oil-to-wrist.jpg'
};

const baht = n => "฿" + n;

/* ---- Packaging visual (Actual Photography + Classic Label Overlay) --- */
function ProductVisual({ p, size = "md" }) {
  const { t } = useLanguage();
  const isLg = size === "lg";
  const pName = t("shop.products." + p.id + ".name");
  const pTh = t("shop.products." + p.id + ".th");

  return (
    <div className={`shop-pvisual shop-pvisual--${p.tone} ${isLg ? 'shop-pvisual--lg' : ''}`}>
      {productImages[p.id] && (
        <img
          src={productImages[p.id]}
          alt={pName}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: p.tone === 'sand' ? 0.32 : 0.42,
            mixBlendMode: p.tone === 'sand' ? 'multiply' : 'luminosity',
            filter: 'contrast(1.1) brightness(0.95)',
            transition: 'transform 0.6s var(--ease-out), opacity 0.4s ease',
            zIndex: 1
          }}
          className="product-bg-img"
        />
      )}
      
      <div className="shop-pvisual__motif" style={{ zIndex: 2 }} />
      
      <div className="shop-pvisual__border" style={{ zIndex: 3, backdropFilter: 'blur(1px)' }}>
        <div className="shop-pvisual__brand">Apiban Bo Plup</div>
        <div className="shop-pvisual__th">{pTh}</div>
        <div className="shop-pvisual__en">{pName}</div>
        <div className="shop-pvisual__divider" />
        <div className="shop-pvisual__meta">{p.vol} · Songkhla</div>
      </div>
    </div>
  );
}

/* ---- Nav ------------------------------------------------------------ */
function StorefrontNav({ route, go }) {
  const { t } = useLanguage();
  const router = useRouter();
  
  const link = (id, labelKey) => (
    <a
      onClick={() => go(id)}
      className={`shop-header__link ${route === id ? 'shop-header__link--active' : ''}`}
    >
      {t(labelKey)}
    </a>
  );
  
  return (
    <header className="shop-header">
      <div className="shop-header__inner">
        <nav className="shop-header__nav">
          <a
            onClick={() => router.push("/")}
            className="shop-header__link"
            style={{ cursor: "pointer" }}
          >
            {t("nav.home")}
          </a>
          {link("home", "nav.collection")}
          {link("story", "shop.story.eyebrow")}
        </nav>
        <a onClick={() => go("home")} className="shop-header__logo">
          <Logo width={150} />
        </a>
        <div className="shop-header__side">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}

/* ---- Hero ----------------------------------------------------------- */
function StorefrontHero({ go }) {
  const { t } = useLanguage();
  return (
    <section className="shop-hero reveal">
      <div className="shop-hero__content">
        <div className="apb-eyebrow" style={{ color: 'var(--brand-gold)', marginBottom: 20 }}>
          {t("home.hero.eyebrow")}
        </div>
        <h1 className="shop-hero__title" style={{ fontFamily: "var(--font-serif)", color: "var(--text-strong)" }}>
          {t("shop.hero.title_1")}<br/>
          {t("shop.hero.title_2")}
        </h1>
        <p className="shop-hero__sub">
          {t("shop.hero.sub")}
        </p>
        <div className="shop-hero__cta">
          <Button size="lg" onClick={() => go("home")}>{t("shop.hero.button_shop")}</Button>
          <Button size="lg" variant="secondary" onClick={() => go("story")}>{t("shop.hero.button_story")}</Button>
        </div>
      </div>
      <div className="shop-hero__media">
        <ImageSlot
          id="shop-hero"
          src="/images/products/hands-holding-inhaler-and-oil.jpg"
          shape="rect"
          fit="cover"
          placeholder="Apothecary collection showcase"
        />
        <div className="shop-hero__scrim" />
      </div>
    </section>
  );
}

/* ---- Product card --------------------------------------------------- */
function ProductCard({ p, go }) {
  const { t } = useLanguage();
  const pName = t("shop.products." + p.id + ".name");
  const pTagline = t("shop.products." + p.id + ".tagline");

  return (
    <div
      onClick={() => go("product:" + p.id)}
      className="apb-pcard reveal"
    >
      <div className="apb-pcard__media-wrapper">
        <ProductVisual p={p} />
        <div className="apb-pcard__hover-overlay">
          <div className="apb-pcard__hover-frame">
            <span className="apb-pcard__hover-details">Click for Editorial Specs</span>
          </div>
        </div>
      </div>
      <div className="apb-pcard__info">
        <div className="apb-pcard__header">
          <h3 className="apb-pcard__title">{pName}</h3>
          <span className="apb-pcard__price">{baht(p.price)}</span>
        </div>
        <p className="apb-pcard__tagline">{pTagline}</p>
      </div>
    </div>
  );
}

/* ---- Main Shop Listings ------------------------------------------- */
function ShopContent({ go }) {
  const { t } = useLanguage();
  return (
    <main>
      <StorefrontHero go={go} />
      
      <section className="shop-grid-section">
        <div className="shop-grid-section__head reveal">
          <span className="apb-eyebrow" style={{ color: 'var(--brand-gold)', display: 'block', marginBottom: 12 }}>
            {t("home.gallery.eyebrow")}
          </span>
          <h2 className="shop-grid-section__title" style={{ fontFamily: "var(--font-serif)", color: "var(--text-strong)" }}>
            {t("shop.h2")}
          </h2>
        </div>
        
        <div className="shop-grid">
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} p={p} go={go} />
          ))}
        </div>
      </section>

      <HeritageStrip />
      <Newsletter />
    </main>
  );
}

/* ---- Heritage strip ------------------------------------------------- */
function HeritageStrip() {
  const { t } = useLanguage();
  const router = useRouter();
  return (
    <section className="heritage-strip-sec reveal">
      <div className="heritage-strip">
        <div className="heritage-strip__image">
          <ImageSlot
            id="shop-strip-heritage"
            src="/images/event/dried-herbs-in-ceramic-bowls.jpg"
            shape="rect"
            fit="cover"
            placeholder="Apiban Bo Plup traditional apothecary raw ingredients"
          />
        </div>
        <div className="heritage-strip__content">
          <span className="apb-eyebrow" style={{ color: 'var(--basil-green-700)', display: 'block', marginBottom: 16 }}>
            {t("shop.strip.eyebrow")}
          </span>
          <h2 className="heritage-strip__title" style={{ fontFamily: "var(--font-serif)", marginBottom: 24, fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
            {t("shop.strip.title")}
          </h2>
          <p className="heritage-strip__desc" style={{ marginBottom: 16 }}>
            {t("shop.strip.desc1")}
          </p>
          <p className="heritage-strip__desc" style={{ marginBottom: 32 }}>
            {t("shop.strip.desc2")}
          </p>
          <Button variant="secondary" size="lg" onClick={() => router.push("/heritage")}>
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
    <section className="newsletter-sec reveal">
      <img
        src="/images/motif.svg"
        className="newsletter-sec__motif"
        alt=""
      />
      <h2 className="newsletter-sec__title" style={{ fontFamily: "var(--font-serif)", color: "var(--text-strong)" }}>
        {t("shop.news.title")}
      </h2>
      <p className="newsletter-sec__desc">
        {t("shop.news.desc")}
      </p>
      <div className="newsletter-sec__form">
        <input
          placeholder={t("shop.news.placeholder")}
          className="newsletter-sec__input"
        />
        <Button size="lg">{t("shop.news.button")}</Button>
      </div>
    </section>
  );
}

/* ---- Product sensory data mapping --------------------------------- */
const SENSORY_MAP = {
  "cooling": { fresh: 95, warm: 15, floral: 70, spice: 20, color: "var(--basil-green-600)" },
  "inhaler": { fresh: 60, warm: 85, floral: 20, spice: 80, color: "var(--brand-gold)" },
  "floral": { fresh: 50, warm: 90, floral: 30, spice: 75, color: "var(--brand-gold)" },
  "kaffir": { fresh: 80, warm: 20, floral: 85, spice: 25, color: "var(--basil-green-600)" },
};

/* ---- Product detail ------------------------------------------------- */
function ProductDetail({ id, go }) {
  const { t } = useLanguage();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  
  const pName = t("shop.products." + p.id + ".name");
  const pTagline = t("shop.products." + p.id + ".tagline");
  const pDesc = t("shop.products." + p.id + ".desc");
  const pTags = t("shop.products." + p.id + ".tags");

  const sensory = SENSORY_MAP[p.id] || { fresh: 50, warm: 50, floral: 50, spice: 50, color: "var(--brand-gold)" };

  return (
    <main className="shop-detail reveal">
      <a onClick={() => go("home")} className="shop-detail__back">
        {t("shop.back")}
      </a>
      
      <div className="shop-detail__grid">
        <div className="shop-detail__media-wrapper">
          <ProductVisual p={p} size="lg" />
        </div>
        
        <div className="shop-detail__content">
          <div className="shop-detail__tags">
            {Array.isArray(pTags) && pTags.map(tLabel => (
              <Tag key={tLabel} tone={p.id.includes("inhaler") ? "gold" : "green"}>
                {tLabel}
              </Tag>
            ))}
          </div>
          
          <h1 className="shop-detail__title" style={{ fontFamily: "var(--font-serif)" }}>
            {pName}
          </h1>
          
          <p className="shop-detail__tagline">
            {pTagline}
          </p>
          
          <div className="shop-detail__price-row">
            <span className="shop-detail__price">
              {baht(p.price)}
            </span>
            <Tag tone="gold">{p.vol}</Tag>
          </div>
          
          <p className="shop-detail__desc">
            {pDesc}
          </p>
          
          <div className="shop-detail__cta" style={{ display: 'flex', gap: '12px' }}>
            <Button size="lg" onClick={() => window.open("https://shopee.co.th", "_blank")}>
              {t("apothecary.crossroads.personal.button1") || "Shop on Shopee"}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => window.open("https://line.me", "_blank")}>
              Line Inquiry
            </Button>
          </div>
          
          {/* Sensory Profile Matrix */}
          <div className="shop-detail__sensory-matrix paper-texture">
            <h4 className="sensory-matrix__title">Sensory Profile Matrix</h4>
            <div className="sensory-matrix__scales">
              <div className="sensory-matrix__row">
                <span className="sensory-matrix__label">Freshness</span>
                <div className="sensory-matrix__bar-bg">
                  <div className="sensory-matrix__bar-fill" style={{ width: `${sensory.fresh}%`, backgroundColor: 'var(--basil-green-500)' }}></div>
                </div>
                <span className="sensory-matrix__value">{sensory.fresh}%</span>
              </div>
              <div className="sensory-matrix__row">
                <span className="sensory-matrix__label">Warmth</span>
                <div className="sensory-matrix__bar-bg">
                  <div className="sensory-matrix__bar-fill" style={{ width: `${sensory.warm}%`, backgroundColor: '#c89e68' }}></div>
                </div>
                <span className="sensory-matrix__value">{sensory.warm}%</span>
              </div>
              <div className="sensory-matrix__row">
                <span className="sensory-matrix__label">Floral Density</span>
                <div className="sensory-matrix__bar-bg">
                  <div className="sensory-matrix__bar-fill" style={{ width: `${sensory.floral}%`, backgroundColor: '#e2bebc' }}></div>
                </div>
                <span className="sensory-matrix__value">{sensory.floral}%</span>
              </div>
              <div className="sensory-matrix__row">
                <span className="sensory-matrix__label">Spice Levels</span>
                <div className="sensory-matrix__bar-bg">
                  <div className="sensory-matrix__bar-fill" style={{ width: `${sensory.spice}%`, backgroundColor: '#af6b5c' }}></div>
                </div>
                <span className="sensory-matrix__value">{sensory.spice}%</span>
              </div>
            </div>
          </div>

          <Divisions label={t("shop.detail.use_title")} />
          <p className="shop-detail__section-body" style={{ marginBottom: 24 }}>
            {t("shop.detail.use_body")}
          </p>
          
          <Divisions label={t("shop.detail.ing_title")} />
          <p className="shop-detail__section-body-thai">
            {t("shop.detail.ing_body")}
          </p>
        </div>
      </div>
    </main>
  );
}

/* ---- Story Section -------------------------------------------------- */
function StorefrontStory() {
  const { t } = useLanguage();
  return (
    <main className="shop-story reveal">
      <section className="shop-story-intro">
        <span className="apb-eyebrow shop-story-intro__eyebrow" style={{ color: 'var(--brand-gold)', display: 'block' }}>
          {t("shop.story.eyebrow")}
        </span>
        <h1 className="shop-story-intro__title" style={{ fontFamily: "var(--font-serif-thai)" }}>
          {t("shop.story.title")}
        </h1>
        <p className="shop-story-intro__tagline">
          {t("shop.story.tagline")}
        </p>
      </section>
      
      <section className="shop-story-content">
        <div className="shop-story-content__image">
          <ImageSlot
            id="story-heritage-image"
            src="/images/red-book/red-book-on-stand.jpg"
            shape="rect"
            fit="cover"
            placeholder="Heritage Apothecary Book Archive"
          />
        </div>
        <div className="shop-story-content__body-wrapper">
          <p className="shop-story-content__lead">
            {t("shop.story.p1")}
          </p>
          <p className="shop-story-content__text" style={{ marginBottom: 32 }}>
            {t("shop.story.p2")}
          </p>
          
          <Divisions label={t("shop.story.made_title")} />
          <p className="shop-story-content__text" style={{ marginTop: 12 }}>
            {t("shop.story.made_body")}
          </p>
        </div>
      </section>
    </main>
  );
}

/* ---- Site footer ---------------------------------------------------- */
function SiteFooter() {
  const { t } = useLanguage();
  
  const col = (title, items) => (
    <div key={title}>
      <div className="shop-footer__title">{title}</div>
      {items.map(item => (
        <div className="shop-footer__item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <footer className="shop-footer">
      <div className="shop-footer__inner">
        <div>
          <Logo width={180} color="#f0ebe2" />
          <p className="shop-footer__blurb">
            {t("footer.blurb")}
          </p>
        </div>
        {col(t("shop.footer.shop"), [t("shop.footer.shopItems.0"), t("shop.footer.shopItems.1"), t("shop.footer.shopItems.2"), t("shop.footer.shopItems.3")])}
        {col(t("shop.footer.company"), [t("shop.story.eyebrow"), t("shop.footer.companyItems.1"), t("shop.footer.companyItems.2"), t("shop.footer.companyItems.3")])}
        {col(t("footer.connect"), [t("footer.connectItems.0"), t("footer.connectItems.1"), t("footer.connectItems.2")])}
      </div>
      
      <div className="shop-footer__bottom">
        <div className="shop-footer__border">
          <span>{t("footer.copy")}</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Main Shop Component ------------------------------------------- */
function Storefront() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [route, setRoute] = useState("home"); // home, story, product:<id>
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("form"); // form, success
  
  // Checkout Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formZip, setFormZip] = useState("");
  const [formInquiry, setFormInquiry] = useState("personal"); // personal, corporate

  const { t } = useLanguage();

  // Scroll reveal setup
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
  }, [route]);

  // Handle URL query params (e.g. corporate gifting)
  useEffect(() => {
    const inquiryParam = searchParams.get('inquiry');
    if (inquiryParam === 'corporate') {
      setFormInquiry("corporate");
      setIsCheckoutOpen(true);
    } else if (inquiryParam === 'stores') {
      alert("Locate Apiban Bo Plup in Old Town Songkhla, Nakorn-Nai Road. Opening Hours: 9 AM - 6 PM Daily.");
    }
  }, [searchParams]);

  const go = (target) => {
    if (target === "home" || target === "story") {
      setRoute(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target.startsWith("product:")) {
      setRoute(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep("success");
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    if (checkoutStep === "success") {
      setCheckoutStep("form");
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormAddress("");
      setFormZip("");
    }
  };

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <StorefrontNav route={route} go={go} />
      
      {route === "home" && <ShopContent go={go} />}
      {route === "story" && <StorefrontStory />}
      {route.startsWith("product:") && (
        <ProductDetail 
          id={route.split(":")[1]} 
          go={go} 
        />
      )}
      
      <SiteFooter />

      {/* --- Corporate Gifting Inquiry Modal --- */}
      <div 
        className={`modal-overlay ${isCheckoutOpen ? 'modal-overlay--open' : ''}`}
        onClick={handleCloseCheckout}
      >
        <div 
          className="checkout-modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button 
            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', zIndex: 10 }}
            onClick={handleCloseCheckout}
          >
            <X size={20} />
          </button>

          {checkoutStep === "form" ? (
            <form onSubmit={handleCheckoutSubmit} style={{ position: 'relative', zIndex: 5 }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <img src="/images/motif.svg" style={{ width: 42, margin: '0 auto 16px', opacity: 0.8 }} alt="" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, margin: '0 0 8px' }}>
                  Corporate & Gifting Inquiry
                </h2>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Let us know your event size, delivery dates, and customization options.
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name / Organization</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="Organization / Representative Name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required 
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="representative@organization.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    required 
                    value={formPhone}
                    onChange={e => setFormPhone(e.target.value)}
                    placeholder="081-234-5678"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery or Event Location</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  required 
                  value={formAddress}
                  onChange={e => setFormAddress(e.target.value)}
                  style={{ resize: 'none', borderRadius: 'var(--radius-md)' }}
                  placeholder="Address or Event Venue details"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Details / Customs</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  required
                  style={{ resize: 'none', borderRadius: 'var(--radius-md)' }}
                  placeholder="e.g. Requesting 100 sets of the Phetmongkol oil with custom wood boxes by mid-September."
                />
              </div>

              <Button 
                size="lg" 
                style={{ width: '100%', marginTop: 12 }} 
                type="submit"
              >
                Send Corporate Request
              </Button>
            </form>
          ) : (
            <div className="success-receipt" style={{ position: 'relative', zIndex: 5 }}>
              <div style={{ display: 'inline-flex', background: 'rgba(83, 97, 88, 0.08)', padding: 16, borderRadius: '50%', marginBottom: 20 }}>
                <Check size={36} style={{ color: 'var(--basil-green-800)' }} />
              </div>
              <h2 className="success-receipt__title">Inquiry Submitted</h2>
              <p className="success-receipt__desc" style={{ marginBottom: 30 }}>
                Thank you, {formName}. Your corporate gifting request has been sent to our Songkhla archive team. We will contact you via email at {formEmail} within 24 hours.
              </p>

              <Button size="lg" style={{ width: '100%' }} onClick={handleCloseCheckout}>
                Continue Journey
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StorefrontPage() {
  return (
    <Suspense fallback={<div className="portal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Apothecary Store...</div>}>
      <Storefront />
    </Suspense>
  );
}
