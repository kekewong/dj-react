using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ReactLeaning.Api.Helpers;

namespace ReactLeaning.Api.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AccessRightAttribute : ActionFilterAttribute, IAuthorizationFilter
    {
        private string _menu;
        
        public AccessRightAttribute(string menu)
        {
            _menu = menu;
        }
        
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var accessClaimValue = context.HttpContext.User.GetClaimValue("AccessRight");
            var accessRights = accessClaimValue.Split(",");
            if (!accessRights.Contains(_menu))
            {
                context.Result = new ForbidResult();
            }
;        }
    }
}