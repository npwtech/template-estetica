import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { splitLinesReveal } from '../lib/splitReveal.js';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const QUESTIONS = [
  {
    q: 'Preciso saber exatamente o que fazer antes de agendar?',
    a: 'Não. A avaliação inicial existe pra isso: você chega com a dúvida ou o incômodo, e a especialista ajuda a entender qual protocolo faz sentido — sem venda de pacote fechado na primeira conversa.',
  },
  {
    q: 'Em quanto tempo vejo resultado?',
    a: 'Varia por protocolo, mas a maioria dos tratamentos de pele mostra evolução visível entre a 2ª e a 4ª sessão. Sua especialista explica o prazo esperado do seu caso já na avaliação, sem promessa genérica.',
  },
  {
    q: 'Posso cancelar ou remarcar um horário?',
    a: 'Sim, sem burocracia. Só pedimos aviso com alguma antecedência para liberar o horário pra outra cliente da agenda.',
  },
  {
    q: 'Atendem peles sensíveis ou com contraindicações?',
    a: 'Sim. Toda avaliação inclui um levantamento de histórico de pele e saúde antes de qualquer procedimento, e ajustamos ou trocamos a técnica sempre que necessário.',
  },
  {
    q: 'Preciso fechar um pacote fechado de sessões?',
    a: 'Não. Trabalhamos com protocolos individuais que podem ser revistos a cada retorno — você não fica presa a um número de sessões definido antes de começar.',
  },
];

export default function FAQ() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq__head > .eyebrow', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq__head', start: 'top 82%' },
      });

      splitLinesReveal('.faq__title', { start: 'top 82%' });

      gsap.from('.faq-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq__list', start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="faq section" id="duvidas" ref={root}>
      <div className="wrap faq__wrap">
        <div className="faq__head">
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="faq__title">Antes de você perguntar.</h2>
          <p className="faq__lead">
            As respostas que mais pedimos pra explicar antes de alguém
            marcar o primeiro horário.
          </p>
        </div>

        <div className="faq__list">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.q}>
                <button
                  className="faq-item__trigger"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className="faq-item__panel" id={`faq-panel-${i}`} role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
