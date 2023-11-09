using System;
using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;
using NHibernate.Type;

namespace ReactLeaning.Api.Domain
{ 
    public class User
    {
        public virtual long Id { get; set; }
        public virtual string Username { get; set; }
        public virtual string Name { get; set; } 
        public virtual string PhoneNo { get; set; }
        public virtual string Password { get; set; }
        public virtual bool IsActive { get; set; } 
        public virtual DateTime CreateDate { get; set; } 
    }

    public class UserClassMapping : ClassMapping<User>
    {
        public UserClassMapping()
        {
            Table("Users");
            Id(x => x.Id, map =>
            {
                map.Generator(Generators.Identity);
                map.Column("Id");
            });
             
            Property(x => x.Username);
            Property(x => x.Name); 
            Property(x => x.PhoneNo); 
            Property(x => x.Password);
            Property(x => x.IsActive); 
            Property(x => x.CreateDate);
              
        }
    }
}