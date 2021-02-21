import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { throwError, empty } from 'rxjs';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public todoList: any = [];
  public todoForm: FormGroup;
  public formControls: any;
  public overlayFlag: any = false;
  public header: any;
  public userId: any = [];

  constructor(
    private getDataFromService: GetDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.todo();
    this.getDataFromService.getUsers().then((data) => {
      data.forEach(element => {
        this.userId.push(element.id);
      });
    });
  }
  public todo() {
    this.getDataFromService.getTodoData().then((data) => {
      if (data) {
        this.todoList = data;
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
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      completed: ['', [Validators.required]],
      userId: ['', [Validators.required]]
    });
    this.formControls = this.todoForm.controls;
  }
  public edit(todo) {
    this.overlayFlag = true;
    this.header = false;
    localStorage.setItem('id', todo.id);
    if (todo) {
      this.todoForm.patchValue({
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId
      });
    }
  }
  public save(body) {
    if (this.todoForm.valid) {
      this.overlayFlag = false;
      let request = {
        title: body.title.value,
        completed: body.completed.value,
        userId: body.userId.value
      }
      let id = localStorage.getItem('id') ? localStorage.getItem('id') : '';
      if (!id) {
        this.getDataFromService.addTodo(request).then((data) => {
          if (data) {
            this.todoList.push(data);
          }
        }).catch(error => {
          return throwError(error);
        });
      }
      else {
        Object.assign(request, { id: id });
        this.getDataFromService.updateTodo(request).then((data) => {
          if (data) {
            this.todoList.forEach(element => {
              if (element.id == data.id) {
                element.userId = data.userId;
                element.title = data.title
                element.completed = data.completed;
              }
            });
          }
        }).catch(error => {
          return throwError(error);
        });
      }
    }
  }
  public delete(todo) {
    this.getDataFromService.deleteTodo(todo.id)
      .then(response => {
        this.todoList = this.todoList.filter(item => item.id !== todo.id);
      });
  }
  public cancel() {
    this.overlayFlag = false;
  }
  public create() {
    this.initializeForm();
    this.header = true;
    localStorage.clear();
    this.overlayFlag = true;
    Object.keys(this.formControls).forEach(item => {
      this.formControls[item].clearValidators();
      this.formControls[item].updateValueAndValidity();
    });
  }

}
