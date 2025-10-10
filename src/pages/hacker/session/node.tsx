import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { type Node } from '../../../lib/mazeMatrix';


interface NodesProps {
    nodes: Node[],
    onNodeClick:(node: Node) => void | Promise<void>
}

const Nodes = ({ nodes, onNodeClick }: NodesProps) => {
const circlesRef = useRef<Array<SVGCircleElement | null>>([]);

useEffect(() => {
  const elems = circlesRef.current.filter(Boolean) as SVGCircleElement[];
  if (elems.length === 0) return;

  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(elems, {
    attr: { r: 60 },
    strokeOpacity: 0.4,
    duration: 3,
    ease: "power1.inOut",
    stagger: 0.8,
  });

    return () => {
    tl.kill();
  };
}, [nodes]);
    
    return (
      <svg
        viewBox='0 0 800 1000'
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      >
        <defs>
          <linearGradient id='myGradient'>
            <stop offset='0%' stopColor='#00CC66' />
            <stop offset='50%' stopColor='#fff' />
            <stop offset='100%' stopColor='#66FFB2' />
          </linearGradient>
        </defs>
        {nodes.map((n, i) => (
          <g
            key={n.id}
            onClick={() => onNodeClick(n)}
            transform={`translate(${n.x},${n.y})`}
            className='node'
          >
            <circle
              r={50}
              ref={(el) => {
                circlesRef.current[i] = el;
              }}
              fill='none'
              stroke='url(#myGradient)'
            />
            <text x={0} y={6} textAnchor='middle' fontSize={10} fill='#66FFB2'>
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    );
}

export default Nodes
