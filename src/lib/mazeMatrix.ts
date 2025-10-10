export type NodeType = 'WIN' | 'FAIL' | 'INACTIVE';

export interface Node {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
}

export function nodesFromMatrix(id: string, pattern: string, level = 0): Node[] {
  const nodes: Node[] = [];
    const spacing = 800 / (pattern.length + 1);
    
function randomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

function randomLetters(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function getLabel(type: NodeType): string {
  // formát 32CON45422311 = dvě čísla + 3 písmena + 8 číslic
  const prefix = randomDigits(2);
  const middle = randomLetters(3);
  const suffix = randomDigits(8);

  let label = prefix + middle + suffix;

  switch (type) {
    case 'WIN': {
      // zajistit, že třetí znak je W
      const chars = label.split('');
      chars[6] = 'W';
      label = chars.join('');
      break;
    }

    case 'FAIL': {
      // zajistit, že obsahuje tři 6, ale nemá W na třetí pozici
      const failLabel = label.replace(/W/g, 'Z'); // jistota, že tam nebude W
      const chars = failLabel.split('');
      // náhodně vyber 3 pozice pro 6
      const indices = new Set<number>();
      while (indices.size < 3) {
        const idx = Math.floor(Math.random() * chars.length);
        if (idx !== 2) indices.add(idx); // nikdy na třetí pozici
      }
      for (const i of indices) chars[i] = '6';
      label = chars.join('');
      break;
    }

    case 'INACTIVE': {
      // úplně náhodný, ale nesplňuje podmínky WIN ani FAIL
      while (true) {
        const candidate = prefix + randomLetters(3) + randomDigits(8);
        if (candidate[2] !== 'W' && (candidate.match(/6/g)?.length ?? 0) < 3) {
          label = candidate;
          break;
        }
      }
      break;
    }
  }

  return label;
}
 
  pattern.split('').forEach((char, i) => {
    const type =
      char === 'W' ? 'WIN' :
      char === 'F' ? 'FAIL' :
      'INACTIVE';
    nodes.push({
      id: `${id}-${level}-${i}`,
      label: getLabel(type),
      type,
      x: spacing * (i + 1),
      y: 100 + level * 120,
    });
  });

  return nodes;
}
