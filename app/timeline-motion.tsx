'use client';

import { useEffect, useRef } from 'react';

/** Progressive enhancement: the story and a complete thread exist without JS. */
export default function TimelineMotion() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const timeline = svg?.parentElement;
    if (!svg || !timeline) return;
    const paths = svg.querySelectorAll<SVGPathElement>('path');
    const active = paths[1];
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const draw = () => {
      frame = 0;
      const rect = timeline.getBoundingClientRect();
      const height = rect.height;
      const a = height * 0.22;
      const b = height * 0.72;
      // Two small, continuous loops in the thread, with a fixed horizontal scale.
      const d = `M35 0 L35 ${a - 65} C35 ${a - 35} 63 ${a - 35} 63 ${a - 10} C63 ${a + 22} 7 ${a + 22} 7 ${a - 10} C7 ${a - 38} 63 ${a - 62} 63 ${a - 88} C63 ${a - 119} 7 ${a - 119} 7 ${a - 88} C7 ${a - 60} 35 ${a - 40} 35 ${a + 43} L35 ${b - 38} C35 ${b - 69} 7 ${b - 71} 7 ${b - 37} C7 ${b - 5} 63 ${b - 5} 63 ${b - 37} C63 ${b - 68} 35 ${b - 62} 35 ${b + 14} L35 ${height}`;
      svg.setAttribute('viewBox', `0 0 70 ${height}`);
      paths.forEach(path => path.setAttribute('d', d));
      const length = active.getTotalLength();
      const progress = media.matches ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.77 - rect.top) / height));
      active.style.strokeDasharray = `${length}`;
      active.style.strokeDashoffset = `${length * (1 - progress)}`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const resize = new ResizeObserver(schedule);
    resize.observe(timeline);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);

    const chapters = timeline.querySelectorAll<HTMLElement>('.chapter');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const chapter = entry.target as HTMLElement;
        if (!media.matches) chapter.animate(
          [{ opacity: 0.45, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' },
        );
        observer.unobserve(chapter);
      }
    }, { threshold: 0.12 });
    chapters.forEach(chapter => observer.observe(chapter));
    draw();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule);
    };
  }, []);

  return <svg ref={svgRef} className="timeline-thread" viewBox="0 0 70 1000" preserveAspectRatio="none" aria-hidden="true"><path className="thread-base" d="M35 0V1000" /><path className="thread-active" d="M35 0V1000" /></svg>;
}
