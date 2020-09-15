using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Repositories;
using API.ViewModel;
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
            // Kiểm tra nếu chưa tồn tại file json
            if (!System.IO.File.Exists(currentPath))
            {
                System.IO.File.Create(currentPath).Close();
                var newContent = new List<AccountImportVM>();
                System.IO.File.WriteAllText(currentPath, JsonConvert.SerializeObject(newContent, Formatting.Indented));
            }
        }

        // GET: api/BlogPosts
        [HttpGet]
        public IEnumerable<Account> GetAccounts()
        {
            return _repo.GetAll();
        }

 
        [HttpGet("{id}")]
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
        public async Task<IActionResult> PostAccount([FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(account);
            var save = await _repo.SaveAsync(account);

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        [HttpPut("{id}")]
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
            try
            {
                _repo.Update(account);
                var save = await _repo.SaveAsync(account);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        [HttpGet]
        [Route("ImportAccount")]
        public ActionResult<string> ImportAccount()
        {
            try
            {
                var json = System.IO.File.ReadAllText(currentPath);
                var accountVMs = JsonConvert.DeserializeObject<List<AccountImportVM>>(json);
                if (accountVMs == null) accountVMs = new List<AccountImportVM>();
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
