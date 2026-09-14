import { useEffect, useState } from 'react';
import './StickyMobileCTA.css';

/**
 * Barra de CTA fixa, só no mobile — aparece depois que a visitante passa do
 * hero e some perto da CTA final / rodapé, pra não duplicar o botão à toa.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById('agendar');
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setSuppressed(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`sticky-cta ${visible && !suppressed ? 'sticky-cta--visible' : ''}`}>
      <a href="#agendar" className="btn btn-primary">
        Agendar minha avaliação <span className="btn__arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
