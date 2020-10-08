using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Model
{
    public class ProductModel
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
    }
}
