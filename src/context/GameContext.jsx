import { createContext, useContext, useReducer, useCallback } from 'react';
import { FASES } from '../utils/configFases';

/* ─────────────────────────────────────────────────────────
   Estado inicial
───────────────────────────────────────────────────────── */
const estadoInicial = {
  // Jogador
  nomeJogador: 'Kai',

  // Navegação
  // 'loading' | 'menu' | 'tutorial' | 'mapa' | 'intro_fase' | 'combate' | 'vitoria_fase' | 'derrota_fase' | 'vitoria_final'
  tela: 'loading',

  // Progressão
  faseAtual:        1,
  fasesConcluidas:  [],
  pontuacaoTotal:   0,

  // Sistema de Conquistas e Efeitos (Sprint 6)
  conquistas: [],
  conquistaRecente: null,
  efeitoTela: null, // 'shake' | 'flash-verde' | 'flash-vermelho'

  // Combate da fase atual
  vidaHeroi:         100,
  vidaHeroiMax:      100,
  vidaGuardiao:      100,
  vidaGuardiaoMax:   100,
  pontuacao:         0,
  combo:             0,
  comboMax:          0,
  acertos:           0,
  erros:             0,
  errosConsecutivos: 0,
  perguntaAtual:     1,
  totalPerguntas:    10,
  timerAtivo:        false,

  // Animações
  estadoHeroi:    'idle',
  estadoGuardiao: 'idle',

  // Dica
  dicaUsadaNaQuestao: false,
};

/* ─────────────────────────────────────────────────────────
   Constantes de dano
───────────────────────────────────────────────────────── */
const DANO_BASE_HEROI  = 10;
const DANO_COMBO_BONUS = 3;
const DANO_GUARDIAO    = 15;
const PONTOS_BASE      = 10;
export const CUSTO_DICA = 5;

/* ─────────────────────────────────────────────────────────
   Helper: estado de combate limpo para uma fase
───────────────────────────────────────────────────────── */
function estadoCombateFase(estado, faseId) {
  const fase = FASES.find(f => f.id === faseId) ?? FASES[0];
  return {
    vidaHeroi:         100,
    vidaHeroiMax:      100,
    vidaGuardiao:      fase.vidaGuardiao,
    vidaGuardiaoMax:   fase.vidaGuardiao,
    pontuacao:         0,
    combo:             0,
    comboMax:          0,
    acertos:           0,
    erros:             0,
    errosConsecutivos: 0,
    perguntaAtual:     1,
    totalPerguntas:    fase.totalPerguntas,
    timerAtivo:        false,
    estadoHeroi:       'idle',
    estadoGuardiao:    'idle',
    dicaUsadaNaQuestao: false,
  };
}

/* ─────────────────────────────────────────────────────────
   Helper: Adicionar Conquista
───────────────────────────────────────────────────────── */
function adicionarConquista(estado, id, icone, titulo, descricao) {
  if (estado.conquistas.includes(id)) return estado;
  return {
    ...estado,
    conquistas: [...estado.conquistas, id],
    conquistaRecente: { id, icone, titulo, descricao }
  };
}

