import { useEffect, useState } from 'react';
import './ExibicaoQuestao.css';

/**
 * ExibicaoQuestao — Exibe a questão matemática atual com animação de entrada.
 * @param {{ operando1, operando2, operador, resposta }} questao
 * @param {number} numeroAtual   — número da pergunta atual na fase
 * @param {number} totalQuestoes — total de perguntas na fase
 * @param {string} statusResposta — '' | 'correta' | 'errada'
 */
export default function ExibicaoQuestao({ questao, numeroAtual, totalQuestoes, statusResposta = '' }) {
  const [animKey, setAnimKey] = useState(0);

  // Reinicia animação cada vez que a questão muda
  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [questao?.id]);

  if (!questao) return null;

  const classeStatus = statusResposta === 'correta'
    ? 'questao--correta'
    : statusResposta === 'errada'
    ? 'questao--errada'
    : '';

  return (
    <div className={`questao painel-rpg ${classeStatus}`} key={animKey}>
      {/* Progresso */}
      <div className="questao__progresso">
        <div className="questao__progresso-barra">
          <div
            className="questao__progresso-fill"
            style={{ width: `${(numeroAtual / totalQuestoes) * 100}%` }}
          />
        </div>
        <span className="questao__progresso-texto">
          Pergunta {numeroAtual} de {totalQuestoes}
        </span>
      </div>

      {/* Label */}
      <div className="questao__label">Calcule:</div>

      {/* A equação em destaque */}
      <div className="questao__eq" aria-label={`${questao.operando1} ${questao.operador} ${questao.operando2} igual a quanto?`}>
        <span className="questao__num">{questao.operando1}</span>
        <span className="questao__op">{questao.operador}</span>
        <span className="questao__num">{questao.operando2}</span>
        <span className="questao__op">=</span>
        <span className="questao__interrogacao">?</span>
      </div>

      {/* Feedback visual */}
      {statusResposta === 'correta' && (
        <div className="questao__feedback questao__feedback--correta" aria-live="polite">
          ✓ Correto!
        </div>
      )}
      {statusResposta === 'errada' && (
        <div className="questao__feedback questao__feedback--errada" aria-live="polite">
          ✗ Errado! A resposta era <strong>{questao.resposta}</strong>
        </div>
      )}
    </div>
  );
}
