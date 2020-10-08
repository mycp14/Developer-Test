using BusinessLayer.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Service
{
    public interface IProductService
    {
        Task<List<ProductModel>> GetProducts();
        Task<bool> SaveProduct(ProductModel product);
        Task<bool> DeleteProduct(int productId);
    }
}
