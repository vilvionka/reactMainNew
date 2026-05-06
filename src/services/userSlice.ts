import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getUserApi, logoutApi, registerUserApi } from "../utils/burger-api";
import { PayloadAction } from "@reduxjs/toolkit";


export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    await logoutApi();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
)
type TLoginData = { email: string; password: string };

export const login = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data) => {
    const res = await loginApi(data);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  }
)

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem("accessToken")) {
      try {
        const res = await getUserApi();
        dispatch(setUser(res.user));
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  }
)
type TRegisterData = { 
  email: string; 
  password: string; 
  name: string; 
};


export const register = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data) => {
    const res = await registerUserApi(data);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user
  }
)
export type TUser = {
  email: string;
  name: string;
};

interface IUserState{
  user: TUser | null,
  isAuthchecked: boolean,
}

const  initialState: IUserState = {
  user: null,
  isAuthchecked: false,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action:PayloadAction<boolean> ) => {
      state.isAuthchecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthchecked = true;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isAuthchecked = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthchecked = true;
      })
      .addCase(register.rejected, (state) => {
        state.user = null;
        state.isAuthchecked = true;
      })
      .addCase(logout.fulfilled, (state)=>{
        state.user = null;
      })
  }
})

export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;