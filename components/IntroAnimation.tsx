'use client';
import { useEffect, useRef, useState } from 'react';

interface IntroProps {
  onComplete?: () => void;
}

export default function IntroAnimation({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<'enter' | 'active' | 'exit' | 'done'>('enter');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Strict single execution guard
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Phase 1: trigger enter animation quickly after mount
    const enterTimer = setTimeout(() => {
      setPhase('active');
    }, 50);

    // Phase 2: trigger smooth exit after display
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2000);

    // Phase 3: completely finish and remove from DOM
    const doneTimer = setTimeout(() => {
      setPhase('done');
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 2600);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []); // Empty array ensures it only runs once

  const handleDismiss = () => {
    if (phase === 'done' || phase === 'exit') return;
    setPhase('exit');
    setTimeout(() => {
      setPhase('done');
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 500);
  };

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-overlay ${phase === 'exit' ? 'intro-exit' : ''}`}
      onClick={handleDismiss}
      role="banner"
      aria-label="Introdução The Abreu Barbearia"
    >
      {/* Background ambient light */}
      <div className="intro-ambient-glow" />

      {/* Decorative corner borders */}
      <div className="intro-corners">
        <span className="intro-corner top-left" />
        <span className="intro-corner top-right" />
        <span className="intro-corner bottom-left" />
        <span className="intro-corner bottom-right" />
      </div>

      {/* Center content container */}
      <div className={`intro-center ${phase === 'active' ? 'intro-show' : ''}`}>
        <p className="intro-tagline-top">ÁGUAS CLARAS · BRASÍLIA</p>

        <div className="intro-logo-container">
          <img
            src="/logo-oficial.png"
            alt="The Abreu Barbearia"
            className="intro-logo-img"
          />
          <div className="intro-shimmer" />
        </div>

        <div className="intro-divider-line" />

        <p className="intro-subtitle">CORTE · BARBA · ASSINATURA</p>
      </div>
    </div>
  );
}