/* ─────────────────────────────────────────────────────────
   Reducer
───────────────────────────────────────────────────────── */
function gameReducer(estado, acao) {
  switch (acao.type) {

    /* ── Conquistas & Efeitos (Sprint 6) ── */
    case 'DESBLOQUEAR_CONQUISTA': 
      return adicionarConquista(estado, acao.payload.id, acao.payload.icone, acao.payload.titulo, acao.payload.descricao);
    case 'LIMPAR_CONQUISTA':
      return { ...estado, conquistaRecente: null };
    case 'SET_EFEITO_TELA':
      return { ...estado, efeitoTela: acao.payload };

    /* ── Combate ── */
    case 'ACERTO': {
      const novoCombo        = estado.combo + 1;
      const dano             = DANO_BASE_HEROI + (novoCombo > 1 ? (novoCombo - 1) * DANO_COMBO_BONUS : 0);
      const novaVidaGuardiao = Math.max(0, estado.vidaGuardiao - dano);
      const novosPontos      = estado.pontuacao + PONTOS_BASE * Math.max(1, novoCombo);
      const guardiaoDerrotado = novaVidaGuardiao <= 0;

      let novoEstado = {
        ...estado,
        vidaGuardiao:      novaVidaGuardiao,
        pontuacao:         novosPontos,
        combo:             novoCombo,
        comboMax:          Math.max(estado.comboMax, novoCombo),
        acertos:           estado.acertos + 1,
        errosConsecutivos: 0,
        estadoHeroi:       'atacar',
        estadoGuardiao:    'receber',
        efeitoTela:        'flash-verde',

        dicaUsadaNaQuestao: false,
        timerAtivo:        !guardiaoDerrotado,
        tela:              guardiaoDerrotado ? 'vitoria_fase' : estado.tela,
        fasesConcluidas:   guardiaoDerrotado
          ? [...new Set([...estado.fasesConcluidas, estado.faseAtual])]
          : estado.fasesConcluidas,
        pontuacaoTotal:    guardiaoDerrotado
          ? estado.pontuacaoTotal + novosPontos
          : estado.pontuacaoTotal,
      };

      if (novoCombo === 5) {
        novoEstado = adicionarConquista(novoEstado, 'combo_5', '🔥', 'Combo Mestre', 'Chegou a 5 acertos consecutivos!');
      }

      return novoEstado;
    }

    case 'ERRO': {
      const novaVidaHeroi  = Math.max(0, estado.vidaHeroi - DANO_GUARDIAO);
      const heroiDerrotado = novaVidaHeroi <= 0;

      return {
        ...estado,
        vidaHeroi:         novaVidaHeroi,
        combo:             0,
        erros:             estado.erros + 1,
        errosConsecutivos: estado.errosConsecutivos + 1,
        estadoHeroi:       'receber',
        estadoGuardiao:    'atacar',
        efeitoTela:        'shake',

        timerAtivo:        !heroiDerrotado,
        tela:              heroiDerrotado ? 'derrota_fase' : estado.tela,
      };
    }

    case 'RESETAR_ANIMACOES':
      return { ...estado, estadoHeroi: 'idle', estadoGuardiao: 'idle' };

    case 'PROXIMO_TURNO': {
      const ultimoTurno = estado.perguntaAtual >= estado.totalPerguntas;
      if (ultimoTurno) {
        const precisao = (estado.acertos / estado.totalPerguntas) * 100;
        const venceu   = precisao >= 70;
        const novasFasesConcluidas = venceu
          ? [...new Set([...estado.fasesConcluidas, estado.faseAtual])]
          : estado.fasesConcluidas;

        let novoEstado = {
          ...estado,
          tela:            venceu ? 'vitoria_fase' : 'derrota_fase',
          timerAtivo:      false,
          fasesConcluidas: novasFasesConcluidas,
          pontuacaoTotal:  venceu ? estado.pontuacaoTotal + estado.pontuacao : estado.pontuacaoTotal,
        };

        if (venceu) {
          if (estado.vidaHeroi === 100) {
            novoEstado = adicionarConquista(novoEstado, 'intocavel', '🛡️', 'Intocável', 'Venceu uma fase sem sofrer dano!');
          } else if (estado.vidaHeroi <= 20) {
            novoEstado = adicionarConquista(novoEstado, 'sobrevivente', '❤️‍🩹', 'Sobrevivente', 'Venceu com 20% ou menos de vida!');
          }
        }
        return novoEstado;
      }
      return {
        ...estado,
        perguntaAtual:      estado.perguntaAtual + 1,
        dicaUsadaNaQuestao: false,
      };
    }

    case 'USAR_DICA':
      return {
        ...estado,
        dicaUsadaNaQuestao: true,
        pontuacao:  Math.max(0, estado.pontuacao - CUSTO_DICA),
        timerAtivo: false,
      };

    case 'FECHAR_DICA':
      return { ...estado, timerAtivo: true };

    case 'TIMEOUT':
      return { ...estado, tela: 'derrota_fase', timerAtivo: false };

    /* ── Navegação de fases ── */
    case 'IR_PARA_INTRO': {
      const faseId = acao.faseId ?? estado.faseAtual;
      return {
        ...estado,
        ...estadoCombateFase(estado, faseId),
        faseAtual: faseId,
        tela: 'intro_fase',
      };
    }

    case 'INICIAR_COMBATE':
      return { ...estado, tela: 'combate', timerAtivo: true };

    case 'PROGREDIR_FASE': {
      // Vai para a próxima fase após vitória
      const proximaFase = estado.faseAtual + 1;
      const ultimaFase  = proximaFase > FASES.length;
      if (ultimaFase) {
        return { ...estado, tela: 'vitoria_final' };
      }
      return {
        ...estado,
        ...estadoCombateFase(estado, proximaFase),
        faseAtual: proximaFase,
        tela: 'mapa',
      };
    }

    case 'REINICIAR_FASE': {
      const faseId = estado.faseAtual;
      return {
        ...estado,
        ...estadoCombateFase(estado, faseId),
        tela: 'intro_fase',
      };
    }

    case 'IR_PARA_MAPA':
      return { ...estado, tela: 'mapa', timerAtivo: false };

    case 'IR_PARA_TELA':
      return { ...estado, tela: acao.tela, timerAtivo: false };

    case 'DEFINIR_NOME':
      return { ...estado, nomeJogador: acao.nome };

    default:
      return estado;
  }
}

