import 'dotenv/config';
import connectDB from '@/config/db';
import DbCsvExportService from '@/services/db-csv-export';

import User from '@/models/User';
import TestQuestions from '@/models/TestQuestions';
import UserTestAnswers from '@/models/UserTestAnswers';
import UserSurveyAnswers from '@/models/UserSurveyAnswers';
import UserPreferencesAnswers from '@/models/UserPreferencesAnswers';

const USER_PREFERENCES_ANSWERS_HEADERS = [
    'worker.worker_id',
    'answers.q1',
    'answers.q2',
    'answers.q3',
    'answers.q4',
    'answers.q5',
    'answers.q6',
    'answers.q7',
    'answers.q8',
    'answers.q9',
    'answers.q10',
    'answers.q11',
    'answers.q12'
];

const USER_SURVEY_ANSWERS_HEADERS = ['worker.worker_id', 'answers.q1', 'answers.q2', 'answers.q3', 'answers.comment'];

const USER_TEST_ANSWERS_HEADERS = [
    'worker.worker_id',
    'question.question_id',
    'question.times_used',
    'is_training',
    'round',
    'answer',
    'profit',
    'duration'
];

const USERS_HEADERS = [
    'worker_id',
    'user_info.age',
    'user_info.gender',
    'user_info.education',
    'user_info.nationality',
    'user_instructions.score',
    'user_instructions.fails',
    'user_instructions.duration',
    'user_training.rounds',
    'user_training.duration',
    'user_test.rounds',
    'user_test.profit',
    'user_test.bonus',
    'user_test.duration'
];

const exportUsersCollection = async () => {
    const csvExportService = new DbCsvExportService<any>(User);
    await csvExportService.exportCollectionByHeaders(USERS_HEADERS);
};

const exportUserTestAnswersCollection = async () => {
    const csvExportService = new DbCsvExportService<any>(UserTestAnswers);
    await csvExportService.exportCollectionByHeaders(USER_TEST_ANSWERS_HEADERS);
};

const exportUserSurveyAnswersCollection = async () => {
    const csvExportService = new DbCsvExportService<any>(UserSurveyAnswers);
    await csvExportService.exportCollectionByHeaders(USER_SURVEY_ANSWERS_HEADERS);
};

const exportTestQuestionsCollection = async () => {
    const csvExportService = new DbCsvExportService<any>(TestQuestions);
    await csvExportService.exportCollection();
};

const exportUserPreferencesAnswersCollection = async () => {
    const csvExportService = new DbCsvExportService<any>(UserPreferencesAnswers);
    await csvExportService.exportCollectionByHeaders(USER_PREFERENCES_ANSWERS_HEADERS);
};

const exportAllCollections = async () => {
    await Promise.all([
        exportUsersCollection(),
        exportTestQuestionsCollection(),
        exportUserTestAnswersCollection(),
        exportUserSurveyAnswersCollection(),
        exportUserPreferencesAnswersCollection()
    ]);
};

const exportDb = async () => {
    await connectDB();
    await exportAllCollections();
    process.exit();
};

exportDb();
