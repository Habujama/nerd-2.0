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

  pattern.split('').forEach((char, i) => {
    const type =
      char === 'W' ? 'WIN' :
      char === 'F' ? 'FAIL' :
      'INACTIVE';
    nodes.push({
      id: `${id}-${level}-${i}`,
      label: `${id}-${i}`,
      type,
      x: spacing * (i + 1),
      y: 100 + level * 120,
    });
  });

  return nodes;
}
