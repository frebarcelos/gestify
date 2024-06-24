import axios from '../axiosConfig';

const systemUsername = "string"; 
const systemPassword = "string"; 

export const getSystemToken = async () => {
  try {
      const response = await axios.post('/auth/login', { username: systemUsername, password: systemPassword });
      console.log(response.data.token)
    return response.data.token;
  } catch (error) {
    console.error('Error logging in system user', error);
    throw new Error('System login failed');
  }
};
