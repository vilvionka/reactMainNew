const BURGER_API_URL = 'https://norma.education-services.ru/api';
export const ALL_ORDERS_URL:string = 'wss://norma.education-services.ru/orders/all';
import { TUser } from '../services/userSlice';
import { IFeedState } from '../services/feedSlice';

interface IBaseResponse {
  success: boolean;
}
interface IAuthResponse extends IBaseResponse {
  user: TUser;
  accessToken: string;
  refreshToken: string;
}
interface IMessageResponse extends IBaseResponse {
  message: string;
}



const checkResponse = <T>(res: Response): Promise<T>=>{
  return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err));
}

export const resetApi = ({password, token}: {password: string, token: string}): Promise<IAuthResponse>=>{
  return fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"password": password, "token": token})
  }).then(res=> checkResponse<IAuthResponse>(res));
}

export const forgotApi = ({email}: { email: string }):Promise<IMessageResponse>=>{
  return fetch(`${BURGER_API_URL}/password-reset`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'email': email})
  }).then(res=> checkResponse<IMessageResponse>(res));
}


export const loginApi = ({email, password}: Record<string, string>): Promise<IAuthResponse> =>{
 return fetch(`${BURGER_API_URL}/auth/login`,{
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({email, password})
 }).then(res => checkResponse<IAuthResponse>(res));
}

export const logoutApi = ()=>{
  return fetch(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  }).then(checkResponse);
}


export const registerUserApi = ({name, email, password }: Record<string, string>):Promise<IAuthResponse>=>{
  return fetch(`${BURGER_API_URL}/auth/register`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password})
  }).then(res => checkResponse<IAuthResponse>(res));
};

export const getUserApi = (): Promise<IAuthResponse> =>{
   return fetch(`${BURGER_API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
   }).then(res => checkResponse<IAuthResponse>(res));
}


export const getFeedIdApi = (id: string): Promise<IFeedState> => {
  return fetch(`https://norma.education-services.ru/api/orders/${id}`, { 
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => checkResponse<IFeedState>(res));
}
