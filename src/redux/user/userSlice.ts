import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IRootState } from '../store';
import {APIStatus} from "../../enums/APIStatus";
import {getUser, logout, getPlayers} from "../../api/privateApi";
import {User} from "../../interfaces/User";

type UserState = {
  user: {
    data: User | undefined;
    players: 0
    status: APIStatus
  }
}

const initialState: UserState = {
  user: {
    status: APIStatus.IDLE,
    data: undefined,
    players: 0,
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

  export const fetchPlayers = createAsyncThunk('players', async (userid: string) => {
    return getPlayers(userid)
    .then((data) => {
      return data.playerCount
    })
  })
  const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending || fetchPlayers.pending, (state) => {
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
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.user.status = APIStatus.FULFILLED;
        if (action.payload) {
          state.user.players = action.payload
        } else {
          state.user.status = APIStatus.REJECTED;
        }
      })
      .addCase(fetchUser.rejected || fetchPlayers.pending, (state) => {
        state.user.status = APIStatus.REJECTED;
      }).addCase(logoutUser.fulfilled, (state) => {
        state.user.status = APIStatus.FULFILLED
        state.user.data = undefined;
        state.user.players = 0
      })
  },
});



export const getUserSelector = (state: IRootState) => state.userReducer.user;
export default userSlice.reducer;
