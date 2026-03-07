using FluentValidation;
using System.Net;
using System.Text.Json;

namespace mediaexpert_api.Infrastructure.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var status = HttpStatusCode.InternalServerError;
            string message;

            if (exception is ValidationException validationException)
            {
                status = HttpStatusCode.BadRequest;
                var firstError = validationException.Errors.FirstOrDefault();
                message = firstError?.CustomState as string ?? firstError?.ErrorMessage ?? "Validation failed";
            }
            else if (exception is InvalidOperationException)
            {
                status = HttpStatusCode.BadRequest;
                message = exception.Message;
            }
            else
            {
                _logger.LogError(exception, "An unhandled exception occurred");
                message = "An internal server error occurred.";
            }

            context.Response.StatusCode = (int)status;
            var result = JsonSerializer.Serialize(new { message });
            return context.Response.WriteAsync(result);
        }
    }
}
