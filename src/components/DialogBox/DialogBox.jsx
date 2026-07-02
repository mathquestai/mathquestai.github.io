import './DialogBox.css';

/**
 * DialogBox — Caixa de diálogo estilo RPG/mangá.
 * @param {string}    nomePersonagem - Nome exibido no topo do balão
 * @param {string}    tipo           - 'normal' | 'dica' | 'perigo' | 'vitoria'
 * @param {ReactNode} children       - Texto/conteúdo do diálogo
 * @param {Function}  aoFechar       - Callback para fechar (se null, não exibe o botão)
 * @param {boolean}   visivel        - Controla visibilidade
 */
export default function DialogBox({
  nomePersonagem,
  tipo = 'normal',
  children,
  aoFechar,
  visivel = true,
  className = '',
}) {
  if (!visivel) return null;

  const icones = {
    normal:  '💬',
    dica:    '🦉',
    perigo:  '⚠️',
    vitoria: '🏆',
  };

  return (
    <div className={`dialogo dialogo--${tipo} animar-entrar ${className}`} role="dialog" aria-live="polite">
      {/* Cabeçalho com nome do personagem */}
      <div className="dialogo__cabecalho">
        <span className="dialogo__icone">{icones[tipo]}</span>
        <span className="dialogo__nome">{nomePersonagem}</span>
        {aoFechar && (
          <button
            className="dialogo__fechar"
            onClick={aoFechar}
            aria-label="Fechar diálogo"
          >
            ✕
          </button>
        )}
      </div>

      {/* Corpo do diálogo */}
      <div className="dialogo__corpo">
        {children}
      </div>

      {/* Indicador de continuar (triângulo piscando) */}
      {!aoFechar && (
        <div className="dialogo__continuar" aria-hidden="true">▼</div>
      )}
    </div>
  );
}
