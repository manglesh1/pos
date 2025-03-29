module.exports = (sequelize, DataTypes) => {
  const UI = sequelize.define(
    'UI',
    {
      uiId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      uitype: {
        type: DataTypes.ENUM('page', 'function'),
        allowNull: true,
      },
      parentUid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: 'UIs',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['path'],
        },
      ],
    }
  );

  UI.associate = (models) => {
    UI.belongsToMany(models.Role, {
      through: models.RoleUI,
      foreignKey: 'uiId',
      as: 'roles',
    });

    // Self-referential associations to model menu/submenu relationships:
    UI.belongsTo(UI, { foreignKey: 'parentUid', as: 'parent' });
    UI.hasMany(UI, { foreignKey: 'parentUid', as: 'children' });
  };

  return UI;
};
