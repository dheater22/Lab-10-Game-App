const SaveManager = (() => {
  const PREFIX = 'snake_';
  const KEYS = {
    HIGH_SCORE: PREFIX + 'highScore',
    LAST_SCORE: PREFIX + 'lastScore',
    SETTINGS: PREFIX + 'settings'
  };

  const saveHighScore = (score) => {
    localStorage.setItem(KEYS.HIGH_SCORE, JSON.stringify(score));
  };

  const getHighScore = () => {
    const stored = localStorage.getItem(KEYS.HIGH_SCORE);
    return stored ? JSON.parse(stored) : 0;
  };

  const saveLastScore = (score) => {
    localStorage.setItem(KEYS.LAST_SCORE, JSON.stringify(score));
  };

  const getLastScore = () => {
    const stored = localStorage.getItem(KEYS.LAST_SCORE);
    return stored ? JSON.parse(stored) : 0;
  };

  const saveSettings = (settings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  };

  const getSettings = () => {
    const stored = localStorage.getItem(KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : { speed: 1 };
  };

  const resetAllData = () => {
    localStorage.removeItem(KEYS.HIGH_SCORE);
    localStorage.removeItem(KEYS.LAST_SCORE);
    localStorage.removeItem(KEYS.SETTINGS);
  };

  return {
    saveHighScore,
    getHighScore,
    saveLastScore,
    getLastScore,
    saveSettings,
    getSettings,
    resetAllData
  };
})();
