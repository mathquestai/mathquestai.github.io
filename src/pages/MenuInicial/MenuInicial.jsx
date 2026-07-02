import { useState } from 'react';
import './MenuInicial.css';
import { useGame } from '../../context/GameContext';
import imgKai from '../../assets/characters/kai.png';
import imgLuna from '../../assets/characters/luna.png';
import bgMenu from '../../assets/backgrounds/planicies_verdes.png';

export default function MenuInicial() {
  const { estado, definirNome, irParaTela } = useGame();
  const [nome, setNome] = useState(estado.nomeJogador);

  const handleIniciar = (e) => {
    e.preventDefault();
    if (nome.trim()) {
      definirNome(nome.trim());
      irParaTela('mapa');
    }
  };

  return (
    <div className="menu-inicial" style={{ backgroundImage: `url(${bgMenu})` }}>
      <div className="menu-inicial__overlay" />

      <div className="menu-inicial__conteudo animar-entrar">
        {/* Título */}
        <header className="menu-inicial__cabecalho">
          <h2 className="menu-inicial__subtitulo">Uma aventura matemática</h2>
          <h1 className="menu-inicial__titulo">
            <span className="menu-inicial__titulo-destaque">Math</span>Quest
          </h1>
        </header>

        {/* Personagens flutuantes */}
        <div className="menu-inicial__personagens">
          <img src={imgKai} alt="Herói Kai" className="menu-inicial__sprite menu-inicial__sprite--kai" />
          <img src={imgLuna} alt="Mentora Luna" className="menu-inicial__sprite menu-inicial__sprite--luna" />
        </div>

        {/* Formulário de Início */}
        <form className="menu-inicial__form" onSubmit={handleIniciar}>
          <div className="menu-inicial__input-group">
            <label htmlFor="nomeJogador" className="menu-inicial__label">
              Como devemos te chamar, herói?
            </label>
            <input
              id="nomeJogador"
              type="text"
              className="menu-inicial__input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome..."
              maxLength={15}
              required
            />
          </div>

          <div className="menu-inicial__botoes">
            <button
              type="submit"
              className="menu-inicial__btn menu-inicial__btn--primario"
              disabled={!nome.trim()}
            >
              ▶ Iniciar Jornada
            </button>
            <button
              type="button"
              className="menu-inicial__btn menu-inicial__btn--secundario"
              onClick={() => irParaTela('tutorial')}
            >
              📖 Como Jogar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
