export const generateCode = (): string => {
  const rand = (len: number, chars: string) =>
    Array.from({ length: len }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');

  const digits = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const part1 = rand(2, digits);
  const part2 = rand(3, letters);
  const part3 = rand(8, digits);

  return `${part1}${part2}${part3}`;
};
