import { useState } from 'react';
import './ComoJogar.css';
import { useGame } from '../../context/GameContext';
import bgTutorial from '../../assets/backgrounds/abismo_azul.png';

const SLIDES = [
  {
    titulo: 'O Reino dos Números',
    icone: '🗺️',
    texto: 'O Reino dos Números foi corrompido por Obscurus! Sua missão é derrotar os 5 guardiões matemáticos para restaurar o equilíbrio.',
  },
  {
    titulo: 'Combate por Turnos',
    icone: '⚔️',
    texto: 'Cada turno é uma conta matemática. Você tem um tempo limite para resolver! Acertar causa dano ao guardião. Errar, ou deixar o tempo acabar, faz você levar dano.',
  },
  {
    titulo: 'Poder do Combo',
    icone: '🔥',
    texto: 'Acertos consecutivos geram COMBOS! Quanto maior o combo, maior o dano que você causa e mais pontos você ganha. Não quebre a sequência!',
  },
  {
    titulo: 'Dicas da Luna',
    icone: '🦉',
    texto: 'Se tiver dificuldade, clique na Luna para pedir uma dica! O tempo irá parar, mas custará alguns pontos. Use com sabedoria.',
  },
  {
    titulo: 'Dificuldade Progressiva',
    icone: '📈',
    texto: 'Começamos com tabuadas simples, mas as fases seguintes exigirão contas maiores e mais rápidas. Prepare sua mente, Calculista!',
  }
];

export default function ComoJogar() {
  const { irParaTela } = useGame();
  const [slideAtual, setSlideAtual] = useState(0);

  const isUltimo = slideAtual === SLIDES.length - 1;
  const isPrimeiro = slideAtual === 0;

  const proximo = () => {
    if (!isUltimo) setSlideAtual(s => s + 1);
  };

  const anterior = () => {
    if (!isPrimeiro) setSlideAtual(s => s - 1);
  };

  return (
    <div className="tutorial" style={{ backgroundImage: `url(${bgTutorial})` }}>
      <div className="tutorial__overlay" />

      <div className="tutorial__conteudo animar-entrar">
        {/* Cabecalho */}
        <header className="tutorial__cabecalho">
          <h1 className="tutorial__titulo">Como Jogar</h1>
          <button className="tutorial__btn-fechar" onClick={() => irParaTela('menu')}>
            ✕ Fechar
          </button>
        </header>

        {/* Slide */}
        <div className="tutorial__slide">
          <div className="tutorial__slide-icone">{SLIDES[slideAtual].icone}</div>
          <h2 className="tutorial__slide-titulo">{SLIDES[slideAtual].titulo}</h2>
          <p className="tutorial__slide-texto">{SLIDES[slideAtual].texto}</p>
        </div>

        {/* Controles */}
        <div className="tutorial__controles">
          <button
            className="tutorial__btn-controle"
            onClick={anterior}
            disabled={isPrimeiro}
          >
            ← Anterior
          </button>
          
          <div className="tutorial__dots">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`tutorial__dot ${i === slideAtual ? 'tutorial__dot--ativo' : ''}`}
                onClick={() => setSlideAtual(i)}
              />
            ))}
          </div>

          {isUltimo ? (
            <button className="tutorial__btn-controle tutorial__btn-controle--destaque" onClick={() => irParaTela('menu')}>
              ✓ Entendi!
            </button>
          ) : (
            <button className="tutorial__btn-controle" onClick={proximo}>
              Próximo →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
