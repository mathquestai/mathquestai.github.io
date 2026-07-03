import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './IntroFase.css';
import { useGame } from '../../context/GameContext';
import { useSoundContext } from '../../context/SoundContext';
import { getFase } from '../../utils/configFases';
import ModalEstudo from '../../components/ModalEstudo';
import { CONTEUDO_ESTUDO } from '../../utils/conteudoEstudo';

/**
 * IntroFase — Tela de introdução narrativa de cada fase.
 * Exibe o cenário, guardião e diálogos antes do combate.
 */
export default function IntroFase() {
  const { estado, iniciarCombate, irParaMapa } = useGame();
  const fase = getFase(estado.faseAtual);
  const { setDucking } = useSoundContext();

  const [passoDialogo, setPassoDialogo] = useState(0);
  const [textoExibido, setTextoExibido] = useState('');
  const [digitando,    setDigitando]    = useState(true);
  
  // Estado do Modal de Estudo
  const [modalEstudoVisivel, setModalEstudoVisivel] = useState(false);

  const dialogoAtual = fase.dialogoIntro[passoDialogo];

  /* Efeito typewriter no texto do diálogo atual */
  useEffect(() => {
    setTextoExibido('');
    setDigitando(true);
    const texto = dialogoAtual?.texto ?? '';
    let i = 0;

    const intervalo = setInterval(() => {
      i++;
      setTextoExibido(texto.slice(0, i));
      if (i >= texto.length) {
        clearInterval(intervalo);
        setDigitando(false);
      }
    }, 22);

    return () => clearInterval(intervalo);
  }, [passoDialogo, dialogoAtual]);

  /* Avança para próximo diálogo ou começa o combate */
  const avancar = () => {
    if (digitando) {
      // Pula a animação — mostra tudo de uma vez
      setTextoExibido(dialogoAtual?.texto ?? '');
      setDigitando(false);
      return;
    }
    if (passoDialogo < fase.dialogoIntro.length - 1) {
      setPassoDialogo(p => p + 1);
    } else {
      iniciarCombate();
    }
  };

  const isUltimoDialogo  = passoDialogo === fase.dialogoIntro.length - 1;
  const isPersonagemLuna = dialogoAtual?.personagem === 'Luna';

  return (
    <div
      className="intro-fase"
      style={{ backgroundImage: `url(${fase.imagemFundo})` }}
      onClick={avancar}
      role="presentation"
    >
      <div className="intro-fase__overlay" />

      {/* Título da fase */}
      <div className="intro-fase__titulo-topo animar-entrar">
        <span className="intro-fase__subtitulo">{fase.subtitulo}</span>
        <h1 className="intro-fase__nome-fase">{fase.nome}</h1>
      </div>

      {/* Guardiões e herói */}
      <div className="intro-fase__arena">
        {/* Guardião lado direito */}
        <div className="intro-fase__personagem intro-fase__personagem--guardiao animar-entrar">
          <img
            src={fase.imagemGuardiao}
            alt={fase.nomeGuardiao}
            className="intro-fase__sprite intro-fase__sprite--guardiao"
          />
          <div className="intro-fase__personagem-info" style={{ borderColor: fase.cor }}>
            <span className="intro-fase__personagem-nome">{fase.nomeGuardiao}</span>
            <span className="intro-fase__personagem-titulo">{fase.titulo}</span>
          </div>
        </div>
      </div>

      {/* Caixa de diálogo */}
      <div className={`intro-fase__dialogo animar-entrar ${isPersonagemLuna ? 'intro-fase__dialogo--luna' : 'intro-fase__dialogo--guardiao'}`}>
        <div className="intro-fase__dialogo-cabecalho">
          <span className="intro-fase__dialogo-personagem">
            {isPersonagemLuna ? '🦉 ' : '⚔️ '}{dialogoAtual?.personagem}
          </span>
          <div className="intro-fase__dialogo-passos">
            {fase.dialogoIntro.map((_, i) => (
              <div
                key={i}
                className={`intro-fase__dialogo-passo ${i <= passoDialogo ? 'intro-fase__dialogo-passo--ativo' : ''}`}
                style={i <= passoDialogo ? { background: isPersonagemLuna ? '#f9a825' : fase.cor } : {}}
              />
            ))}
          </div>
        </div>

        <p className="intro-fase__dialogo-texto">
          {textoExibido}
          {digitando && <span className="intro-fase__cursor">|</span>}
        </p>

        <div className="intro-fase__dialogo-rodape">
          <button
            className="intro-fase__btn-voltar"
            onClick={(e) => { e.stopPropagation(); irParaMapa(); }}
            id="btn-voltar-mapa"
          >
            ← Mapa
          </button>
          
          <button
            className="intro-fase__btn-estudar"
            onClick={(e) => { e.stopPropagation(); setModalEstudoVisivel(true); }}
            id="btn-abrir-estudo"
          >
            📖 Estudar
          </button>

          <button
            id="btn-avancar-dialogo"
            className="intro-fase__btn-avancar"
            onClick={(e) => { e.stopPropagation(); avancar(); }}
          >
            {digitando
              ? 'Pular ›'
              : isUltimoDialogo
              ? '⚔️ Batalha!'
              : 'Próximo ›'}
          </button>
        </div>
      </div>

      {/* Modal de Estudo */}
      <ModalEstudo 
        fase={fase}
        conteudo={CONTEUDO_ESTUDO[fase.id] || CONTEUDO_ESTUDO[1]} 
        visivel={modalEstudoVisivel}
        aoFechar={() => setModalEstudoVisivel(false)}
      />
    </div>
  );
}
