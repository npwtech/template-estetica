import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let removeMouseListeners = () => {};

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

      tl.set(root.current, { visibility: 'visible' })
        .from(document.querySelector('.navbar'), { yPercent: -100, duration: 0.7, ease: 'power2.out', clearProps: 'transform' }, 0)
        .from('.hero__visual img', { scale: 1.12, duration: 1.7, ease: 'power2.out' }, 0)
        .from('.hero__visual-caption', { opacity: 0, duration: 0.8 }, 0.9)
        .from('.hero__kicker', { opacity: 0, y: 14, duration: 0.6 }, 0.3)
        .from('.hero__title-line', { yPercent: 115, duration: 1, stagger: 0.1, ease: 'power4.out' }, 0.42)
        .from('.hero__sub', { opacity: 0, y: 16, duration: 0.7 }, 0.95)
        .from('.hero__actions', { opacity: 0, y: 16, duration: 0.7 }, 1.05)
        .from('.hero__proof', { opacity: 0, y: 20, duration: 0.8 }, 1.15)
        .from('.hero__scroll-cue', { opacity: 0, duration: 0.8 }, 1.4);

      if (!reduced) {
        // respiração lenta e contínua na foto — a página não fica "parada"
        // depois que a entrada termina, sem exagerar no movimento.
        gsap.to('.hero__visual img', {
          scale: 1.07,
          duration: 16,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.9,
        });

        // parallax leve: a foto se move um pouco mais devagar que o resto
        // da página enquanto a visitante rola.
        gsap.to('.hero__visual', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        });

        gsap.to('.hero__scroll-cue-dot', {
          y: 16,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          ease: 'power1.in',
        });

        // a foto responde ao cursor com um leve tilt — o primeiro momento
        // do site já dá a sensação de resposta em tempo real, não só scroll.
        const visual = root.current.querySelector('.hero__visual');
        const img = root.current.querySelector('.hero__visual img');
        if (visual && img && window.matchMedia('(hover: hover)').matches) {
          const moveX = gsap.quickTo(img, 'xPercent', { duration: 0.9, ease: 'power3.out' });
          const moveY = gsap.quickTo(img, 'yPercent', { duration: 0.9, ease: 'power3.out' });
          const rotate = gsap.quickTo(visual, 'rotateY', { duration: 0.9, ease: 'power3.out' });

          const onMove = (e) => {
            const rect = visual.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            moveX(px * -3);
            moveY(py * -3);
            rotate(px * 3);
          };
          const onLeave = () => { moveX(0); moveY(0); rotate(0); };

          visual.addEventListener('mousemove', onMove);
          visual.addEventListener('mouseleave', onLeave);
          gsap.set(visual, { transformPerspective: 900 });

          removeMouseListeners = () => {
            visual.removeEventListener('mousemove', onMove);
            visual.removeEventListener('mouseleave', onLeave);
          };
        }
      }

      // números da faixa de prova contam a partir de zero na entrada.
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.count);
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
        const prefix = el.dataset.prefix || '';

        if (reduced) {
          el.textContent = prefix + to.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          return;
        }

        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: to,
          duration: 1.5,
          delay: 1.35,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + proxy.val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          },
        });
      });
    }, root);

    return () => {
      removeMouseListeners();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="topo" ref={root}>
      <div className="wrap hero__grid">
        <div className="hero__content">
          <p className="hero__kicker eyebrow">Estúdio de estética &amp; bem-estar</p>
          <h1 className="hero__title">
            <span className="hero__title-row"><span className="hero__title-line">Você não precisa</span></span>
            <span className="hero__title-row"><span className="hero__title-line">saber o que quer.</span></span>
            <span className="hero__title-row"><span className="hero__title-line hero__title-line--accent font-display">Só precisa começar.</span></span>
          </h1>
          <p className="hero__sub">
            No Studio Estética, cada visita começa com uma escuta real — não
            um cardápio de procedimentos. Pele, cabelo, unhas e estética
            avançada, tratados com a atenção que sua rotina não te dá.
          </p>
          <div className="hero__actions">
            <a href="#agendar" className="btn btn-primary btn-lg">
              Começar minha avaliação <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <a href="#estudio" className="btn btn-text">Conhecer o estúdio</a>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="https://images.pexels.com/photos/7010890/pexels-photo-7010890.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Cliente durante procedimento de cuidado facial em ambiente íntimo e bem iluminado"
          />
          <span className="hero__visual-caption">Sessão de avaliação — Studio Estética</span>
        </div>
      </div>

      <div className="wrap hero__proof">
        <div className="hero__proof-figure">
          <span className="hero__proof-number font-display" data-count="12">0</span>
          <p>anos cuidando de peles e histórias na região</p>
        </div>
        <div className="hero__proof-list">
          <div className="hero__proof-item">
            <strong data-count="3400" data-prefix="+">0</strong>
            <span>atendimentos realizados</span>
          </div>
          <div className="hero__proof-item">
            <strong data-count="9">0</strong>
            <span>especialistas na equipe</span>
          </div>
          <div className="hero__proof-item">
            <strong data-count="4.9" data-decimals="1">0</strong>
            <span>média das avaliações</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="hero__scroll-cue-line">
          <span className="hero__scroll-cue-dot" />
        </span>
        <span className="hero__scroll-cue-text">role</span>
      </div>
    </section>
  );
}
