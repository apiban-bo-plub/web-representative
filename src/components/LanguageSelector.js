import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' }
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: 'none',
          border: 'none',
          padding: '0 8px',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-body)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-green)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-body)'}
      >
        {language}
        <span style={{ fontSize: '9px', opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>▼</span>
      </button>
      
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            background: 'rgba(240, 235, 226, 0.96)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--makara-300)',
            borderRadius: '8px',
            padding: '6px 0',
            minWidth: '110px',
            boxShadow: '0 6px 20px rgba(57, 48, 45, 0.1)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 16px',
                textAlign: 'left',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: language === lang.code ? 'var(--brand-green)' : 'var(--text-body)',
                fontWeight: language === lang.code ? '600' : '400',
                cursor: 'pointer',
                transition: 'background 0.2s ease, color 0.2s ease',
                width: '100%',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--makara-200)';
                e.currentTarget.style.color = 'var(--text-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = language === lang.code ? 'var(--brand-green)' : 'var(--text-body)';
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
