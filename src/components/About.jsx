import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PhotoSlot from './PhotoSlot.jsx';
import { splitLinesReveal } from '../lib/splitReveal.js';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const DIFFERENTIALS = [
  'Protocolos revisados por dermatologistas parceiros',
  'Produtos selecionados, sem marca genérica',
  'Ambiente privativo e climatizado',
  'Equipe em atualização técnica constante',
];

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about__img--back', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.about__img--front', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.about__copy > .eyebrow, .about__copy > h2', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__copy', start: 'top 78%' },
      });

      splitLinesReveal('.about__text', { start: 'top 85%' });
      splitLinesReveal('.about__quote', { start: 'top 88%' });

      gsap.from('.about__differentials li', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__differentials', start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="estudio" ref={root}>
      <div className="wrap about__wrap">
        <div className="about__visual">
          <div className="about__img about__img--back">
            <PhotoSlot
              src="https://images.pexels.com/photos/7195805/pexels-photo-7195805.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Estação de lavagem em salão de beleza moderno e iluminado"
              ratio="3/4"
              tone={3}
            />
          </div>
          <div className="about__img about__img--front">
            <PhotoSlot
              src="https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=700"
              alt="Profissional aplicando coloração no cabelo de uma cliente"
              ratio="1/1"
              tone={2}
            />
          </div>
        </div>

        <div className="about__copy">
          <p className="eyebrow">O estúdio</p>
          <h2>Menos vitrine. Mais escuta.</h2>
          <p className="about__text">
            Nascemos da ideia de que um bom atendimento começa muito antes da
            cadeira. Cada visita abre com uma conversa curta sobre rotina,
            pele e objetivos — e só depois vem a técnica.
          </p>
          <p className="about__text">
            Trabalhamos com marcas selecionadas, em um espaço desenhado para
            reduzir o ritmo assim que você entra pela porta.
          </p>
          <blockquote className="about__quote">
            “Autoestima não se maquia — se constrói, sessão após sessão.”
            <cite>Fundadora do estúdio</cite>
          </blockquote>

          <ul className="about__differentials">
            {DIFFERENTIALS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
