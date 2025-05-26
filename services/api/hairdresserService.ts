// Mock data for hairdressers
const mockHairdressers = [
  {
    id: 1,
    prenom: 'Sophie',
    nom: 'Martin',
    specialites: [1, 2, 3],
  },
  {
    id: 2,
    prenom: 'Julie',
    nom: 'Dubois',
    specialites: [1, 3],
  },
];

export const hairdresserService = {
  getHairdressers: async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockHairdressers);
      }, 1000);
    });
  },
};
