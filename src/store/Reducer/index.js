import { combineReducers } from "redux";
import ProductReducer from "../Slices/ProductSlice";
import SnopReducer from "../Slices/SNOPSlice";
import PersonnelReducer from '../Slices/personnelSlice';

export const rootReducer = combineReducers({
  ProductReducer,
  SnopReducer,
  PersonnelReducer
});
