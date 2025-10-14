import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./power-disconnect.css";

const PowerDisconnect = () => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const boltRef = useRef<SVGPathElement | null>(null);
  const leftLineRef = useRef<SVGPathElement | null>(null);
  const rightLineRef = useRef<SVGPathElement | null>(null);
    const [active, setActive] = useState(false);
    const [finished, setFinished] = useState(false);

  useEffect(() => {
      setFinished(false)
      setActive(false)
    // jemné vibrování kruhu
      if (circleRef.current) {
          gsap.to(circleRef.current, {
              scale: 1.2,
              transformOrigin: "50% 50%",
              repeat: -1,
              yoyo: true,
              duration: 1,
              ease: "sine.inOut",
          });
      }
      if (boltRef.current) {
          gsap.to(boltRef.current, {
        scale: 0.9,
        transformOrigin: "30% 50%",
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "sine.inOut",
      });
      }
    
  }, []);

  const handleClick = () => {
    if (active) return;
    setActive(true);

    const tl = gsap.timeline({ onComplete: () => setActive(false) });

    // blesk bliká
    if (boltRef.current) {
      tl.to(boltRef.current, {
        opacity: 1,
        duration: 0.1,
        repeat: 6,
        yoyo: true,
        ease: "power1.inOut",
      });
      tl.to(boltRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.in",
      });
    }

    // linky se roztáhnou do stran
    if (leftLineRef.current && rightLineRef.current) {
      tl.to(
        leftLineRef.current,
        { x: -600, duration: 2, ease: "power3.inOut" },
        0.2
      );
      tl.to(
        rightLineRef.current,
        { x: 600, duration: 2, ease: "power3.inOut" },
        "<"
      );
    }

    // kruh se rozvibruje a pak zmizí
    if (circleRef.current) {
      tl.to(
        circleRef.current,
        {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 6,
          ease: "power2.inOut",
        },
        0.2
      );
      tl.to(circleRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "power2.in",
      });
    }
      
    setTimeout(() => setFinished(true), 3000)
      
  };

  return (
    <div className="power-wrap">
      <svg
        width="auto"
        height="350px"
        preserveAspectRatio="none"
        viewBox="0 0 3167 3167"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
    >
        {/* levá linka */}
        <path
          ref={leftLineRef}
          d="M50,1795.83l1179.17,0"
          style={{ fill: "none", stroke: "#5cf0a5", strokeWidth: "79.17px" }}
        />

        {/* pravá linka */}
        <path
          ref={rightLineRef}
          d="M1941.67,1795.83l1179.17,0"
          style={{ fill: "none", stroke: "#5cf0a5", strokeWidth: "79.17px" }}
        />

        {/* kruh */}
        <circle
          ref={circleRef}
          cx="1527.08"
          cy="1795.83"
          r="497.917"
          style={{
            fill: "#5cf0a5",
            stroke: "#fff",
            strokeWidth: "79.17px",
            filter: "drop-shadow(0 0 25px #5cf0a5)",
          }}
        />

        {/* blesk */}
        <path
          ref={boltRef}
          d="M1275,1054.17l210.417,670.833l-347.917,8.333l445.833,745.834l-56.25,-612.5l414.584,-70.834l-666.667,-741.666Z"
          style={{ fill: "#00cc66", filter: "drop-shadow(0 0 10px #00cc66)" }}
        />
      </svg>

      <button className="power-btn" onClick={handleClick} disabled={active || finished}>
              {finished ? 'Napájení přerušeno' :
                  ( active? "Probíhá odpojení...": "Odpojit napájení" )
              }
              
      </button>
    </div>
  );
};

export default PowerDisconnect;
