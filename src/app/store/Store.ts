import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

export interface State {
  // readonly auth?: Auth;
  // readonly movies?: Movie[];
  [key: string]: any;
}

const initialState: State = {};

export class Store {

  get value() { return this.store.value; }

  private store = new BehaviorSubject<State>(initialState);
  private store$ = this.store.asObservable();

  private static mapToArray<T>(mapObj: Map<string, T>): T[] {
    const arr = [];
    for (const value of mapObj.values()) { arr.push(value); }
    return arr;
  }

  private static arrayToMap<T>(arr: T[], key: string = 'id'): Map<string, T> {
    const newMap = new Map<string, T>();
    arr.forEach(item => { newMap.set(item[key], item); });
    return newMap;
  }

  select<T>(name: string): Observable<T> | Observable<T[]> {
    const result = this.value[name];
    if (result instanceof Map) {
      return this.store$.pipe(
        pluck(name),
        map((val: Map<string, T>) => val ? Store.mapToArray<T>(val) : null)
      );
    }
    return this.store$.pipe(pluck(name));
  }

  selectItem<T>(name: string, itemId: string): Observable<T> | Observable<boolean> {
    if (this.value[name] instanceof Map) {
      return this.store$.pipe(
        pluck(name),
        map((val: Map<string, T>) => val.get(itemId))
      );
    }
    return of(false);
  }

  get<T>(name: string, itemId?: string) {
    const result = this.value[name];
    if (result instanceof Map) {
      return itemId ? (result.get(itemId) ?? null) : Store.mapToArray(result);
    }
    return result;
  }

  set(name: string, state: any, key?: string) {
    const newState = Array.isArray(state) ? Store.arrayToMap(state, key) : state;
    this.store.next({
      ...this.value,
      [name]: newState
    });
  }

}
