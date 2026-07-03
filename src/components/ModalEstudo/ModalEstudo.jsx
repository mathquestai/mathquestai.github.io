import { useState, useEffect } from 'react';
import './ModalEstudo.css';

/**
 * ModalEstudo — Exibe dicas e exemplos educativos sobre a fase.
 */
export default function ModalEstudo({ fase, conteudo, visivel, aoFechar }) {
  const [animandoSaida, setAnimandoSaida] = useState(false);
  const [isRenderizado, setIsRenderizado] = useState(false);

  // Efeito para controle de renderização e animação de entrada
  useEffect(() => {
    if (visivel) {
      setIsRenderizado(true);
      setAnimandoSaida(false);
    } else if (isRenderizado) {
      setAnimandoSaida(true);
      const timer = setTimeout(() => {
        setIsRenderizado(false);
        setAnimandoSaida(false);
      }, 300); // 300ms de duração da animação (combina com CSS)
      return () => clearTimeout(timer);
    }
  }, [visivel, isRenderizado]);

  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && visivel) {
        aoFechar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visivel, aoFechar]);

  // Previne fechar quando clica dentro do conteúdo do modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isRenderizado) return null;

  return (
    <div 
      className={`modal-estudo__overlay ${animandoSaida ? 'modal-estudo__overlay--saida' : 'modal-estudo__overlay--entrada'}`}
      onClick={aoFechar} // Clique fora fecha o modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-estudo-titulo"
    >
      <div 
        className={`modal-estudo__content ${animandoSaida ? 'modal-estudo__content--saida' : 'modal-estudo__content--entrada'}`}
        onClick={handleContentClick}
        style={{ '--cor-fase': fase.cor, '--cor-fase-borda': fase.corBorda }}
      >
        {/* CABEÇALHO */}
        <div className="modal-estudo__header">
          <div className="modal-estudo__header-title">
            <span className="modal-estudo__icon">📖</span>
            <h2 id="modal-estudo-titulo">Estudar: {fase.nome}</h2>
          </div>
          <button 
            className="modal-estudo__close-btn" 
            onClick={aoFechar}
            aria-label="Fechar janela de estudo"
          >
            ✕
          </button>
        </div>

        {/* CORPO DO MODAL (Scrollável) */}
        <div className="modal-estudo__body">
          
          {/* Seção 1: O que enfrentar */}
          <section className="modal-estudo__section modal-estudo__section--intro animacao-stagger-1">
            <h3>🎯 O que você vai enfrentar</h3>
            <p>{conteudo.descricao}</p>
          </section>

          {/* Seção 2: Dicas e Estratégias */}
          <section className="modal-estudo__section animacao-stagger-2">
            <h3>💡 Dicas e Estratégias</h3>
            <div className="modal-estudo__dicas-grid">
              {conteudo.dicas.map((dica, index) => (
                <div key={index} className="modal-estudo__card-dica">
                  <div className="modal-estudo__card-icon">{dica.icone}</div>
                  <div className="modal-estudo__card-content">
                    <h4>{dica.titulo}</h4>
                    <p>{dica.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção 3: Exemplos Resolvidos */}
          <section className="modal-estudo__section animacao-stagger-3">
            <h3>📝 Exemplos Resolvidos</h3>
            <div className="modal-estudo__exemplos-list">
              {conteudo.exemplos.map((exemplo, index) => (
                <div key={index} className="modal-estudo__exemplo-item">
                  <div className="modal-estudo__exemplo-pergunta">{exemplo.pergunta}</div>
                  <div className="modal-estudo__exemplo-resolucao">
                    <span className="modal-estudo__arrow">↳</span>
                    <span>{exemplo.resolucao}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção 4: Resumo */}
          <section className="modal-estudo__section modal-estudo__section--resumo animacao-stagger-4">
            <h3>⚡ Batalha Rápida</h3>
            <ul className="modal-estudo__resumo-lista">
              <li>⏱️ <strong>Tempo:</strong> {fase.tempoTotal} segundos</li>
              <li>❓ <strong>Perguntas:</strong> {fase.totalPerguntas} desafios</li>
              <li>🛡️ <strong>Guardião:</strong> {fase.nomeGuardiao} ({fase.vidaGuardiao} HP)</li>
            </ul>
          </section>
        </div>

        {/* RODAPÉ */}
        <div className="modal-estudo__footer">
          <button 
            className="modal-estudo__btn-pronto"
            onClick={aoFechar}
          >
            💪 Estou Pronto! Vamos à Batalha!
          </button>
        </div>
      </div>
    </div>
  );
}
