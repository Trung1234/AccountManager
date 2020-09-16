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
  formTitle: string;
  formBody: string;
  id: number;
  errorMessage: any;
  existingAccount: AccountModel;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.accountService.getAccount(this.id).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        },
      );


    }
  }

  save() {

  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }

}
