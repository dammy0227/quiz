import API from './api';

// Create a quiz (Instructor)
export const createQuiz = async (quizData) => {
  const { data } = await API.post('/quizzes', quizData);
  return data;
};

// Get a quiz (Instructor) for editing
export const getInstructorQuiz = async (quizId) => {
  const { data } = await API.get(`/quizzes/instructor/${quizId}`);
  return data;
};

// Get a quiz (Student)
export const getQuiz = async (quizId) => {
  const { data } = await API.get(`/quizzes/${quizId}`);
  return data;
};

// Submit a quiz (Student)
export const submitQuiz = async (quizId, answers) => {
  const { data } = await API.post(`/quizzes/${quizId}/submit`, { answers });
  return data;
};

// Get all quizzes for instructor
export const getInstructorQuizzes = async () => {
  const { data } = await API.get('/quizzes/instructor/my-quizzes');
  return data;
};

// Update a quiz (Instructor)
export const updateQuiz = async (quizId, quizData) => {
  const { data } = await API.put(`/quizzes/${quizId}`, quizData);
  return data;
};

// Delete a quiz (Instructor)
export const deleteQuiz = async (quizId) => {
  const { data } = await API.delete(`/quizzes/${quizId}`);
  return data;
};

// Optional: get all quizzes for student dashboard
export const getAllQuizzes = async () => {
  const { data } = await API.get('/quizzes');
  return data;
};
