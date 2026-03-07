using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace mediaexpert_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class ApiController : ControllerBase
{
    protected readonly IMediator Mediator;
    protected ApiController(IMediator mediator) => Mediator = mediator;
}


