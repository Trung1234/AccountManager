import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { AccountModel } from 'src/app/models/account';
import { PageResult } from 'src/app/models/pageResult';
import { AccountService } from 'src/app/shared/account.service';
import { SearchAccountComponent } from '../search-account/search-account.component';

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
  public count: number;

  constructor(private accountService: AccountService,private modalService: NgbModal) {

  }

  ngOnInit() {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    if(userRole === "Admin"){
        this.isAdmin = true;
    }

    this.accountService.getSharedListItem().subscribe(data => {
      this.accounts = data as AccountModel[]
    });
    if(this.accounts == null){
      this.loadAccountPagings();
    }else{
      this.modalService.dismissAll(SearchAccountComponent);
      this.pageNumber = 1;
      this.count = 1;
    }
  }


  loadAccountPagings() {
    if(localStorage.getItem('pageNumber') != null){
      this.pageNumber = +localStorage.getItem('pageNumber');
    }
    this.accountService.getAccountsByPape(this.pageNumber).subscribe(
      result => {
        this.accounts = result.items;
      this.pageNumber = result.pageIndex;
      this.count = result.count;
      },
      err => {
        console.log(err);
      },
    );
  }
  public onPageChange = (pageNumber) => {
    localStorage.setItem('pageNumber', pageNumber);
    this.accountService.getAccountsByPape(pageNumber).subscribe(result => {
      this.accounts = result.items;
      this.pageNumber = result.pageIndex;
      this.count = result.count;
    },
    err => {
      console.log(err);
    },);
  }
  openPopUp(){
    this.modalService.open(SearchAccountComponent);
  }
  sortBy(sortColumn: any,sortFlag: any){
    if(localStorage.getItem('pageNumber') != null){
      this.pageNumber = +localStorage.getItem('pageNumber');
    }
    this.accountService.getAccountsSortted(this.pageNumber,sortColumn,sortFlag).subscribe(
      result => {
        this.accounts = result.items;
      this.pageNumber = result.pageIndex;
      this.count = result.count;
      },
      err => {
        console.log(err);
      },
    );
  }
  delete(id) {
    const ans = confirm('Do you want to delete Account ');
    if (ans) {
      this.accountService.deleteAccount(id).subscribe((data) => {
        this.accountService.getAccountsByPape(this.pageNumber).subscribe(result => {
          this.accounts = result.items;
          this.pageNumber = result.pageIndex;
          this.count = result.count;
        },
        err => {
          console.log(err);
        },);
      });
    }
  }
}
