const cron = require('node-cron');
const updateDatabase = require('./updateDatabase');

// Exec tous les 3 jours à minuit
cron.schedule('0 0 */3 * *', async () => {
  console.log('Màj de la db...');
  await updateDatabase();
  console.log('Màj terminée.');
});

console.log('Scheduler démarré.');