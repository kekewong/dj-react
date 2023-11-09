using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using NHibernate;
using ReactLeaning.Api.Handlers.Users;

namespace ReactLeaning.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ISession _session;
 
        public UserController(IMediator mediator, ISession session)
        {
            _mediator = mediator;
            _session = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromBody] QueryUsersRequest request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateUserRequest request)
        {
            var session = _session;
            using (var transaction = session.BeginTransaction())
            {
                var result = await _mediator.Send(request);
                await transaction.CommitAsync();
                return Ok(result);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateUserRequest request)
        {
            var session = _session;
            using (var transaction = session.BeginTransaction())
            {
                var result = await _mediator.Send(request);
                await transaction.CommitAsync();
                return Ok(result);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteUserRequest request)
        {
            var session = _session;
            using (var transaction = session.BeginTransaction())
            {
                var result = await _mediator.Send(request);
                await transaction.CommitAsync();
                return Ok(result);
            }
        }
    }
}