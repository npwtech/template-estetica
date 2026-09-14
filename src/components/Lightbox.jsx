import { useEffect, useRef, useState } from 'react';
import './Lightbox.css';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" style={{ transform: dir === 'prev' ? 'scaleX(-1)' : undefined }}>
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Lightbox da galeria. Fica sempre montado (facilita a transição de saída)
 * e é controlado por `index` — `null` fechado, número aberto na foto ali.
 */
export default function Lightbox({ photos, index, onClose, onNav }) {
  const isOpen = index !== null && index !== undefined;
  const [displayIndex, setDisplayIndex] = useState(index ?? 0);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (isOpen) setDisplayIndex(index);
  }, [index, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, onNav]);

  if (!photos.length) return null;
  const photo = photos[displayIndex];

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) onNav(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className={`lightbox ${isOpen ? 'lightbox--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-label="Galeria de fotos do estúdio"
    >
      <button className="lightbox__scrim" type="button" aria-label="Fechar galeria" onClick={onClose} tabIndex={isOpen ? 0 : -1} />

      <button className="lightbox__close" type="button" aria-label="Fechar" onClick={onClose} tabIndex={isOpen ? 0 : -1}>
        <CloseIcon />
      </button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        type="button"
        aria-label="Foto anterior"
        onClick={() => onNav(-1)}
        tabIndex={isOpen ? 0 : -1}
      >
        <ArrowIcon dir="prev" />
      </button>
      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        aria-label="Próxima foto"
        onClick={() => onNav(1)}
        tabIndex={isOpen ? 0 : -1}
      >
        <ArrowIcon dir="next" />
      </button>

      <figure className="lightbox__frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img key={displayIndex} src={photo?.src} alt={photo?.alt || ''} />
        <figcaption>
          <span>{photo?.alt}</span>
          <span className="lightbox__count">{displayIndex + 1} / {photos.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}
