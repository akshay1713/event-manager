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

// module.exports = mongoose.model('Thread', threadSchema);

module.exports = mongoose.createModel(EventAttendeeSchema, model);