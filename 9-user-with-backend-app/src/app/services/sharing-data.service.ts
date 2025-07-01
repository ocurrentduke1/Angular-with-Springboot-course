import { EventEmitter, Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idUserEventEmitter = new EventEmitter();
  private _newUserEventEmitter = new EventEmitter<user>();
  private _findUserEventEmitter = new EventEmitter();
  private _selectedUserEventEmitter = new EventEmitter();
  private _errorsUserFormEventEmitter = new EventEmitter();
  private _pageUsersEventEmitter = new EventEmitter();
  private _handleLoginEventEmitter = new EventEmitter();

  constructor() { }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<user> {
    return this._newUserEventEmitter;
  }

  get findUserEventEmitter() {
    return this._findUserEventEmitter;
  }

  get selectedUserEventEmitter() {
    return this._selectedUserEventEmitter;
  }

  get errorsUserFormEventEmitter() {
    return this._errorsUserFormEventEmitter;
  }

  get pageUsersEventEmitter() {
    return this._pageUsersEventEmitter;
  }

  get handleLoginEventEmitter() {
    return this._handleLoginEventEmitter;
  }

}
