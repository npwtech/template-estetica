import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PhotoSlot from './PhotoSlot.jsx';
import Lightbox from './Lightbox.jsx';
import './Gallery.css';

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  {
    src: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Aplicação de sérum durante limpeza de pele facial',
    ratio: '4/5',
    tone: 3,
  },
  {
    src: 'https://images.pexels.com/photos/4586713/pexels-photo-4586713.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Cliente recebendo tratamento facial com dermaroller dourado',
    ratio: '3/4',
    tone: 1,
  },
  {
    src: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Massagem relaxante nas costas em ambiente de spa',
    ratio: '4/3',
    tone: 2,
  },
  {
    src: 'https://images.pexels.com/photos/7750144/pexels-photo-7750144.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Estação de atendimento com espelho e iluminação de salão',
    ratio: '3/4',
    tone: 3,
  },
  {
    src: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Lavagem de cabelo na pia do salão',
    ratio: '4/5',
    tone: 1,
  },
  {
    src: 'https://images.pexels.com/photos/10028673/pexels-photo-10028673.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Profissional finalizando cabelo longo com escova e secador',
    ratio: '4/3',
    tone: 3,
  },
  {
    src: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Sérum facial entre pétalas de rosa',
    ratio: '1/1',
    tone: 2,
  },
  {
    src: 'https://images.pexels.com/photos/15507425/pexels-photo-15507425.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Resultado de penteado preso em cabelo loiro cacheado',
    ratio: '3/4',
    tone: 1,
  },
  {
    src: 'https://images.pexels.com/photos/4783335/pexels-photo-4783335.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Aplicação de esmalte vermelho durante manicure',
    ratio: '4/3',
    tone: 2,
  },
  {
    src: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Óleos essenciais e lavanda para aromaterapia',
    ratio: '4/5',
    tone: 3,
  },
];

export default function Gallery() {
  const root = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const closeLightbox = () => setActiveIndex(null);
  const navLightbox = (dir) => {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i + dir + PHOTOS.length) % PHOTOS.length;
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery__head > *', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: { trigger: '.gallery__head', start: 'top 82%' },
      });

      const mm = gsap.matchMedia();

      // desktop: a faixa fica presa na tela e desliza na horizontal
      // conforme o usuário rola verticalmente — "role e ela passa".
      mm.add('(min-width: 900px)', () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const getDistance = () => track.scrollWidth - viewport.clientWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: viewport,
            start: 'top top',
            end: () => '+=' + getDistance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.from('.gallery__item, .gallery__end', {
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: viewport, start: 'top 85%' },
        });
      });

      // mobile/tablet: sem pin (evita travar o scroll da página) — a
      // faixa vira uma vitrine que "passa para o lado" com o dedo.
      mm.add('(max-width: 899px)', () => {
        gsap.from('.gallery__item, .gallery__end', {
          opacity: 0,
          x: 40,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.gallery__track', start: 'top 88%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery section" id="historias" ref={root}>
      <div className="wrap gallery__head">
        <p className="eyebrow">Por dentro</p>
        <h2>O estúdio, sessão a sessão.</h2>
        <p className="gallery__hint">Role para ver a galeria passar — clique numa foto para ampliar</p>
      </div>

      <div className="gallery__viewport" ref={viewportRef}>
        <div className="gallery__track" ref={trackRef}>
          {PHOTOS.map((p, i) => (
            <button
              type="button"
              className="gallery__item"
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Ampliar foto: ${p.alt}`}
            >
              <PhotoSlot src={p.src} alt={p.alt} ratio={p.ratio} tone={p.tone} />
              <span className="gallery__item-badge" aria-hidden="true"><ExpandIcon /></span>
            </button>
          ))}
          <a className="gallery__end" href="#agendar">
            <span className="gallery__end-mark">Studio Estética</span>
            <span className="gallery__end-cta">Agendar minha avaliação →</span>
          </a>
        </div>
      </div>

      <Lightbox photos={PHOTOS} index={activeIndex} onClose={closeLightbox} onNav={navLightbox} />
    </section>
  );
}
