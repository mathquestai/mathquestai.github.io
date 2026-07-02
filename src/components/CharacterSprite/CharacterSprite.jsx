import { useState, useEffect } from 'react';
import './CharacterSprite.css';

/**
 * CharacterSprite — Exibe o sprite de um personagem com animação idle.
 * @param {string}  imagem     - Caminho para a imagem do personagem
 * @param {string}  nome       - Nome do personagem
 * @param {string}  estado     - 'idle' | 'atacar' | 'receber' | 'derrotado' | 'comemorar'
 * @param {string}  lado       - 'esquerda' | 'direita'
 * @param {boolean} flutuar    - Se o personagem flutua suavemente
 */
export default function CharacterSprite({
  imagem,
  nome,
  estado = 'idle',
  lado = 'esquerda',
  flutuar = true,
  style,
  className = '',
}) {
  const [classeAnimacao, setClasseAnimacao] = useState('');

  useEffect(() => {
    if (estado === 'atacar') {
      setClasseAnimacao('sprite--atacar');
      const t = setTimeout(() => setClasseAnimacao(''), 500);
      return () => clearTimeout(t);
    }
    if (estado === 'receber') {
      setClasseAnimacao('sprite--receber');
      const t = setTimeout(() => setClasseAnimacao(''), 500);
      return () => clearTimeout(t);
    }
    if (estado === 'comemorar') {
      setClasseAnimacao('sprite--comemorar');
    }
    if (estado === 'derrotado') {
      setClasseAnimacao('sprite--derrotado');
    }
  }, [estado]);

  return (
    <div
      className={`sprite sprite--${lado} ${flutuar && estado === 'idle' ? 'animar-flutuar' : ''} ${classeAnimacao} ${className}`}
      style={style}
    >
      <img
        src={imagem}
        alt={nome}
        className="sprite__imagem"
        draggable="false"
      />
    </div>
  );
}
