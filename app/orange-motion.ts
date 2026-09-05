type Ball = { x: number; y: number; vx: number; vy: number; spin: number; bounces: number };
type Caption = (status: string, button: string) => void;

/** Imperative animation stays isolated from the page and cleans up on unmount. */
export function createOrangeAnimation(root: HTMLElement, caption: Caption) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = root.querySelector<HTMLElement>('.orange-stage')!;
  const character = root.querySelector<HTMLElement>('.cheburashka')!;
  const balls = [...root.querySelectorAll<HTMLElement>('.flying-orange')];
  let frame = 0, started = 0, previous = 0, dropped = false, hasPlayed = false, disposed = false;
  let physics: Ball[] = [];
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const place = (el: HTMLElement, x: number, y: number, angle = 0) => {
    el.style.left = `${x * 100}%`;
    el.style.top = `${y * 100}%`;
    el.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
    el.style.opacity = '1';
  };
  function cascade(time: number, index: number) {
    const phase = (time + index * .6) / 1.8;
    const u = phase % 1, right = Math.floor(phase) % 2 === 0;
    return { x: lerp(right ? .49 : .77, right ? .77 : .49, u), y: .61 - .46 * 4 * u * (1 - u) };
  }
  function end(quiet = false) {
    cancelAnimationFrame(frame);
    frame = 0;
    stage.classList.add('has-fallen');
    character.style.transform = 'translate(5%, 0) rotate(0deg)';
    if (quiet) balls.forEach((ball, i) => place(ball, [.38, .87, .95][i], .888, i * 75));
    caption(quiet ? '86 oranges. No rush.' : 'Dropped a few. Still trying.', 'One more try');
    stage.dataset.state = 'finished';
  }
  function tick(now: number) {
    const t = (now - started) / 1000;
    const dt = Math.min((now - previous) / 1000, .04);
    previous = now;
    if (t < 4.8) {
      balls.forEach((ball, i) => {
        const p = cascade(Math.max(0, t - .65), i);
        const u = Math.min(1, t / .65);
        place(ball, lerp(.16, p.x, u), lerp(.69, p.y, u) - Math.sin(u * Math.PI) * .16, t * 130 + i * 80);
      });
      character.style.transform = `rotate(${Math.sin(t * 7) * 1.8}deg) translateY(${Math.sin(t * 7) * 1.1}%)`;
    } else {
      if (!dropped) {
        dropped = true;
        physics = balls.map((_, i) => ({ ...cascade(4.15, i), vx: [-.18, .14, .23][i], vy: [-.15, -.25, -.1][i], spin: i * 95, bounces: 0 }));
        stage.dataset.state = 'tumbling';
      }
      physics.forEach((p, i) => {
        if (p.bounces < 4) {
          p.vy += 1.25 * dt;
          p.x += p.vx * dt; p.y += p.vy * dt; p.spin += p.vx * dt * 1200;
          if (p.y > .888) { p.y = .888; p.vy = -Math.abs(p.vy) * .38; p.vx *= .66; p.bounces++; }
          if (p.x < .055 || p.x > .95) { p.x = Math.max(.055, Math.min(.95, p.x)); p.vx *= -.5; }
        }
        place(balls[i], p.x, p.y, p.spin);
      });
      const fall = t - 4.8;
      if (fall < .55) character.style.transform = `rotate(${Math.sin(fall * 22) * 9}deg)`;
      else if (fall < 1.05) character.style.transform = `translate(${(fall - .55) * 30}%,${(fall - .55) * 5}%) rotate(${(fall - .55) * 100}deg)`;
      else {
        stage.classList.add('has-fallen');
        const bounce = Math.max(0, 1 - (fall - 1.05) / .65) * Math.abs(Math.sin((fall - 1.05) * 12));
        character.style.transform = `translate(5%,${-bounce * 9}%) rotate(${-bounce * 5}deg)`;
      }
    }
    if (t >= 8.5) { end(); return; }
    frame = requestAnimationFrame(tick);
  }
  function play() {
    if (disposed) return;
    hasPlayed = true;
    cancelAnimationFrame(frame);
    if (reducedMotion.matches) { end(true); return; }
    stage.classList.remove('has-fallen');
    stage.dataset.state = 'juggling';
    dropped = false; physics = [];
    caption('86 oranges. What could possibly go wrong?', 'Restart');
    started = previous = performance.now();
    frame = requestAnimationFrame(tick);
  }
  const onMotionChange = () => { if (reducedMotion.matches && hasPlayed) end(true); };
  const onVisibilityChange = () => { if (document.hidden && frame) end(true); };
  reducedMotion.addEventListener('change', onMotionChange);
  document.addEventListener('visibilitychange', onVisibilityChange);
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting) && !hasPlayed) {
      observer.disconnect();
      if (!reducedMotion.matches) play();
    }
  }, { threshold: .6 });
  const images = ['cheburashka-standing', 'cheburashka-fallen', 'orange-crate', 'orange'].map(name => new Promise<void>(resolve => {
    const image = new Image(); image.onload = () => resolve(); image.onerror = () => resolve(); image.src = `/assets/${name}.webp`;
  }));
  Promise.all(images).then(() => { if (!disposed) observer.observe(stage); });
  return {
    play,
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    },
  };
}
