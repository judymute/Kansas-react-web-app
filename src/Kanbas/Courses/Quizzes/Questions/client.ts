import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;

export interface Question {
  _id: string;
  name: string;
  points: string;
  quiz: string;
  type: string;
  value: string;
  answers: Array<{
    _id: string;
    value: string;
    correct: boolean;
  }>;
}


export const updateQuestion = async (question: any) => {
  try {
    console.log('Updating question:', question);
    const response = await axios.put(`${API_BASE}/api/questions/${question._id}`, question);
    console.log('Updated question:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error updating question:', err);
    throw err;
  }
};

export const current = async () => {
  try {
    const response = await axios.post(`${API_BASE}/api/questions/current`);
    console.log('Current question:', response.data);
    return response.data as Question;
  } catch (err) {
    console.error('Error fetching current question:', err);
    throw err;
  }
};

export const createQuestion = async (question: any) => {
  try {
    console.log('Creating question:', question);
    const response = await axios.post(`${API_BASE}/api/questions`, question);
    console.log('Created question:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error creating question:', err);
    throw err;
  }
};

export const findAllQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/questions`);
    console.log('All questions:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching all questions:', err);
    throw err;
  }
};

// path may not be correct
export const findQuestionsByQuiz = async (quiz: string) => {
  const response = await
    axios.get(`${API_BASE}/api/questions?quiz=${quiz}`);
  return response.data;
};

export const findQuestionById = async (id: string) => {
  const response = await axios.get(`${API_BASE}/api/questions/${id}`);
  return response.data;
};

