export default function user (sequelize, Sequelize) {
    return sequelize.define("user", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: () => Math.floor(Math.random() * 10000)
        },
        nonce: {
            allowNull: false,
            type: Sequelize.INTEGER, // SQLITE will use INTEGER
            defaultValue: () => Math.floor(Math.random() * 10000) // Initialize with a random nonce
        },
        publicAddress: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
            validate: { isLowercase: true }
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        }
    });
};