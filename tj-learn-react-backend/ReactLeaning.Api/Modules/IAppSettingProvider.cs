using Microsoft.Extensions.Configuration;

namespace ReactLeaning.Api.Modules
{
    public interface IAppSettingProvider
    {
        public string PasswordSalt { get; }
        public string JwtKey { get; }
        public string JwtIssuer { get; }
        public int RequestOtpIntervalMinutes { get; }
        public string BaseFileStorageUrl { get; }
        
        SmsConfig SmsConfig { get; }
        OssConfig OssConfig { get; }
         
    }

    public class AppSettingProvider : IAppSettingProvider
    {
        public AppSettingProvider(IConfiguration configuration)
        {
            PasswordSalt = configuration["AppSettings:PasswordSalt"];
            JwtKey = configuration["Jwt:Key"];
            JwtIssuer = configuration["Jwt:Issuer"];
            RequestOtpIntervalMinutes = int.Parse(configuration["AppSettings:RequestOtpIntervalMinutes"]);
            SmsConfig = new SmsConfig
            {
                Url = configuration["AppSettings:SmsConfig:Url"],
                Username = configuration["AppSettings:SmsConfig:Username"],
                Password = configuration["AppSettings:SmsConfig:Password"],
                SendFrom = configuration["AppSettings:SmsConfig:SendFrom"]
            };
            
            OssConfig = new OssConfig
            {
                Key = configuration["AppSettings:OssConfig:Key"],
                Secret = configuration["AppSettings:OssConfig:Secret"],
                Endpoint = configuration["AppSettings:OssConfig:Endpoint"],
                Bucket = configuration["AppSettings:OssConfig:Bucket"],
                Url = configuration["AppSettings:OssConfig:Url"]
            };
             
        }

        public string PasswordSalt { get; }
        public string JwtKey { get; }
        public string JwtIssuer { get; }
        public int RequestOtpIntervalMinutes { get; }
        public string BaseFileStorageUrl { get; }
        public SmsConfig SmsConfig { get; }
        public OssConfig OssConfig { get; } 
    }

    public class SmsConfig
    {
        public string Url { get; set; }
        public string SendFrom { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class OssConfig
    {
        public string Key { get; set; }
        public string Secret { get; set; }
        public string Endpoint { get; set; }
        public string Bucket { get; set; }
        public string Url { get; set; }
    }
}