/* ─────────────────────────────────────────────────────────
   Context + Provider
───────────────────────────────────────────────────────── */
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [estado, dispatch] = useReducer(gameReducer, estadoInicial);

  const acertar       = useCallback(() => dispatch({ type: 'ACERTO' }),          []);
  const errar         = useCallback(() => dispatch({ type: 'ERRO' }),            []);
  const proximoTurno  = useCallback(() => dispatch({ type: 'PROXIMO_TURNO' }),   []);
  const usarDica      = useCallback(() => dispatch({ type: 'USAR_DICA' }),       []);
  const fecharDica    = useCallback(() => dispatch({ type: 'FECHAR_DICA' }),     []);
  const timeout       = useCallback(() => dispatch({ type: 'TIMEOUT' }),         []);
  const reiniciar     = useCallback(() => dispatch({ type: 'REINICIAR_FASE' }),  []);
  const resetarAnim   = useCallback(() => dispatch({ type: 'RESETAR_ANIMACOES' }), []);
  const progredirFase = useCallback(() => dispatch({ type: 'PROGREDIR_FASE' }),  []);
  const irParaMapa    = useCallback(() => dispatch({ type: 'IR_PARA_MAPA' }),    []);
  const iniciarCombate = useCallback(() => dispatch({ type: 'INICIAR_COMBATE' }), []);
  const irParaIntro   = useCallback((faseId) => dispatch({ type: 'IR_PARA_INTRO', faseId }), []);
  const irParaTela    = useCallback((tela) => dispatch({ type: 'IR_PARA_TELA', tela }),      []);
  const definirNome   = useCallback((nome) => dispatch({ type: 'DEFINIR_NOME', nome }),      []);
  const desbloquearConquista = useCallback((payload) => dispatch({ type: 'DESBLOQUEAR_CONQUISTA', payload }), []);
  const limparConquistaRecente = useCallback(() => dispatch({ type: 'LIMPAR_CONQUISTA' }), []);
  const setEfeitoTela = useCallback((payload) => dispatch({ type: 'SET_EFEITO_TELA', payload }), []);

  return (
    <GameContext.Provider value={{
      estado,
      acertar, errar, proximoTurno,
      usarDica, fecharDica, timeout,
      reiniciar, resetarAnim,
      progredirFase, irParaMapa, iniciarCombate,
      irParaIntro, irParaTela, definirNome,
      desbloquearConquista, limparConquistaRecente, setEfeitoTela,
      CUSTO_DICA,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame deve ser usado dentro de <GameProvider>');
  return ctx;
}

export default GameContext;
