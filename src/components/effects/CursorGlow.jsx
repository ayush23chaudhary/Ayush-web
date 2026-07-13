import { useEffect, useRef } from 'react';

/**
 * CursorGlow — follows the mouse pointer with a soft radial gradient glow.
 * Desktop only (hidden on touch devices).
 */
const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      el.style.opacity = '1';
    };

    const onLeave = () => { el.style.opacity = '0'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block"
      style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  );
};

export default CursorGlow;
