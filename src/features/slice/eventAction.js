import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import services from "@/services"
import axios from "axios"


export const postEvent = createAsyncThunk("postEvent", async (data) => {
    try {
        const res = await services.post("/events", data)
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})

export const fetchEvents = createAsyncThunk("fetchEvents", async () => {
    try {
        const res = await services.get("/events")
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})

export const fetchEvent = createAsyncThunk("fetchEvent", async (id) => {
    try {
        const res = await services.get(`/events/${id}`)
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})


export const fetchEventOnCategory = createAsyncThunk("fetchEvenvtOnCategory", async (category) => {
    try {
        const res = await services.get(`/events?category=${category}`)
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})

export const searchWithFulltext = createAsyncThunk("searchWithFullText", async (blob) => {
    try {
        if (blob.length > 0) {
            const res = await services.get(`/events?q=${blob}`)
            return res.data
        }
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})

export const getProvincies = createAsyncThunk("getProvincies", async () => {
    try {
        const res = await axios.get("http://putuhema.github.io/api-wilayah-indonesia/api/provinces.json")
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})


export const getRegencies = createAsyncThunk("getRegencies", async (id) => {
    try {
        const res = await axios.get(`http://putuhema.github.io/api-wilayah-indonesia/api/regencies/${id}.json`)
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})


export const getDistricts = createAsyncThunk("getDistricts", async (id) => {
    try {
        const res = await axios.get(`http://putuhema.github.io/api-wilayah-indonesia/api/districts/${id}.json`)
        return res.data
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})


export const getLocation = createAsyncThunk("getProvince", async ({ id, loc }) => {
    try {
        const res = await axios.get(`http://putuhema.github.io/api-wilayah-indonesia/api/${loc}/${id}.json`)
        return [res.data, loc]
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})