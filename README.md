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

### Set / Update / Remove data in services or components
```js
  // service example
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

  }
```

### Reading data in components
```js

  constructor(private service: AppService, private store: Store) { }

  ngOnInit() {
    this.service.getFavorites().pipe(take(1)).subscribe();
    this.service.getMovies().pipe(take(1)).subscribe();

    this.movies$ = this.store.select<Movie[]>('movies');
    this.favorites$ = this.store.select<{ id }[]>('favorites');
  }
```
