module.exports = (sequelize, DataTypes) => {
    const SessionPassResources = sequelize.define(
      'SessionPassResources',
      {
        sessionPassId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'SessionPasses',
            key: 'sessionPassId',
          }
        },
        resourceId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'Resources',
            key: 'resourceId', // Ensure this matches the primary key column in your Resources table
          }
        },
      },
      {
        tableName: 'SessionPassResources',
        timestamps: false,
      }
    );
  
    return SessionPassResources;
  };
  