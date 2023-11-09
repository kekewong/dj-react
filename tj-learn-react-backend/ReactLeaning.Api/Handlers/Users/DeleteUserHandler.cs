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
    public class DeleteUserRequest : IRequest<DeleteUserResponse>
    {
        public long Id { get; set; }
    }

    public class DeleteUserResponse
    {
        public bool Success { get; set; }
    }
 

    public class DeleteUserHandler : IRequestHandler<DeleteUserRequest, DeleteUserResponse>
    {
        private readonly IIdentityProvider _identityProvider;
        private readonly ISession _session;

        public DeleteUserHandler(ISession session, IIdentityProvider identityProvider)
        {
            _session = session;
            _identityProvider = identityProvider;
        }

        public async Task<DeleteUserResponse> Handle(DeleteUserRequest request, CancellationToken cancellationToken)
        {
            var user = _session.Get<User>(request.Id); 
            await _session.DeleteAsync(user, cancellationToken);
            await _session.FlushAsync(cancellationToken);
            return new DeleteUserResponse
            {
                Success = true
            };
        }
    }
}