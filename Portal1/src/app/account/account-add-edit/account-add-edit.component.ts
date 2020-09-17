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
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        accountNumber: ['',Validators.required],
        address: ['',Validators.required],
        age: ['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        balance: ['', Validators.required],

        city: ['', Validators.required],

        employer: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]
      }
    )
  }

  ngOnInit() {

    if (this.id > 0) {
      this.actionType = 'Edit';
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
          this.form.controls[this.formLastname].setValue(this.existingAccount.lastname)
      ));


    }
  }

  save() {

  }

  cancel() {
    this.router.navigate(['/']);
  }
  get accountNumber() { return this.form.get(this.formAccountNumber); }
  get address() { return this.form.get(this.formAddress); }
  get age() { return this.form.get(this.formAge); }
  get email() { return this.form.get(this.formEmail); }
}
