import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { HttpClientModule } from '@angular/common/http';

import { BullConversationComponent } from './components/bull-conversation/bull-conversation.component';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { listBlog } from './blog/mainBlogPage/listBlog.component';
import { NewListBlogComponent } from './blog/searchBlog/new-list-blog.component';
import { NewBlogListsComponent } from './blog/blogComponent/new-blog-lists.component';
import { AnotherBlogStyleComponent } from './blog/viewBlog/another-blog-style.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { CommentaireComponent } from './blog/commentaire/commentaire.component';


export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      // Implement the logic to retrieve the JWT token from your preferred source (e.g., localStorage, sessionStorage, etc.)
      return localStorage.getItem('token');
    },
  };
}



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BullConversationComponent,
    listBlog,
    NewListBlogComponent,
    NewBlogListsComponent,
    AnotherBlogStyleComponent,
    AddBlogComponent,
    CommentaireComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
