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
        url: "https://www.castlerentals.net/wp-content/uploads/2024/10/453482894_10162247800994052_1626042508396015193_n.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/10/Braylsham-Castle-2.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/11/E5E22467-589C-4588-A890-595D3975CD69-scaled.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/07/16D5FFC0-7239-402F-BB73-84CE525F996E.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/07/IMG_0696-scaled.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/07/IMG_0700-scaled.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/07/IMG_5511-scaled.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Fretoy4.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/07/Photo_Piscine_Chateau_Fretoy-56-scaled.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/09/IMG_1515-scaled.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2024/09/IMG_1504-scaled.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Fretoy11.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Fretoy13.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Fretoy14.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Fretoy15.jpg",
        preview: false
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
      },
      {
        spotId: 3,
        url: "https://www.castlerentals.net/wp-content/uploads/2022/01/Lisheen13.jpg",
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
