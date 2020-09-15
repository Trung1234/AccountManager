using API.Models;
using API.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return  _context.Accounts.OrderBy(x=>x.Id);
        }

        public async Task<Account> GetById(int id)
        {
            return await _context.Accounts.FindAsync(id);
        }

        public void ImportAccounts(List<AccountImportVM> accountVMs)
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

        public bool IsExist(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
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
    }
}
