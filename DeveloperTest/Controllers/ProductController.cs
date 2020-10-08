using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Model;
using BusinessLayer.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeveloperTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService producttService)
        {
            _productService = producttService;
        }

        [HttpGet]
        [Route("Products")]
        public async Task<IActionResult> Products()
        {
            return Ok(await _productService.GetProducts());
        }

        [HttpPost]
        [Route("SaveProduct")]
        public async Task<IActionResult> SaveProduct([FromBody] ProductModel model)
        {
            return Ok(await _productService.SaveProduct(model));
        }

        [HttpDelete]
        [Route("DeleteProduct/{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            return Ok(await _productService.DeleteProduct(productId));
        }
    }
}