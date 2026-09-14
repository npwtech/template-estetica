import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__wrap > div', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer__wrap', start: 'top 88%' },
      });

      gsap.fromTo(
        '.footer__watermark',
        { xPercent: 4 },
        {
          xPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={root}>
      <div className="wrap footer__wrap">
        <div className="footer__brand">
          <span className="footer__mark font-display">Studio Estética</span>
          <p className="footer__tagline">Você não precisa saber o que quer. Só precisa começar.</p>
          <p>Rua das Palmeiras, 210 — Centro<br />Sua Cidade, UF</p>
        </div>

        <div className="footer__col">
          <h4>Horários</h4>
          <p>Ter – Sex: 9h às 19h</p>
          <p>Sábado: 9h às 17h</p>
          <p>Domingo e segunda: fechado</p>
        </div>

        <div className="footer__col">
          <h4>Contato</h4>
          <p>(00) 00000-0000</p>
          <p>contato@studioestetica.com.br</p>
        </div>

        <div className="footer__col">
          <h4>Redes</h4>
          <p><a href="#">Instagram</a></p>
          <p><a href="#">WhatsApp</a></p>
        </div>
      </div>

      <div className="footer__watermark" aria-hidden="true">Studio Estética</div>

      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} Studio Estética. Todos os direitos reservados.</span>
        <a href="#agendar">Agendar avaliação</a>
      </div>
    </footer>
  );
}
