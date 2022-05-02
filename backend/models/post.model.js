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
            posttitle: 
            { 
                type: Sequelize.STRING, 
                allowNull: false 
            },
            postcontent: 
            { 
                type: Sequelize.TEXT, 
                allowNull: false 
            },
            postcreator:                  
            { 
                type: Sequelize.STRING, 
                allowNull: false,
            },
            postimageurl: 
            { 
                type: Sequelize.STRING,
            },
            createdAt: {
                type: Sequelize.DATE,                
                get() {
                        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
                    }
            },
            updatedAt: {
                type: Sequelize.DATE,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
                }
            }       
        });
        return Post;
    };
