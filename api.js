const axios = require('axios');

const fetchAgentsFromAPI = async () => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    const data = response.data.data.map(item => ({
      displayName: item.displayName,
      displayIcon: item.displayIcon,
      fullPortrait: item.fullPortrait,
      background: item.background,
      isPlayableCharacter: item.isPlayableCharacter,
    }));
    return data;
  } catch (error) {
    console.error('Erreur récup données agents:', error);
    throw error;
  }
};

const fetchWeaponsFromAPI = async () => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/weapons');
    const data = response.data.data.map(item => ({
      displayName: item.displayName,
      displayIcon: item.displayIcon,
      cost: item.shopData?.cost || 0,
      category: item.shopData?.category || 'Unknown',
    }));
    return data;
  } catch (error) {
    console.error('Erreur récup données armes:', error);
    throw error;
  }
};

const fetchGearsFromAPI = async () => {
    try {
      const response = await axios.get('https://valorant-api.com/v1/gear');
      const data = response.data.data.map(item => ({
        displayName: item.displayName,
        displayIcon: item.displayIcon,
        cost: item.shopData?.cost || 0,
        category: item.shopData?.category || 'Unknown',
      }));
      return data;
    } catch (error) {
      console.error('Erreur récup données armes:', error);
      throw error;
    }
  };

module.exports = { fetchAgentsFromAPI, fetchWeaponsFromAPI, fetchGearsFromAPI };