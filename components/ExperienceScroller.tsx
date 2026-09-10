'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';

const TOTAL_FRAMES = 192;
const BOOKING_URL = 'https://wa.me/message/R5JJ2CSI6QZVH1';

export default function ExperienceScroller() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Renderiza no canvas cobrindo toda a largura/altura sem bordas pretas laterais
  const drawImageFit = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    if (!iw || !ih) return;

    // Math.max cobre toda a viewport sem deixar bordas pretas na esquerda e direita
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);
    const renderW = iw * ratio;
    const renderH = ih * ratio;
    const centerShiftX = (cw - renderW) / 2;
    const centerShiftY = (ch - renderH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, centerShiftX, centerShiftY, renderW, renderH);
  }, []);

  // Busca o frame mais próximo já carregado para evitar qualquer flicker
  const getClosestLoadedImage = useCallback((targetIndex: number) => {
    const images = imagesRef.current;
    if (images[targetIndex]) return images[targetIndex];

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && images[prev]) return images[prev];
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && images[next]) return images[next];
    }
    return null;
  }, []);

  const renderFrame = useCallback((index: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getClosestLoadedImage(index);
    if (img && img.complete && img.naturalWidth > 0) {
      drawImageFit(ctx, img);
      lastDrawnFrameRef.current = index;
    }
  }, [getClosestLoadedImage, drawImageFit]);

  // Ajusta resolução do canvas para Retina/High-DPI
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    const frameToDraw = lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0;
    renderFrame(frameToDraw);
  }, [renderFrame]);

  // Pré-carregamento progressivo de imagens
  useEffect(() => {
    let isCancelled = false;

    // 1. Carrega imediatamente o Frame 1 para renderização instantânea
    const firstImg = new Image();
    firstImg.src = '/frames/ezgif-frame-001.jpg';
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      renderFrame(0);
    };

    // 2. Pré-carrega todos os 192 frames em segundo plano
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;

        // Redesenha se estivermos aguardando o frame atual
        if (Math.round(currentFrameRef.current) === i) {
          renderFrame(i);
        }
      };
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, renderFrame]);

  // Loop de animação inercial com lerp para fluidez total
  useEffect(() => {
    const updateLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      // Interpolação suave (lerp) com fator 0.12 para movimento amanteigado
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.12;
        const targetIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));

        if (targetIndex !== lastDrawnFrameRef.current) {
          renderFrame(targetIndex);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Listener de Scroll para a seção
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;

      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="experiencia" ref={containerRef} className="experience-scroll-container">
      <div className="experience-sticky-viewport">
        {/* Canvas com os 192 frames renderizados em background */}
        <canvas ref={canvasRef} className="experience-canvas" aria-hidden="true" />

        {/* Sombreamento e vinheta escura para contraste fotográfico de alta elegância */}
        <div className="experience-shade-overlay" />

        {/* Textos sobrepostos em primeiro plano */}
        <div className="experience-content-overlay">
          {/* Cabeçalho da Seção */}
          <div className="experience-header-block">
            <p className="eyebrow">01 / A EXPERIÊNCIA</p>
            <h2>
              Mais que um corte.<br />
              Um momento <em>seu.</em>
            </h2>
          </div>

          {/* Card Editorial com os textos narrativos sobrepostos */}
          <div className="experience-editorial-grid">
            <div className="experience-card-glass">
              <span className="small-rule" />
              <h3>
                O cuidado começa<br />
                antes da cadeira.
              </h3>
              <p>
                Um ambiente de linhas simples, luz acolhedora e atenção ao que importa: você.
              </p>
              <p>
                Da escolha do corte ao último detalhe da barba, a The Abreu é um convite para desacelerar e cuidar da sua imagem com personalidade.
              </p>

              <div className="experience-card-footer">
                <a
                  className="text-link experience-cta-link"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Conheça de perto <ArrowUpRight size={18} />
                </a>

                <span className="experience-location-tag">
                  <MapPin size={14} /> Águas Claras · Brasília
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
