import { createSlice } from "@reduxjs/toolkit";

import { fetchEvent, fetchEventOnCategory, fetchEvents, getDistricts, getLocation, getProvincies, getRegencies, postEvent, searchWithFulltext } from "./eventAction"
import { isThisWeek, isToday, isTomorrow } from "date-fns";

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
        getEventOnCategory: (state, action) => {
            state.events = state.events.filter((event) => event.category === action.payload)
        },
        toggleSearch: (state, action) => {
            if (!state.isSearch) {
                state.searchEvents = []
            }
            state.isSearch = action.payload
        },
        searchAnEvents: (state, action) => {
            let mainSearch = state.events

            switch (action.payload[0]) {
                case "0": {
                    mainSearch = mainSearch.filter((event) => isToday(new Date(event.date)))
                    break;
                }
                case "2": {
                    mainSearch = mainSearch.filter((event) => isTomorrow(new Date(event.date)))
                    break;
                }
                case "7": {
                    mainSearch = mainSearch.filter((event) => isThisWeek(new Date(event.date)))
                    break;
                }
                case "clear": {
                    mainSearch = []
                    break;
                }
            }
            if (action.payload[1]) {
                mainSearch = mainSearch.filter((event) => event.eventtype === action.payload[1])
            }
            if (action.payload[2]) {
                mainSearch = mainSearch.filter((event) => event.category === action.payload[2])
            }
            state.searchEvents = mainSearch.flat()
        },
    },
    extraReducers: (builder) => {
        // post an event
        builder.addCase(postEvent.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(postEvent.fulfilled, (state, action) => {
            state.isLoading = false
            state.events.push(action.payload)
        });
        builder.addCase(postEvent.rejected, (state, action) => {
            state.isError = true
            state.events.push(action.payload)
        })
        // fetch all events
        builder.addCase(fetchEvents.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.isLoading = false
            state.events = action.payload
        });
        builder.addCase(fetchEvents.rejected, (state) => {
            state.isError = true
        });
        // fetch an event based on id
        builder.addCase(fetchEvent.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            state.isLoading = false
            state.event = action.payload
        });
        builder.addCase(fetchEvent.rejected, (state) => {
            state.isError = true
        });
        // fetch events based on category
        builder.addCase(fetchEventOnCategory.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchEventOnCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.events = action.payload
        });
        builder.addCase(fetchEventOnCategory.rejected, (state) => {
            state.isError = true
        });

        // search events based on keyword
        builder.addCase(searchWithFulltext.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(searchWithFulltext.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchEvents = action.payload ? action.payload : []
        });
        builder.addCase(searchWithFulltext.rejected, (state) => {
            state.isError = true
        });

        builder.addCase(getProvincies.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getProvincies.fulfilled, (state, action) => {
            state.isLoading = false
            state.provincies = action.payload
        });
        builder.addCase(getProvincies.rejected, (state) => {
            state.isError = true
        });

        builder.addCase(getRegencies.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getRegencies.fulfilled, (state, action) => {
            state.isLoading = false
            state.regencies = action.payload
        });
        builder.addCase(getRegencies.rejected, (state) => {
            state.isError = true
        });

        builder.addCase(getDistricts.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getDistricts.fulfilled, (state, action) => {
            state.isLoading = false
            state.districts = action.payload
        });
        builder.addCase(getDistricts.rejected, (state) => {
            state.isError = true
        });

        builder.addCase(getLocation.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getLocation.fulfilled, (state, action) => {
            state.isLoading = false
            state.location[action.payload[1]] = action.payload[0]
        });
        builder.addCase(getLocation.rejected, (state) => {
            state.isError = true
        });
    }
})

export const { getEventOnCategory, toggleSearch, searchAnEvents, searchWithKeyword } = eventSlice.actions
export default eventSlice.reducer