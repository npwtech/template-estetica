import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';

// linha marquee infinita: o mesmo conjunto de palavras duplicado lado a lado,
// deslocado em -50% no eixo X — assim o loop nunca "emenda" visivelmente.
function MarqueeRow({ word, repeat, className, trackRef }) {
  const items = Array.from({ length: repeat });
  return (
    <div className={`loader__track ${className}`} ref={trackRef}>
      {[0, 1].map((half) => (
        <div className="loader__track-half" key={half} aria-hidden={half === 1}>
          {items.map((_, i) => (
            <span className="loader__word-group" key={i}>
              <span className="loader__word">{word}</span>
              <span className="loader__sep" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// linhas empilhadas do topo até quase o rodapé, alternando palavra e
// sentido a cada linha — a "parede" de texto que se repete "um pro lado,
// o outro pro outro, e assim por diante".
const ROWS = [
  { word: 'SEU', repeat: 10, style: 'loader__track--one' },
  { word: 'STUDIO', repeat: 8, style: 'loader__track--two' },
  { word: 'SEU', repeat: 10, style: 'loader__track--one' },
  { word: 'STUDIO', repeat: 8, style: 'loader__track--two' },
  { word: 'SEU', repeat: 10, style: 'loader__track--one' },
  { word: 'STUDIO', repeat: 8, style: 'loader__track--two' },
];

export default function Loader() {
  const [done, setDone] = useState(false);
  const root = useRef(null);
  const tracks = useRef([]);
  const counter = useRef(null);
  const fill = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const proxy = { val: 0 };

      if (!reduced) {
        tracks.current.forEach((el, i) => {
          if (!el) return;
          const goesLeft = i % 2 === 0;
          gsap.set(el, { xPercent: goesLeft ? 0 : -50 });
          gsap.to(el, { xPercent: goesLeft ? -50 : 0, duration: 9 + i * 0.6, ease: 'none', repeat: -1 });
        });

        gsap.to(proxy, {
          val: 92,
          duration: 3.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(proxy.val)).padStart(2, '0');
            if (fill.current) fill.current.style.width = `${proxy.val}%`;
          },
        });
      } else if (counter.current) {
        counter.current.textContent = '92';
        if (fill.current) fill.current.style.width = '92%';
      }
    }, root);

    let finished = false;
    const minDelay = reduced ? 500 : 1500;
    const start = Date.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, minDelay - (Date.now() - start));

      gsap.delayedCall(wait / 1000, () => {
        ctx.kill();
        const exit = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            setDone(true);
          },
        });

        exit
          .call(() => { if (counter.current) counter.current.textContent = '100'; }, null, 0)
          .to(fill.current, { width: '100%', duration: 0.25, ease: 'power1.out' }, 0)
          .call(() => window.dispatchEvent(new Event('app:loaded')), null, reduced ? 0.15 : 0.35);

        if (reduced) {
          exit.to(root.current, { autoAlpha: 0, duration: 0.4 }, 0.15);
        } else {
          exit
            .to('.loader__row, .loader__meta', { autoAlpha: 0, y: -10, duration: 0.35, stagger: 0.04 }, 0.15)
            .to(root.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, 0.35);
        }
      });
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    const fallback = setTimeout(finish, 6000);

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fallback);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={root} role="status" aria-label="Carregando Studio Estética">
      <div className="loader__rows">
        {ROWS.map((row, i) => (
          <div className="loader__row" key={i}>
            <MarqueeRow
              word={row.word}
              repeat={row.repeat}
              className={row.style}
              trackRef={(el) => { tracks.current[i] = el; }}
            />
          </div>
        ))}
      </div>

      <div className="loader__meta">
        <span className="loader__meta-label">Studio Estética</span>
        <span className="loader__meta-count">
          <span ref={counter}>00</span>
          <span className="loader__meta-count-sep">%</span>
        </span>
      </div>

      <div className="loader__bar">
        <span className="loader__bar-fill" ref={fill} />
      </div>
    </div>
  );
}
