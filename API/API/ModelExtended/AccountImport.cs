using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class AccountImport
    {
        public int account_number { get; set; }
        public int balance { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int age { get; set; }
        public string gender { get; set; }
        public string address { get; set; }
        public string employer { get; set; }
        public string email { get; set; }
        public string city { get; set; }
        public string state { get; set; }
    }
}
