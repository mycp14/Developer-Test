using BusinessLayer.Model;
using DataAccessLayer.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Service
{
    public class ProductService : IProductService
    {
        public async Task<List<ProductModel>> GetProducts()
        {
            using (DeveloperTestDBContext db = new DeveloperTestDBContext())
            {
                return await (from a in db.Products.AsNoTracking()
                              select new ProductModel
                              {
                                  ProductId = a.ProductId,
                                  Name = a.Name,
                                  Price = a.Price,
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveProduct(ProductModel productModel)
        {
            using (DeveloperTestDBContext db = new DeveloperTestDBContext())
            {
                DataAccessLayer.EntityModels.Products product = db.Products.Where
                         (x => x.ProductId == productModel.ProductId).FirstOrDefault();
                if (product == null)
                {
                    product = new Products()
                    {
                        Name = productModel.Name,
                        Price = productModel.Price,
                    };
                    db.Products.Add(product);

                }
                else
                {
                    product.Name = productModel.Name;
                    product.Price = productModel.Price;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteProduct(int productId)
        {
            using (DeveloperTestDBContext db = new DeveloperTestDBContext())
            {
                DataAccessLayer.EntityModels.Products product =
                     db.Products.Where(x => x.ProductId == productId).FirstOrDefault();
                if (product != null)
                {
                    db.Products.Remove(product);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
