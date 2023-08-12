import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/blogServices/blog.service';
import { Subscription } from 'rxjs';
import { IArticle } from 'app/blogServices/BlogInterface/Article';

@Component({
  selector: 'app-new-list-blog',
  templateUrl: './new-list-blog.component.html',
  styleUrls: ['./new-list-blog.component.css']
})
export class NewListBlogComponent implements OnInit {
  articles: IArticle[] = [];
  private articlesSubscription: Subscription;
  searchQuery: string = ''; // Holds the search query

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
   
  }

  performSearch(): void {
    this.articlesSubscription = this.blogService.searchArticleLettre(this.searchQuery).subscribe({
      next: (articles) => {
        this.articles = articles.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        console.log(this.articles);
        this.blogService.updateSearchResults(this.articles); // Update the search results in the shared service
      },
      error: (error) => {
        console.log('There is a problem in retrieving blog articles', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
