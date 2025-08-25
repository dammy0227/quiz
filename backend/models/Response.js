// models/Response.js
import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  selectedOption: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const responseSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answers: [answerSchema],
    score: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Response', responseSchema);
