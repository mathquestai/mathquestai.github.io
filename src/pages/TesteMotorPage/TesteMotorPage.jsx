import { useState, useCallback, useEffect } from 'react';
import './TesteMotorPage.css';
import {
  BattleStage, ExibicaoQuestao, InputResposta,
  BolhaDica, BotaoPedirDica, DialogBox,
} from '../../components';
import { gerarQuestao } from '../../utils/geradorQuestoes';
import { validarResposta } from '../../utils/validadorResposta';
import { gerarDica, mensagemAcerto, mensagemErro } from '../../utils/geradorDicas';

import imgKai   from '../../assets/characters/kai.png';
import imgLuna  from '../../assets/characters/luna.png';
import imgRoko  from '../../assets/characters/roko.png';
import imgFundo from '../../assets/backgrounds/planicies_verdes.png';

const TOTAL_QUESTOES = 10;
const DIFICULDADE    = 1;

export default function TesteMotorPage() {
  const novaQuestao = useCallback(() => gerarQuestao(DIFICULDADE), []);

  const [questao,        setQuestao]        = useState(() => novaQuestao());
  const [numeroAtual,    setNumeroAtual]    = useState(1);
  const [statusResposta, setStatusResposta] = useState('');   // '' | 'correta' | 'errada'
  const [inputBloqueado, setInputBloqueado] = useState(false);
  const [errosConsec,    setErrosConsec]    = useState(0);
  const [dicaUsada,      setDicaUsada]      = useState(false);
  const [dica,           setDica]           = useState(null);
  const [dicaVisivel,    setDicaVisivel]    = useState(false);
  const [msgDialogo,     setMsgDialogo]     = useState(null);
  const [pontuacao,      setPontuacao]      = useState(0);
  const [combo,          setCombo]          = useState(0);
  const [acertos,        setAcertos]        = useState(0);
  const [erros,          setErros]          = useState(0);
  const [vidaKai,        setVidaKai]        = useState(100);
  const [vidaRoko,       setVidaRoko]       = useState(100);
  const [estadoKai,      setEstadoKai]      = useState('idle');
  const [estadoRoko,     setEstadoRoko]     = useState('idle');
  const [fase,           setFase]           = useState('jogando'); // 'jogando' | 'fim'

  const proximaQuestao = useCallback(() => {
    if (numeroAtual >= TOTAL_QUESTOES) {
      setFase('fim');
      return;
    }
    setQuestao(novaQuestao());
    setNumeroAtual(n => n + 1);
    setStatusResposta('');
    setInputBloqueado(false);
    setErrosConsec(0);
    setDicaUsada(false);
    setDicaVisivel(false);
    setDica(null);
  }, [numeroAtual, novaQuestao]);

  const handleResponder = useCallback((valor) => {
    if (inputBloqueado || fase !== 'jogando') return;
    setInputBloqueado(true);

    const correta = validarResposta(valor, questao.resposta);

    if (correta) {
      // Acerto
      const novoCombo = combo + 1;
      const pts = 10 * Math.max(1, novoCombo);
      setCombo(novoCombo);
      setPontuacao(p => p + pts);
      setAcertos(a => a + 1);
      setErrosConsec(0);
      setDicaVisivel(false);
      setStatusResposta('correta');
      setEstadoKai('atacar');
      setEstadoRoko('receber');
      setVidaRoko(v => Math.max(0, v - (8 + novoCombo * 2)));
      setMsgDialogo({ texto: mensagemAcerto(), tipo: 'vitoria' });

      setTimeout(() => {
        setEstadoKai('idle');
        setEstadoRoko('idle');
        setMsgDialogo(null);
        proximaQuestao();
      }, 1800);

    } else {
      // Erro
      const novosErros = errosConsec + 1;
      setErrosConsec(novosErros);
      setCombo(0);
      setErros(e => e + 1);
      setStatusResposta('errada');
      setEstadoRoko('atacar');
      setEstadoKai('receber');
      setVidaKai(v => Math.max(0, v - 15));

      // Gera dica contextualizada
      const novaDica = gerarDica(questao, novosErros >= 2 ? 2 : 1);
      setDica(novaDica);

      setTimeout(() => {
        setEstadoKai('idle');
        setEstadoRoko('idle');
        setStatusResposta('');
        setDicaVisivel(true);    // mostra dica da Luna automaticamente
        setInputBloqueado(false);
      }, 800);
    }
  }, [inputBloqueado, questao, combo, errosConsec, fase, proximaQuestao]);

  const handlePedirDica = useCallback(() => {
    if (dicaUsada) return;
    setDicaUsada(true);
    setPontuacao(p => Math.max(0, p - 5));
    const novaDica = gerarDica(questao, 1);
    setDica(novaDica);
    setDicaVisivel(true);
    setInputBloqueado(true);
  }, [dicaUsada, questao]);

  const handleFecharDica = useCallback(() => {
    setDicaVisivel(false);
    setInputBloqueado(false);
  }, []);

  const reiniciar = () => {
    setQuestao(novaQuestao());
    setNumeroAtual(1);
    setStatusResposta('');
    setInputBloqueado(false);
    setErrosConsec(0);
    setDicaUsada(false);
    setDicaVisivel(false);
    setDica(null);
    setMsgDialogo(null);
    setPontuacao(0);
    setCombo(0);
    setAcertos(0);
    setErros(0);
    setVidaKai(100);
    setVidaRoko(100);
    setEstadoKai('idle');
    setEstadoRoko('idle');
    setFase('jogando');
  };

  return (
    <BattleStage
      imagemFundo={imgFundo}
      heroi={{     nome: 'Kai',  imagem: imgKai,  vida: vidaKai,  vidaMaxima: 100, estado: estadoKai  }}
      guardiao={{  nome: 'Roko', imagem: imgRoko, vida: vidaRoko, vidaMaxima: 100, estado: estadoRoko }}
    >
      <div className="motor-centro">

        {/* HUD: pontuação e combo */}
        <div className="motor-hud">
          <div className="motor-hud__item">
            <span className="motor-hud__label">Pontuação</span>
            <span className="motor-hud__valor">{pontuacao}</span>
          </div>
          {combo >= 2 && (
            <div className="motor-hud__item motor-hud__item--combo animar-escala">
              <span className="motor-hud__label">Combo</span>
              <span className="motor-hud__valor motor-hud__valor--combo">×{combo}</span>
            </div>
          )}
          <div className="motor-hud__item">
            <span className="motor-hud__label">✓ {acertos}</span>
            <span className="motor-hud__label">✗ {erros}</span>
          </div>
        </div>

        {/* Tela de fim */}
        {fase === 'fim' ? (
          <div className="motor-fim painel-rpg animar-entrar">
            <h2 className="motor-fim__titulo">
              {vidaKai > 0 ? '🏆 Fase Concluída!' : '💀 Derrota!'}
            </h2>
            <div className="motor-fim__stats">
              <div><span>Acertos</span><strong>{acertos}</strong></div>
              <div><span>Erros</span><strong>{erros}</strong></div>
              <div><span>Pontuação</span><strong>{pontuacao}</strong></div>
              <div><span>Precisão</span><strong>{Math.round((acertos / TOTAL_QUESTOES) * 100)}%</strong></div>
            </div>
            <button className="motor-fim__btn" onClick={reiniciar} id="btn-jogar-novamente">
              ↺ Jogar Novamente
            </button>
          </div>
        ) : (
          <>
            {/* Mensagem de acerto */}
            {msgDialogo && (
              <DialogBox nomePersonagem="Luna" tipo={msgDialogo.tipo} visivel>
                {msgDialogo.texto}
              </DialogBox>
            )}

            {/* Dica da Luna */}
            {dicaVisivel && dica && (
              <BolhaDica dica={dica} aoFechar={handleFecharDica} visivel />
            )}

            {/* Questão */}
            <ExibicaoQuestao
              questao={questao}
              numeroAtual={numeroAtual}
              totalQuestoes={TOTAL_QUESTOES}
              statusResposta={statusResposta}
            />

            {/* Input + botão pedir dica */}
            {!dicaVisivel && (
              <>
                <InputResposta
                  aoSubmeter={handleResponder}
                  desabilitado={inputBloqueado}
                />
                <BotaoPedirDica
                  aoClicar={handlePedirDica}
                  desabilitado={inputBloqueado}
                  jaUsou={dicaUsada}
                  custoPontos={5}
                />
              </>
            )}
          </>
        )}

      </div>
    </BattleStage>
  );
}
