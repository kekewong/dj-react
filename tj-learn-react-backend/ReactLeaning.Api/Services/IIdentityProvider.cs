using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ReactLeaning.Api.Domain;
using ReactLeaning.Api.Helpers;

namespace ReactLeaning.Api.Services
{
    public interface IIdentityProvider
    {
        long UserId { get; }
        string Username { get; }  
    }

    public class IdentityProvider : IIdentityProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IdentityProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public long UserId => long.Parse( _httpContextAccessor.HttpContext.User.GetClaimValue(ClaimTypes.NameIdentifier));
        public string Username => _httpContextAccessor.HttpContext.User.GetClaimValue(ClaimTypes.Name);
         public long? MerchantId
        {
            get
            {
                var claimValue = _httpContextAccessor.HttpContext.User.GetClaimValue(ClaimTypes.GroupSid);
                if (claimValue == null) return null;
                return long.Parse(claimValue);
            }
        }

         
 

        public string AccessRight 
        {
            get
            {
                var claimValue = _httpContextAccessor.HttpContext.User.GetClaimValue("AccessRight");
                if (claimValue == null) return null;
                return claimValue;
            }
        }
    }
}