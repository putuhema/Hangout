import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    searchEvents: [],
    provincies: [],
    regencies: [],
    districts: [],
    location: {
        province: {},
        regency: {},
        district: {}
    },
    event: {
        name: "",
        location: "",
        date: String(new Date()),
        time: "",
        description: "",
        picturepath: "",
        type: "",
        category: "",
        tags: [],
        id: ""
    },
    isLoading: false,
    isError: false,
    isSearch: false,
}



export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        toggleSearch: (state, action) => {
            if (!state.isSearch) {
                state.searchEvents = []
            }
            state.isSearch = action.payload
        },

    },
})

export const { toggleSearch } = eventSlice.actions
export default eventSlice.reducer