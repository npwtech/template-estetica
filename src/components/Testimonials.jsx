import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { splitLinesReveal } from '../lib/splitReveal.js';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    quote:
      'Fui pela primeira vez sem saber o que precisava e saí com um plano de cuidado inteiro montado pra mim. Isso muda tudo.',
    name: 'Camila R.',
    detail: 'Cliente desde 2022',
  },
  {
    quote:
      'O atendimento é no tempo certo — nunca me senti apressada. Os resultados na minha pele apareceram já no segundo mês.',
    name: 'Fernanda A.',
    detail: 'Protocolo de pele',
  },
  {
    quote:
      'Troquei de salão três vezes até achar esse. A diferença é a escuta antes de qualquer procedimento.',
    name: 'Juliana M.',
    detail: 'Cliente desde 2023',
  },
];

export default function Testimonials() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      splitLinesReveal('.testimonials__head h2', { start: 'top 85%' });

      gsap.from('.testimonials__rating', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        scrollTrigger: { trigger: '.testimonials__head', start: 'top 85%' },
      });

      gsap.utils.toArray('.review-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials__grid', start: 'top 85%' },
        });
        splitLinesReveal(card.querySelector('p'), { start: 'top 88%', delay: 0.1 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials section" id="depoimentos" ref={root}>
      <div className="wrap">
        <div className="testimonials__head">
          <p className="eyebrow">Histórias</p>
          <h2>Quem já passou pela cadeira.</h2>
          <p className="testimonials__rating">
            <strong className="font-display">4,9</strong> de média em mais de 3.400 atendimentos
          </p>
        </div>

        <div className="testimonials__grid">
          {REVIEWS.map((r, i) => (
            <blockquote className={`review-card ${i === 0 ? 'review-card--featured' : ''}`} key={r.name}>
              <p className="font-display">"{r.quote}"</p>
              <footer>
                <span className="review-card__name">{r.name}</span>
                <span className="review-card__detail">{r.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
