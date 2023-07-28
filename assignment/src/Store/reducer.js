import { combineReducers } from "redux";
import {actions } from "./action"

export default function reducer( state =[],action){
    console.log(action.payload)
    switch (action.type){
        case actions["REGISTRATION-USER"]:
        state = [...state,action.payload];
        return state

        default :return state;
    }
}
export const rootReducer=combineReducers({reducer})