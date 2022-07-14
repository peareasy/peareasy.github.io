import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSBCSets} from "../../api/sbcLambda";
import {APIStatus} from "../../enums/APIStatus.enum";
import {IRootState} from "../store";


type SBCSet = {
    id: number,
    img: string,
    name: string
  }

type SBCState = {
  sbcsSets: {
    data: SBCSet[];
    status: APIStatus
  }
}

const initialState: SBCState = {
sbcsSets: {
    status: APIStatus.IDLE,
    data: [],
  },
};

export const fetchSbcsSets = createAsyncThunk('sbcs-set', async () => getSBCSets()
  .then(res => {
    return res
  })
  .catch((error) => {
    throw error;
  }));

const sbcsSetsSlice = createSlice({
  name: 'sbcs-set',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSbcsSets.pending, (state) => {
        state.sbcsSets.status = APIStatus.PENDING;
      })
      .addCase(fetchSbcsSets.fulfilled, (state, action) => {
        state.sbcsSets.status = APIStatus.FULFILLED;
        if (action.payload) {
          state.sbcsSets.data = action.payload
        } else {
          state.sbcsSets.status = APIStatus.REJECTED;
        }
      })
      .addCase(fetchSbcsSets.rejected, (state) => {
        state.sbcsSets.status = APIStatus.REJECTED;
      });
  },
});

export const getSBCSetsSelector = (state: IRootState) => state.sbcsSetsReducer.sbcsSets
export default sbcsSetsSlice.reducer;