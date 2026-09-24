'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Script from 'next/script';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit';

const RecaptchaV2 = forwardRef(function RecaptchaV2({ onChange }, ref) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  function renderWidget() {
    if (!SITE_KEY || !containerRef.current || !window.grecaptcha?.ready) return;
    if (widgetIdRef.current !== null) return;

    window.grecaptcha.ready(() => {
      if (!containerRef.current || widgetIdRef.current !== null) return;
      if (containerRef.current.childElementCount > 0) return;

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: (token) => onChangeRef.current?.(token),
        'expired-callback': () => onChangeRef.current?.(''),
        'error-callback': () => onChangeRef.current?.(''),
      });
    });
  }

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch {
          // Widget may already be gone during unmount.
        }
      }
      widgetIdRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
      onChangeRef.current?.('');
    },
    getValue() {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        return window.grecaptcha.getResponse(widgetIdRef.current);
      }
      return '';
    },
  }));

  if (!SITE_KEY) {
    return <p className="text-sm text-red-600">Captcha is not configured.</p>;
  }

  return (
    <div>
      <Script id="google-recaptcha-v2" src={SCRIPT_SRC} strategy="afterInteractive" onLoad={renderWidget} />
      <div ref={containerRef} className="g-recaptcha" />
    </div>
  );
});

export default RecaptchaV2;
