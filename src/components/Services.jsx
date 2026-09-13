import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { splitLinesReveal } from '../lib/splitReveal.js';
import PhotoSlot from './PhotoSlot.jsx';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: '01',
    title: 'Pele',
    desc: 'Limpeza de pele profunda, peelings e protocolos faciais personalizados por tipo de pele.',
    items: ['Limpeza de pele', 'Peeling químico', 'Hidratação facial', 'Microagulhamento'],
    big: true,
    img: {
      src: 'https://images.pexels.com/photos/5069612/pexels-photo-5069612.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Especialista realizando procedimento facial com equipamento moderno',
      tone: 1,
    },
  },
  {
    n: '02',
    title: 'Cabelo',
    desc: 'Corte, coloração e tratamentos de reconstrução para todos os tipos de fio.',
    items: ['Corte e finalização', 'Coloração', 'Reconstrução', 'Alisamento'],
    img: {
      src: 'https://images.pexels.com/photos/3993330/pexels-photo-3993330.jpeg?auto=compress&cs=tinysrgb&w=700',
      alt: 'Cliente sendo preparada para tratamento capilar em salão moderno',
      tone: 3,
    },
  },
  {
    n: '03',
    title: 'Unhas',
    desc: 'Manicure e pedicure com esmaltação em gel e nail art sob medida.',
    items: ['Manicure', 'Pedicure', 'Esmaltação em gel', 'Nail art'],
    img: {
      src: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=700',
      alt: 'Mãos com esmaltação em gel finalizada',
      tone: 2,
    },
  },
  {
    n: '04',
    title: 'Estética avançada',
    desc: 'Equipamentos de última geração para resultados visíveis com segurança.',
    items: ['Radiofrequência', 'Drenagem linfática', 'Massagem modeladora', 'Criolipólise'],
    big: true,
    img: {
      src: 'https://images.pexels.com/photos/14438367/pexels-photo-14438367.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Procedimento de estética avançada com equipamento especializado',
      tone: 3,
    },
  },
];

export default function Services() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services__head > .eyebrow-label', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services__head', start: 'top 80%' },
      });

      splitLinesReveal('.services__title', { start: 'top 82%' });
      splitLinesReveal('.services__lead', { start: 'top 80%', delay: 0.1 });

      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: (i % 2) * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services section" id="servicos" ref={root}>
      <div className="wrap">
        <div className="services__head">
          <p className="eyebrow-label">O que fazemos</p>
          <h2 className="services__title">
            Quatro frentes de cuidado, uma equipe só.
          </h2>
          <p className="services__lead">
            Cada atendimento parte de uma avaliação individual — sem pacotes
            genéricos, só o que a sua pele, seu cabelo ou seu corpo pedem
            naquele momento.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <article className={`service-card ${s.big ? 'service-card--wide' : ''}`} key={s.n}>
              <div className="service-card__media">
                <PhotoSlot
                  src={s.img.src}
                  alt={s.img.alt}
                  ratio={s.big ? '16/9' : '4/3'}
                  tone={s.img.tone}
                />
              </div>
              <div className="service-card__body">
                <div className="service-card__top">
                  <span className="service-card__n">{s.n}</span>
                  <h3>{s.title}</h3>
                </div>
                <p className="service-card__desc">{s.desc}</p>
                <ul className="service-card__list">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
