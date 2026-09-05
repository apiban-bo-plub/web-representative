"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

import Logo from '@/components/brand/Logo';
import PortalFooter from '@/components/brand/PortalFooter';
import Button from '@/components/core/Button';
import LanguageSelector from '@/components/LanguageSelector';

/* ---- Nav (identical to the other portal pages) --------------------- */
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

const INQUIRY_TYPES = ["general", "wholesale", "corporate", "press"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  inquiry: "general",
  message: "",
  website: "", // honeypot — hidden from humans, tempting to bots
};

/* ---- Confirmation ---------------------------------------------------
   Deliberately free of the `.reveal` class: the IntersectionObserver only
   sweeps on mount, so anything mounted later would stay at opacity 0. -- */
function SentPanel({ onReset }) {
  const { t } = useLanguage();
  return (
    <div className="ct-sent" role="status" aria-live="polite">
      <span className="ct-sent__seal" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48">
          <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity=".45" />
          <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="1" opacity=".8" />
          <path d="M16.5 24.5l5 5 10-11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className="ct-sent__h">{t("contact.success.title")}</h2>
      <span className="ct-rule" aria-hidden="true" />
      <p className="ct-sent__b">{t("contact.success.desc")}</p>
      <Button variant="secondary" size="md" onClick={onReset}>
        {t("contact.success.again")}
      </Button>
    </div>
  );
}

function ContactForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [form, setForm] = useState(EMPTY);
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const [errorKey, setErrorKey] = useState(null);

  // Deep links such as /contact?inquiry=corporate open on the right subject.
  useEffect(() => {
    const wanted = searchParams.get("inquiry");
    if (wanted && INQUIRY_TYPES.includes(wanted)) {
      setForm((f) => ({ ...f, inquiry: wanted }));
    }
  }, [searchParams]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorKey(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorKey(data.error === "rate_limited" ? "rateLimited" : "generic");
        setStatus("error");
        return;
      }
      setForm(EMPTY);
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrorKey("generic");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <SentPanel onReset={() => setStatus("idle")} />;
  }

  const sending = status === "sending";

  const field = (name, { type = "text", required = false, autoComplete, maxLength }) => (
    <label className="ct-field">
      <span className="ct-field__lbl">
        {t(`contact.fields.${name}`)}
        {required && <i className="ct-field__req" aria-hidden="true">*</i>}
      </span>
      <input
        className="ct-field__in"
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        value={form[name]}
        onChange={set(name)}
      />
    </label>
  );

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate>
      <div className="ct-form__grid">
        {field("name", { required: true, autoComplete: "name", maxLength: 120 })}
        {field("email", { type: "email", required: true, autoComplete: "email", maxLength: 200 })}
        {field("phone", { type: "tel", autoComplete: "tel", maxLength: 60 })}
        {field("company", { autoComplete: "organization", maxLength: 160 })}
      </div>

      <label className="ct-field">
        <span className="ct-field__lbl">{t("contact.fields.inquiry")}</span>
        <span className="ct-select">
          <select
            className="ct-field__in ct-field__in--select"
            name="inquiry"
            value={form.inquiry}
            onChange={set("inquiry")}
          >
            {INQUIRY_TYPES.map((id) => (
              <option key={id} value={id}>{t(`contact.inquiry.${id}`)}</option>
            ))}
          </select>
          <svg className="ct-select__chev" viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
            <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </label>

      <label className="ct-field">
        <span className="ct-field__lbl">
          {t("contact.fields.message")}
          <i className="ct-field__req" aria-hidden="true">*</i>
        </span>
        <textarea
          className="ct-field__in ct-field__in--area"
          name="message"
          required
          rows={7}
          maxLength={5000}
          value={form.message}
          onChange={set("message")}
        />
        <span className="ct-field__count">{form.message.length} / 5000</span>
      </label>

      {/* Honeypot: off-screen and out of tab order, so only bots fill it. */}
      <div className="ct-hp" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={set("website")}
          />
        </label>
      </div>

      {status === "error" && (
        <p className="ct-form__error" role="alert">
          {t(`contact.error.${errorKey || "generic"}`)}
        </p>
      )}

      <div className="ct-form__actions">
        <Button
          size="lg"
          type="submit"
          disabled={sending}
          style={sending ? { opacity: 0.6, cursor: 'progress' } : undefined}
        >
          {sending ? t("contact.sending") : t("contact.submit")}
        </Button>
        <span className="ct-form__note">{t("contact.note")}</span>
      </div>
    </form>
  );
}

function ContactBody() {
  const { t } = useLanguage();
  const connect = t("footer.connectItems");

  return (
    <section className="ct-split">
      <aside className="ct-aside">
        <div className="ct-aside__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ct-aside__mark" src="/images/motif.svg" alt="" aria-hidden="true" />
          <div className="apb-eyebrow ct-aside__eyebrow">{t("contact.eyebrow")}</div>
          <h1 className="ct-aside__h">{t("contact.title")}</h1>
          <span className="ct-rule ct-rule--light" aria-hidden="true" />
          <p className="ct-aside__b">{t("contact.desc")}</p>

          <div className="ct-channels">
            <div className="ct-channels__h">{t("footer.connect")}</div>
            {(Array.isArray(connect) ? connect : []).map((item) => (
              <div className="ct-channels__i" key={item}>{item}</div>
            ))}
          </div>

          <p className="ct-aside__sig">{t("contact.signature")}</p>
        </div>
      </aside>

      <div className="ct-panel">
        <div className="ct-panel__inner">
          <Suspense fallback={<div className="ct-form__note">…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  const router = useRouter();

  const go = (id) => {
    if (id === "top") return router.push("/");
    if (id === "story") return router.push("/heritage");
    if (id === "apothecary") return router.push("/apothecary");
    if (id === "collection") return router.push("/#collection");
    if (id.startsWith("contact")) return window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <div className="portal contact-page">
      <PortalNav go={go} />
      <ContactBody />
      <PortalFooter go={go} />
    </div>
  );
}
