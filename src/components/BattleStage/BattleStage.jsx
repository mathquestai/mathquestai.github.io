import './BattleStage.css';
import CharacterSprite from '../CharacterSprite';
import HealthBar from '../HealthBar';

/**
 * BattleStage — Layout do palco de combate estilo RPG.
 * Exibe herói à esquerda, guardião à direita, sobre um cenário de fundo.
 *
 * @param {string} imagemFundo      - URL da imagem de fundo da fase
 * @param {object} heroi            - { nome, imagem, vida, vidaMaxima, estado }
 * @param {object} guardiao         - { nome, imagem, vida, vidaMaxima, estado }
 * @param {ReactNode} children      - Área central (questão, input, etc.)
 */
export default function BattleStage({ imagemFundo, heroi, guardiao, children }) {
  return (
    <div className="palco" role="main">
      {/* Fundo da fase */}
      <div
        className="palco__fundo"
        style={{ backgroundImage: `url(${imagemFundo})` }}
        aria-hidden="true"
      />

      {/* Overlay atmosférico */}
      <div className="palco__overlay" aria-hidden="true" />

      {/* Área de combate: personagens */}
      <div className="palco__arena">
        {/* === HERÓI (esquerda) === */}
        <div className="palco__lado palco__lado--heroi">
          <HealthBar
            nome={heroi.nome}
            vida={heroi.vida}
            vidaMaxima={heroi.vidaMaxima}
            tipo="heroi"
          />
          <div className="palco__sprite-wrapper">
            <CharacterSprite
              imagem={heroi.imagem}
              nome={heroi.nome}
              estado={heroi.estado || 'idle'}
              lado="esquerda"
              flutuar
              className="palco__sprite palco__sprite--heroi"
            />
          </div>
        </div>

        {/* === ÁREA CENTRAL (questão/input) === */}
        <div className="palco__centro">
          {children}
        </div>

        {/* === GUARDIÃO (direita) === */}
        <div className="palco__lado palco__lado--guardiao">
          <HealthBar
            nome={guardiao.nome}
            vida={guardiao.vida}
            vidaMaxima={guardiao.vidaMaxima}
            tipo="guardiao"
          />
          <div className="palco__sprite-wrapper">
            <CharacterSprite
              imagem={guardiao.imagem}
              nome={guardiao.nome}
              estado={guardiao.estado || 'idle'}
              lado="direita"
              flutuar
              className="palco__sprite palco__sprite--guardiao"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
