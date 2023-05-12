using Microsoft.AspNetCore.Mvc;

namespace TableService.Middlewares
{
    public class GlobalExceptionHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                var problemDetails = new ProblemDetails
                {
                    Title = "An error occurred",
                    Status = 500,
                    Detail = $"More information about the error: {ex.Message}"
                };

                context.Response.StatusCode = (int)problemDetails.Status;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(problemDetails);
            }
        }
    }
}
