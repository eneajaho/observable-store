## Store Documentation
Observable Store is a simple store implementation for small and medium size projects. 
The main principle of it is to use a BehaviorSubject stream as the only source of truth for the whole application.
It has some simple ready-made methods that are the only needed functionality for the most part of small apps. 

To make use of the **OnPush Change Detection** in Angular, the store uses Map to store arrays. So, when we add an array in store, it gets converted to a map, and when we want to use the array it gets converted again to array.

So, if we need to add or edit an element in the array we just use Map's api to change the item's value, it has **O(1) time complexity**.

Also, the item selection in Map in store is faster because Map uses key value pairs, and we need only the key of the item in the Map.
Different from arrays, where we first need to find the element in the array and then change the value of the element.

> Map performs better in scenarios involving frequent additions and removals of key-value pairs than just a simple javascript object.
 Check **Maps vs. Objects** here: [Map docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

---

### How to use

- Create a **store.ts** file.
- Copy and paste all the code from [here](https://raw.githubusercontent.com/eneajaho/observable-store/master/src/app/store/Store.ts) in **store.ts**
- When you want to use the store just implement it in the constructor of the class, and DI will do it's job.

  ```ts
  constructor(private store: Store) { }
  ```
  
- That's all. 


### Store api

- ##### Set state object in the store and handle errors. 

  - Login method.
  ```ts
  constructor(private store: Store, private http: HttpClient) { }
  
  login(payload: AuthCredentials): Observable<Auth> {
    return this.http.post<Auth>(`${this.api}/login`, payload).pipe(
      tap(res => this.store.set('auth', res)),
      catchError(error => {
        this.store.set('auth', { error });
        return of(error);
      })
    );
  }
  ```
  - Get movies method
  
  ```ts
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/movies`).pipe(
      tap(res => this.store.set('movies', res, 'uuid')),
      catchError(error => {
        this.store.set('movies', { error });
        return of(error);
      })
     );
   }
  ```
  
 - ##### Select state from the store. 
  ```ts
  movies$: Observable<Movie[]>;
  movies: Movie[];

  constructor(private store: Store) { }
  
  ngOnInit() {
    // select returns an observable of the selected state
    this.movies$ = this.store.select('movies');

    // get returns the value of the selected state
    this.movies = this.store.get('movies');
  }
  ```
  - ##### Select item from an array in store
  ```ts
  movie$: Observable<Movie>;
  movie: Movie;

  constructor(private store: Store) { }

  ngOnInit() {
    const id = 1;
    // select returns an observable of the selected item
    this.movie$ = this.store.select('movies', id);

    // select returns the value of the selected item
    this.movie = this.store.get('movies', id);
  }
  ```

 - ##### Add, edit and remove an item in an array in the store. 
  ```ts
  constructor(private store: Store, private http: HttpClient) { }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.api}/movies`, movie).pipe(
      tap((res: Movie) => this.store.setItem('movies', res.uuid, res))
    );
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.api}/movies/${movie.id}`, movie).pipe(
      tap((res: Movie) => this.store.setItem('movies', res.id, res))
    );
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.api}/movies/${id}`).pipe(
      tap((res: Movie) => this.store.removeItem('movies', id))
    );
  }
  ```

 - ##### Set an initial state
   Go to store.ts file and add the state inside initialState object.
   Ex.: 
   ```ts
   const initialState: State = {
     showMenu: false,
     theme: 'dark' 
   };
   ```






