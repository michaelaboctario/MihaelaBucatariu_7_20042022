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
            }       
        });
        return Post;
    };
