import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodolistComponent } from './todolist/todolist.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { headerTitle: 'Main Page', pageTitle: 'Main Page' },
  },
  {
    path: 'todolist', component: TodolistComponent,
    data: { headerTitle: 'To Do List', pageTitle: 'To do List' },
  },
  {
    path: 'posts', component: PostsComponent,
    data: { headerTitle: 'Posts', pageTitle: 'Posts' },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
