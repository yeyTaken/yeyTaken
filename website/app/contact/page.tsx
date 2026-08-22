"use client";

import { Link } from "@heroui/react";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbArrowRight, TbMail } from "react-icons/tb";

import { settings } from "@/lib";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "auto" | "light" | "dark";
};

type TurnstileApi = {
  render: (
    container: string | HTMLElement,
    options: TurnstileRenderOptions,
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function ContactPage() {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings.email)}`;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const resetCaptcha = useCallback(() => {
    if (
      typeof window === "undefined" ||
      !window.turnstile ||
      !widgetIdRef.current
    ) {
      return;
    }

    window.turnstile.reset(widgetIdRef.current);
  }, []);

  const verifyCaptchaToken = useCallback(async (token: string) => {
    setIsVerifying(true);
    setCaptchaError("");

    try {
      const response = await fetch("/api/turnstile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = (await response.json()) as { ok?: boolean };

      if (response.ok && data.ok) {
        setIsCaptchaValid(true);
        return;
      }

      setCaptchaError("Não foi possível validar o captcha. Tente novamente.");
      setIsCaptchaValid(false);
      resetCaptcha();
    } catch {
      setCaptchaError("Erro de rede ao validar captcha. Tente novamente.");
      setIsCaptchaValid(false);
      resetCaptcha();
    } finally {
      setIsVerifying(false);
    }
  }, [resetCaptcha]);

  const renderCaptcha = useCallback(() => {
    if (
      !turnstileSiteKey ||
      !captchaRef.current ||
      typeof window === "undefined" ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(captchaRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => {
        void verifyCaptchaToken(token);
      },
      "expired-callback": () => {
        setIsCaptchaValid(false);
        setCaptchaError("Captcha expirou. Resolva novamente.");
      },
      "error-callback": () => {
        setIsCaptchaValid(false);
        setCaptchaError("Erro ao carregar captcha. Atualize a página.");
      },
      theme: "auto",
    });
  }, [turnstileSiteKey, verifyCaptchaToken]);

  useEffect(() => {
    return () => {
      if (
        typeof window === "undefined" ||
        !window.turnstile ||
        !widgetIdRef.current
      ) {
        return;
      }

      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, []);

  return (
    <section className="flex min-h-[calc(100svh-4rem)] w-full items-start px-4 py-6 sm:items-center sm:px-6 sm:py-10">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          if (!isCaptchaValid) {
            renderCaptcha();
          }
        }}
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-foreground/55">
            <TbMail size={16} aria-hidden />
            Contato
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vamos conversar
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            {isCaptchaValid
              ? "Seu acesso já foi validado. Você pode usar os contatos abaixo."
              : "Resolva o captcha para liberar meu e-mail e o atalho direto para o Gmail."}
          </p>
        </div>

        {!isCaptchaValid ? (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Verificação de segurança
            </p>
            <p className="text-sm leading-relaxed text-foreground/70">
              Resolva o captcha abaixo para continuar.
            </p>

            {turnstileSiteKey ? (
              <div className="space-y-3">
                <div ref={captchaRef} className="min-h-16.25 w-full overflow-hidden" />

                {isVerifying ? (
                  <p className="text-sm text-foreground/70">Validando captcha...</p>
                ) : null}

                {captchaError ? (
                  <p className="text-sm text-danger">{captchaError}</p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-warning">
                Captcha indisponível. Configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
                e `TURNSTILE_SECRET_KEY`.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Tudo pronto</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`mailto:${settings.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/15 sm:w-fit"
              >
                <TbMail size={18} aria-hidden />
                {settings.email}
              </Link>

              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:w-fit"
              >
                Enviar pelo Gmail
                <TbArrowRight size={16} aria-hidden />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
