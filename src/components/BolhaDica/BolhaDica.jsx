import { useState, useEffect } from 'react';
import './BolhaDica.css';
import imgLuna from '../../assets/characters/luna.png';

/**
 * BolhaDica — Balão de dica da Luna com efeito typewriter.
 * @param {{ titulo, texto, estrategia }} dica
 * @param {Function} aoFechar — callback para dispensar a dica
 * @param {boolean}  visivel
 */
export default function BolhaDica({ dica, aoFechar, visivel = true }) {
  const [textoExibido, setTextoExibido] = useState('');
  const [escrevendo,   setEscrevendo]   = useState(false);

  useEffect(() => {
    if (!visivel || !dica) {
      setTextoExibido('');
      return;
    }

    // Efeito typewriter — exibe o texto da dica letra por letra
    setTextoExibido('');
    setEscrevendo(true);
    const texto = dica.texto;
    let i = 0;
    const intervalo = setInterval(() => {
      i++;
      setTextoExibido(texto.slice(0, i));
      if (i >= texto.length) {
        clearInterval(intervalo);
        setEscrevendo(false);
      }
    }, 18); // velocidade de digitação em ms por caractere

    return () => clearInterval(intervalo);
  }, [dica, visivel]);

  if (!visivel || !dica) return null;

  return (
    <div className="bolha-dica animar-entrar" role="dialog" aria-live="polite" aria-label="Dica da Luna">
      {/* Luna sprite + título */}
      <div className="bolha-dica__cabecalho">
        <img src={imgLuna} alt="Luna" className="bolha-dica__luna-img" />
        <div className="bolha-dica__titulo-wrapper">
          <span className="bolha-dica__titulo">{dica.titulo}</span>
          <span className="bolha-dica__nome">Luna</span>
        </div>
        <button
          className="bolha-dica__fechar"
          onClick={aoFechar}
          aria-label="Fechar dica"
          title="Entendi!"
        >
          ✕
        </button>
      </div>

      {/* Corpo com typewriter */}
      <div className="bolha-dica__corpo">
        <p className="bolha-dica__texto">
          {textoExibido}
          {escrevendo && <span className="bolha-dica__cursor">|</span>}
        </p>
      </div>

      {/* Botão de fechar / entendi */}
      {!escrevendo && (
        <div className="bolha-dica__rodape">
          <button
            id="btn-entendi"
            className="bolha-dica__btn-entendi"
            onClick={aoFechar}
          >
            Entendi! Vou tentar novamente 💪
          </button>
        </div>
      )}
    </div>
  );
}
