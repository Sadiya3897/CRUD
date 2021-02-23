import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { throwError, empty } from 'rxjs';
import * as globals from '../globals';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
export interface UserElement {
  Name: string;
  Username: string;
  Email: string,
  Address: string;
  Phone: string;
  Website: string,
  Company: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: MatTableDataSource<UserElement>;
  public userData: any = [];
  displayedColumns = [];
  columnNames = [{
    id: 'id',
    value: 'S.No',

  },
  {
    id: 'name',
    value: 'Name',
  },
  {
    id: 'username',
    value: 'Username',
  },
  {
    id: 'email',
    value: 'Email',
  },
  {
    id: 'address',
    value: 'Address',

  },
  {
    id: 'phone',
    value: 'Phone',
  },
  {
    id: 'website',
    value: 'Website',
  },
  {
    id: 'company',
    value: 'Company'
  }
  ];

  public userform: FormGroup;
  public formControls: any;
  public overlayFlag: any = false;
  public header: any;
  public submitted: any = false;

  constructor(
    private getDataFromService: GetDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.displayedColumns.push("edit");
    this.displayedColumns.push("delete");
    this.user();
  }
  /**
  * Method to define user info form group
  * @method initializeForm
  */
  private initializeForm() {
    this.userform = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(2), Validators.pattern(globals.REGX_SINGLE_SPACE_STRING)]],
      Username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2), Validators.pattern(globals.REGX_ALPHANUM_NOSPACE)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(globals.REGX_EMAIL)]],
      street: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(globals.REGX_ADDRESS)]],
      suite: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(globals.REGX_ADDRESS)]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      Website: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(globals.REGX_FREE_TEXT)]],
      compName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70), Validators.pattern(globals.REGX_FREE_TEXT)]],
      catchPhrase: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(globals.REGX_FREE_TEXT)]],
      bs: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(globals.REGX_FREE_TEXT)]]
    });
    this.formControls = this.userform.controls;
  }

  user() {
    this.getDataFromService.getUsers().then((data) => {
      if (data) {
        this.userData = data;
        this.userData.forEach(element => {
          element.address.geo =
            Object.keys(element.address.geo).map(function (k) { return element.address.geo[k] });
          element.address =
            Object.keys(element.address).map(function (k) { return element.address[k] });
            element.company =
            Object.keys(element.company).map(function (k) { return element.company[k] });
        });
        this.dataSource = new MatTableDataSource<UserElement>(this.userData);
      }
    }).catch(error => {
      return throwError(error);
    });

  }
  public edit(users) {
    this.header = false;
    this.overlayFlag = true;
    localStorage.setItem('id', users.id);
    if (users) {
      this.userform.patchValue({
        fullName: users.name,
        Username: users.username,
        email: users.email,
        street: users.address[0],
        suite: users.address[1],
        city: users.address[2],
        zipcode: users.address[3],
        lat: users.address[4][0],
        lng: users.address[4][1],
        mobile: users.phone,
        Website: users.website,
        compName: users.company[0],
        catchPhrase: users.company[1],
        bs: users.company[2],
      });
    }
  }
  public save(body) {
    if (this.userform.valid) {
      this.submitted = false;
      this.overlayFlag = false;
      let request = {
        name: body.fullName.value,
        username: body.Username.value,
        email: body.email.value,
        address: {
          street: body.street.value,
          suite: body.suite.value,
          city: body.city.value,
          zipcode: body.zipcode.value,
          geo: {
            lat: body.lat.value,
            lng: body.lng.value,
          },
        },
        mobile: body.mobile.value,
        Website: body.Website.value,
        company: {
          name: body.compName.value,
          catchPhrase: body.catchPhrase.value,
          bs: body.bs.value,
        }
      }
      let id = localStorage.getItem('id') ? localStorage.getItem('id') : '';
      if (!id) {
        this.getDataFromService.addUsers(request).then((data) => {
          if (data) {
            this.userData.push(data);
            this.userData.forEach(element => {
              if (element.id == data.id) {
                element.address.geo =
                  Object.keys(element.address.geo).map(function (k) { return element.address.geo[k] });
                element.address =
                  Object.keys(element.address).map(function (k) { return element.address[k] });
                  element.company =
                  Object.keys(element.company).map(function (k) { return element.company[k] });
              }
            });
            this.dataSource = new MatTableDataSource<UserElement>(this.userData);
          }
        }).catch(error => {
          return throwError(error);
        });
      } else {
        Object.assign(request, { id: id });
        this.getDataFromService.updateUsers(request).then((data) => {
          if (data) {
            this.userData.forEach(element => {
              if (element.id == data.id) {
                element.name = data.name;
                element.username = data.username
                element.email = data.email;
                element.address = [];
                element.address.street = data.address.street;
                element.address.suite = data.address.suite
                element.address.city = data.address.city;
                element.address.zipcode = data.address.zipcode;
                element.address.geo = [];
                element.address.geo.lat = data.address.geo.lat;
                element.address.geo.lng = data.address.geo.lng
                element.phone = data.phone;
                element.website = data.website;
                element.company = [];
                element.company.name = data.company.name
                element.company.catchPhrase = data.company.catchPhrase;
                element.company.bs = data.company.bs;
                element.address.geo =
                  Object.keys(element.address.geo).map(function (k) { return element.address.geo[k] });
                element.address =
                  Object.keys(element.address).map(function (k) { return element.address[k] });
                  element.company =
                  Object.keys(element.company).map(function (k) { return element.company[k] });
              }
            });
            this.dataSource = new MatTableDataSource<UserElement>(this.userData);
          }
        }).catch(error => {
          return throwError(error);
        });
      }
    } else {
      this.submitted = true;
    }
  }
  public delete(users) {
    this.getDataFromService.deleteUsers(users.id)
      .then(response => {
        this.userData = this.userData.filter(item => item.id !== users.id);
        this.dataSource = new MatTableDataSource<UserElement>(this.userData);
      });

  }
  public cancel() {
    this.overlayFlag = false;
  }
  public create() {
    Object.keys(this.formControls).forEach(item => {
      this.formControls[item].setValue(null);
      this.formControls[item].clearValidators();
      this.formControls[item].updateValueAndValidity();
    });
    this.initializeForm();
    this.header = true;
    localStorage.clear();
    this.overlayFlag = true;
  }
}
