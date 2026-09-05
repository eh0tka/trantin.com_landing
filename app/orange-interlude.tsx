'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createOrangeAnimation } from './orange-motion';
import './orange-lab.css';

export default function OrangeInterlude() {
  const root = useRef<HTMLElement>(null);
  const play = useRef<() => void>(() => {});
  const [status, setStatus] = useState('86 oranges. What could possibly go wrong?');
  const [label, setLabel] = useState('Let’s try');
  useEffect(() => {
    if (!root.current) return;
    const animation = createOrangeAnimation(root.current, (text, button) => { setStatus(text); setLabel(button); });
    play.current = animation.play;
    return () => { play.current = () => {}; animation.destroy(); };
  }, []);
  return (
    <section ref={root} className="orange-lab shell" id="orange-lab" aria-labelledby="orange-title">
      <div className="orange-lab-heading">
        <p className="eyebrow">A SMALL ORANGE INTERLUDE</p>
        <h2 id="orange-title">Still a kid<br /><em>about some things.</em></h2>
        <p>I love oranges. And Cheburashka.<br />Some things don’t need a business case.</p>
      </div>
      <div className="orange-stage-wrap">
        <div className="orange-stage" role="img" aria-label="Cheburashka juggles oranges beside a wooden crate marked 86, drops them, and takes a harmless tumble.">
          <div className="ground-line" />
          <div className="crate sprite" />
          <div className="cheburashka"><div className="standing sprite" /><div className="fallen sprite" /></div>
          <div className="flying-orange orange-a"><div className="fruit sprite" /></div>
          <div className="flying-orange orange-b"><div className="fruit sprite" /></div>
          <div className="flying-orange orange-c"><div className="fruit sprite" /></div>
        </div>
        <div className="orange-caption">
          <p id="orange-status" aria-live="polite">{status}</p>
          <Button variant="ghost" id="orange-play" type="button" onClick={() => play.current()}>{label} <span aria-hidden="true">{label === 'Let’s try' ? '↗' : '↻'}</span></Button>
        </div>
      </div>
    </section>
  );
}
