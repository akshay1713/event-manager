// const knex = require('./BaseModel').knex;
// const table = 'EventAttendees';

// const EventAttendees = {
// 	createNew: (attendee_data) => {
// 		return knex(table)
// 		.insert(attendee_data);
// 	},

//     getAllEventAttendees: (eventid) => {
//         return knex(table)
//         .select('id','email','firstname','lastname')
//         .where({eventid});
//     }

// };

// module.exports = EventAttendees;

const mongoose = require('./BaseModel').mongoose;

const model = 'EventAttendee';

const EventAttendeeSchema = {
    eventid: {type: Number, required: true},
    ticketid:{type: Number, required:false},
    email: {type:String, required:true},
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    quantity:{type:Number, required:false},
    extra_data:{}
};

// var mongoose = require('mongoose')
//   , Schema = mongoose.Schema;

// var threadSchema = new Schema({
//     title:  String,
//     postdate: {type: Date, default: Date.now},
//     author: {type: String, default: 'Anon'}
// });

// module.exports = mongoose.model('Thread', threadSchema);

module.exports = mongoose.createModel(EventAttendeeSchema, model);