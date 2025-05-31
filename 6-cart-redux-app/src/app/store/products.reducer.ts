import { createReducer, on } from "@ngrx/store";
import { findAll, load } from "./products.actions";

const products: any[] = [];
const initialState = {
    products
}

export const productsReducer = createReducer(
    initialState,
    on(findAll, (state, {products}) =>  ({products: [...products]})),
    on(load, (state) =>  ({products: [...state.products]})),
)