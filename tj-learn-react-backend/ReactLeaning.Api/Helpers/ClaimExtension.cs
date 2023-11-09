using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace ReactLeaning.Api.Helpers
{
    public static class ClaimExtension
    {
        public static string GetClaimValue(this IPrincipal currentPrincipal, string key)
        {
            var identity = currentPrincipal.Identity as ClaimsIdentity;

            var claim = identity?.Claims.First(c => c.Type == key);
            return claim?.Value;
        }
    }
}