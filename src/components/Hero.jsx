import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // sequência única de entrada — a única animação "não disparada pelo
      // usuário" do site, como recomenda o brief: um só momento orquestrado.
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      tl.set(root.current, { visibility: 'visible' })
        .from(document.querySelector('.navbar'), { yPercent: -100, duration: 0.7, ease: 'power2.out', clearProps: 'transform' }, 0)
        .from('.hero__media img', { scale: 1.15, duration: 1.8, ease: 'power2.out' }, 0)
        .from('.hero__kicker', { opacity: 0, y: 14, duration: 0.6 }, 0.35)
        .from(
          '.hero__title-line',
          { yPercent: 115, duration: 1, stagger: 0.09, ease: 'power4.out' },
          0.45
        )
        .from('.hero__sub', { opacity: 0, y: 16, duration: 0.7 }, 0.95)
        .from('.hero__actions', { opacity: 0, y: 16, duration: 0.7 }, 1.05)
        .from('.hero__stat', { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, 1.2);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="topo" ref={root}>
      <div className="hero__media">
        <img
          src="https://images.pexels.com/photos/7010890/pexels-photo-7010890.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Mulher se cuidando, aplicando produto de skincare no rosto"
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="wrap hero__wrap">
        <div className="hero__copy">
          <p className="hero__kicker eyebrow-label">Estúdio de estética &amp; bem-estar</p>
          <h1 className="hero__title">
            <span className="hero__title-row"><span className="hero__title-line">Beleza que</span></span>
            <span className="hero__title-row"><span className="hero__title-line">se sente antes</span></span>
            <span className="hero__title-row"><span className="hero__title-line">de se ver.</span></span>
          </h1>
          <p className="hero__sub">
            Um espaço pensado para pele, cabelo e autocuidado — com técnicas
            avançadas, produtos selecionados e uma equipe que trata cada
            visita como a primeira.
          </p>
          <div className="hero__actions">
            <a href="#agendar" className="btn btn-primary">Agendar horário</a>
            <a href="#servicos" className="btn btn-outline-inverse">Ver serviços</a>
          </div>
        </div>
      </div>

      <div className="wrap hero__stats">
        <div className="hero__stat">
          <span>12</span>
          <p>anos cuidando de peles e histórias na região</p>
        </div>
        <div className="hero__stat">
          <span>+3.400</span>
          <p>atendimentos realizados</p>
        </div>
        <div className="hero__stat">
          <span>9</span>
          <p>especialistas na equipe</p>
        </div>
        <div className="hero__stat">
          <span>4,9</span>
          <p>de avaliação média das clientes</p>
        </div>
      </div>
    </section>
  );
}
