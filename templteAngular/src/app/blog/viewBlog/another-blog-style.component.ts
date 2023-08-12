import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'app/blogServices/BlogInterface/Article';
import { BlogService } from 'app/blogServices/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-another-blog-style',
  templateUrl: './another-blog-style.component.html',
  styleUrls: ['./another-blog-style.component.css']
})
export class AnotherBlogStyleComponent implements OnInit {

  article: IArticle[] = [];
  private articlesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const articleId = params['id'];
      this.getArticle(articleId);
    });
  }

  getArticle(articleId: string): void {
    this.articlesSubscription = this.blogService.getArticleById(articleId).subscribe({
      next: (res) => {
        this.article = res;
        console.log(this.article);
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