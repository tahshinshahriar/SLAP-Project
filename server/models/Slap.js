const slapSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});

const SLAP = mongoose.model('SLAP', slapSchema);
module.exports = SLAP;
