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
        address: "Pottens Mill Ln",
        city: "Heathfield",
        state: "East Sussex",
        country: "United Kingdom",
        lat: 50.994334,
        lng: 0.297436,
        name: "Braylsham castle",
        description: "A fairytale castle on a lake available for weddings, parties and events. Braylsham Castle replicates medieval history faithfully yet provides the comforts of modern day living.. e.g central heating and an electronic drawbridge! Winner of Britain’s Best Home “New Build” category by Channel 4 in 2002. We have a Great Hall with minstrels’ gallery for weddings / events / banquets and parties. The castle also includes a private sitting room with log burner, 5 x ensuite Queen bedrooms, a kitchenette, two spiral staircases and views spanning the castle turrets, forest and moat.",
        price: 2221,
      },
      {
        ownerId: 2,
        address: "Château de 2",
        city: " Morlet",
        state: "Île-de-France",
        country: "France",
        lat: 46.938543,
        lng: 4.504809,
        name: "Château de Frétoy",
        description: "Chateau de Frétoy was built in 1900 for the famous actress Cecile Sorel by her lover. The vast 10-acre estate is ideal for grassland and forest walks, swimming in a private pool or practicing your serve on the tennis court. Outdoor enthusiasts will love Morvan, a protected natural park nearby and the excellent vineyards of the Cote d’Or will please wine lovers.The castle’s interior has been refurbished. The 12 large bedrooms, some with room for 4 people, are perfect for families or friends travelling together. The orangerie, an expansive chateau annex with its semi-professionnal kitchen, is inviting you for large dinners, wine tastings or workshops. Catering can be arranged or you can barbecue and dine outside on the terrace. With a library, television room with home cinema, sitting room and lounge, your entire group will be entertained on a rainy day. The castle with its 12 bedrooms and 6 bathrooms (gathered in 2 washrooms) can sleep up to 32 guests. Furthermore, the coach house offers three beautiful suites with ensuite bathrooms; a gîte with three bedrooms and 1 bathroom; another gîte with 5 bedrooms and 1 bathroom (often used to put teenagers to sleep). As such, the total capacity of our property is 54 beds. The domaine also has a reception room with a professional kitchen that can be rented to celebrate any kind of festivity. The parc is ideal for your birthday cocktail, anniversary reception or wedding ceremony and the hosts will gladly help you with the organization. Special wedding packages are available. The chateau’s location near the village of Morlet (2 km) means you can visit museums, exhibitions and historical sites at Autun. Beaune is only 30 minutes away for those who want to visit the capital of the Bourgundy wines. Epinac (8 km) has restaurants and shops, including a small supermarket.",
        price: 1500,
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
