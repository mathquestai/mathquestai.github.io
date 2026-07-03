import React, { createContext, useContext, useState, useEffect } from 'react';
import useSound from 'use-sound';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  // Inicializamos pegando do localStorage (se existir)
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('mathquest_muted');
    return saved === 'true';
  });

  const [volume, setVolume] = useState(1);

  // Efeito de ducking temporário para quando tocar introduções
  const [ducking, setDucking] = useState(false);

  useEffect(() => {
    localStorage.setItem('mathquest_muted', isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Se estiver mutado, volume é 0.
  // Se estiver em ducking, volume é 20% do original.
  // Se não, volume normal.
  const getEffectiveVolume = (baseVol = 1) => {
    if (isMuted) return 0;
    if (ducking) return baseVol * 0.2;
    return baseVol * volume;
  };

  return (
    <SoundContext.Provider value={{
      isMuted,
      toggleMute,
      volume,
      setVolume,
      ducking,
      setDucking,
      getEffectiveVolume
    }}>
      <SoundEffectLoader>{children}</SoundEffectLoader>
    </SoundContext.Provider>
  );
}

// Subcomponente interno para pré-carregar efeitos sonoros e despachá-los pelo context
// Isso garante que o preload aconteça junto com a renderização global
function SoundEffectLoader({ children }) {
  const context = useContext(SoundContext);
  const [playCorrect] = useSound('/sounds/correct.ogg', { volume: context.getEffectiveVolume(0.8) });
  const [playWrong]   = useSound('/sounds/wrong.ogg', { volume: context.getEffectiveVolume(0.8) });

  return (
    <SoundContext.Provider value={{ ...context, playCorrect, playWrong }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}
