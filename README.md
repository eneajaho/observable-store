# Run Project

Start Angular app
```bash
ng s -o
```

Start json-server
```bash
json-server --watch db.json
```

# Observable Store

### Set data in services or components
```js
  // service example
  constructor(private http: HttpClient, private store: Store) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/movies`)
      .pipe(tap(data => this.store.set('movies', data)));
  }
  
  getFavorites(): Observable<{ id: number }[]> {
  return this.http.get<{ id: number }[]>(`${this.api}/favorites`)
    .pipe(tap(res => this.store.set('favorites', res)));
  }
  
  addFavorite(id: number): Observable<any> {
    return this.http.post(`${this.api}/favorites`, { id })
     .pipe(tap(() => {
      const currentFav = this.store.get('favorites');
        this.store.set('favorites', [ ...currentFav, { id } ]);
      }));
  }

  removeFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.api}/favorites/${id}`)
      .pipe(tap(() => {
        const currentFav = this.store.get('favorites');
        const newFav = currentFav.filter(fav => fav.id !== id);
        this.store.set('favorites', newFav);
      }));
  }
```

### Reading data in components
```js

  constructor(private service: AppService, private store: Store) { }

  ngOnInit() {
    this.appService.getFavorites().pipe(take(1)).subscribe();
    this.appService.getMovies().pipe(take(1)).subscribe();

    this.movies$ = this.store.select<Movie[]>('movies');
    this.favorites$ = this.store.select<{ id }[]>('favorites');
  }
```
