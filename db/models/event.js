'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
     imgUrl: DataTypes.STRING
  }, {});

  Event.associate = function(models) {
      Event.hasMany(models.Rsvp);
      Event.belongsTo(models.User);
  };

  return Event;

};
