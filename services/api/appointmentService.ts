// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    date: '2024-03-15',
    heure: '10:00',
    prestationId: 1,
    coiffeuseId: 1,
    status: 'confirmé',
  },
  {
    id: 2,
    date: '2024-03-15',
    heure: '14:30',
    prestationId: 2,
    coiffeuseId: 2,
    status: 'en attente',
  },
  {
    id: 3,
    date: '2024-03-16',
    heure: '11:00',
    prestationId: 3,
    coiffeuseId: 1,
    status: 'annulé',
  },
];

export const appointmentService = {
  getAppointments: async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockAppointments);
      }, 1000);
    });
  },
};
