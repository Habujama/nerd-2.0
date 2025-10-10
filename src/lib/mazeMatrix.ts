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
        const chars = label.split('');

        // 1️⃣ nikdy neobsahovat tři šestky
        while ((chars.join('').match(/6/g) || []).length === 3) {
          // náhodně změnit jednu z nich
          const i = chars.findIndex((c) => c === '6');
          if (i !== -1) chars[i] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // náhodné písmeno
        }

        // 2️⃣ zajistit, že šestý znak je W
        if (chars.length > 6) chars[6] = 'W';

        label = chars.join('');
        break;
      }

      case 'FAIL': {
        // odstranit W z šesté pozice
        const chars = label.split('');
        if (chars[6] === 'W') chars[6] = 'Z';

        // vyčistit všechny existující 6, aby jich bylo přesně 3
        for (let i = 0; i < chars.length; i++) {
          if (chars[i] === '6') chars[i] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }

        // vyber 3 náhodné pozice pro 6 (ne víc, ne míň)
        const indices = new Set<number>();
        while (indices.size < 3) {
          const idx = Math.floor(Math.random() * chars.length);
          if (idx !== 6) indices.add(idx); // nikdy na šesté pozici
        }
        for (const i of indices) chars[i] = '6';

        label = chars.join('');
        break;
      }

      case 'INACTIVE': {
        // náhodně, ale bez tří šestek a bez W na šesté pozici
        while (true) {
          const candidate = prefix + randomLetters(3) + randomDigits(8);
          const sixCount = (candidate.match(/6/g) || []).length;
          if (candidate[6] !== 'W' && sixCount !== 3) {
            label = candidate;
            break;
          }
        }
        break;
      }

      default:
        break;
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
