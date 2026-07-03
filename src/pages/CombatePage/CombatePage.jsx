import { useState, useCallback, useEffect } from 'react';
import useSound from 'use-sound';
import './CombatePage.css';
import {
  BattleStage, ExibicaoQuestao, InputResposta,
  BolhaDica, BotaoPedirDica, TimerCombate,
} from '../../components';
import { useGame } from '../../context/GameContext';
import { useSoundContext } from '../../context/SoundContext';
import { getFase, TOTAL_FASES } from '../../utils/configFases';
import { gerarLoteQuestoes } from '../../utils/geradorQuestoes';
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

        {/* Resumo Pedagógico da Luna (Sprint 6) */}
        {!ehUltimaFase && (
          <div className="tela-resultado__dialogo-item tela-resultado__dialogo-item--luna" style={{marginTop: 'var(--esp-2)'}}>
            <span className="tela-resultado__dialogo-speaker">🦉 LUNA (Resumo Pedagógico)</span>
            <p className="tela-resultado__dialogo-texto">
              {fase.id === 1 && "Muito bem! Você dominou as tabuadas básicas. Para ser mais rápido, tente decorar os múltiplos de 5 e 10!"}
              {fase.id === 2 && "Ótimo! Multiplicações maiores exigem prática. Lembre-se que você pode quebrar os números: 15x4 é o mesmo que 10x4 + 5x4."}
              {fase.id === 3 && "Fantástico! O conceito de divisão está ficando claro. Lembre-se: a divisão é o inverso da multiplicação."}
              {fase.id === 4 && "Incrível! Divisões maiores podem assustar, mas você foi valente. Se ficar em dúvida, multiplique mentalmente para verificar."}
            </p>
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
    setEfeitoTela,
  } = useGame();

  const fase = getFase(estado.faseAtual);

  const { playCorrect, playWrong } = useSoundContext();

  /* ── Estado local ── */
  // Pré-gera lote de questões únicas para a fase inteira
  const [loteQuestoes,   setLoteQuestoes]   = useState(() => gerarLoteQuestoes(fase.dificuldade, fase.totalPerguntas));
  const [indiceQuestao,  setIndiceQuestao]  = useState(0);
  const [questao,        setQuestao]        = useState(() => gerarLoteQuestoes(fase.dificuldade, fase.totalPerguntas)[0]);
  const [statusResposta, setStatusResposta] = useState('');
  const [inputBloqueado, setInputBloqueado] = useState(false);
  const [dica,           setDica]           = useState(null);
  const [dicaVisivel,    setDicaVisivel]    = useState(false);
  const [msgFeedback,    setMsgFeedback]    = useState(null);
  const [motivoDerrota,  setMotivoDerrota]  = useState('hp');
  const [reiniciarTimer, setReiniciarTimer] = useState(false);

  // Efeito para limpar o shake/flash após um breve tempo
  useEffect(() => {
    if (estado.efeitoTela) {
      const timerId = setTimeout(() => setEfeitoTela(null), 500); // tempo das animações CSS
      return () => clearTimeout(timerId);
    }
  }, [estado.efeitoTela, setEfeitoTela]);

  const gerarNovaQuestao = useCallback(() => {
    setIndiceQuestao(prev => {
      const proximoIndice = prev + 1;
      const proximaQuestao = loteQuestoes[proximoIndice];
      // Se acabou o lote (não deveria acontecer pois totalPerguntas controla), gera nova aleatória
      if (proximaQuestao) {
        setQuestao(proximaQuestao);
      } else {
        setQuestao(gerarLoteQuestoes(fase.dificuldade, 1)[0]);
      }
      return proximoIndice;
    });
    setStatusResposta('');
    setInputBloqueado(false);
    setDicaVisivel(false);
    setDica(null);
    setMsgFeedback(null);
  }, [fase.dificuldade, loteQuestoes]);

  /* ── Responder ── */
  const handleResponder = useCallback((valor) => {
    if (inputBloqueado || estado.tela !== 'combate') return;
    setInputBloqueado(true);

    const correta = validarResposta(valor, questao.resposta);

    if (correta) {
      playCorrect();
      acertar();
      setStatusResposta('correta');
      setMsgFeedback(mensagemAcerto());
      setTimeout(() => {
        resetarAnim();
        proximoTurno();
        gerarNovaQuestao();
      }, 1600);
    } else {
      playWrong();
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
    const novoLote = gerarLoteQuestoes(fase.dificuldade, fase.totalPerguntas);
    setLoteQuestoes(novoLote);
    setIndiceQuestao(0);
    setQuestao(novoLote[0]);
    setStatusResposta('');
    setInputBloqueado(false);
    setDica(null);
    setDicaVisivel(false);
    setMsgFeedback(null);
    setMotivoDerrota('hp');
    setReiniciarTimer(r => !r);
  }, [reiniciar, fase.dificuldade, fase.totalPerguntas]);

  /* ── Próxima fase ── */
  const handleProximaFase = useCallback(() => {
    progredirFase();
    // A próxima fase terá dificuldade diferente: recriar lote com base na próxima fase
    const proximaFase = getFase(Math.min(estado.faseAtual + 1, 5));
    const novoLote = gerarLoteQuestoes(proximaFase.dificuldade, proximaFase.totalPerguntas);
    setLoteQuestoes(novoLote);
    setIndiceQuestao(0);
    setQuestao(novoLote[0]);
    setStatusResposta('');
    setInputBloqueado(false);
    setDicaVisivel(false);
    setDica(null);
    setMsgFeedback(null);
    setMotivoDerrota('hp');
    setReiniciarTimer(r => !r);
  }, [progredirFase, estado.faseAtual]);

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
    <div className={`combate-efeitos-wrapper ${estado.efeitoTela ? estado.efeitoTela : ''}`}>
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
    </div>
  );
}
