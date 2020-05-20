import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, pluck, tap } from 'rxjs/operators';
import { Auth } from '../models/Auth';
import { Movie } from '../models/Movie';
import { Injectable } from '@angular/core';

export interface State {
  readonly auth?: Auth;
  readonly movies?: Movie[];

  [key: string]: any;
}

const initialState: State = {};

@Injectable({ providedIn: 'root' })
export class Store {

  get value() { return this.store.value; }

  private store = new BehaviorSubject<State>(initialState);
  private store$ = this.store.asObservable();

  select<T>(name: string, itemId?: string): Observable<T> {
    return this.store$.pipe(
      pluck(name),
      map(val => {
        if (val instanceof Map) {
          if (itemId) {
            return val.get(itemId);
          }
          return mapToArray(val);
        }
        return val ?? null;
      }),
      filter(val => val !== null || undefined)
    );
  }

  get<T>(name: string, itemId?: string) {
    const result = this.value[name];
    if (result instanceof Map) {
      return itemId ? (result.get(itemId) ?? null) : mapToArray(result);
    }
    return result;
  }

  set(name: string, state: any, key?: string) {
    const newState = Array.isArray(state) ? arrayToMap(state, key) : state;
    this.store.next({ ...this.value, [name]: newState });
  }

  setItem(name: string, itemId: string | number, itemState: any) {
    const currentState = this.value[name] ?? new Map();
    const newState = currentState?.set(itemId + '', itemState);
    this.store.next({ ...this.value, [name]: newState });
  }

  removeItem<T>(name: string, itemId: string | number) {
    const currentState: Map<string, T> = this.value[name];
    if (currentState instanceof Map) {
      if (currentState?.delete(itemId + '')) {
        this.store.next({ ...this.value, [name]: currentState });
      }
    }
  }

  reset() {
    this.store.next(initialState);
  }

}

export function mapToArray(mapObj: Map<string, any>): any {
  const arr = [];
  for (const value of mapObj.values()) { arr.push(value); }
  return arr;
}

export function arrayToMap<T>(arr: T[], key: string = 'id'): Map<string, T> {
  const newMap = new Map<string, T>();
  arr.forEach(item => { newMap.set(item[key] + '', item); });
  return newMap;
}
