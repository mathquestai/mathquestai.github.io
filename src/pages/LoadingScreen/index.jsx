import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { FASES } from '../../utils/configFases';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const { irParaTela } = useGame();
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    // 1. Coletar URLs de assets que precisam ser pre-cacheados
    const audioUrls = [
      '/sounds/correct.ogg',
      '/sounds/wrong.ogg',
      '/sounds/bgm_menu.ogg',
      '/sounds/bgm_fase1.ogg',
      '/sounds/bgm_fase2.ogg',
      '/sounds/bgm_fase3.ogg',
      '/sounds/bgm_fase4.mp3',
      '/sounds/bgm_fase5.mp3',
    ];

    const imageUrls = [];
    FASES.forEach(f => {
      imageUrls.push(f.imagemFundo);
      imageUrls.push(f.imagemGuardiao);
      imageUrls.push(f.imagemHeroi);
    });

    // Remove duplicatas
    const assets = [...new Set([...audioUrls, ...imageUrls])];
    let carregados = 0;

    const carregarAssets = async () => {
      // Carrega os assets em paralelo para maior rapidez
      const promessas = assets.map(url => {
        return new Promise(async (resolve) => {
          try {
            if (url.endsWith('.ogg') || url.endsWith('.mp3') || url.endsWith('.wav')) {
              await fetch(url, { method: 'GET', mode: 'no-cors' });
              resolve();
            } else {
              const img = new Image();
              img.src = url;
              img.onload = resolve;
              img.onerror = resolve; // Continua mesmo se der erro (404)
            }
          } catch (e) {
            resolve();
          }
        }).then(() => {
          carregados++;
          setProgresso(Math.floor((carregados / assets.length) * 100));
        });
      });

      await Promise.all(promessas);

      // Pequeno delay para o usuário ler "100%" antes de piscar a tela
      setTimeout(() => {
        irParaTela('menu');
      }, 600);
    };

    carregarAssets();
  }, [irParaTela]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-title">MathQuest</h1>
        <p className="loading-subtitle">Carregando recursos épicos...</p>
        
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progresso}%` }} 
          />
        </div>
        <p className="progress-text">{progresso}%</p>
      </div>
    </div>
  );
}
