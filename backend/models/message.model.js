const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
        const Message = sequelize.define('message', 
        {
            id:
            {        
                type: Sequelize.INTEGER,    
                autoIncrement: true,    
                primaryKey: true
            },
            messageContent: 
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
        return Message;
    };
