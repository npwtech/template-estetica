import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { splitLinesReveal } from '../lib/splitReveal.js';
import './Ritual.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: '01', title: 'Escuta', text: 'Antes de qualquer sessão, uma conversa sobre pele, cabelo, rotina e objetivos.' },
  { n: '02', title: 'Plano', text: 'Sua especialista desenha o protocolo certo pro seu momento — não um pacote padrão.' },
  { n: '03', title: 'Presença', text: 'Atendimento sem pressa, em ambiente privativo, com equipamentos de geração atual.' },
  { n: '04', title: 'Retorno', text: 'A cada visita, o plano se ajusta à sua evolução — o cuidado muda junto com você.' },
];

export default function Ritual() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ritual__head > .eyebrow', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ritual__head', start: 'top 82%' },
      });

      splitLinesReveal('.ritual__title', { start: 'top 82%' });

      gsap.utils.toArray('.ritual-step').forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ritual__row', start: 'top 85%' },
        });
      });

      gsap.fromTo(
        '.ritual__progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.ritual__row', start: 'top 75%', end: 'bottom 60%', scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ritual section" id="ritual" ref={root}>
      <div className="wrap">
        <div className="ritual__head section-head--center">
          <p className="eyebrow">O ritual</p>
          <h2 className="ritual__title">Quatro etapas, sempre na mesma ordem.</h2>
        </div>

        <div className="ritual__row">
          <span className="ritual__track" aria-hidden="true">
            <span className="ritual__progress" />
          </span>
          {STEPS.map((s) => (
            <div className="ritual-step" key={s.n}>
              <span className="ritual-step__n font-display">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
