# Run Project

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

## **Observable Store**

### Get / Update / Remove data in services or components
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

### Reading data in components
```js
  movies$: Observable<Movie[]>;
  favorites$: Observable<number[]>;

  constructor(private service: AppService, private store: Store) { }

  ngOnInit() {
    this.movies$ = this.store.select<Movie[]>('movies');
    this.favorites$ = this.store.select<{ id }[]>('favorites');
  }
```

### What's included
- Dumb components
- Smart components (Containers)
- Reactive forms
- Guards
- Models
- Pipes
- Resolvers
- Services
- **Observable Store**

### Screenshot
![Movies Store](https://i.imgur.com/qaqIetB.jpg)
