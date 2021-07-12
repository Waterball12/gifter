using Gifter.Domain.Models;
using Gifter.Infrastructure;
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
        public async Task<IActionResult> CreateSharingGift([FromBody] Gift gift)
        {
            await _context.Gift.InsertOneAsync(gift)
                .ConfigureAwait(false);

            return Ok();
        }

    }
}
