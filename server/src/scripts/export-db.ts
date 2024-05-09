import 'dotenv/config';
import connectDB from '@/config/db';
import DbCsvExportService from '@/services/db-csv-export';

require('@/models/TestQuestions');
import User from '@/models/User';
import UserTestAnswers from '@/models/UserTestAnswers';
import UserSurveyAnswers from '@/models/UserSurveyAnswers';

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

const exportAllCollections = async () => {
  await Promise.all([exportUsersCollection(), exportUserTestAnswersCollection(), exportUserSurveyAnswersCollection()]);
};

const exportDb = async () => {
  await connectDB();
  await exportAllCollections();
  process.exit();
};

exportDb();
