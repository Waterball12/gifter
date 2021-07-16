using Gifter.Api.Dto;
using Gifter.Domain.Models;
using Gifter.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gifter.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {
        private readonly GiftContext _context;

        public GiftController(GiftContext context)
        {
            _context = context;
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateSharingGift([FromBody] CreateGiftDto dto)
        {
            var gift = new Gift()
            {
                Name = dto.Name,
                Items = dto.Items.ToHashSet()
            };

            await _context.Gift.InsertOneAsync(gift)
                .ConfigureAwait(false);

            return Ok();
        }

    }
}
