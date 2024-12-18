'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "2638 Strawberry Lane",
        city: "Long Beach",
        state: "CA",
        country: "United States",
        lat: 33.822873,
        lng: -118.179166,
        name: "Imp's place",
        description: "Retreat in this minimalistic apartment suite.",
        price: 155,
      },
      {
        ownerId: 2,
        address: "4950 Cherry Blvd",
        city: "Seattle",
        state: "WA",
        country: "United States",
        lat: 47.610391,
        lng: -122.306966,
        name: "Emerald City",
        description: "A special place in the city.",
        price: 129,
      },
      {
        ownerId: 3,
        address: "Lisheen",
        city: "Moyne",
        state: "Tipperary",
        country: "Ireland",
        lat: 52.66667,
        lng: -7.83333,
        name: "Lisheen Castle in the heart of Ireland",
        description: "Lisheen castle ruins were purchased by the Everard family in the early 90’s. It had been burnt down in 1921 during the war of independence and lay in ruin until 1995 when the Everard family took on the total restoration project which lasted 5 years from 1995-2000. Today the castle is fully restored and is available for luxury weekly rental. Most of our guests are from the states and the resounding feedback is that the castle feels like home to them for the week with all the modern conveniences and they simply wish they didn’t have to leave. The castle has 9 bedrooms in total, 8 of the bedrooms have their own bathroom, we have lots of amenities at the castle including a private floodlit tennis court and a games room, we are very centrally located in Ireland making the castle ideal for day tripping.",
        price: 1400,
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    //working with options on line 37
    options.tableName = 'Spots';
    //bringing in the operator class; it's for matching in the where clause 
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Imp's place", "Emerald City", 'Riverfront'] }
    }, {});
  }
};
