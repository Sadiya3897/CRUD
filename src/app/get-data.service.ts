import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor() { }
  public getTodoData() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json());
  }
  public getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());
  }
  public getPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json());
  }
  public addTodo(body): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: body.title,
        completed: body.completed,
        userId: body.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res) {
          return res.json();
        }
        throw res;
      }).catch(err => { throw err; });
  }
  public addposts(body): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: body.title,
        body: body.body,
        userId: body.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res) {
          return res.json();
        }
        throw res;
      }).catch(err => { throw err; });
  }
  public addUsers(body): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: body.name,
        username: body.username,
        email: body.email,
        address : {
          street: body.address.street,
          suite: body.address.suite,
          city: body.address.city,
          zipcode : body.address.zipcode,
          geo : {
            lat: body.address.geo.lat,
            lng: body.address.geo.lng, 
          },
        },
        phone: body.mobile,
        website: body.Website,
        company : {
          name: body.company.name,
          catchPhrase: body.company.catchPhrase,
          bs: body.company.bs,
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res) {
          return res.json();
        }
        throw res;
      }).catch(err => { throw err; });
  }
  public updateTodo(body): Promise<any> {
    let id = body.id;
    return fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: body.id,
        title: body.title,
        completed: body.completed,
        userId: body.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res) {
          return res.json();
        }
        throw res;
      }).catch(err => { throw err; });
  }
  public deleteTodo(id){
    return fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
      method: 'DELETE',
    });
  }
  public deleteUsers(id){
    return fetch('https://jsonplaceholder.typicode.com/users/' + id, {
      method: 'DELETE',
    });
  }
  public deletePosts(id){
    return fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'DELETE',
    });
  }
  public updatePosts(body): Promise<any> {
    let id = body.id;
    return fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: body.id,
        title: body.title,
        body: body.body,
        userId: body.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res) {
          return res.json();
        }
        throw res;
      }).catch(err => { throw err; });
  }
  public updateUsers(body): Promise<any> {
    let id = body.id;
    return fetch('https://jsonplaceholder.typicode.com/users/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        name: body.name,
        username: body.username,
        email: body.email,
        address : {
          street: body.address.street,
          suite: body.address.suite,
          city: body.address.city,
          zipcode : body.address.zipcode,
          geo : {
            lat: body.address.geo.lat,
            lng: body.address.geo.lng, 
          },
        },
        phone: body.mobile,
        website: body.Website,
        company : {
          name: body.company.name,
          catchPhrase: body.company.catchPhrase,
          bs: body.company.bs,
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res) {
          return res.json();
        }
        throw res;
      }).catch(err => { throw err; });
  }
}
