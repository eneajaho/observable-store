## Run Project Locally - [Live project][https://observable-store.eneajaho.me/]

**Install node modules**
```bash
npm install
```

**Start Angular app**
```bash
ng s -o
```

**Start json-server**
```bash
json-server --watch db.json
```

### What's included
- Smart components
- Dumb components
- Reactive forms
- Interceptors
- Resolvers
- Services
- Facades
- Guards
- Pipes
- Models
- **Observable Store** - [Docs](https://github.com/eneajaho/observable-store/blob/master/src/app/store/README.md)


### CRUD data in services or components
```js
  constructor(private http: HttpClient, private store: Store) { }
 
  getFavorites(): Observable<{ id: number }[]> {
    return this.http.get<{ id: number }[]>(`${this.api}/favorites`)
      .pipe(tap(res => this.store.set('favorites', res)));
  }

  addFavorite(id: number): Observable<any> {
    return this.http.post(`${this.api}/favorites`, { id }).pipe(
      tap(() => this.store.setItem('favorites', id, { id }))
    );
  }

  removeFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.api}/favorites/${id}`).pipe(
      tap(() => this.store.removeItem('favorites', id))
    );
  }
```

### Getting data from store
```js
  movies$: Observable<Movie[]>;
  favorites$: Observable<Favorite[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.movies$ = this.store.select<Movie[]>('movies');
    this.favorites$ = this.store.select<Favorite[]>('favorites');
  }
```

### Screenshot
![Movies Store](https://i.imgur.com/WWKVb3X.jpg)

[https://observable-store.eneajaho.me/]: https://observable-store.eneajaho.me/


---

> License: **MIT**

> Author: **Enea Jahollari** 
