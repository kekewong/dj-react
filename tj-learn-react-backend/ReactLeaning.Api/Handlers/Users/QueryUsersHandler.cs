using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using NHibernate;
using NHibernate.Criterion;
using ReactLeaning.Api.Domain;

namespace ReactLeaning.Api.Handlers.Users
{
    
    public class QueryUsersRequest : IRequest<IEnumerable<QueryUsersResponse>>
    {
         public string Username { get; set; }
    }

    public class QueryUsersResponse
    {
        public long Id { get; set; } 
        public string Name { get; set; }
        public string Username { get; set; }
        public string PhoneNo { get; set; } 
        public bool IsActive { get; set; } 
        public DateTime CreateDate { get; set; } 
    }
      
    public class QueryUsersHandler :  IRequestHandler<QueryUsersRequest, IEnumerable<QueryUsersResponse>>
    {
        private readonly ISession _session;

        public QueryUsersHandler(ISession session)
        {
            _session = session;
        }


        public Task<IEnumerable<QueryUsersResponse>> Handle(QueryUsersRequest request, CancellationToken cancellationToken)
        {
            var usersQuery = _session.Query<User>();

            if (!string.IsNullOrEmpty(request.Username))
            {
                usersQuery = usersQuery.Where(x => x.Username.IsLike(request.Username, MatchMode.Anywhere));
            }

            var users = usersQuery.ToList();

            var response = users.Select(x => new QueryUsersResponse
            {
                Name = x.Name,
                Id = x.Id,
                PhoneNo = x.PhoneNo,
                Username = x.Username,
                CreateDate = x.CreateDate
            });
 

            return Task.FromResult(response);
        }
    }
}