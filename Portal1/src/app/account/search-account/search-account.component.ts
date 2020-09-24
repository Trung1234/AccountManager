import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/models/account';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-search-account',
  templateUrl: './search-account.component.html',
  styleUrls: ['./search-account.component.css']
})
export class SearchAccountComponent implements OnInit {

  form: FormGroup;
  actionType: string;


  id: number;
  errorMessage: any;

  formAccountNumber: string;
  formAddress: string;
  formLastname: string;
  formFirstname: string;
  formEmployer: string;
  formEmail: string;
  formCity: string;
  formBalance: string;
  formAge: string;
  formGender: string;
  formState: string;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router) {


    this.formAccountNumber = 'accountNumber';
    this.formAddress = 'address';
    this.formLastname = 'lastname';
    this.formFirstname= 'firstname';
    this.formEmployer = 'employer';
    this.formEmail = 'email';
    this.formCity = 'city';
    this.formBalance = 'balance';
    this.formAge = 'age';
    this.formGender = 'gender';
    this.formState = 'state';

    this.form = this.formBuilder.group(
      {
        id: 0,
        accountNumber: ['',Validators.required],
        address: ['',Validators.required],
        age: ['',[Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
        balance: ['', [Validators.required, Validators.minLength(1)]],

        city: ['', Validators.required],

        employer: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        gender: ['', Validators.required],
        state: ['', Validators.required]
      }
    )
  }

  ngOnInit() {
  }
  save() {

  }
  cancel() {
    this.router.navigate(['/accounts']);
  }
  get accountNumber() { return this.form.get(this.formAccountNumber); }
  get address() { return this.form.get(this.formAddress); }
  get age() { return this.form.get(this.formAge); }
  get email() { return this.form.get(this.formEmail); }
  get gender() { return this.form.get(this.formGender); }
  get firstname() { return this.form.get(this.formFirstname); }
  get city() { return this.form.get(this.formCity); }
  get employer() { return this.form.get(this.formEmployer); }
  get balance() { return this.form.get(this.formBalance); }
  get lastname() { return this.form.get(this.formLastname); }
  get state() { return this.form.get(this.formState); }
}
