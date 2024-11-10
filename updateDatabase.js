const pool = require('./db');
const { fetchAgentsFromAPI, fetchWeaponsFromAPI, fetchGearsFromAPI } = require('./api');

const updateAgents = async () => {
  try {
    const data = await fetchAgentsFromAPI();
    for (const item of data) {
      // Vérifier que les valeurs null
      if (item.displayIcon && item.fullPortrait && item.background && item.isPlayableCharacter !== null) {
        const query = `
          INSERT INTO agents (name, icon, portrait, background, playable)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (name)
          DO UPDATE SET icon = EXCLUDED.icon, portrait = EXCLUDED.portrait, background = EXCLUDED.background, playable = EXCLUDED.playable;
        `;
        const values = [item.displayName, item.displayIcon, item.fullPortrait, item.background, item.isPlayableCharacter];

        await pool.query(query, values);
      } else {
        console.warn(`Données incomplètes pour l'agent ${item.displayName}. Ignoré.`);
      }
    }

    console.log('Agents màj success.');
  } catch (error) {
    console.error('Erreur màj agents:', error);
  }
};

const updateWeapons = async () => {
  try {
    const data = await fetchWeaponsFromAPI();
    for (const item of data) {
      // Vérifier que les valeurs null
      if (item.displayIcon && item.cost && item.category !== null) {
        const query = `
          INSERT INTO weapons (name, icon, cost, category)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (name)
          DO UPDATE SET icon = EXCLUDED.icon, cost = EXCLUDED.cost, category = EXCLUDED.category;
        `;
        const values = [item.displayName, item.displayIcon, item.cost, item.category];

        await pool.query(query, values);
      } else {
        console.warn(`Données incomplètes pour l'arme ${item.displayName}. Ignoré.`);
      }
    }

    console.log('Armes màj success.');
  } catch (error) {
    console.error('Erreur màj armes:', error);
  }
};

const updateGears = async () => {
    try {
      const data = await fetchGearsFromAPI();
      for (const item of data) {
        // Vérifier que les valeurs null
        if (item.displayIcon && item.cost && item.category !== null) {
          const query = `
            INSERT INTO gears (name, icon, cost, category)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name)
            DO UPDATE SET icon = EXCLUDED.icon, cost = EXCLUDED.cost, category = EXCLUDED.category;
          `;
          const values = [item.displayName, item.displayIcon, item.cost, item.category];
  
          await pool.query(query, values);
        } else {
          console.warn(`Données incomplètes pour l'armure ${item.displayName}. Ignoré.`);
        }
      }
  
      console.log('Armures màj success.');
    } catch (error) {
      console.error('Erreur màj armures:', error);
    }
  };


const updateDatabase = async () => {
  await updateAgents();
  await updateWeapons();
  await updateGears();
  pool.end();
};

module.exports = updateDatabase;