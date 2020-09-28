using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public interface IAccountRepository : IDataRepository<Account>
    {
        IEnumerable<Account> GetAll();
        Task<Account> GetById(int id);
        bool IsExist(int accountNumber);
        bool IsEmailDuplicated(string emailAddress, Account account);
        void ImportAccounts(List<AccountImport> accounts);
        Account SaveChange(Account entity);
        List<Account> Search(Account account);
        List<Account> SortByColumn(List<Account> accounts,int sortColumn, int sortFlg);
    }
}
