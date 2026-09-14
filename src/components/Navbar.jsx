import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { href: '#cuidado', label: 'O cuidado' },
  { href: '#ritual', label: 'O ritual' },
  { href: '#estudio', label: 'O estúdio' },
  { href: '#historias', label: 'Histórias' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(!open && y > lastScrollY.current && y > 160);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // o painel some/aparece; enquanto ele está aberto, a barra nunca deve
  // se esconder (senão a visitante perde o botão de fechar).
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''} ${open ? 'navbar--open' : ''}`}>
        <div className="navbar__inner wrap">
          <a href="#topo" className="navbar__mark" onClick={close}>Studio Estética</a>

          <div className="navbar__right">
            <a href="#agendar" className="btn btn-outline-inverse navbar__cta">Agendar avaliação</a>

            <button
              className="navbar__toggle"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="navbar-panel"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="navbar__toggle-label">{open ? 'Fechar' : 'Menu'}</span>
              <span className="navbar__toggle-icon"><span /><span /></span>
            </button>
          </div>
        </div>
      </header>

      {/* fora do <header> de propósito: o header pode animar/transladar
         (esconder ao rolar), e isso não pode nunca afetar o painel de
         tela cheia, que precisa continuar fixo à viewport. */}
      <div className={`navbar__panel ${open ? 'navbar__panel--open' : ''}`} id="navbar-panel" aria-hidden={!open}>
        <div className="wrap navbar__panel-inner">
          <nav className="navbar__panel-links" aria-label="Navegação principal">
            {LINKS.map((l, i) => (
              <a key={l.href} href={l.href} onClick={close} style={{ transitionDelay: `${i * 45}ms` }}>
                <span className="navbar__panel-index">0{i + 1}</span>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="navbar__panel-aside">
            <p className="navbar__panel-quote font-display">
              “Você não precisa saber o que quer. Só precisa começar.”
            </p>
            <div className="navbar__panel-info">
              <div>
                <h4>Horários</h4>
                <p>Ter – Sex: 9h às 19h<br />Sábado: 9h às 17h</p>
              </div>
              <div>
                <h4>Contato</h4>
                <p>(00) 00000-0000<br /><a href="#" onClick={(e) => e.stopPropagation()}>Instagram</a></p>
              </div>
            </div>
            <a href="#agendar" className="btn btn-outline-inverse navbar__panel-cta" onClick={close}>
              Agendar minha avaliação
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
