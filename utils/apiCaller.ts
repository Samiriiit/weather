import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // from .env

//A generic function to call any api takes data and parameters and gives response
const apiCaller = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE', //HTTP methods
  data?: any,
  params?: any
): Promise<T> => {
  //calling api
  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params,
    });

    return response.data;
    //returning api response
  } catch (error: any) {
    //catch for errors
    console.error('API Error:', error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
};

export default apiCaller;
