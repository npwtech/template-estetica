import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Reveal text line-by-line on scroll, à la GSAP's "responsive line splits"
 * demo: split into lines (masked so they don't clip descenders), animate
 * each line up into place, and re-split automatically on resize/font load
 * so it stays correct at any width.
 *
 * Must be called inside a gsap.context() so the SplitText instance (and the
 * ScrollTriggers it creates) get cleaned up on ctx.revert().
 */
export function splitLinesReveal(target, opts = {}) {
  const {
    start = 'top 85%',
    duration = 0.9,
    stagger = 0.08,
    ease = 'power4.out',
    delay = 0,
  } = opts;

  return SplitText.create(target, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'line++',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: { trigger: self.lines[0], start },
      });
    },
  });
}
