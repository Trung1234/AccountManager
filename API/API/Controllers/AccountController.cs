using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Repositories;
using API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _repo;
        private string currentPath = string.Empty;
        private IHostingEnvironment _hostingEnvironment;

        public AccountController(IAccountRepository repo, IHostingEnvironment hostingEnvironment)
        {
            _repo = repo;
            _hostingEnvironment = hostingEnvironment;
            currentPath = _hostingEnvironment.ContentRootPath + "\\Data\\accounts.json";
            // Check if file json is not existed
            if (!System.IO.File.Exists(currentPath))
            {
                System.IO.File.Create(currentPath).Close();
                var newContent = new List<AccountImport>();
                System.IO.File.WriteAllText(currentPath, JsonConvert.SerializeObject(newContent, Formatting.Indented));
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Normal")]
        public IEnumerable<Account> GetAccounts()
        {
            return _repo.GetAll();
        }

        [HttpGet]
        [Route("GetAccounts")]
        [Authorize(Roles = "Admin,Normal")]
        public PageResult<Account> GetAccountPagings(int? page, int pagesize = 10)
        {
            IEnumerable<Account> accounts = _repo.GetAll();
            var countDetails = accounts.Count();
            var result = new PageResult<Account>
            {
                Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 10,
                Items = accounts.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
            };
            return result;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Normal")]
        public async Task<IActionResult> GetAccount([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var account = await _repo.GetById(id);

            if (account == null)
            {
                return NotFound();
            }

            return Ok(account);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostAccount([FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_repo.IsEmailDuplicated(account.Email, account))
            {
                return BadRequest(new { message = "This email already exists" });
            }
            if (_repo.IsExist(account.AccountNumber))
            {
                return BadRequest(new { message = "This Account Number already exists" });
            }
            _repo.Add(account);
            _repo.SaveChange(account);

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutAccount([FromRoute] int id, [FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != account.Id)
            {
                return BadRequest();
            }
            if (_repo.IsEmailDuplicated(account.Email, account))
            {
                ModelState.AddModelError("Email", "This email already exists");
                return BadRequest(ModelState);
            }
            if (_repo.IsExist(account.AccountNumber))
            {
                ModelState.AddModelError("AccountNumber", "This Account Number already exists");
                return BadRequest(ModelState);
            }
            try
            {
                _repo.Update(account);
                await _repo.SaveAsync(account);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAccount([FromRoute] int id)
        {
            var account = await _repo.GetById(id);
            if (account == null)
            {
                return NotFound();
            }
            _repo.Delete(account);
            await _repo.SaveAsync(account);

            return Ok(account);
        }

        [HttpGet]
        [Route("ImportAccount")]
        public ActionResult<string> ImportAccount()
        {
            try
            {
                var json = System.IO.File.ReadAllText(currentPath);
                var accountVMs = JsonConvert.DeserializeObject<List<AccountImport>>(json);
                if (accountVMs == null) accountVMs = new List<AccountImport>();
                _repo.ImportAccounts(accountVMs);               
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return "import succefully";
        }
    }
}
