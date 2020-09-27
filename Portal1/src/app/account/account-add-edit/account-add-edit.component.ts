import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/models/account';
import { AccountService } from 'src/app/shared/account.service';


@Component({
  selector: 'app-account-add-edit',
  templateUrl: './account-add-edit.component.html',
  styleUrls: ['./account-add-edit.component.css']
})
export class AccountAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  isAdd:  boolean = true;
  id: number;
  errorMessage: any;
  existingAccount: AccountModel;
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
  errors: string[];
  page: number = 1;
  constructor(private accountService: AccountService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
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

    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

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
    this.errors = [];
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.isAdd = false;

      this.accountService.getAccount(this.id)
      .subscribe(data => (
          this.existingAccount = data,
          this.form.controls[this.formAccountNumber].setValue(this.existingAccount.accountNumber),
          this.form.controls[this.formAddress].setValue(this.existingAccount.address),
          this.form.controls[this.formAge].setValue(this.existingAccount.age),
          this.form.controls[this.formBalance].setValue(this.existingAccount.balance),
          this.form.controls[this.formCity].setValue(this.existingAccount.city),
          this.form.controls[this.formEmail].setValue(this.existingAccount.email),
          this.form.controls[this.formEmployer].setValue(this.existingAccount.employer),
          this.form.controls[this.formFirstname].setValue(this.existingAccount.firstname),
          this.form.controls[this.formLastname].setValue(this.existingAccount.lastname),
          this.form.controls[this.formGender].setValue(this.existingAccount.gender),
          this.form.controls[this.formState].setValue(this.existingAccount.state)
      ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    if(this.actionType === 'Add'){
      let account: AccountModel = {
        id: 0,
        accountNumber: this.form.get(this.formAccountNumber).value,
        gender: this.form.get(this.formGender).value,
        age: this.form.get(this.formAge).value,
        balance: this.form.get(this.formBalance).value,
        city: this.form.get(this.formEmployer).value,
        employer: this.form.get(this.formEmployer).value,
        firstname: this.form.get(this.formFirstname).value,
        email: this.form.get(this.formEmail).value,
        address: this.form.get(this.formAddress).value,
        lastname: this.form.get(this.formLastname).value,
        state: this.form.get(this.formState).value
      };

      this.accountService.saveAccount(account)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/accounts']);
        },
        err => {
          this.errors = [];
          console.log(err);
            if (err.status === 400) {
              // handle validation error
              console.log(err);
              this.errors.push(err.error.message);
            } else {
              this.errors.push("something went wrong!");
            }
        }
      );
    }
    if (this.actionType === 'Edit') {
      let account: AccountModel = {
        id: this.existingAccount.id,
        accountNumber: this.form.get(this.formAccountNumber).value,
        gender: this.form.get(this.formGender).value,
        age: this.form.get(this.formAge).value,
        balance: this.form.get(this.formBalance).value,
        city: this.form.get(this.formEmployer).value,
        employer: this.form.get(this.formEmployer).value,
        firstname: this.form.get(this.formFirstname).value,
        email: this.form.get(this.formEmail).value,
        address: this.form.get(this.formAddress).value,
        lastname: this.form.get(this.formLastname).value,
        state: this.form.get(this.formState).value
      };
      this.accountService.updateAccount(account.id, account)
        .subscribe((data) => {
           this.router.navigate(['/accounts']);
        });
    }
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
