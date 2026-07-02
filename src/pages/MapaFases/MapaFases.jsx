import './MapaFases.css';
import { useGame } from '../../context/GameContext';
import { FASES } from '../../utils/configFases';
import imgKai from '../../assets/characters/kai.png';

/**
 * MapaFases — Mapa visual de seleção e progressão das 5 fases.
 */
export default function MapaFases() {
  const { estado, irParaIntro } = useGame();
  const { faseAtual, fasesConcluidas, nomeJogador } = estado;

  const podeSelecionarFase = (idFase) => {
    if (idFase === 1) return true;
    return fasesConcluidas.includes(idFase - 1);
  };

  return (
    <div className="mapa">
      {/* Fundo gradiente de fantasia */}
      <div className="mapa__fundo" />

      {/* Cabeçalho */}
      <header className="mapa__cabecalho animar-entrar">
        <div className="mapa__logo">
          <span className="mapa__logo-icone">⚔️</span>
          <div>
            <h1 className="mapa__titulo">MathQuest</h1>
            <p className="mapa__subtitulo">A Jornada dos Números</p>
          </div>
        </div>
        <div className="mapa__jogador">
          <img src={imgKai} alt="Kai" className="mapa__jogador-sprite" />
          <div className="mapa__jogador-info">
            <span className="mapa__jogador-nome">{nomeJogador}</span>
            <span className="mapa__jogador-progresso">
              {fasesConcluidas.length}/{FASES.length} fases
            </span>
          </div>
        </div>
      </header>

      {/* Título do mapa */}
      <div className="mapa__secao-titulo animar-entrar">
        <h2 className="mapa__secao-h2">
          {fasesConcluidas.length === FASES.length
            ? '🏆 Jornada Completa!'
            : fasesConcluidas.length === 0
            ? '🗺️ Sua Jornada Começa!'
            : `🗺️ Você está na Fase ${Math.min(faseAtual, FASES.length)}`}
        </h2>
        <p className="mapa__secao-desc">
          {fasesConcluidas.length === FASES.length
            ? 'Você derrotou todos os guardiões e salvou o Reino dos Números!'
            : 'Derrote os guardiões para avançar e restaurar o equilíbrio matemático.'}
        </p>
      </div>

      {/* Fases */}
      <div className="mapa__fases">
        {FASES.map((fase, idx) => {
          const concluida    = fasesConcluidas.includes(fase.id);
          const disponivel   = podeSelecionarFase(fase.id);
          const atual        = fase.id === faseAtual && !concluida;

          return (
            <div
              key={fase.id}
              className={`
                mapa__fase
                ${concluida  ? 'mapa__fase--concluida'  : ''}
                ${disponivel && !concluida ? 'mapa__fase--disponivel' : ''}
                ${!disponivel ? 'mapa__fase--bloqueada'  : ''}
                ${atual       ? 'mapa__fase--atual'      : ''}
              `}
              style={disponivel ? { '--cor-fase': fase.cor, '--cor-borda': fase.corBorda } : {}}
              onClick={() => disponivel && irParaIntro(fase.id)}
              role="button"
              tabIndex={disponivel ? 0 : -1}
              id={`btn-fase-${fase.id}`}
              aria-label={`${fase.nome} — ${concluida ? 'Concluída' : disponivel ? 'Disponível' : 'Bloqueada'}`}
              onKeyDown={(e) => e.key === 'Enter' && disponivel && irParaIntro(fase.id)}
            >
              {/* Conector entre fases */}
              {idx < FASES.length - 1 && (
                <div className={`mapa__conector ${concluida ? 'mapa__conector--ativo' : ''}`} />
              )}

              {/* Card da fase */}
              <div className="mapa__fase-card">
                {/* Imagem do guardião */}
                <div className="mapa__fase-guardiao">
                  <img
                    src={fase.imagemGuardiao}
                    alt={fase.nomeGuardiao}
                    className="mapa__fase-guardiao-img"
                  />
                  {concluida && (
                    <div className="mapa__fase-selo">✓</div>
                  )}
                  {!disponivel && (
                    <div className="mapa__fase-cadeado">🔒</div>
                  )}
                  {atual && (
                    <div className="mapa__fase-atual-badge">ATUAL</div>
                  )}
                </div>

                {/* Info da fase */}
                <div className="mapa__fase-info">
                  <span className="mapa__fase-numero">{fase.subtitulo}</span>
                  <h3 className="mapa__fase-nome">{fase.nome}</h3>
                  <span className="mapa__fase-guardiao-nome">{fase.nomeGuardiao} — {fase.titulo}</span>
                  <div className="mapa__fase-detalhes">
                    <span>⏱ {fase.tempoTotal}s</span>
                    <span>❓ {fase.totalPerguntas} perguntas</span>
                    <span>⭐ Dif. {fase.dificuldade}/5</span>
                  </div>
                </div>

                {/* Botão de ação */}
                {disponivel && (
                  <button
                    className="mapa__fase-btn"
                    style={{ background: `linear-gradient(135deg, ${fase.cor}cc, ${fase.corBorda}99)`, borderColor: fase.corBorda }}
                    tabIndex={-1}
                  >
                    {concluida ? '↺ Jogar Novamente' : atual ? '⚔️ Continuar' : '⚔️ Jogar'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
