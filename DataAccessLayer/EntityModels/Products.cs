using System;
using System.Collections.Generic;

namespace DataAccessLayer.EntityModels
{
    public partial class Products
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
    }
}
