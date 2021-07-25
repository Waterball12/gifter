using AutoFixture.Xunit2;
using Gifter.Api.Controllers;
using Gifter.Api.Dto;
using Gifter.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Gifter.UnitTests.Controllers
{
    public class GiftControllerTests
    {
        private readonly Mock<IGiftRepository> _repository;

        public GiftControllerTests()
        {
            _repository = new Mock<IGiftRepository>();
        }

        [Fact]
        public async Task GetGift_WithValidUserId_ReturnsEmptyList()
        {
            string userId = "1";

            _repository.Setup(x => x.GetGiftsByUserId(It.IsAny<string>(), CancellationToken.None))
                .ReturnsAsync(new List<Gift>());

            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            claims.AddIdentity(new ClaimsIdentity(new List<Claim>() { new Claim("UserId", userId.ToString()) }));
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.GetGiftAsync(CancellationToken.None);

            Assert.NotNull(result);
        }

        [Theory]
        [AutoData]
        public async Task CreateGift_WithValidUserId_ReturnsGift(CreateGiftDto dto)
        {
            string userId = "1";
            
            var mockGift = new Gift()
            {
                Name = dto.Name,
                UserId = userId
            };

            _repository.Setup(x => x.CreateGiftAsync(It.IsAny<Gift>(), CancellationToken.None))
                .ReturnsAsync(mockGift);

            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            claims.AddIdentity(new ClaimsIdentity(new List<Claim>() { new Claim("UserId", userId.ToString()) }));
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.CreateSharingGift(dto, CancellationToken.None);

            Assert.NotNull(result.Value);
            Assert.Equal(userId, result.Value.UserId);
            Assert.Equal(dto.Name, result.Value.Name);
        }

        [Theory]
        [AutoData]
        public async Task UpdateGift_WithValidUserId_ReturnsGift(UpdateGiftDto dto)
        {
            string userId = "1";

            var mockGift = new Gift()
            {
                Name = dto.Name,
                UserId = userId
            };

            _repository.Setup(x => x.UpdateGiftAsync(It.IsAny<Gift>(), CancellationToken.None))
                .ReturnsAsync(mockGift);

            _repository.Setup(x => x.GetGiftByUserIdAsync(It.IsAny<string>(), It.IsAny<string>(), CancellationToken.None))
                .ReturnsAsync(mockGift);

            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            claims.AddIdentity(new ClaimsIdentity(new List<Claim>() { new Claim("UserId", userId.ToString()) }));
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.UpdateGiftAsync(dto, CancellationToken.None);

            Assert.NotNull(result.Value);
            Assert.Equal(userId, result.Value.UserId);
            Assert.Equal(dto.Name, result.Value.Name);
        }

        [Theory]
        [AutoData]
        public async Task UpdateGift_WithInvalidGiftId_ReturnsNotFound(UpdateGiftDto dto)
        {
            string userId = "1";

            var controller = new GiftController(_repository.Object);
            
            _repository.Setup(x => x.GetGiftByUserIdAsync(It.IsAny<string>(), It.IsAny<string>(), CancellationToken.None))
                .ReturnsAsync(() => null);
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            claims.AddIdentity(new ClaimsIdentity(new List<Claim>() { new Claim("UserId", userId.ToString()) }));
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.UpdateGiftAsync(dto, CancellationToken.None);
            
            Assert.IsType<NotFoundResult>(result.Result);
        }
        
        [Theory]
        [AutoData]
        public async Task RemoveGift_WithValidUserId_ReturnsGift(Gift dto)
        {
            string userId = "1";
            
            var mockGift = new Gift()
            {
                Name = dto.Name,
                UserId = userId
            };
            _repository.Setup(x => x.DeleteGiftAsync(It.IsAny<string>(), CancellationToken.None));
            
            _repository.Setup(x => x.GetGiftByUserIdAsync(It.IsAny<string>(), It.IsAny<string>(), CancellationToken.None))
                .ReturnsAsync(mockGift);
            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            claims.AddIdentity(new ClaimsIdentity(new List<Claim>() { new Claim("UserId", userId.ToString()) }));
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.RemoveGiftAsync(dto, CancellationToken.None);

            Assert.NotNull(result.Value);
            Assert.Equal(userId, result.Value.UserId);
            Assert.Equal(dto.Name, result.Value.Name);
        }

        [Theory]
        [AutoData]
        public async Task RemoveGift_WithInvalidGiftId_ReturnsNotFound(Gift dto)
        {
            string userId = "1";
            
            var controller = new GiftController(_repository.Object);
            
            _repository.Setup(x => x.GetGiftByUserIdAsync(It.IsAny<string>(), It.IsAny<string>(), CancellationToken.None))
                .ReturnsAsync(() => null);
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            claims.AddIdentity(new ClaimsIdentity(new List<Claim>() { new Claim("UserId", userId.ToString()) }));
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.RemoveGiftAsync(dto, CancellationToken.None);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetGift_WithNoUserClaims_ReturnsUnauthorized()
        {
            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.GetGiftAsync(CancellationToken.None);

            Assert.IsType<UnauthorizedResult>(result.Result);
        }

        [Fact]
        public async Task CreateGift_WithNoUserClaims_ReturnsUnauthorized()
        {
            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.CreateSharingGift(It.IsAny<CreateGiftDto>(), CancellationToken.None);

            Assert.IsType<UnauthorizedResult>(result.Result);
        }

        [Fact]
        public async Task UpdateGift_WithNoUserClaims_ReturnsUnauthorized()
        {
            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.UpdateGiftAsync(It.IsAny<UpdateGiftDto>(), CancellationToken.None);

            Assert.IsType<UnauthorizedResult>(result.Result);
        }

        [Fact]
        public async Task RemoveGift_WithNoUserClaims_ReturnsUnauthorized()
        {
            var controller = new GiftController(_repository.Object);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            var claims = new ClaimsPrincipal() { };
            controller.ControllerContext.HttpContext.User = claims;

            var result = await controller.UpdateGiftAsync(It.IsAny<UpdateGiftDto>(), CancellationToken.None);

            Assert.IsType<UnauthorizedResult>(result.Result);
        }
    }
}
