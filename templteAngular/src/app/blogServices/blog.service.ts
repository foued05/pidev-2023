import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IArticle } from './BlogInterface/Article'; 
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private searchResultsSubject = new BehaviorSubject<IArticle[]>([]); // Holds the search results
  searchResults$ = this.searchResultsSubject.asObservable(); // Observable to subscribe to the search results changes

  updateSearchResults(results: IArticle[]): void {
    this.searchResultsSubject.next(results);
  }

  constructor(private http: HttpClient) { }

 
  public ListArticle():Observable<IArticle[]> {
    return this.http.get<IArticle[]>("http://localhost:3080/article/list")}
    
    public addArticle(article : any): Observable<any>{
      return this.http.post("http://localhost:3080/article/add",article)
    }
    
    public searchArticleLettre(title : string): Observable<IArticle[]>{
      return this.http.get<IArticle[]>(`http://localhost:3080/article/search/${title}`)
    }

    public getArticleById(id: string):Observable<IArticle[]>{
      return this.http.get<IArticle[]>(`http://localhost:3080/article/${id}`)
    }
}
