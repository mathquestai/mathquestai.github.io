import './styles/global.css';
import { GameProvider, useGame } from './context/GameContext';
import MapaFases   from './pages/MapaFases';
import IntroFase   from './pages/IntroFase';
import CombatePage from './pages/CombatePage';

/* Roteador baseado no estado do jogo */
function Roteador() {
  const { estado } = useGame();
  const { tela } = estado;

  if (tela === 'intro_fase')  return <IntroFase />;
  if (tela === 'combate')     return <CombatePage />;
  if (tela === 'vitoria_fase' || tela === 'derrota_fase') return <CombatePage />;

  // 'mapa' (default) e qualquer outro estado desconhecido
  return <MapaFases />;
}

export default function App() {
  return (
    <GameProvider>
      <Roteador />
    </GameProvider>
  );
}
