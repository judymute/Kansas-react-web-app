import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_URL;
export const QUESTIONS_API = `${BASE_API}/api/questions`;

export interface Question { _id: string; name: string; points: string; quiz: string; type: string; 
    answers: [{
        _id: string,
        value: string,
        correct: boolean,
    }]};

    export const updateQuestion = async (question: any) => {
        const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
        console.log('update a question:' + response);
        return response.data;
      };
    
    export const current = async () => {
        const response = await axios.post(`${QUESTIONS_API}/current`);
        console.log('current question:' + response);
        return response.data;
      };

    export const createQuestion = async (question: any) => {
        const response = await axios.post(`${QUESTIONS_API}`, question);
        console.log('create a question:' + response);
        return response.data;
      };

    export const findAllQuestions = async () => {
        const response = await axios.get(`${QUESTIONS_API}`);
        console.log('all questions:' + response);
        return response.data;
      };
      
      
      



