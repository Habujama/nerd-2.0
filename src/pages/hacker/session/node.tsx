import { useEffect, useRef, useState, type JSX } from 'react';
import { gsap } from 'gsap';
import type { Node, NodeType } from '../../../lib/mazeMatrix';
import './node.css';

interface NodesProps {
  allNodes: Node[][];
  onNodeClick: (node: Node, nodeLevel: number) => void | Promise<void>;
  feedbackNode?: { id: string; type: NodeType } | null;
}

const Nodes = ({ allNodes, onNodeClick, feedbackNode }: NodesProps) => {
  const circlesRef = useRef<Record<string, SVGCircleElement | null>>({});
  const svgRef = useRef<SVGSVGElement | null>(null);
  const textRef = useRef<Record<string, SVGTextElement | null>>({});
  const [nodeColors, setNodeColors] = useState<Record<string, string>>({});
  const linesByLevelRef = useRef<Record<number, SVGLineElement[]>>({});

  // --- Pulzování uzlů ---
  useEffect(() => {
    const elems = allNodes
      .flat()
      .map((n) => circlesRef.current[n.id])
      .filter((el): el is SVGCircleElement => !!el);

    if (elems.length === 0) return;

    const baseRs = elems.map((el) => Number(el.getAttribute('r') ?? 50));
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power1.inOut' },
    });

    elems.forEach((el, i) => {
      const grow = baseRs[i] + 8;
      tl.to(el, { attr: { r: grow }, duration: 0.9 }, i * 0.12).to(
        el,
        { attr: { r: baseRs[i] }, duration: 0.9 },
        i * 0.12 + 0.9,
      );
    });

    return () => {
      tl.kill();
    };
  }, [allNodes]);

  // --- Persistující změna barev + text po kliknutí ---
  useEffect(() => {
    if (!feedbackNode) return;

    const { id, type } = feedbackNode;
    const el = circlesRef.current[id];
    const text = textRef.current[id];
    if (!el) return;

    let color = '#1E2A26';
    let label = '';

    switch (type) {
      case 'FAIL':
        color = '#FF3333';
        label = 'Breach detected';
        break;
      case 'INACTIVE':
        color = '#3399FF';
        label = 'Prázdný uzel';
        break;
      case 'WIN':
        color = '#00CC66';
        break;
    }

    setNodeColors((prev) => ({ ...prev, [id]: color }));
    if (label && text) text.textContent = label;
  }, [feedbackNode]);

  // --- Animace jen pro nově přidané čáry ---
  useEffect(() => {
    if (!feedbackNode || feedbackNode.type !== 'WIN') return;
    const svg = svgRef.current;
    if (!svg) return;

    const lines = svg.querySelectorAll('line');
    const newLines = Array.from(lines).filter((line) => !line.dataset.animated);
    if (!newLines || newLines.length === 0) return;
    newLines.forEach((line) => {
      const length = Math.hypot(
        parseFloat(line.getAttribute('x2')!) -
          parseFloat(line.getAttribute('x1')!),
        parseFloat(line.getAttribute('y2')!) -
          parseFloat(line.getAttribute('y1')!),
      );

      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      line.dataset.animated = 'true'; // označíme jako už animovanou

      // animace růstu čáry
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.out',
      });
    });

    const tl = gsap.timeline();

    // natažení linek
    tl.fromTo(
      newLines,
      { attr: { 'stroke-dasharray': 600, 'stroke-dashoffset': 600 } },
      {
        attr: { 'stroke-dashoffset': 0 },
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.03,
      },
    );

    // krátký pulz po dokončení
    tl.to(
      newLines,
      {
        strokeWidth: 4,
        stroke: '#00FFAA',
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      },
      '>',
    );

    return () => {
      tl.kill();
    };
  }, [feedbackNode, allNodes.length]);

  // --- Generování čar ---
  const lines: JSX.Element[] = [];
  linesByLevelRef.current = {};

  for (let i = 0; i < allNodes.length; i++) {
    const level = allNodes[i];
    const sameLevelLines: SVGLineElement[] = [];

    // čáry mezi uzly na stejné úrovni
    for (let j = 0; j < level.length - 1; j++) {
      const a = level[j];
      const b = level[j + 1];
      const id = `${a.id}-${b.id}`;
      lines.push(
        <line
          key={id}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke='#0A3322'
          strokeWidth={2}
          opacity={0.4}
          ref={(el) => {
            if (el) sameLevelLines.push(el);
          }}
        />,
      );
    }

    linesByLevelRef.current[i] = sameLevelLines;

    // čáry mezi úrovněmi
    if (i < allNodes.length - 1) {
      const next = allNodes[i + 1];
      const levelLines: SVGLineElement[] = [];

      for (const a of level) {
        for (const b of next) {
          const id = `${a.id}-${b.id}`;
          lines.push(
            <line
              key={id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke='#0A3322'
              strokeWidth={3}
              opacity={0.6}
              ref={(el) => {
                if (el) sameLevelLines.push(el);
              }}
            />,
          );
        }
      }

      // uložíme čáry podle úrovně, aby animace věděla, které jsou nové
      linesByLevelRef.current[i] = [
        ...(linesByLevelRef.current[i] || []),
        ...levelLines,
      ];
    }
  }

  // --- Vykreslení uzlů ---
  return (
    <svg viewBox='0 0 800 1000' className='node' ref={svgRef}>
      <defs>
        <linearGradient id='myGradient'>
          <stop offset='0%' stopColor='#00CC66' />
          <stop offset='50%' stopColor='#fff' />
          <stop offset='100%' stopColor='#66FFB2' />
        </linearGradient>
      </defs>

      {lines}

      {allNodes.map((levelNodes, levelIdx) =>
        levelNodes.map((n) => {
          const isActive = levelIdx === allNodes.length - 1;
          const fillColor = nodeColors[n.id] || (isActive ? '#1E2A26' : '#111');
          const textColor = nodeColors[n.id]
            ? '#fff'
            : isActive
            ? '#66FFB2'
            : '#3C6E57';

          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onClick={() => isActive && onNodeClick(n, levelIdx)}
            >
              <circle
                id={n.id}
                r={50}
                ref={(el) => {
                  circlesRef.current[n.id] = el;
                }}
                fill={fillColor}
                stroke='url(#myGradient)'
                strokeWidth={3}
                style={{
                  cursor: isActive ? 'pointer' : 'not-allowed',
                  opacity: isActive ? 1 : 0.4,
                }}
              />
              <text
                x={0}
                y={6}
                textAnchor='middle'
                fontSize={10}
                fill={textColor}
                ref={(el) => {
                  textRef.current[n.id] = el;
                }}
                style={{ cursor: 'pointer' }}
              >
                {n.label}
              </text>
            </g>
          );
        }),
      )}
    </svg>
  );
};

export default Nodes;
