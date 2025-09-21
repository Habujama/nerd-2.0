import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const texts = [
  'Zjevení, které Bůh dal Ježíši Kristu, aby ukázal svým služebníkům, co se má brzo stát. Naznačil to prostřednictvím anděla svému služebníku Janovi. Ten dosvědčil Boží slovo a svědectví Ježíše Krista, vše, co viděl.',
  'Andělu církve ve Smyrně piš: Toto praví ten první i poslední, který byl mrtev a je živ: Vím o tvém soužení a tvé chudobě, ale jsi bohat; vím, jak tě urážejí ti, kdo si říkají židé, ale nejsou, nýbrž je to spolek satanův!',
  'Hle, sešlu na ni nemoc a do velikého soužení uvrhnu ty, kdo s ní cizoloží, jestliže se od jejích činů neodvrátí; a její děti zahubím. Tu poznají všechny církve, že já vidím do nitra i srdce člověka, a každému z vás odplatím podle vašich činů.',
  'Blaze tomu, kdo předčítá slova tohoto proroctví. Ale to mám proti tobě, že trpíš ženu Jezábel, která se vydává za prorokyni a svým učením svádí moje služebníky ke smilstvu a k účasti na modlářských hostinách.',
  'Neboj se toho, co máš vytrpět. Hle, ďábel má některé z vás uvrhnout do vězení, abyste prošli zkouškou, a budete mít soužení po deset dní. Buď věrný až na smrt, a dám ti vítězný věnec života.',
  '„Vím, kde bydlíš: tam, kde je trůn satanův. Avšak pevně se držíš mého jména a nezapřel jsi víru ve mne ani ve dnech, kdy můj věrný svědek Antipas byl zabit mezi vámi, tam, kde bydlí satan.',
  'Kdo má uši, slyš, co Duch praví církvím: Tomu, kdo zvítězí, dám jíst ze skryté many; dám mu bílý kamének, a na tom kaménku je napsáno nové jméno, které nezná nikdo než ten, kdo je dostává.“'
];

export default function RevelationLoop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll('.revelation-text');
    if (!lines) return;

    // Výška viewportu a rozestupy
    const vh = window.innerHeight;
    const lineHeight = vh / texts.length;

    // Rozmístění textů po výšce
    lines.forEach((el, i) => {
      (el as HTMLElement).style.top = `${i * lineHeight}px`;
    });

    // Animace: posunout všechny texty vlevo a opakovat
    gsap.to(lines, {
      x: `-${vh}px`,
      duration: 50,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: (x, target) => {
          // Po dosažení konce se vrátí na začátek
          const idx = Array.from(lines).indexOf(target);
          return `${((idx * lineHeight + parseFloat(x)) % vh)}px`;
        }
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
          {texts.map((t, i) => (
                  <span
                      className="revelation-text"
                      key={i}
                      style={{
                          position: 'absolute',
                          right: '0',
                          transform: 'translateX(-10%)',
                          fontSize: '1.2rem',
                          color: gsap.utils.random(['#fff', '#66FFB2', '#00CC66']),
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          whiteSpace: 'pre-line',
                          opacity: 0.8,
                      }}
                  >
                      {t}
                  </span>
              )
          )}
    </div>
  );
}
