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
            allowNull: false,
            validate: {
                notEmpty: true
            },  
        },
        lastname: { 
            type: Sequelize.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true
            },  
        },
        username: { 
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            },  
        },
        email: { 
            type: Sequelize.STRING, 
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            },  
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                notEmpty: true
            },  
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



