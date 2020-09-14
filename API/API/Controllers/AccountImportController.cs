using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountImportController : ControllerBase
    {
        private readonly AccountManagerContext _context;
        private string currentPath = string.Empty;
        private IHostingEnvironment _hostingEnvironment;

        public AccountImportController(AccountManagerContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            currentPath = _hostingEnvironment.ContentRootPath + "\\Data\\accounts.json";
            // Kiểm tra nếu chưa tồn tại file json
            if (!System.IO.File.Exists(currentPath))
            {
                System.IO.File.Create(currentPath).Close();
                var newContent = new List<AccountImportVM>();
                System.IO.File.WriteAllText(currentPath, JsonConvert.SerializeObject(newContent, Formatting.Indented));
            }
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            try
            {
                var json = System.IO.File.ReadAllText(currentPath);
                var accountVMs = JsonConvert.DeserializeObject<List<AccountImportVM>>(json);
                if (accountVMs == null) accountVMs = new List<AccountImportVM>();
                foreach(var accountVM in accountVMs)
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
            catch (Exception ex)
            {

            }

            return new string[] { "value1", "value2" };
        }
    }
}
