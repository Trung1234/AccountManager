import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account$: Observable<AccountModel>;
  id: number;

  constructor(private accountService: AccountService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadaccount();
  }

  loadaccount() {
    this.account$ = this.accountService.getAccount(this.id);
  }


}
