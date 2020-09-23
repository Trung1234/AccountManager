import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account';
import { PageResult } from 'src/app/models/pageResult';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public accounts: AccountModel[];
  public accountPagings: Observable<PageResult<AccountModel>>;
  listAccount: AccountModel[];
  isAdmin : boolean = false;
  p: number = 1;
  searchKeyWord: '';
  public pageNumber: number = 1;
  public Count: number;

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    if(userRole === "Admin"){
        this.isAdmin = true;
    }
    this.loadAccountPagings();
  }


  loadAccountPagings() {
    this.accountService.getAccountPagings().subscribe(
      result => {
        this.accounts = result.items;
      this.pageNumber = result.pageIndex;
      this.Count = result.count;
      },
      err => {
        console.log(err);
      },
    );
  }
  public onPageChange = (pageNumber) => {
    this.accountService.getAccountsByPape(pageNumber).subscribe(result => {
      this.accounts = result.items;
    this.pageNumber = result.pageIndex;
    this.Count = result.count;
    },
    err => {
      console.log(err);
    },);
  }
  delete(id) {
    const ans = confirm('Do you want to delete Account ');
    if (ans) {
      this.accountService.deleteAccount(id).subscribe((data) => {
        this.loadAccountPagings();
      });
    }
  }
}
