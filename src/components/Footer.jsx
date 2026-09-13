import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const WAVE_DOWN = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
const WAVE_FLAT = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

export default function Footer() {
  const root = useRef(null);
  const wavePath = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        toggleActions: 'play pause resume reverse',
        onEnter: (self) => {
          const velocity = self.getVelocity();
          const variation = velocity / 10000;

          gsap.fromTo(
            wavePath.current,
            { morphSVG: WAVE_DOWN },
            {
              duration: 2,
              morphSVG: WAVE_FLAT,
              ease: `elastic.out(${1 + variation}, ${1 - variation})`,
              overwrite: true,
            }
          );
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={root}>
      <div className="footer__wave" aria-hidden="true">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 2278 683"
          className="footer__wave-svg"
        >
          <defs>
            <linearGradient id="footer-wave-grad" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
              <stop offset="0.1" style={{ stopColor: 'var(--brass-light)' }} />
              <stop offset="0.9" style={{ stopColor: 'var(--brass)' }} />
            </linearGradient>
          </defs>
          <path ref={wavePath} fill="url(#footer-wave-grad)" d={WAVE_DOWN} />
        </svg>
      </div>

      <div className="wrap footer__wrap">
        <div className="footer__brand">
          <span className="footer__mark">Studio Estética</span>
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

      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} Studio Estética. Template de demonstração.</span>
      </div>
    </footer>
  );
}
