const knex = require('./BaseModel').knex;
const table = 'Tasks';

const Tasks = {
	createNew: (name,description,eventid) => {
        console.log(name,eventid);
		return knex(table)
		.returning('id','name')
		.insert({name,description,eventid});
	},

    getAllTasks: (eventid) => {
        return knex(table)
        .select('id','name','userid','status','description','last_userid')
        .where({eventid});
    },

    assignTask: (taskid, userid, last_userid) => {
        return knex(table)
        .where({'id':taskid})
        .update({userid, last_userid});
    },

    changeTaskStatus: (taskid, status, last_userid) => {
         return knex(table)
        .where({'id':taskid})
        .update({status, last_userid});
    }
};

module.exports = Tasks;