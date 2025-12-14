
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Data
{
    
    public class StudentsDbContext : IdentityDbContext<ApplicationUser>
    {
        public StudentsDbContext(DbContextOptions<StudentsDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}