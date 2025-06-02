import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export type UserPreferencesAnswer = Record<number, number | string | number[]>;

export interface IUserPreferencesAnswers {
    worker_id: string;
    answers: UserPreferencesAnswer;
}

const UserPreferencesAnswersSchema = new mongoose.Schema({
    worker: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true, autopopulate: true },
    answers: {
        type: Object as mongoose.SchemaTypeOptions<UserPreferencesAnswer>,
        required: true,
        default: {}
    }
});

UserPreferencesAnswersSchema.plugin(mongooseAutoPopulate);

const UserPreferencesAnswers = mongoose.model('UserPreferencesAnswers', UserPreferencesAnswersSchema);

export default UserPreferencesAnswers;
