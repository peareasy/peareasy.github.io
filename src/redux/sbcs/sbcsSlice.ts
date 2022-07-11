import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSBCs} from "../../api/publicApi";
import {SBC} from "../../interfaces/SBC";
import {APIStatus} from "../../enums/APIStatus.enum";
import {IRootState} from "../store";

type SBCState = {
  sbcs: {
    data: SBC[];
    status: APIStatus
  }
}


const initialState: SBCState = {
  sbcs: {
    status: APIStatus.IDLE,
    data: [],
  },
};

export const fetchSbcs = createAsyncThunk('sbcs', async () => getSBCs()
  .then(res => {
    return res
  })
  .catch((error) => {
    throw error;
  }));

const sbcsSlice = createSlice({
  name: 'sbcs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSbcs.pending, (state) => {
        state.sbcs.status = APIStatus.PENDING;
      })
      .addCase(fetchSbcs.fulfilled, (state, action) => {
        state.sbcs.status = APIStatus.FULFILLED;
        if (action.payload) {
          state.sbcs.data = action.payload
        } else {
          state.sbcs.status = APIStatus.REJECTED;
        }
      })
      .addCase(fetchSbcs.rejected, (state) => {
        state.sbcs.status = APIStatus.REJECTED;
      });
  },
});

export const getSBCsSelector = (state: IRootState) => state.sbcsReducer.sbcs
export default sbcsSlice.reducer;