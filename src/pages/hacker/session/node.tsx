import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Node, NodeType } from '../../../lib/mazeMatrix';
import './node.css';

interface NodesProps {
  nodes: Node[];
  onNodeClick: (node: Node) => void | Promise<void>;
  feedbackNode?: { id: string; type: NodeType } | null;
}

const Nodes = ({ nodes, onNodeClick, feedbackNode }: NodesProps) => {
  const circlesRef = useRef<Record<string, SVGCircleElement | null>>({});
  const textRef = useRef<Record<string, SVGTextElement | null>>({});

  // main gentle pulsing animation for all visible nodes
  useEffect(() => {
    const elems = nodes
      .map((n) => circlesRef.current[n.id])
      .filter((el): el is SVGCircleElement => !!el);

    if (elems.length === 0) return;

    const baseRs = elems.map((el) => {
      const r = el.getAttribute('r');
      return r ? Number(r) : 50;
    });

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power1.inOut' },
    });

    elems.forEach((el, i) => {
      const grow = baseRs[i] + 8;
      tl.to(
        el,
        {
          attr: { r: grow },
          duration: 0.9,
        },
        i * 0.12,
      ).to(
        el,
        {
          attr: { r: baseRs[i] },
          duration: 0.9,
        },
        i * 0.12 + 0.9,
      );
    });

    return () => {
      tl.kill();
    };
  }, [nodes]);

  // feedback animation (one-shot) for clicked node
  useEffect(() => {
    if (!feedbackNode) return;

    const el = circlesRef.current[feedbackNode.id];
    const text = textRef.current[feedbackNode.id];

    if (!el) return;

    // store original stroke so we can restore it
    const originalR = Number(el.getAttribute('r') ?? 50);

    const fbTl = gsap.timeline();

    if (feedbackNode.type === 'FAIL') {
      // flash red and expand/shrink a few times, then keep red briefly
      fbTl
        .to(el, { attr: { r: originalR + 12 }, duration: 0.18 })
        .to(
          el,
          {
            attr: { r: originalR },
            duration: 0.18,
            repeat: 3,
            yoyo: true,
          },
          '>',
        )
        .to(el, { stroke: '#FF3333', duration: 0.1 }, 0)
        .to(el, { fill: '#FF3333', duration: 0.1 }, 0)
        .to(text, { fill: '#fff', duration: 0.1 }, 0)
        .to(text, { textContent: 'Breach detected', duration: 5 });
      fbTl.call(() => {
        // leave red for a short time, caller (Session) will handle navigation/cleanup
      });
    } else if (feedbackNode.type === 'INACTIVE') {
      // single soft blue blink
      fbTl
        .to(el, { attr: { r: originalR + 6 }, duration: 0.2 })
        .to(el, { attr: { r: originalR }, duration: 0.2 })
        .to(el, { stroke: '#3399FF', duration: 0.05 })
        .to(el, { fill: '#3399FF', duration: 0.05 })
        .to(text, { fill: '#fff', duration: 0.05 })
        .to(text, { textContent: 'Prázdný uzel', duration: 5 });
    } else if (feedbackNode.type === 'WIN') {
      // grow and set green, then pulse slightly
      fbTl
        .to(el, {
          attr: { r: originalR + 14 },
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(el, { attr: { r: originalR }, duration: 0.35, ease: 'power2.in' })
        .to(el, { stroke: '#66FFB2', duration: 0.08 }, 0)
        .to(el, { fill: '#00CC66', duration: 0.08 }, 0)
        .to(text, { fill: '#1E2A26', duration: 0.08 }, 0);
    }

    return () => {
      fbTl.kill();
      // restore in cleanup too
      try {
        el.setAttribute('r', String(originalR));
      } catch (e) {
        console.info(e);
      }
    };
  }, [feedbackNode]);

  return (
    <svg viewBox='0 0 800 1000' className='node'>
      <defs>
        <linearGradient id='myGradient'>
          <stop offset='0%' stopColor='#00CC66' />
          <stop offset='50%' stopColor='#fff' />
          <stop offset='100%' stopColor='#66FFB2' />
        </linearGradient>
      </defs>

      {nodes.map((n) => (
        <g
          key={n.id}
          transform={`translate(${n.x},${n.y})`}
          onClick={() => onNodeClick(n)}
        >
          <circle
            id={n.id}
            r={50}
            ref={(el) => {
              circlesRef.current[n.id] = el;
            }}
            fill='#1E2A26'
            stroke='url(#myGradient)'
            strokeWidth={3}
            style={{ cursor: 'pointer' }}
          />
          <text
            x={0}
            y={6}
            textAnchor='middle'
            fontSize={10}
            fill='#66FFB2'
            ref={(el) => {
              textRef.current[n.id] = el;
            }}
            style={{ cursor: 'pointer' }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Nodes;
