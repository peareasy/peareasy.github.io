import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IRootState } from '../store';
import {APIStatus} from "../../enums/APIStatus";
import {getUser, logout} from "../../api/privateApi";
import {User} from "../../interfaces/User";

type UserState = {
  user: {
    data: User | undefined;
    status: APIStatus
  }
}

const initialState: UserState = {
  user: {
    status: APIStatus.IDLE,
    data: undefined
  },
};

export const fetchUser = createAsyncThunk('user', async () => getUser()
  .then((user) => {
    return user
  })
  .catch((error) => {
    throw error;
  }));

export const logoutUser = createAsyncThunk('logout-user', async () => logout()
  .then((request) => {
    return request
  })
  .catch((request) => {
    throw request;
  }));

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user.status = APIStatus.PENDING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user.status = APIStatus.FULFILLED;
        if (action.payload) {
          state.user.data = action.payload
        } else {
          state.user.status = APIStatus.REJECTED;
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user.status = APIStatus.REJECTED;
      }).addCase(logoutUser.fulfilled, (state) => {
        state.user.status = APIStatus.FULFILLED
        state.user.data = undefined;
      })
  },
});



export const getUserSelector = (state: IRootState) => state.userReducer.user;
export default userSlice.reducer;
