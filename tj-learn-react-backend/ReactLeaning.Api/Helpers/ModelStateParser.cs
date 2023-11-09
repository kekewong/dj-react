using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ReactLeaning.Api.Helpers
{
    public static class ModelStateParser
    {
        public static IEnumerable<ModelStateErrorKeyPair> ToErrorDictionary(this ModelStateDictionary modelState)
        {
            var errors = new List<ModelStateErrorKeyPair>();

            var modelKeys = modelState.Keys.ToList();

            foreach (var key in modelKeys)
            {
                var val = modelState[key];

                if (val.Errors.Any())
                {
                    var existingProperty = errors.SingleOrDefault(x => x.Property == key);
                    if (existingProperty == null)
                    {
                        errors.Add(new ModelStateErrorKeyPair
                        {
                            Property = key,
                            ErrorMessages = val.Errors.Select(x => x.ErrorMessage).ToList()
                        });
                    }
                    else
                    {
                        existingProperty.ErrorMessages.AddRange(val.Errors.Select(x => x.ErrorMessage).ToList());
                    }
                }
            }

            return errors;
        }
    }

    public class ModelStateErrorKeyPair
    {
        public string Property { get; set; }
        public List<string> ErrorMessages { get; set; }
    }
}