import { useState, useRef, useEffect } from 'react';
import './InputResposta.css';

/**
 * InputResposta — Input numérico estilo RPG para o aluno digitar a resposta.
 * @param {Function} aoSubmeter   — callback(valor: string) chamado ao confirmar
 * @param {boolean}  desabilitado — bloqueia o input durante feedback ou dica
 * @param {boolean}  focarAoMontar — focar automaticamente ao aparecer
 */
export default function InputResposta({ aoSubmeter, desabilitado = false, focarAoMontar = true }) {
  const [valor, setValor] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (focarAoMontar && !desabilitado && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focarAoMontar, desabilitado]);

  // Limpa e foca quando é reabilitado (nova questão)
  useEffect(() => {
    if (!desabilitado) {
      setValor('');
      if (inputRef.current) inputRef.current.focus();
    }
  }, [desabilitado]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && valor.trim() !== '') {
      submeter();
    }
  };

  const submeter = () => {
    if (valor.trim() === '' || desabilitado) return;
    aoSubmeter(valor.trim());
  };

  return (
    <div className="input-resposta">
      <input
        ref={inputRef}
        id="input-resposta"
        type="number"
        className="input-resposta__campo"
        value={valor}
        onChange={e => setValor(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={desabilitado}
        placeholder="Sua resposta..."
        aria-label="Digite sua resposta e pressione Enter ou clique em Atacar"
        autoComplete="off"
        min={0}
      />
      <button
        id="btn-atacar"
        className="input-resposta__btn"
        onClick={submeter}
        disabled={desabilitado || valor.trim() === ''}
        aria-label="Confirmar resposta e atacar"
      >
        ⚔️ Atacar!
      </button>
    </div>
  );
}
