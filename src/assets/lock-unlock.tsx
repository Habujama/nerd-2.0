import { useRef, useEffect, useState, type JSX } from "react";
import { gsap } from "gsap";
import { Howl } from "howler";

// Realistická kyberpunková verze se stavem odemknuto/zamknuto a zvukem sirény
// - React + TypeScript + GSAP + Howler
// - Transparentní pozadí, barvy dle zadání
// - Animace trvá cca 5 vteřin
// - Přehrává zvuk sirény po odemčení

export default function LockUnlockRealistic(): JSX.Element {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const shackleRef = useRef<SVGPathElement | null>(null);
  const bodyRef = useRef<SVGRectElement | null>(null);
  const keyholeRef = useRef<SVGPathElement | null>(null);
  const sweepRef = useRef<SVGRectElement | null>(null);
  const scanGroupRef = useRef<SVGGElement | null>(null);
  const accessTextRef = useRef<SVGTextElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [finishedMessage, setFinishedMessage] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Zvuk sirény (přehrává se po odemknutí)
  const sirenSound = useRef(
    new Howl({
      src: ["https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"],
      volume: 0.35,
    })
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const shackle = shackleRef.current;
    const body = bodyRef.current;
    const keyhole = keyholeRef.current;
    const sweep = sweepRef.current;
    const scans = scanGroupRef.current
      ? Array.from(scanGroupRef.current.querySelectorAll("rect"))
      : [];
    const accessText = accessTextRef.current;

    if (!shackle || !body || !keyhole || !sweep || !accessText) return;

    gsap.set([shackle, body, keyhole, sweep, accessText], { transformOrigin: "50% 50%" });
    gsap.set(shackle, { y: 0, rotation: 0 });
    gsap.set(accessText, { opacity: 0, y: 8 });
    gsap.set(sweep, { x: -220, opacity: 0.0 });
    gsap.set(scans, { opacity: 0, x: -6 });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setFinishedMessage("Zabezpečení Očistce dočasně vyřazeno z provozu");
        setIsUnlocked(true);
        sirenSound.current.play();
      },
    });

    // Dlouhá verze (~5s)
    tl.to(keyhole, { scale: 1.1, duration: 0.3, ease: "power1.inOut" }, 0);
    tl.to(scans, { opacity: 1, x: 0, duration: 1.0, stagger: 0.08, ease: "power2.out" }, 0.2);
    tl.to(sweep, { x: 260, opacity: 0.9, duration: 0.8, ease: "power4.out" }, 0.4);
    tl.to(shackle, { rotation: -38, y: -10, duration: 1.2, ease: "back.out(1.2)" }, 1.2);
    tl.to(body, { y: -3, duration: 0.08, yoyo: true, repeat: 6, ease: "power1.inOut" }, 1.5);
    tl.to(keyhole, { scale: 1.6, duration: 0.5, ease: "power2.out" }, 2.4);
    tl.to(keyhole, { scale: 1.0, duration: 0.4, ease: "power2.inOut" }, 2.9);
    tl.to(accessText, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.4);
    tl.to(scans, { opacity: 0, x: 6, duration: 0.5, stagger: 0.04, ease: "power2.in" }, 4.2);
    tl.to(sweep, { opacity: 0, duration: 0.4, ease: "power2.in" }, 4.4);
    tl.to(shackle, { rotation: -18, y: -6, duration: 0.4, ease: "power2.out" }, 4.5);

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  function handleUnlock() {
    if (!tlRef.current) return;
    setFinishedMessage(null);
    setIsUnlocked(false);
    tlRef.current.restart();
  }

  function handleLock() {
    // Reset back to locked
    setIsUnlocked(false);
    setFinishedMessage(null);
    gsap.to([shackleRef.current, bodyRef.current, keyholeRef.current], {
      clearProps: "all",
    });
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg
        ref={svgRef}
        width={300}
        height={260}
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Realistic unlock animation"
        style={{ background: "transparent", display: "block" }}
      >
        <defs>
          <linearGradient id="matte" x1="0" x2="1">
            <stop offset="0%" stopColor="#0A0F0D" />
            <stop offset="100%" stopColor="#222522" />
          </linearGradient>
          <linearGradient id="shine" x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="sweep-mask">
            <rect x="0" y="0" width="220" height="220" />
          </clipPath>
        </defs>

        <g ref={scanGroupRef} opacity={0.0}>
          {[...Array(7)].map((_, i) => (
            <rect
              key={i}
              x={48 - (i % 2) * 8}
              y={85 + i * 6}
              width={124}
              height={2}
              rx={1}
              fill="#00CC66"
              opacity={0.08 + (i % 3) * 0.03}
            />
          ))}
        </g>

        <g clipPath="url(#sweep-mask)">
          <rect
            ref={sweepRef}
            x={-220}
            y={60}
            width={60}
            height={100}
            rx={30}
            fill="#66FFB2"
            opacity={0.06}
            transform="rotate(-14 0 0)"
          />
        </g>

        <g transform="translate(0,6)">
          <path
            ref={shackleRef}
            d="M70 75 C70 50, 150 50, 150 75"
            fill="none"
            stroke="#bfcfc2"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'url(#glow)', stroke: '#bfcfc2' }}
          />

          <rect
            ref={bodyRef}
            x={60}
            y={78}
            width={100}
            height={80}
            rx={12}
            fill="url(#matte)"
            stroke="#0A0F0D"
            strokeWidth={1}
          />

          <rect x={62} y={82} width={96} height={18} rx={8} fill="url(#shine)" opacity={0.12} />
          <rect x={64} y={90} width={92} height={64} rx={8} fill="none" stroke="#00CC66" strokeWidth={2} opacity={0.85} />

          <circle cx={80} cy={110} r={2.5} fill="#111" />
          <circle cx={140} cy={110} r={2.5} fill="#111" />

          <g transform="translate(110,120)">
            <path
              ref={keyholeRef}
              d="M0 -6 a6 6 0 1 1 0 12 a6 6 0 1 1 0 -12 M0 4 v8"
              fill="#ffffff"
              stroke="#66FFB2"
              strokeWidth={1}
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,204,102,0.45))' }}
            />
          </g>
        </g>

        <text
          ref={accessTextRef}
          x="110"
          y="36"
          textAnchor="middle"
          fontSize={12}
          fontFamily="monospace"
          fill="#66FFB2"
          style={{ letterSpacing: 1.2 }}
        >
          {[..."ACCESS GRANTED"].map((ch, i) => (
            <tspan key={i}>{ch}</tspan>
          ))}
        </text>

        <text x="110" y="210" textAnchor="middle" fontSize={10} fill="#66FFB2" style={{ fontFamily: 'monospace' }}>
          OČISTEC — SECURE NODE
        </text>
      </svg>

      {!isUnlocked ? (
        <button
          onClick={handleUnlock}
          disabled={isUnlocked}
          aria-label="Start realistic unlock animation"
          style={{
            background: "transparent",
            border: "1px solid #00CC66",
            color: isUnlocked ? "#446F5A" : "#66FFB2",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: isUnlocked ? "default" : "pointer",
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
          Odemknout
        </button>
      ) : (
        <button
          onClick={handleLock}
          aria-label="Re-lock security"
          style={{
            background: "transparent",
            border: "1px solid #00CC66",
            color: "#66FFB2",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
        Znovu zabezpečit
        </button>
      )}

      {finishedMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 8,
            fontFamily: "monospace",
            color: "#66FFB2",
            background: "transparent",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(102,255,178,0.12)",
          }}
        >
          {finishedMessage}
        </div>
      )}
    </div>
  );
}
