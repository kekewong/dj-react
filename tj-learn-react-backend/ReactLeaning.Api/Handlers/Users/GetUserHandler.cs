using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Localization;
using NHibernate;
using ReactLeaning.Api.Domain;
using ReactLeaning.Api.Resources;
using ReactLeaning.Api.Services; 

namespace ReactLeaning.Api.Handlers.Users
{
    
    public class GetUserRequest : IRequest<GetUserResponse>
    {
        public long UserId { get; set; }
    }

    public class GetUserResponse
    {
        public long UserId { get; set; } 
        public string Name { get; set; }
        public string Username { get; set; }
        public string PhoneNo { get; set; } 
        public bool IsActive { get; set; }
        public DateTime CreateDate { get; set; }
    }

    public class GetUserValidator : AbstractValidator<GetUserRequest>
    {
        private readonly ISession _session;
        private readonly IIdentityProvider _identityProvider;

        public GetUserValidator(ISession session, IStringLocalizer<SharedResources> localizer,
            IIdentityProvider identityProvider)
        {
            _session = session;
            _identityProvider = identityProvider; 
        }
        
    }
    
    public class GetUserHandler :  IRequestHandler<GetUserRequest,GetUserResponse>
    {
        private readonly ISession _session;

        public GetUserHandler(ISession session)
        {
            _session = session;
        }


        public Task<GetUserResponse> Handle(GetUserRequest request, CancellationToken cancellationToken)
        {
            var user = _session.Load<User>(request.UserId);
            
            var response = new GetUserResponse
            {
                UserId = user.Id,
                Name = user.Name,
                Username = user.Username,
                PhoneNo = user.PhoneNo ,
                CreateDate = user.CreateDate,
                IsActive = user.IsActive
            };
 

            return Task.FromResult(response);
        }
    }
}