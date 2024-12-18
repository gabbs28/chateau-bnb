'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-865316775644507333/original/e6fdc145-c094-43d1-97e7-2023bb0a9566.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/33c88538-0241-46c7-8573-4245caf48bcf.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/11/DSC_0440-scaled.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Lisheen7.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Lisheen3.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Lisheen4.jpg",
        preview: false
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    //working with options on line 37
    options.tableName = 'SpotImages';
    //bringing in the operator class; it's for matching in the where clause 
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
