import { Sequelize } from "sequelize";

const db = new Sequelize('garagecaraudio', 'root', 'Normita2411$', {
    host: 'localhost',
    dialect: 'mysql',
    // logging:false
    define: {
        timestamps: false
    }
});

export default db;