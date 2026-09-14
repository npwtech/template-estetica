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

function ArrowIcon({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" style={{ transform: dir === 'prev' ? 'scaleX(-1)' : undefined }}>
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  {
    src: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Aplicação de sérum durante limpeza de pele facial',
    caption: 'Sérum aplicado com calma, etapa a etapa da limpeza de pele.',
    ratio: '4/5',
    tone: 3,
  },
  {
    src: 'https://images.pexels.com/photos/4586713/pexels-photo-4586713.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Cliente recebendo tratamento facial com dermaroller dourado',
    caption: 'Microestímulo com dermaroller: um passo do protocolo de renovação facial.',
    ratio: '3/4',
    tone: 1,
  },
  {
    src: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Massagem relaxante nas costas em ambiente de spa',
    caption: 'Uma massagem que desacelera antes mesmo de tratar.',
    ratio: '4/3',
    tone: 2,
  },
  {
    src: 'https://images.pexels.com/photos/7750144/pexels-photo-7750144.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Estação de atendimento com espelho e iluminação de salão',
    caption: 'Cada estação pensada pra reduzir o ritmo assim que você senta.',
    ratio: '3/4',
    tone: 3,
  },
  {
    src: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Lavagem de cabelo na pia do salão',
    caption: 'O ritual do cabelo começa na lavagem, não na tesoura.',
    ratio: '4/5',
    tone: 1,
  },
  {
    src: 'https://images.pexels.com/photos/10028673/pexels-photo-10028673.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Profissional finalizando cabelo longo com escova e secador',
    caption: 'Finalização fio a fio, sem pressa para secar.',
    ratio: '4/3',
    tone: 3,
  },
  {
    src: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Sérum facial entre pétalas de rosa',
    caption: 'Produtos selecionados — sem substituto genérico no protocolo.',
    ratio: '1/1',
    tone: 2,
  },
  {
    src: 'https://images.pexels.com/photos/15507425/pexels-photo-15507425.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Resultado de penteado preso em cabelo loiro cacheado',
    caption: 'Um penteado que dura o dia inteiro sem pesar.',
    ratio: '3/4',
    tone: 1,
  },
  {
    src: 'https://images.pexels.com/photos/4783335/pexels-photo-4783335.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Aplicação de esmalte vermelho durante manicure',
    caption: 'Esmaltação em gel: acabamento que não lasca fácil.',
    ratio: '4/3',
    tone: 2,
  },
  {
    src: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Óleos essenciais e lavanda para aromaterapia',
    caption: 'O cuidado começa antes de qualquer procedimento — pelo ambiente.',
    ratio: '4/5',
    tone: 3,
  },
];

export default function Gallery() {
  const root = useRef(null);
  const viewportRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const closeLightbox = () => setActiveIndex(null);
  const navLightbox = (dir) => {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i + dir + PHOTOS.length) % PHOTOS.length;
    });
  };

  const scrollByCard = (dir) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const card = viewport.querySelector('.gallery__item');
    const amount = (card ? card.getBoundingClientRect().width : 300) + 24;
    viewport.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const updateEdges = () => {
      setAtStart(viewport.scrollLeft <= 4);
      setAtEnd(viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4);
    };
    updateEdges();
    viewport.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);

    const ctx = gsap.context(() => {
      gsap.from('.gallery__head > *', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: { trigger: '.gallery__head', start: 'top 82%' },
      });

      // a galeria é uma vitrine horizontal independente — nunca prende o
      // scroll vertical da página. É só arrastar, usar as setas, ou o
      // gesto horizontal do trackpad/toque; a página sempre continua.
      gsap.from('.gallery__item, .gallery__end', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: viewport, start: 'top 85%' },
      });
    }, root);

    return () => {
      viewport.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
      ctx.revert();
    };
  }, []);

  return (
    <section className="gallery section" id="historias" ref={root}>
      <div className="wrap gallery__head">
        <p className="eyebrow">Por dentro</p>
        <h2>O estúdio, sessão a sessão.</h2>
        <div className="gallery__head-row">
          <p className="gallery__hint">Arraste para o lado, ou clique numa foto para ampliar com descrição.</p>
          <div className="gallery__controls">
            <button type="button" className="gallery__arrow" onClick={() => scrollByCard(-1)} disabled={atStart} aria-label="Fotos anteriores">
              <ArrowIcon dir="prev" />
            </button>
            <button type="button" className="gallery__arrow" onClick={() => scrollByCard(1)} disabled={atEnd} aria-label="Próximas fotos">
              <ArrowIcon dir="next" />
            </button>
          </div>
        </div>
      </div>

      <div className={`gallery__viewport ${atStart ? 'gallery__viewport--start' : ''} ${atEnd ? 'gallery__viewport--end' : ''}`} ref={viewportRef}>
        <div className="gallery__track">
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

      <Lightbox photos={PHOTOS} index={activeIndex} onClose={closeLightbox} onNav={navLightbox} onJump={setActiveIndex} />
    </section>
  );
}
