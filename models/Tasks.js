const knex = require('./BaseModel').knex;
const table = 'Tasks';

const Tasks = {
	createNew: (name,eventid) => {
        console.log(name,eventid);
		return knex(table)
		.returning('id','name')
		.insert({name,eventid});
	},

    getAllTasks: (eventid) => {
        return knex(table)
        .select('id','name','userid','status')
        .where({eventid});
    },

    assignTask: (taskid,userid) => {
        return knex(table)
        .where({'id':taskid})
        .update({userid});
    },

    changeTaskStatus: (taskid,status) => {
         return knex(table)
        .where({'id':taskid})
        .update({status});
    }
};

module.exports = Tasks;