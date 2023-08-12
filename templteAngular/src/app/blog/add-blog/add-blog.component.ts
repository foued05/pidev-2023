import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/blogServices/blog.service';
import { error } from 'console';
import {IArticle} from 'app/blogServices/BlogInterface/Article';
import { NgForm } from '@angular/forms';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  article: IArticle = {
    articleTitle: '',
    articleText: '',
    isPrivate: false,
    isArchived: false,
    creationDate: new Date(),
    createdBy: '',
    isDeleted: false
  };
  
  constructor(private blogService : BlogService) { }

  ngOnInit(): void {
   }

   addArticle(articleForm : NgForm){
    const userName = localStorage.getItem('userName');
    this.article.createdBy=userName;
    this.blogService.addArticle(this.article).subscribe({
      next:(res) => {

        console.log('succes when adding the article',res);
        location.reload();
      },
      error: (error) =>{
          console.log('erreur  coté front when adding an article',error);
      }
    });
    // Reset the form after submission
    articleForm.resetForm();
    }
   }