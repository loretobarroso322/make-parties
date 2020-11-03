// 'use strict';
//
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//
//     return queryInterface.addColumn('Rsvps', 'EventId', Sequelize.INTEGER).then(() => {
//       return queryInterface.addConstraint('Rsvps', ['EventId'], {
//         type: 'foreign key',
//         name: 'event_rsvps',
//         references: { //Required field
//           table: 'Events',
//           field: 'id'
//         },
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     });
//   },
//
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.removeColumn('Rsvps', 'EventId');
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Rsvps', // name of Source model
      'EventId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Events', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Rsvps', // name of Source model
      'EventId' // key we want to remove
    );
  }
};
