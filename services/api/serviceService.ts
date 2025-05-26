// Mock data for services
const mockServices = [
  {
    id: 1,
    nom: 'Coupe de cheveux',
    duree: 30,
    prix: 25,
  },
  {
    id: 2,
    nom: 'Coloration',
    duree: 120,
    prix: 65,
  },
  {
    id: 3,
    nom: 'Brushing',
    duree: 45,
    prix: 35,
  },
];

export const serviceService = {
  getServices: async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockServices);
      }, 1000);
    });
  },
};
