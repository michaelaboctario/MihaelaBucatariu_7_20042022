const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', 
    {
        id:
        {        
            type: Sequelize.INTEGER,    
            autoIncrement: true,    
            primaryKey: true
        },
        commentContent: 
        { 
            type: Sequelize.TEXT, 
            allowNull: false 
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
    return Comment;
};
