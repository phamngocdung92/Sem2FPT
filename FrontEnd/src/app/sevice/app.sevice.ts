// cart.service.ts
import {Router} from "@angular/router";
import {Observable, of, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() { }

  updateCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }
}