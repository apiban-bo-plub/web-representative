"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Logo from '@/components/brand/Logo';

/*
  Shared portal footer. Previously duplicated verbatim in the home, heritage and
  apothecary pages, where the link columns were inert text and half the labels
  were hardcoded English. Items are now {label, target} pairs so the Explore
  column can navigate through the host page's own `go` handler, and both label
  lists come from the locale arrays that already existed but were never read.
*/

// Index-aligned with footer.exploreItems: Collection, The Red Book, Heritage, Journal
const EXPLORE_TARGETS = ["collection", "story", "story", null];

export default function PortalFooter({ go }) {
  const { t } = useLanguage();

  const asItems = (key, targets = []) => {
    const labels = t(key);
    if (!Array.isArray(labels)) return [];
    return labels.map((label, i) => ({ label, target: targets[i] || null }));
  };

  const col = (heading, items) => (
    <div key={heading}>
      <div className="pf__h">{heading}</div>
      {items.map(({ label, target }) =>
        target && go ? (
          <div
            className="pf__i pf__i--link"
            key={label}
            role="link"
            tabIndex={0}
            onClick={() => go(target)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                go(target);
              }
            }}
          >
            {label}
          </div>
        ) : (
          <div className="pf__i" key={label}>{label}</div>
        )
      )}
    </div>
  );

  return (
    <footer className="pf">
      <div className="pf__grid">
        <div>
          <Logo width={170} color="#f0ebe2" />
          <p className="pf__blurb">{t("footer.blurb")}</p>
        </div>
        {col(t("footer.explore"), asItems("footer.exploreItems", EXPLORE_TARGETS))}
        {col(t("footer.company"), asItems("footer.companyItems"))}
        {col(t("footer.connect"), asItems("footer.connectItems"))}
      </div>
      <div className="pf__base">
        <span>{t("footer.copy")}</span>
        <span>{t("footer.privacy")}</span>
      </div>
    </footer>
  );
}
