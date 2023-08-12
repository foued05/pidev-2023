import { Component, OnInit } from '@angular/core';
import { IArticle } from 'app/blogServices/BlogInterface/Article';
import { BlogService } from 'app/blogServices/blog.service';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-blog-lists',
  templateUrl: './new-blog-lists.component.html',
  styleUrls: ['./new-blog-lists.component.scss']
})
export class NewBlogListsComponent implements OnInit {

 articles : IArticle[] =[]
 
 searchQuery: string = '';
 private articlesSubscription: Subscription;

  constructor(private router: Router
    ,private blogService : BlogService) { }

  ngOnInit(): void {
    this.blogService.searchResults$.subscribe((results) => {
      if (results.length > 0) {
        this.articles = results; // Display the search results
      } else {
        this.fetchAllArticles(); // Display all articles
      }
    });
    this.blogService.updateSearchResults([]); // Initialize the search results with an empty array
    this.fetchAllArticles(); // Fetch all articles initially
  }
  
  fetchAllArticles(): void {
    this.articlesSubscription = this.blogService.ListArticle().subscribe({
      next: (articles) => {
        this.articles = articles.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
      },
      error: (error) => {
        console.log('There is a problem in retrieving blog articles', error);
      }
    });
  }
viewBlog(articleId: string): void {
  this.router.navigate(['/viewBlog', articleId]);
}
  ngOnDestroy(): void {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}

