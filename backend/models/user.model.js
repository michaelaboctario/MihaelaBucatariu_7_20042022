module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', 
    {
        id: {
            type: Sequelize.INTEGER,    
            autoIncrement: true,    
            primaryKey: true
        },
        firstname: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        lastname: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        email: { 
            type: Sequelize.STRING, 
            unique: true,
            allowNull: false 
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false 
        },
        active: { 
            type: Sequelize.BOOLEAN, 
            defaultValue: true 
        },
        photourl: { 
            type: Sequelize.STRING     
        }    
    },
        // pour avoir le nom au singulier dans la DB
        // { freezeTableName: true }     
);
    return User; 
};



