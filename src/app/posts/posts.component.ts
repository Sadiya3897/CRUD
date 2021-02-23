import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import * as globals from '../globals';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: any = [];
  public postsForm: FormGroup;
  public formControls: any;
  public overlayFlag: any = false;
  public header: any;
  public userId: any = [];
  public submitted : any = false;

  constructor(
    private getDataFromService: GetDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.postData();
    this.getDataFromService.getUsers().then((data) => {
      data.forEach(element => {
        this.userId.push(element.id);        
      });
    });
  }
  public postData() {
    this.getDataFromService.getPosts().then((data) => {
      if (data) {
        this.posts = data;
      }
    }).catch(error => {
      return throwError(error);
    });

  }
  /**
  * Method to define title form group
  * @method initializeForm
  */
  private initializeForm() {
    this.postsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(2), Validators.pattern(globals.REGX_FREE_TEXT)]],
      body: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(2)]],
      userId: ['', [Validators.required]]
    });
    this.formControls = this.postsForm.controls;
  }
  public edit(post) {
    this.header = false;
    this.overlayFlag = true;
    localStorage.setItem('id', post.id);
    if (post) {
      this.postsForm.patchValue({
        title: post.title,
        body: post.body,
        userId : post.userId
      });
    }
  }
  public save(body) {
    if (this.postsForm.valid) {
      this.submitted = false;
      this.overlayFlag = false;
      let request = {
        title: body.title.value,
        body: body.body.value,
        userId: body.userId.value
      }
      let id = localStorage.getItem('id') ? localStorage.getItem('id') : '';
      if (!id) {
        this.getDataFromService.addposts(request).then((data) => {
          if (data) {
            this.posts.push(data);
          }
        }).catch(error => {
          return throwError(error);
        });
      }
      else {
        Object.assign(request, { id: id });
        this.getDataFromService.updatePosts(request).then((data) => {
          if (data) {
            this.posts.forEach(element => {
              if (element.id == data.id) {
                element.userId = data.userId;
                element.title = data.title
                element.body = data.body;
              }
            });
          }
        }).catch(error => {
          return throwError(error);
        });
      }
    }
    else {
      this.submitted = true;
    }
  }
  public delete(post) {
    this.getDataFromService.deletePosts(post.id)
      .then(response => {
        this.posts = this.posts.filter(item => item.id !== post.id);
      });
  }
  public cancel() {
    this.overlayFlag = false;
  }
  public create() {
    Object.keys(this.formControls).forEach(item => {
      this.formControls[item].clearValidators();
      this.formControls[item].updateValueAndValidity();
    });
    this.initializeForm();
    this.header = true;
    localStorage.clear();
    this.overlayFlag = true;
  }

}
