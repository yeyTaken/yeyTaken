"use client";

import { Button, Card, CardBody, CardHeader, Link } from "@heroui/react";
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
  const [isScriptReady, setIsScriptReady] = useState(false);

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
    if (typeof window !== "undefined" && window.turnstile) {
      setIsScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (isScriptReady && !isCaptchaValid) {
      renderCaptcha();
    }
  }, [isCaptchaValid, isScriptReady, renderCaptcha]);

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
    <section className="flex w-full min-h-[calc(100svh-4rem)] items-center px-4 py-8 sm:px-6 sm:py-10">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
      />

      <div className="mx-auto w-full max-w-6xl">
        <Card
          shadow="sm"
          className="relative w-full border border-foreground/10 bg-background/50 backdrop-blur-md"
        >
          <CardHeader className="p-6 !pb-0 sm:p-8 sm:!pb-0 md:pr-56">
            <div className="space-y-1.5">
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-foreground/55">
                <TbMail size={16} aria-hidden />
                Contato
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Vamos conversar
              </h1>
            </div>
          </CardHeader>

          <div className="pointer-events-none absolute right-6 top-6 hidden md:flex md:right-8 md:top-8">
            <div className="flex size-28 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-primary/80 shadow-inner shadow-primary/10">
              <TbMail size={76} aria-hidden />
            </div>
          </div>

          <CardBody className="grid gap-4 p-6 !pt-1 sm:gap-4 sm:p-8 sm:!pt-2 md:grid-cols-[minmax(0,1fr)_240px] md:items-start">
            <div className="space-y-4">
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/75 sm:text-base">
                {isCaptchaValid
                  ? "Captcha validado. Você já pode usar os contatos abaixo."
                  : "Para visualizar meu e-mail e o botão do Gmail, resolva o captcha abaixo."}
              </p>

              {!isCaptchaValid ? (
                <>
                  {turnstileSiteKey ? (
                    <div className="space-y-3">
                      <div ref={captchaRef} className="min-h-[65px] w-fit" />

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
                </>
              ) : (
                <>
                  <p className="max-w-2xl text-sm leading-relaxed text-foreground/75 sm:text-base">
                    Você pode falar comigo pelo e-mail:
                  </p>

                  <Link
                    href={`mailto:${settings.email}`}
                    underline="hover"
                    color="primary"
                    className="inline-flex w-fit items-center gap-2 text-base font-medium"
                  >
                    <TbMail size={18} aria-hidden />
                    {settings.email}
                  </Link>

                  <div>
                    <Button
                      as="a"
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noreferrer"
                      color="primary"
                      variant="flat"
                      radius="lg"
                      className="inline-flex items-center gap-2 font-semibold"
                    >
                      Enviar pelo Gmail
                      <TbArrowRight size={16} aria-hidden />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
