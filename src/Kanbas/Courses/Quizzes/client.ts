import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import * as client from './Questions/client';

axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;

// updated interface
export interface Quiz {
  _id: string; 
  name: string;
  points: string;
  assignmentGroup: string;
  courseId: string;
  questions: client.Question[];
  quizType: string;
  shuffleAnswers: boolean;
  timeLimit: string;
  allowMultipleAttempts: boolean;
  showCorrectAnswers: string;
  showOneQuestionAtATime: boolean;
  dueDate: Date;
  availableFrom: Date;
  untilDate: Date;
  published: boolean;
}


export const updateQuiz = async (quiz: any) => {
  try {
    console.log('Updating quiz:', quiz);
    const response = await axios.put(`${API_BASE}/api/quizzes/${quiz._id}`, quiz);
    console.log('Updated quiz:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error updating quiz:', err);
    throw err;
  }
};

export const deleteQuiz = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE}/api/quizzes/${id}`);
    console.log('Deleted quiz:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error deleting quiz:', err);
    throw err;
  }
};

export const current = async () => {
  try {
    const response = await axios.post(`${API_BASE}/api/quizzes/current`);
    console.log('Current quiz:', response.data);
    return response.data as Quiz;
  } catch (err) {
    console.error('Error fetching current quiz:', err);
    throw err;
  }
};

export const createQuiz = async (quiz: any) => {
  try {
    console.log('Creating quiz:', quiz);
    const response = await axios.post(`${API_BASE}/api/quizzes`, quiz);
    console.log('Created quiz:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error creating quiz:', err);
    throw err;
  }
};

export const findAllQuizzes = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/quizzes`);
    console.log('All quizzes:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching all quizzes:', err);
    throw err;
  }
};

export const findQuizById = async (id: string) => {
    const response = await axios.get(`${API_BASE}/api/quizzes/${id}`);
    return response.data;
  };
  