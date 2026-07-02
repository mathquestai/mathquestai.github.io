import './BotaoPedirDica.css';

/**
 * BotaoPedirDica — Botão que o aluno usa para chamar a Luna antes de responder.
 * @param {Function} aoClicar     — callback ao pedir dica
 * @param {boolean}  desabilitado — desabilita após usar ou durante dica
 * @param {number}   custoPontos  — quantos pontos custa (default 5)
 * @param {boolean}  jaUsou       — se já usou nessa questão
 */
export default function BotaoPedirDica({ aoClicar, desabilitado = false, custoPontos = 5, jaUsou = false }) {
  return (
    <button
      id="btn-pedir-dica"
      className={`btn-pedir-dica ${jaUsou ? 'btn-pedir-dica--usado' : ''}`}
      onClick={aoClicar}
      disabled={desabilitado || jaUsou}
      title={jaUsou ? 'Dica já usada nessa questão' : `Pedir dica à Luna (−${custoPontos} pontos)`}
      aria-label={`Pedir dica à Luna. Custa ${custoPontos} pontos.`}
    >
      <span className="btn-pedir-dica__icone">🦉</span>
      <span className="btn-pedir-dica__texto">
        {jaUsou ? 'Dica usada' : 'Pedir Dica à Luna'}
      </span>
      {!jaUsou && (
        <span className="btn-pedir-dica__custo">−{custoPontos} pts</span>
      )}
    </button>
  );
}
