using System;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;
using NHibernate;
using ReactLeaning.Api.Constants;
using ReactLeaning.Api.Domain;
using ReactLeaning.Api.Helpers;
using ReactLeaning.Api.Modules;
using ReactLeaning.Api.Resources;

namespace ReactLeaning.Api.Handlers.Users
{
    public class CreateUserRequest : IRequest<CreateUserResponse>
    {
        public string PhoneNo { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }

    public class CreateUserResponse
    {
        public long Id { get; set; } 
    }
 

    public class CreateUserHandler : IRequestHandler<CreateUserRequest, CreateUserResponse>
    {
        private readonly ISession _session; 
        private readonly IAppSettingProvider _appSettingProvider; 
        private readonly IStringLocalizer _localizer;

        public CreateUserHandler(ISession session, IAppSettingProvider appSettingProvider)
        {
            _session = session; 
            _appSettingProvider = appSettingProvider; 
        }

        public async Task<CreateUserResponse> Handle(CreateUserRequest request,
            CancellationToken cancellationToken)
        {
            var random = new Random();

            var user = new User
            {
                Username = request.Username,
                Name = request.Name,
                PhoneNo = request.PhoneNo,
                Password = HashingExtension.Hash256(request.Password, _appSettingProvider.PasswordSalt),
                CreateDate = DateTime.Now,
                IsActive = true, 
            };

            await _session.SaveAsync(user, cancellationToken);

              var response = new CreateUserResponse
              {
                Id = user.Id 
            };

            return response;
        }
    }
}