using System.Collections.Generic;
using System.Globalization;
using System.IO.Compression;
using System.Reflection;
using System.Text;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using ReactLeaning.Api.Helpers;
using ReactLeaning.Api.Modules;
using ReactLeaning.Api.Services;

namespace ReactLeaning.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            HostingEnvironment = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment HostingEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLocalization();

            services.AddHealthChecks();
            services.AddHttpContextAccessor();
            services.Configure<GzipCompressionProviderOptions>(options =>
                options.Level = CompressionLevel.Optimal);
            services.AddResponseCompression();
            services.AddMemoryCache();
            services.AddNHibernate(Configuration.GetSection("ConnectionStrings:DefaultConnection").Value);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                });

            var clientUrl = Configuration.GetSection("AppSettings:ClientUrl").Value;
            var merchantUrl = Configuration.GetSection("AppSettings:MerchantUrl").Value;
            var adminUrl = Configuration.GetSection("AppSettings:AdminUrl").Value;

            services.AddCors(options =>
            {
                options.AddPolicy("ClientAccess",
                    builder =>
                    {
                        builder.WithOrigins(clientUrl, adminUrl, merchantUrl)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

            var appSettingProvider = new AppSettingProvider(Configuration);
            services.AddSingleton<IAppSettingProvider>(appSettingProvider); 
            services.AddScoped<IIdentityProvider, IdentityProvider>(); 

            services.AddMediatR(typeof(Startup).GetTypeInfo().Assembly);
            
            
            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new List<CultureInfo>
                {
                    new ("en-US"),
                    new ("zh"),
                    new ("ms-MY"),
                };

                options.DefaultRequestCulture = new RequestCulture("en-US");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
            });

            services.AddControllers()
                .AddNewtonsoftJson(options => { options.SerializerSettings.Converters.Add(new StringEnumConverter()); })
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
            
            services.AddMvc().ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = c => new BadRequestObjectResult(c.ModelState.ToErrorDictionary());
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment()) 
                app.UseDeveloperExceptionPage();

            app.UseDeveloperExceptionPage();
            app.UseStaticFiles();
            app.UseResponseCompression();
            
            var supportedCultures = new[]
            {
                new CultureInfo("en-US"),
                new CultureInfo("zh"),
                new CultureInfo("ms-MY"),
            };
            
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en-US"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures,
                RequestCultureProviders = new List<IRequestCultureProvider>
                {
                    new AcceptLanguageHeaderRequestCultureProvider()
                }
            });

            //app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors("ClientAccess");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}