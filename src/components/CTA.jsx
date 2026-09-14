import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta__eyebrow', {
        opacity: 0,
        y: 12,
        duration: 0.6,
        scrollTrigger: { trigger: '.cta__eyebrow', start: 'top 90%' },
      });
      gsap.from('.cta__title-line', {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.cta__title', start: 'top 85%' },
      });
      gsap.from('.cta__foot > *', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: { trigger: '.cta__foot', start: 'top 90%' },
      });

      // faixa de texto em looping contínuo — anda sozinha o tempo todo,
      // não só quando a visitante rola a página.
      const track = root.current.querySelector('.cta__marquee-track');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reduced) {
        gsap.to(track, {
          xPercent: -50,
          duration: 26,
          ease: 'none',
          repeat: -1,
        });
      } else {
        gsap.set(track, { xPercent: -25 });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta section" id="agendar" ref={root}>
      <div className="wrap">
        <p className="cta__eyebrow eyebrow">Comece hoje</p>
        <h2 className="cta__title">
          <span className="cta__title-row"><span className="cta__title-line">Sua próxima versão</span></span>
          <span className="cta__title-row"><span className="cta__title-line">começa numa conversa.</span></span>
        </h2>
        <div className="cta__foot">
          <p>Avaliação individual, sem pacote fechado. Terça a sábado, das 9h às 19h.</p>
          <div className="cta__actions">
            <a href="#" className="btn btn-primary btn-lg">
              Agendar pelo WhatsApp <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <a href="tel:+5500000000000" className="btn btn-outline-inverse btn-lg">(00) 00000-0000</a>
          </div>
          <p className="cta__microcopy">Sem compromisso · sem letra miúda</p>
        </div>
      </div>

      <div className="cta__marquee" aria-hidden="true">
        <div className="cta__marquee-track">
          <span>Studio Estética</span>
          <span>✦</span>
          <span>Agende sua avaliação</span>
          <span>✦</span>
          <span>Studio Estética</span>
          <span>✦</span>
          <span>Agende sua avaliação</span>
          <span>✦</span>
          <span>Studio Estética</span>
          <span>✦</span>
          <span>Agende sua avaliação</span>
          <span>✦</span>
          <span>Studio Estética</span>
          <span>✦</span>
          <span>Agende sua avaliação</span>
          <span>✦</span>
        </div>
      </div>
    </section>
  );
}
