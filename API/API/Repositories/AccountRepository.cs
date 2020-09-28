using API.Models;
using API.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static API.Common.Constant;

namespace API.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly AccountManagerContext _context;

        public AccountRepository(AccountManagerContext context)
        {
            _context = context;
        }
        public void Add(Account account)
        {
            _context.Add(account);
        }

        public void Delete(Account account)
        {
            _context.Remove(account);
        }

        public IEnumerable<Account> GetAll()
        {
            try
            {
                return _context.Accounts.FromSql($"GetAccounts");
            }catch
            {
                return new List<Account>();
            }                   
        }

        public async Task<Account> GetById(int id)
        {
            return await _context.Accounts.FindAsync(id);
        }

        public void ImportAccounts(List<AccountImport> accountVMs)
        {
            foreach (var accountVM in accountVMs)
            {
                Account account = new Account
                {
                    AccountNumber = accountVM.account_number,
                    Balance = accountVM.balance,
                    Firstname = accountVM.firstname,
                    Lastname = accountVM.lastname,
                    Age = accountVM.age,
                    Gender = accountVM.gender,
                    Address = accountVM.address,
                    Employer = accountVM.employer,
                    Email = accountVM.email,
                    City = accountVM.city,
                    State = accountVM.state
                };
                _context.Add(account);
                _context.SaveChanges();
            }
        }

        public bool IsExist(int accountNumber)
        {
            return _context.Accounts.Any(e => e.AccountNumber == accountNumber);
        }
        public bool IsEmailDuplicated(string emailAddress,Account account = null)
        {
            if(account.Id > 0 && account.Email.Equals(emailAddress.Trim()))
            {
                return false;
            }
            return _context.Accounts.Any(e => e.Email.Equals(emailAddress.Trim()));
        }
        public async Task<Account> SaveAsync(Account account)
        {
            await _context.SaveChangesAsync();
            return account;
        }

        public void Update(Account account)
        {
            _context.Entry(account).State = EntityState.Modified;
            _context.Update(account);
        }

        public Account SaveChange(Account account)
        {
            _context.SaveChanges();
            return account;
        }

        public List<Account> Search(Account account)
        {
            IEnumerable<Account> accounts = GetAll();
            return accounts.Where(s => 
            s.AccountNumber == account.AccountNumber
            && s.Email.Contains(account.Email) 
            && s.Age == account.Age
            && s.State.Contains(account.State)
            && s.Gender.Equals(account.Gender)
            && s.Balance == account.Balance
            && s.City.Contains(s.City)
            && s.Firstname.Contains(s.Firstname)
            && s.Lastname.Contains(account.Lastname)).ToList();
        }

        public List<Account> SortByColumn(List<Account> accounts,int sortColumn)
        {
            List<Account> result = new List<Account>();
            switch (sortColumn)
            {
                case (int)Accounts.AccountNumber:
                    result = accounts.OrderBy(s => s.AccountNumber).ToList();
                    break;
                case (int)Accounts.Balance:
                    result = accounts.OrderBy(s => s.Balance).ToList();
                    break;
                case (int)Accounts.Firstname:
                    result = accounts.OrderBy(s => s.Firstname).ToList();
                    break;
                case (int)Accounts.Lastname:
                    result = accounts.OrderBy(s => s.Lastname).ToList();
                    break;
                case (int)Accounts.Age:
                    result = accounts.OrderBy(s => s.Age).ToList();
                    break;
                case (int)Accounts.Employer:
                    result = accounts.OrderBy(s => s.Employer).ToList();
                    break;
                case (int)Accounts.City:
                    result = accounts.OrderBy(s => s.City).ToList();
                    break;
                case (int)Accounts.State:
                    result = accounts.OrderBy(s => s.State).ToList();
                    break;
            }
            return result;
        }
    }
}
