import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seatPickings: [],
  seats: [],
  count: 0,
};

const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      const seats = action.payload;
      return { ...state, seats };
    },

    pickSeat: (state, action) => {
      const stt = action.payload;
      const newSeats = state.seats.map((item) => {
        if (item.stt === stt) {
          if (!item.dangChon) {
            return { ...item, dangChon: true };
          } else {
            return { ...item, dangChon: false };
          }
        }
        return item;
      });

      const newSeatPickings = newSeats.filter((item) => item.dangChon === true);

      return { ...state, seatPickings: newSeatPickings, seats: newSeats };
    },

    booking: (state, action) => {
      const newCount = state.count + 1;
      const newSeatPickings = [];
      return { ...state, count: newCount, seatPickings: newSeatPickings };
    },
  },
});

export const { setInitialState, pickSeat, booking } = seatSlice.actions;

export default seatSlice.reducer;
