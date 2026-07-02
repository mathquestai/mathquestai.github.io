import { useState, useEffect, useRef } from 'react';
import './TimerCombate.css';

/**
 * TimerCombate — Contagem regressiva estilo RPG.
 * Muda de cor conforme o tempo diminui e dispara callback ao zerar.
 *
 * @param {number}   tempoTotal  — duração em segundos
 * @param {boolean}  ativo       — pausa/retoma (false pausa, true retoma)
 * @param {Function} aoZerar     — callback chamado quando o tempo acaba
 * @param {boolean}  reiniciar   — se true, reinicia o timer do zero
 */
export default function TimerCombate({ tempoTotal = 120, ativo = true, aoZerar, reiniciar = false }) {
  const [segundos,    setSegundos]    = useState(tempoTotal);
  const [pulsando,    setPulsando]    = useState(false);
  const intervaloRef = useRef(null);
  const zeradoRef    = useRef(false);

  // Reinicia quando a prop reiniciar muda
  useEffect(() => {
    setSegundos(tempoTotal);
    zeradoRef.current = false;
    setPulsando(false);
  }, [reiniciar, tempoTotal]);

  // Countdown
  useEffect(() => {
    if (!ativo || zeradoRef.current) {
      clearInterval(intervaloRef.current);
      return;
    }

    intervaloRef.current = setInterval(() => {
      setSegundos(s => {
        if (s <= 1) {
          clearInterval(intervaloRef.current);
          zeradoRef.current = true;
          if (aoZerar) aoZerar();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(intervaloRef.current);
  }, [ativo, aoZerar]);

  // Pulsa quando ≤ 20 segundos
  useEffect(() => {
    setPulsando(segundos <= 20 && segundos > 0);
  }, [segundos]);

  // Cor baseada no tempo restante
  const cor = () => {
    const pct = segundos / tempoTotal;
    if (pct > 0.5) return 'verde';
    if (pct > 0.25) return 'amarelo';
    return 'vermelho';
  };

  // Formatação mm:ss
  const formatar = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  };

  // Porcentagem para a barra circular
  const raio      = 28;
  const circunf   = 2 * Math.PI * raio;
  const progresso = (segundos / tempoTotal) * circunf;

  return (
    <div
      className={`timer timer--${cor()} ${pulsando ? 'timer--pulsando' : ''} ${!ativo ? 'timer--pausado' : ''}`}
      role="timer"
      aria-label={`Tempo restante: ${formatar(segundos)}`}
      aria-live="off"
    >
      {/* SVG do círculo de progresso */}
      <svg className="timer__circulo" viewBox="0 0 72 72" aria-hidden="true">
        {/* Trilho */}
        <circle
          cx="36" cy="36" r={raio}
          fill="none"
          strokeWidth="4"
          className="timer__trilho"
        />
        {/* Progresso */}
        <circle
          cx="36" cy="36" r={raio}
          fill="none"
          strokeWidth="4"
          className="timer__arco"
          strokeDasharray={`${progresso} ${circunf}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>

      {/* Número central */}
      <div className="timer__centro">
        <span className="timer__tempo">{formatar(segundos)}</span>
        {!ativo && segundos > 0 && (
          <span className="timer__pausado-icone" aria-label="Pausado">⏸</span>
        )}
      </div>
    </div>
  );
}
