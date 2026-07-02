import './HealthBar.css';

/**
 * HealthBar — Barra de vida estilo RPG.
 * @param {number}  vida         - Valor atual (0–100)
 * @param {number}  vidaMaxima   - Valor máximo
 * @param {string}  nome         - Nome do personagem
 * @param {string}  tipo         - 'heroi' | 'guardiao'
 */
export default function HealthBar({ vida, vidaMaxima = 100, nome, tipo = 'heroi' }) {
  const porcentagem = Math.max(0, Math.min(100, (vida / vidaMaxima) * 100));

  const corBarra = () => {
    if (porcentagem > 50) return tipo === 'heroi' ? '#4caf50' : '#ef5350';
    if (porcentagem > 25) return '#ffa726';
    return '#ef5350';
  };

  return (
    <div className={`barra-vida barra-vida--${tipo}`} role="progressbar"
      aria-valuenow={vida} aria-valuemin={0} aria-valuemax={vidaMaxima}
      aria-label={`Vida de ${nome}: ${vida} de ${vidaMaxima}`}>

      <div className="barra-vida__topo">
        <span className="barra-vida__nome">{nome}</span>
        <span className="barra-vida__valor">{vida}<span className="barra-vida__max">/{vidaMaxima}</span></span>
      </div>

      <div className="barra-vida__trilho">
        <div
          className="barra-vida__preenchimento"
          style={{
            width: `${porcentagem}%`,
            backgroundColor: corBarra(),
            boxShadow: `0 0 8px ${corBarra()}88`
          }}
        />
        {/* Marcadores de 25% */}
        <div className="barra-vida__marca" style={{ left: '25%' }} />
        <div className="barra-vida__marca" style={{ left: '50%' }} />
        <div className="barra-vida__marca" style={{ left: '75%' }} />
      </div>

      {porcentagem <= 25 && (
        <span className="barra-vida__alerta">⚠ Perigo!</span>
      )}
    </div>
  );
}
