const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
        const Post = sequelize.define('post', 
        {
            id:
            {        
                type: Sequelize.INTEGER,    
                autoIncrement: true,    
                primaryKey: true
            },
            postTitle: 
            { 
                type: Sequelize.STRING, 
                allowNull: false,
                validate: {
                    notEmpty: true
                },  
            },
            postContent: 
            { 
                type: Sequelize.TEXT, 
                allowNull: false,
                validate: {
                    notEmpty: true
                },  
            },
            createdAt: {
                type: Sequelize.DATE,                
                get() {
                        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY à h:mm:ss');
                    }
            },
            updatedAt: {
                type: Sequelize.DATE,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY à h:mm:ss');
                }
            }       
        });
        return Post;
    };
