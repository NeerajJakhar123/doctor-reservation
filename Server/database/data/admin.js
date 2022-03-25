const admin = require('../models/admin');

module.exports = async () => {
  const admins = [
    {
      firstName: 'Neeraj',
      lastName: 'Jakhar',
      email: 'neeraj@gmail.com',
      password: '123',
      avatar: 'https://image.freepik.com/free-photo/doctor-smiling-with-stethoscope_1154-36.jpg',
    },

  ];
  await admin.create(admins);
};
