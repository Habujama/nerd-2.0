import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import './connecting.css'

export const ConnectionLoader: React.FC = () => {
  const circlesRef = useRef<Array<SVGCircleElement | null>>([]);

  useEffect(() => {
    const elems = circlesRef.current.filter(Boolean) as SVGCircleElement[];
    if (elems.length === 0) return;

    const baseRs = elems.map((el) => Number(el.getAttribute("r")) || 20);

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    elems.forEach((el, i) => {
      const newR = baseRs[i] + 10;
      tl.to(
        el,
        {
          attr: { r: newR },
          strokeOpacity: 0.4,
          duration: 0.8,
          ease: "power1.inOut",
        },
        i * 0.25 // zpoždění pro každý kruh (stagger)
      ).to(
        el,
        {
          attr: { r: baseRs[i] },
          strokeOpacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        i * 0.25 + 0.8
      );
    });

    tl.play();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[0, 1, 2, 3].map((i) => {
          const stroke = i === 0 ? "#00CC66" : i === 1 ? "#66FFB2" : i === 2 ? "#fff" : "#00CC66";
          const r = 20 + i * 25;
          return (
            <circle
              key={i}
              ref={(el) => {
                circlesRef.current[i] = el;
              }}
              cx="120"
              cy="120"
              r={r}
              stroke={stroke}
              strokeWidth={2.5}
              fill="none"
            />
          );
        })}
      </svg>

      <p
        className="animate-pulse"
        style={{
          color: "white",
          fontFamily: "monospace",
          fontSize: "1.1rem",
        }}
      >
        Přepojuji na bitchat...
      </p>
    </div>
  );
};

export default ConnectionLoader;
