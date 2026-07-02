import './VitoriaFinal.css';
import { useGame } from '../../context/GameContext';
import bgFinal from '../../assets/backgrounds/planicies_verdes.png'; // Fundo pacífico

export default function VitoriaFinal() {
  const { estado, reiniciar, irParaTela } = useGame();
  
  const handleJogarNovamente = () => {
    reiniciar();
    irParaTela('menu');
  };

  return (
    <div className="vitoria-final" style={{ backgroundImage: `url(${bgFinal})` }}>
      <div className="vitoria-final__overlay" />

      <div className="vitoria-final__conteudo animar-entrar">
        {/* Confetes / Estrelas (CSS puro) */}
        <div className="vitoria-final__efeitos" />

        <div className="vitoria-final__icone">🏆</div>
        
        <h1 className="vitoria-final__titulo">Jornada Concluída!</h1>
        <p className="vitoria-final__subtitulo">
          Parabéns, <strong>{estado.nomeJogador}</strong>! Você derrotou Obscurus e libertou todos os reinos. 
          A matemática agora flui em harmonia!
        </p>

        {/* Diálogo Final da Luna */}
        <div className="vitoria-final__luna">
          <span className="vitoria-final__luna-icone">🦉</span>
          <div className="vitoria-final__luna-texto">
            <strong>Luna:</strong> "Eu sabia que você conseguiria! Sua evolução foi incrível. 
            Continue praticando, pois o conhecimento é o seu maior poder!"
          </div>
        </div>

        {/* Estatísticas Finais */}
        <div className="vitoria-final__stats">
          <div className="vitoria-final__stat">
            <span className="vitoria-final__stat-label">Pontuação Total</span>
            <strong className="vitoria-final__stat-valor vitoria-final__stat-valor--dourado">
              {estado.pontuacaoTotal}
            </strong>
          </div>
          <div className="vitoria-final__stat">
            <span className="vitoria-final__stat-label">Fases Vencidas</span>
            <strong className="vitoria-final__stat-valor">
              {estado.fasesConcluidas.length} / 5
            </strong>
          </div>
        </div>

        <button className="vitoria-final__btn" onClick={handleJogarNovamente}>
          ↺ Voltar ao Início
        </button>
      </div>
    </div>
  );
}
