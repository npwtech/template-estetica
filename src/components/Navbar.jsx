import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'O estúdio' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#depoimentos', label: 'Depoimentos' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${open ? 'navbar--open' : ''}`}>
      <div className="navbar__inner wrap">
        <a href="#topo" className="navbar__mark">Studio Estética</a>

        <nav className="navbar__links" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>

        <a href="#agendar" className="btn btn-outline navbar__cta">Agendar horário</a>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
