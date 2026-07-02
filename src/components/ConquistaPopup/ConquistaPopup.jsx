import { useEffect, useState } from 'react';
import './ConquistaPopup.css';
import { useGame } from '../../context/GameContext';

export default function ConquistaPopup() {
  const { estado, limparConquistaRecente } = useGame();
  const conquista = estado.conquistaRecente;
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (conquista) {
      setVisivel(true);
      const timerId = setTimeout(() => {
        setVisivel(false);
        setTimeout(limparConquistaRecente, 400); // aguarda a animação de saída
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [conquista, limparConquistaRecente]);

  if (!conquista && !visivel) return null;

  return (
    <div className={`conquista-popup ${visivel ? 'conquista-popup--visivel' : 'conquista-popup--oculto'}`}>
      <div className="conquista-popup__icone">{conquista?.icone}</div>
      <div className="conquista-popup__conteudo">
        <span className="conquista-popup__label">Conquista Desbloqueada!</span>
        <strong className="conquista-popup__titulo">{conquista?.titulo}</strong>
        <p className="conquista-popup__desc">{conquista?.descricao}</p>
      </div>
    </div>
  );
}
