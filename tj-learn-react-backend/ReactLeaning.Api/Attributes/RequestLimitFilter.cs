using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace ReactLeaning.Api.Attributes
{

    public interface IHaveUserId
    {
        long UserId { get; set; }
    }

    public class RequestLimitFilter : ActionFilterAttribute
    {  
        public string Action { get; set; } 

        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            var memoryCache = actionContext.HttpContext.RequestServices.GetService<IMemoryCache>();
             
            var userIdIntf = actionContext.ActionArguments["request"] as IHaveUserId;

            if (userIdIntf == null)
            {
                return;
            }

            var userId = userIdIntf.UserId;

            if (userId != 0)
            { 
                if (string.IsNullOrEmpty(Action))
                {
                    throw new NullReferenceException("Action must be set for request limiter");
                }

                var cacheKey = userId + "_" + Action;

                var cacheKeyTemp = "";
                var existingCache = memoryCache.TryGetValue(cacheKey,out cacheKeyTemp);

                if (!string.IsNullOrEmpty(cacheKeyTemp))
                {
                    actionContext.Result = new ConflictResult();
                }
                else
                {
                    memoryCache.Set(cacheKey, cacheKey,
                        new MemoryCacheEntryOptions()
                            .SetAbsoluteExpiration(TimeSpan.FromSeconds(5))); 
                }
            }
        }
    }
}
