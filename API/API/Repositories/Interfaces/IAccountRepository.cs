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
        bool IsExist(int id);
        void ImportAccounts(List<AccountImportVM> accounts);
    }
}
