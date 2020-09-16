import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public accounts: Observable<AccountModel[]>;
  postId: number;
  isAdmin : boolean = false;
  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    if(userRole === "Admin"){
        this.isAdmin = true;
    }
    this.loadAccounts();
  }

  loadAccounts() {
    this.accounts = this.accountService.getAccounts();
  }
}
