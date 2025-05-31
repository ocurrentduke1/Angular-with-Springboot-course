import { Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findAll, load } from "../products.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()

export class productsEffects {

    loadProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.service.findAll())
        ).pipe(
            map(products => (findAll({products: products}))),
            catchError(() => EMPTY)
        )
    );

    constructor(
        private actions$: Actions,
         private service: ProductService){

    }
}