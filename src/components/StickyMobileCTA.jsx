import { useEffect, useState } from 'react';
import './StickyMobileCTA.css';

/**
 * Barra de CTA fixa, só no mobile — aparece depois que a visitante passa do
 * hero e some a partir da seção de agendamento (CTA final + rodapé, que já
 * têm seus próprios convites, pra não sobrepor o botão à toa).
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const target = document.getElementById('agendar');

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.7);

      if (target) {
        const ctaTop = target.getBoundingClientRect().top + y;
        setSuppressed(y + window.innerHeight * 0.9 > ctaTop);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible && !suppressed ? 'sticky-cta--visible' : ''}`}>
      <a href="#agendar" className="btn btn-primary">
        Agendar minha avaliação <span className="btn__arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
