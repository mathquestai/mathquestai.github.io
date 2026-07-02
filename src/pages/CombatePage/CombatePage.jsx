import { useState, useCallback, useRef } from 'react';
import './CombatePage.css';
import {
  BattleStage, ExibicaoQuestao, InputResposta,
  BolhaDica, BotaoPedirDica, TimerCombate,
} from '../../components';
import { useGame } from '../../context/GameContext';
import { getFase, TOTAL_FASES } from '../../utils/configFases';
import { gerarQuestao } from '../../utils/geradorQuestoes';
import { validarResposta } from '../../utils/validadorResposta';
import { gerarDica, mensagemAcerto, mensagemErro } from '../../utils/geradorDicas';

/* ──────────────────────────────────────────────────────
   Tela de Vitória da Fase
────────────────────────────────────────────────────── */
function TelaVitoriaFase({ estado, fase, aoProximaFase, aoJogarNovamente, aoMapa }) {
  const precisao = estado.totalPerguntas > 0
    ? Math.round((estado.acertos / estado.totalPerguntas) * 100)
    : 0;
  const ehUltimaFase = fase.id >= TOTAL_FASES;

  const dialogoVitoria = fase.dialogoVitoria ?? [];

  return (
    <div className="tela-resultado tela-resultado--vitoria animar-entrar"
      style={{ backgroundImage: `url(${fase.imagemFundo})` }}>
      <div className="tela-resultado__overlay" />
      <div className="tela-resultado__conteudo">
        <div className="tela-resultado__icone">{ehUltimaFase ? '🏆' : '⭐'}</div>
        <h1 className="tela-resultado__titulo">
          {ehUltimaFase ? 'Vitória Final!' : 'Fase Concluída!'}
        </h1>
        <p className="tela-resultado__subtitulo">
          {ehUltimaFase
            ? 'Você derrotou Obscurus e salvou o Reino dos Números!'
            : `Você derrotou ${fase.nomeGuardiao} e libertou ${fase.nome}!`}
        </p>

        {/* Diálogos de vitória */}
        {dialogoVitoria.length > 0 && (
          <div className="tela-resultado__dialogos">
            {dialogoVitoria.map((d, i) => (
              <div key={i} className={`tela-resultado__dialogo-item ${d.personagem === 'Luna' ? 'tela-resultado__dialogo-item--luna' : ''}`}>
                <span className="tela-resultado__dialogo-speaker">
                  {d.personagem === 'Luna' ? '🦉' : '💀'} {d.personagem}
                </span>
                <p className="tela-resultado__dialogo-texto">{d.texto}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="tela-resultado__stats">
          {[
            { label: 'Acertos',    valor: estado.acertos,  classe: '--verde' },
            { label: 'Erros',      valor: estado.erros,    classe: '--vermelho' },
            { label: 'Pontuação',  valor: estado.pontuacao, classe: '--dourado' },
            { label: 'Precisão',   valor: `${precisao}%`,  classe: '' },
            { label: 'Combo Máx.', valor: `×${estado.comboMax}`, classe: '' },
          ].map(({ label, valor, classe }) => (
            <div key={label} className="tela-resultado__stat">
              <span className="tela-resultado__stat-label">{label}</span>
              <strong className={`tela-resultado__stat-valor tela-resultado__stat-valor${classe}`}>{valor}</strong>
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="tela-resultado__botoes">
          {!ehUltimaFase && (
            <button id="btn-proxima-fase" className="tela-resultado__btn tela-resultado__btn--primario" onClick={aoProximaFase}>
              ▶ Próxima Fase
            </button>
          )}
          <button id="btn-mapa" className="tela-resultado__btn tela-resultado__btn--secundario" onClick={aoMapa}>
            🗺️ Ver Mapa
          </button>
          <button id="btn-jogar-novamente" className="tela-resultado__btn tela-resultado__btn--terciario" onClick={aoJogarNovamente}>
            ↺ Repetir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   Tela de Derrota
────────────────────────────────────────────────────── */
function TelaDerrotaFase({ estado, fase, motivo, aoTentarNovamente, aoMapa }) {
  const precisao = estado.totalPerguntas > 0
    ? Math.round((estado.acertos / estado.totalPerguntas) * 100)
    : 0;

  return (
    <div className="tela-resultado tela-resultado--derrota animar-entrar"
      style={{ backgroundImage: `url(${fase.imagemFundo})` }}>
      <div className="tela-resultado__overlay" />
      <div className="tela-resultado__conteudo">
        <div className="tela-resultado__icone">💀</div>
        <h1 className="tela-resultado__titulo">Derrota...</h1>
        <p className="tela-resultado__subtitulo">
          {motivo === 'tempo'
            ? `O tempo acabou! ${fase.nomeGuardiao} resistiu desta vez...`
            : `${fase.nomeGuardiao} foi forte demais dessa vez...`}
        </p>

        <div className="tela-resultado__luna">
          <span>🦉</span>
          <p>Não desanime! Cada erro é uma lição. Reveja as dicas e tente novamente — você consegue! 💪</p>
        </div>

        <div className="tela-resultado__stats">
          {[
            { label: 'Acertos',   valor: estado.acertos,   classe: '--verde' },
            { label: 'Erros',     valor: estado.erros,     classe: '--vermelho' },
            { label: 'Pontuação', valor: estado.pontuacao, classe: '--dourado' },
            { label: 'Precisão',  valor: `${precisao}%`,  classe: '' },
          ].map(({ label, valor, classe }) => (
            <div key={label} className="tela-resultado__stat">
              <span className="tela-resultado__stat-label">{label}</span>
              <strong className={`tela-resultado__stat-valor tela-resultado__stat-valor${classe}`}>{valor}</strong>
            </div>
          ))}
        </div>

        <div className="tela-resultado__botoes">
          <button id="btn-tentar-novamente" className="tela-resultado__btn tela-resultado__btn--primario" onClick={aoTentarNovamente}>
            ↺ Tentar Novamente
          </button>
          <button id="btn-mapa-derrota" className="tela-resultado__btn tela-resultado__btn--secundario" onClick={aoMapa}>
            🗺️ Ver Mapa
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   CombatePage principal
────────────────────────────────────────────────────── */
export default function CombatePage() {
  const {
    estado, acertar, errar, proximoTurno,
    usarDica, fecharDica, timeout, reiniciar,
    resetarAnim, progredirFase, irParaMapa,
  } = useGame();

  const fase = getFase(estado.faseAtual);

  /* ── Estado local ── */
  const [questao,        setQuestao]        = useState(() => gerarQuestao(fase.dificuldade));
  const [statusResposta, setStatusResposta] = useState('');
  const [inputBloqueado, setInputBloqueado] = useState(false);
  const [dica,           setDica]           = useState(null);
  const [dicaVisivel,    setDicaVisivel]    = useState(false);
  const [msgFeedback,    setMsgFeedback]    = useState(null);
  const [motivoDerrota,  setMotivoDerrota]  = useState('hp');
  const [reiniciarTimer, setReiniciarTimer] = useState(false);

  const gerarNovaQuestao = useCallback(() => {
    setQuestao(gerarQuestao(fase.dificuldade));
    setStatusResposta('');
    setInputBloqueado(false);
    setDicaVisivel(false);
    setDica(null);
    setMsgFeedback(null);
  }, [fase.dificuldade]);

  /* ── Responder ── */
  const handleResponder = useCallback((valor) => {
    if (inputBloqueado || estado.tela !== 'combate') return;
    setInputBloqueado(true);

    const correta = validarResposta(valor, questao.resposta);

    if (correta) {
      acertar();
      setStatusResposta('correta');
      setMsgFeedback(mensagemAcerto());
      setTimeout(() => {
        resetarAnim();
        proximoTurno();
        gerarNovaQuestao();
      }, 1600);
    } else {
      errar();
      setStatusResposta('errada');
      setMsgFeedback(mensagemErro());
      const novaDica = gerarDica(questao, estado.errosConsecutivos + 1 >= 2 ? 2 : 1);
      setDica(novaDica);
      setTimeout(() => {
        resetarAnim();
        setStatusResposta('');
        setMsgFeedback(null);
        setDicaVisivel(true);
        setInputBloqueado(false);
      }, 900);
    }
  }, [inputBloqueado, questao, estado.tela, estado.errosConsecutivos,
      acertar, errar, proximoTurno, resetarAnim, gerarNovaQuestao]);

  /* ── Pedir dica ── */
  const handlePedirDica = useCallback(() => {
    if (estado.dicaUsadaNaQuestao) return;
    usarDica();
    setDica(gerarDica(questao, 1));
    setDicaVisivel(true);
    setInputBloqueado(true);
  }, [estado.dicaUsadaNaQuestao, usarDica, questao]);

  /* ── Fechar dica ── */
  const handleFecharDica = useCallback(() => {
    fecharDica();
    setDicaVisivel(false);
    setInputBloqueado(false);
  }, [fecharDica]);

  /* ── Timeout ── */
  const handleTimeout = useCallback(() => {
    setMotivoDerrota('tempo');
    timeout();
  }, [timeout]);

  /* ── Reiniciar fase ── */
  const handleReiniciar = useCallback(() => {
    reiniciar();
    setQuestao(gerarQuestao(fase.dificuldade));
    setStatusResposta('');
    setInputBloqueado(false);
    setDica(null);
    setDicaVisivel(false);
    setMsgFeedback(null);
    setMotivoDerrota('hp');
    setReiniciarTimer(r => !r);
  }, [reiniciar, fase.dificuldade]);

  /* ── Próxima fase ── */
  const handleProximaFase = useCallback(() => {
    progredirFase();
    gerarNovaQuestao();
    setMotivoDerrota('hp');
    setReiniciarTimer(r => !r);
  }, [progredirFase, gerarNovaQuestao]);

  /* ── Tela de vitória ── */
  if (estado.tela === 'vitoria_fase') {
    return (
      <TelaVitoriaFase
        estado={estado}
        fase={fase}
        aoProximaFase={handleProximaFase}
        aoJogarNovamente={handleReiniciar}
        aoMapa={irParaMapa}
      />
    );
  }

  /* ── Tela de derrota ── */
  if (estado.tela === 'derrota_fase') {
    return (
      <TelaDerrotaFase
        estado={estado}
        fase={fase}
        motivo={motivoDerrota}
        aoTentarNovamente={handleReiniciar}
        aoMapa={irParaMapa}
      />
    );
  }

  /* ── Tela de combate ── */
  return (
    <BattleStage
      imagemFundo={fase.imagemFundo}
      heroi={{
        nome:       estado.nomeJogador,
        imagem:     fase.imagemHeroi,
        vida:       estado.vidaHeroi,
        vidaMaxima: estado.vidaHeroiMax,
        estado:     estado.estadoHeroi,
      }}
      guardiao={{
        nome:       fase.nomeGuardiao,
        imagem:     fase.imagemGuardiao,
        vida:       estado.vidaGuardiao,
        vidaMaxima: fase.vidaGuardiao,
        estado:     estado.estadoGuardiao,
      }}
    >
      <div className="combate-centro">

        {/* HUD */}
        <div className="combate-hud">
          <div className="combate-hud__pontuacao">
            <span className="combate-hud__label">Pontuação</span>
            <span className="combate-hud__valor" id="hud-pontuacao">{estado.pontuacao}</span>
          </div>

          <TimerCombate
            tempoTotal={fase.tempoTotal}
            ativo={estado.timerAtivo && estado.tela === 'combate'}
            aoZerar={handleTimeout}
            reiniciar={reiniciarTimer}
          />

          <div className="combate-hud__direita">
            {estado.combo >= 2 && (
              <div className="combate-hud__combo animar-escala" id="hud-combo">
                <span className="combate-hud__label">Combo</span>
                <span className="combate-hud__combo-valor">×{estado.combo}</span>
              </div>
            )}
            <div className="combate-hud__acertos">
              <span className="combate-hud__acertos-item combate-hud__acertos-item--ok">✓ {estado.acertos}</span>
              <span className="combate-hud__acertos-item combate-hud__acertos-item--erro">✗ {estado.erros}</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {msgFeedback && !dicaVisivel && (
          <div className={`combate-feedback combate-feedback--${statusResposta} animar-escala`} aria-live="polite">
            🦉 {msgFeedback}
          </div>
        )}

        {/* Dica da Luna */}
        {dicaVisivel && dica && (
          <BolhaDica dica={dica} aoFechar={handleFecharDica} visivel />
        )}

        {/* Questão */}
        <ExibicaoQuestao
          questao={questao}
          numeroAtual={estado.perguntaAtual}
          totalQuestoes={estado.totalPerguntas}
          statusResposta={statusResposta}
        />

        {/* Input */}
        {!dicaVisivel && (
          <>
            <InputResposta aoSubmeter={handleResponder} desabilitado={inputBloqueado} />
            <BotaoPedirDica
              aoClicar={handlePedirDica}
              desabilitado={inputBloqueado}
              jaUsou={estado.dicaUsadaNaQuestao}
              custoPontos={5}
            />
          </>
        )}

      </div>
    </BattleStage>
  );
}
