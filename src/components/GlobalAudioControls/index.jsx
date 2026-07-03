import React, { useEffect, useMemo } from 'react';
import useSound from 'use-sound';
import { useSoundContext } from '../../context/SoundContext';
import { useGame } from '../../context/GameContext';
import { getFase } from '../../utils/configFases';
import './GlobalAudioControls.css';

// Subcomponente que lida com o ciclo de vida de UMA trilha sonora específica
// Ao usar `key={url}`, o React destrói a instância velha e cria uma nova, facilitando a transição.
function BgmPlayer({ url }) {
  const { isMuted, getEffectiveVolume } = useSoundContext();
  
  const [playBgm, { pause, sound }] = useSound(url, {
    volume: getEffectiveVolume(0.3), // BGM geralmente é mais baixo
    loop: true,
  });

  // Reage a mudanças de volume (ducking ou mute)
  useEffect(() => {
    if (sound) {
      sound.volume(getEffectiveVolume(0.3));
    }
  }, [getEffectiveVolume, sound]);

  // Autoplay da BGM assim que possível
  useEffect(() => {
    if (!isMuted) {
      playBgm();
    } else {
      pause();
    }
    
    // Cleanup: quando o componente for desmontado (troca de trilha), garantimos que o áudio pare
    return () => {
      pause();
    };
  }, [isMuted, playBgm, pause]);

  return null;
}

export default function GlobalAudioControls() {
  const { isMuted, toggleMute } = useSoundContext();
  const { estado } = useGame();
  
  // Calcula qual deve ser a música baseada na tela/fase atual do jogador
  const currentBgmUrl = useMemo(() => {
    const telasMenu = ['menu', 'mapa', 'tutorial', 'vitoria_final'];
    if (telasMenu.includes(estado.tela) || !estado.tela) {
      return '/sounds/bgm_menu.ogg';
    }
    
    // Caso contrário (combate, intro_fase, vitória_fase, derrota_fase), pega da fase atual
    const fase = getFase(estado.faseAtual);
    return fase.bgm || '/sounds/bgm_menu.ogg';
  }, [estado.tela, estado.faseAtual]);

  return (
    <>
      <BgmPlayer key={currentBgmUrl} url={currentBgmUrl} />
      <button 
        className="global-mute-btn" 
        onClick={toggleMute}
        title={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </>
  );
}
