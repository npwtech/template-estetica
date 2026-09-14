import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { splitLinesReveal } from '../lib/splitReveal.js';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philosophy__eyebrow', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.philosophy__eyebrow', start: 'top 85%' },
      });

      splitLinesReveal('.philosophy__title', { start: 'top 80%' });
      splitLinesReveal('.philosophy__col', { start: 'top 85%', stagger: 0.06 });
      splitLinesReveal('.philosophy__pivot', { start: 'top 88%' });

      gsap.from('.philosophy__link', {
        opacity: 0,
        y: 12,
        duration: 0.6,
        scrollTrigger: { trigger: '.philosophy__link', start: 'top 92%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy section" ref={root}>
      <div className="wrap philosophy__wrap">
        <p className="philosophy__eyebrow eyebrow">Uma coisa que aprendemos</p>

        <h2 className="philosophy__title">
          Você não deveria precisar chegar<br />
          sabendo <em className="font-display">o que precisa.</em>
        </h2>

        <div className="philosophy__cols">
          <p className="philosophy__col">
            A maioria dos lugares espera que você já saiba: qual
            procedimento, qual produto, qual resultado. E quando você não
            sabe, sente que está tomando o tempo de alguém.
          </p>
          <p className="philosophy__col">
            Aqui a ordem é outra. Antes de qualquer procedimento existe uma
            conversa sobre sua pele, seu cabelo, sua rotina — e só depois um
            plano que faz sentido pra você, não pra agenda do estúdio.
          </p>
        </div>

        <p className="philosophy__pivot font-display">
          É esse plano — não o produto do momento — que muda o resultado.
        </p>

        <a href="#cuidado" className="philosophy__link btn-text">
          Ver como cuidamos de cada frente <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
