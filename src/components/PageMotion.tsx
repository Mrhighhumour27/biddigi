import { useLayoutEffect } from 'react';

// Native scrolling stays in control; only content entering the viewport is animated.
export function PageMotion() {
  useLayoutEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const main = document.querySelector('main');
    if (!main) return;
    let active = true;
    const initialHash = window.location.hash;
    if (initialHash) {
      void document.fonts.ready.then(() => {
        if (!active || window.location.hash !== initialHash || window.scrollY > 0) return;
        const id = initialHash.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
      });
    }

    const candidates = new Set<HTMLElement>([
      ...main.querySelectorAll<HTMLElement>('h2, article, #campaign-enquiry form, #campaign-support article'),
      ...main.querySelectorAll<HTMLElement>('section:first-child h1, section:first-child h1 + p'),
    ]);
    // Avoid double transforms on nested headings and existing Motion hero elements.
    const elements = [...candidates].filter(element => !element.closest('article') || element.tagName === 'ARTICLE')
      .filter(element => !element.style.transform && !element.style.opacity);
    let observer: IntersectionObserver | undefined;

    const clear = () => {
      observer?.disconnect();
      elements.forEach(element => {
        element.removeAttribute('data-reveal');
        element.style.removeProperty('--reveal-delay');
      });
    };
    const setup = () => {
      clear();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-reveal', 'visible');
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -36px 0px' });
      elements.forEach(element => {
        const siblings = element.parentElement ? [...element.parentElement.children].filter(child => child.tagName === element.tagName) : [];
        const delay = element.tagName === 'ARTICLE' ? Math.max(0, siblings.indexOf(element)) % 4 * 90 : 0;
        element.style.setProperty('--reveal-delay', `${delay}ms`);
        element.setAttribute('data-reveal', 'pending');
        observer?.observe(element);
      });
    };
    setup();
    preference.addEventListener('change', setup);
    return () => {
      active = false;
      clear();
      preference.removeEventListener('change', setup);
    };
  }, []);
  return null;
}
