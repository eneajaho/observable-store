import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface State {
  [key: string]: any;
}
/**
 * If needed the store can have a default state
 */
const initialState: State = {};

@Injectable({ providedIn: 'root' })
export class Store {

  /**
   * store is initialized as BehaviorSubject because we may need an initial state in the store
   */
  private store = new BehaviorSubject<State>(initialState);

  /**
   * store$ is the store stream, but only as observable and not as observer
   */
  private store$ = this.store.asObservable().pipe(distinctUntilChanged());

  /**
   * Returns the current value of the store's state
   */
  get value() { return this.store.value; }

  /**
   * Get a piece of state as observable
   * @param key Selector (key) of the object in the state
   * @param itemId If provided, return the value of that key in the selected object
   */
  select<T>(key: string, itemId?: string): Observable<T> {
    return this.store$.pipe(
      pluck(key),
      map(state => this.getState<T>(state, itemId)),
      filter(val => val !== null),
      distinctUntilChanged(),
    );
  }

  /** Queries the state object
   * @param queryFunction A function that will return the queried state object;
   */
  query<T>(queryFunction): Observable<T> | Observable<any> {
    console.log(queryFunction);
    return this.store$.pipe(
      map(state => {
        const toReturn: T = queryFunction(state);
        return (toReturn instanceof Map) ? mapToArray(toReturn) : toReturn;
      }),
      filter(val => !!val),
      distinctUntilChanged(),
    );
  }

  /**
   * Get value of a piece of state
   * @param key Selector (key) of the object in the state
   * @param itemId If provided, return the value of that key in the selected object
   */
  get<T>(key: string, itemId?: string): T | any | null {
    if (!key) { return null; }
    const state = this.value[key];
    return this.getState(state, itemId);
  }

  /**
   * Adds object in state identified by key;
   * @param key Selector (key) of the object in the state
   * @param state Object that will be appended in the state
   * @param keyId Identifier for the items if the object is an array
   * @return Boolean
   */
  set(key: string, state: any, keyId?: string): boolean {
    if (!key || !state) { return false; }
    const newState = Array.isArray(state) ? arrayToMap(state, keyId) : state;
    this.setState(key, newState);
    return true;
  }

  /**
   * Sets a value for an item in an array in the state
   * @param key Selector (key) of the object in the state
   * @param itemId Id of the item that will be modified or added in the state
   * @param itemState The value for the item that will be changed, default is null
   * @return Boolean
   */
  setItem(key: string, itemId: string | number, itemState: any = null): boolean {
    if (!key || !itemId) { return false; }
    const currentState = this.value[key] ?? new Map();
    const newState = currentState?.set(itemId + '', itemState);
    this.setState(key, newState);
    return true;
  }

  /**
   * Removes an item from an array in the state
   * @param key Key of the object in the state
   * @param id Id of the item that will be removed
   * @return Boolean
   */
  removeItem<T>(key: string, id: string | number): boolean {
    if (!key || !id) { return false; }
    const state: Map<string, T> = this.value[key];
    if (!(state instanceof Map)) { return false; }
    state?.delete(id + '');
    this.setState(key, state);
    return true;
  }

  /**
   * Resets the state to it's initial state
   */
  reset() {
    this.store.next(initialState);
  }

  /**
   * Return the correct value of a piece of state
   * Ex.: If type of the piece of state is Map, convert it to array and then return it.
   * @param state Key of the object in the state
   * @param itemId If provided, return the value of that key in the selected state
   * @return Boolean
   */
  private getState<T>(state: any, itemId: string): T | null {
    if (!state) { return null; }
    if (!(state instanceof Map)) { return state; }
    return itemId ? (state.get(itemId + '') ?? null) : mapToArray(state);
  }

  /**
   * Appends new state object to the state
   * @param key Selector (key) of the object in the state
   * @param value Object that will be appended in the state
   * @return Boolean
   */
  private setState(key: string, value: any): boolean {
    if (!key || !value) { return false; }
    this.store.next({ ...this.value, [key]: value });
    return true;
  }

}

/**
 * Converts a Map object into array
 * @param mapObject Map object that will be converted
 * @return Array of map items
 */
export function mapToArray<T>(mapObject: Map<string, T>): T[] {
  const array: T[] = [];
  for (const value of mapObject.values()) {
    array.push(value);
  }
  return array;
}

/**
 * Converts an array of elements into Map object
 * @param array Array that will be converted to map
 * @param key Is used as key for the map, default is 'id'
 * @return Map with key value pairs of the array
 */
export function arrayToMap<T>(array: T[], key: string = 'id'): Map<string, T> {
  return array.reduce((accumulator, object) => {
    accumulator.set(object[key] + '', object);
    return accumulator;
  }, new Map<string, T>());
}
