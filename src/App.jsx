import './styles/global.css';
import { GameProvider, useGame } from './context/GameContext';
import MapaFases   from './pages/MapaFases';
import IntroFase   from './pages/IntroFase';
import CombatePage from './pages/CombatePage';

import MenuInicial from './pages/MenuInicial';
import ComoJogar   from './pages/ComoJogar';
import VitoriaFinal from './pages/VitoriaFinal';
import ConquistaPopup from './components/ConquistaPopup';

import { SoundProvider } from './context/SoundContext';
import GlobalAudioControls from './components/GlobalAudioControls';

/* Roteador baseado no estado do jogo */
function Roteador() {
  const { estado } = useGame();
  const { tela } = estado;

  if (tela === 'menu')          return <MenuInicial />;
  if (tela === 'tutorial')      return <ComoJogar />;
  if (tela === 'intro_fase')    return <IntroFase />;
  if (tela === 'combate')       return <CombatePage />;
  if (tela === 'vitoria_fase' || tela === 'derrota_fase') return <CombatePage />;
  if (tela === 'vitoria_final') return <VitoriaFinal />;

  // 'mapa' (default) e qualquer outro estado desconhecido
  return <MapaFases />;
}

export default function App() {
  return (
    <SoundProvider>
      <GameProvider>
        <GlobalAudioControls />
        <Roteador />
        <ConquistaPopup />
      </GameProvider>
    </SoundProvider>
  );
}
