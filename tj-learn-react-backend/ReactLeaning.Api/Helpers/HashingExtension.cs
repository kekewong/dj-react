using System.Security.Cryptography;
using System.Text;

namespace ReactLeaning.Api.Helpers
{
    public static class HashingExtension
    {
        public static string Hash256(string input, string salt)
        {
            using (var sha256Hash = SHA256.Create())
            {
                var bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(input + salt));

                var builder = new StringBuilder();
                for (var i = 0; i < bytes.Length; i++) builder.Append(bytes[i].ToString("x2"));
                return builder.ToString();
            }
        }
    }
}