using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Localization;
using NHibernate;
using ReactLeaning.Api.Domain;
using ReactLeaning.Api.Helpers;
using ReactLeaning.Api.Modules;

namespace ReactLeaning.Api.Handlers.Users
{
    public class UpdateUserRequest : IRequest<UpdateUserResponse>
    {
        public long Id { get; set; }
        public string PhoneNo { get; set; }
        public string Name { get; set; }
        public string Password { get; set; } 
        public bool IsActive { get; set; }
    }

    public class UpdateUserResponse
    {
        public long Id { get; set; }
    }


    public class UpdateUserHandler : IRequestHandler<UpdateUserRequest, UpdateUserResponse>
    {
        private readonly ISession _session;
        private readonly IAppSettingProvider _appSettingProvider;

        public UpdateUserHandler(ISession session, IAppSettingProvider appSettingProvider)
        {
            _session = session;
            _appSettingProvider = appSettingProvider;
        }

        public async Task<UpdateUserResponse> Handle(UpdateUserRequest request,
            CancellationToken cancellationToken)
        {
            var user = _session.Get<User>(request.Id);
            user.Name = request.Name;
            user.PhoneNo = request.PhoneNo;
            user.Password = HashingExtension.Hash256(request.Password, _appSettingProvider.PasswordSalt);
            
            user.IsActive = request.IsActive;


            await _session.UpdateAsync(user, cancellationToken);

            var response = new UpdateUserResponse
            {
                Id = user.Id
            };

            return response;
        }
    }
}