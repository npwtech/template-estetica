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
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160',
  },
  {
    quote:
      'O atendimento é no tempo certo — nunca me senti apressada. E os resultados na minha pele apareceram já no segundo mês.',
    name: 'Fernanda A.',
    detail: 'Protocolo de pele',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160',
  },
  {
    quote:
      'Troquei de salão três vezes até achar esse. A diferença é a escuta antes de qualquer procedimento.',
    name: 'Juliana M.',
    detail: 'Cliente desde 2023',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=160',
  },
];

export default function Testimonials() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      splitLinesReveal('.testimonials__head h2', { start: 'top 85%' });

      gsap.utils.toArray('.review-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: (i % 3) * 0.06,
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
          <p className="eyebrow-label">Depoimentos</p>
          <h2>Quem já passou pela cadeira.</h2>
        </div>

        <div className="testimonials__grid">
          {REVIEWS.map((r) => (
            <blockquote className="review-card" key={r.name}>
              <p>"{r.quote}"</p>
              <footer>
                <img className="review-card__avatar" src={r.avatar} alt={r.name} loading="lazy" />
                <div className="review-card__who">
                  <span className="review-card__name">{r.name}</span>
                  <span className="review-card__detail">{r.detail}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
