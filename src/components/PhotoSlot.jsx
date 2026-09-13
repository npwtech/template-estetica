import './PhotoSlot.css';

/**
 * PhotoSlot — todo espaço de foto do site passa por aqui.
 *
 * Para usar uma foto real, basta passar `src`:
 *   <PhotoSlot src="/fotos/salao-recepcao.jpg" alt="Recepção do salão" ratio="4/5" />
 *
 * Sem `src`, renderiza um placeholder elegante (duotone na paleta do tema)
 * com o rótulo em `label`, para apresentar o template antes de ter fotos reais.
 */
export default function PhotoSlot({ src, alt = '', label, ratio = '4/5', className = '', tone = 1 }) {
  return (
    <div
      className={`photo-slot photo-slot--tone-${tone} ${src ? 'photo-slot--photo' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo-slot__placeholder">
          <svg viewBox="0 0 48 48" width="30" height="30" fill="none" aria-hidden="true">
            <circle cx="24" cy="18" r="7" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 40c2.5-9 8.5-14 16-14s13.5 5 16 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {label && <span>{label}</span>}
        </div>
      )}
    </div>
  );
}
