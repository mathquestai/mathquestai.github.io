import { useState } from 'react';
import './PreviewPage.css';
import { BattleStage, DialogBox, HealthBar, CharacterSprite } from '../../components';

import imgKai   from '../../assets/characters/kai.png';
import imgLuna  from '../../assets/characters/luna.png';
import imgRoko  from '../../assets/characters/roko.png';
import imgFundo from '../../assets/backgrounds/planicies_verdes.png';

/**
 * PreviewPage — Página de validação da Sprint 1.
 * Demonstra o palco de combate, personagens, diálogos e barras de vida.
 */
export default function PreviewPage() {
  const [estadoKai,  setEstadoKai]  = useState('idle');
  const [estadoRoko, setEstadoRoko] = useState('idle');
  const [vidaKai,    setVidaKai]    = useState(80);
  const [vidaRoko,   setVidaRoko]   = useState(65);
  const [dialogoVisivel, setDialogoVisivel] = useState(true);
  const [dicaVisivel,    setDicaVisivel]    = useState(false);

  const simularAtaque = () => {
    setEstadoKai('atacar');
    setEstadoRoko('receber');
    setVidaRoko(v => Math.max(0, v - 15));
    setTimeout(() => {
      setEstadoKai('idle');
      setEstadoRoko('idle');
    }, 600);
  };

  const simularErro = () => {
    setEstadoRoko('atacar');
    setEstadoKai('receber');
    setVidaKai(v => Math.max(0, v - 20));
    setDicaVisivel(true);
    setTimeout(() => {
      setEstadoRoko('idle');
      setEstadoKai('idle');
    }, 600);
  };

  const simularComemorar = () => {
    setEstadoKai('comemorar');
    setTimeout(() => setEstadoKai('idle'), 700);
  };

  return (
    <BattleStage
      imagemFundo={imgFundo}
      heroi={{ nome: 'Kai', imagem: imgKai, vida: vidaKai, vidaMaxima: 100, estado: estadoKai }}
      guardiao={{ nome: 'Roko', imagem: imgRoko, vida: vidaRoko, vidaMaxima: 100, estado: estadoRoko }}
    >
      {/* Área central: questão e controles de preview */}
      <div className="preview__centro">

        {/* Indicador de fase */}
        <div className="preview__fase-badge">
          🗺️ Planícies Verdes — Fase 1
        </div>

        {/* Diálogo inicial do guardião */}
        {dialogoVisivel && (
          <DialogBox
            nomePersonagem="Roko, o Guardião de Pedra"
            tipo="normal"
            aoFechar={() => setDialogoVisivel(false)}
          >
            Rrrrr... Você não passa por mim sem resolver meus desafios!
            Prepare-se para a batalha, jovem Calculista!
          </DialogBox>
        )}

        {/* Dica da Luna */}
        {dicaVisivel && (
          <div className="preview__luna-wrapper animar-entrar">
            <div className="preview__luna-sprite">
              <CharacterSprite
                imagem={imgLuna}
                nome="Luna"
                estado="idle"
                lado="esquerda"
                flutuar
                className="preview__luna-img"
              />
            </div>
            <DialogBox
              nomePersonagem="Luna"
              tipo="dica"
              aoFechar={() => setDicaVisivel(false)}
            >
              🦉 <strong>Dica da Luna!</strong> Para multiplicar por 8,
              você pode dobrar o número três vezes!
              <br /><br />
              Exemplo: <strong>6 × 8</strong> → 6×2=12 → 12×2=24 → 24×2=<strong>48</strong> ✓
            </DialogBox>
          </div>
        )}

        {/* Questão de exemplo */}
        <div className="preview__questao painel-rpg">
          <div className="preview__questao-label">Calcule:</div>
          <div className="preview__questao-eq">7 × 8 = ?</div>
          <div className="preview__questao-progresso">Pergunta 3 de 10</div>
        </div>

        {/* Input de resposta */}
        <div className="preview__input-wrapper">
          <input
            type="number"
            className="preview__input"
            placeholder="Sua resposta..."
            aria-label="Digite sua resposta"
          />
          <button
            className="preview__btn-atacar"
            onClick={simularAtaque}
            id="btn-atacar"
          >
            ⚔️ Atacar!
          </button>
        </div>

        {/* Botões de simulação para validação */}
        <div className="preview__controles">
          <span className="preview__controles-label">Simulações de preview:</span>
          <div className="preview__controles-botoes">
            <button className="preview__btn-sim preview__btn-sim--acerto" onClick={simularAtaque} id="btn-sim-acerto">
              ✓ Simular Acerto
            </button>
            <button className="preview__btn-sim preview__btn-sim--erro" onClick={simularErro} id="btn-sim-erro">
              ✗ Simular Erro + Dica
            </button>
            <button className="preview__btn-sim preview__btn-sim--comemorar" onClick={simularComemorar} id="btn-sim-comemorar">
              🎉 Comemorar
            </button>
            <button className="preview__btn-sim" onClick={() => setVidaKai(100) + setVidaRoko(100)} id="btn-sim-reset">
              ↺ Resetar Vida
            </button>
          </div>
        </div>

      </div>
    </BattleStage>
  );
}
