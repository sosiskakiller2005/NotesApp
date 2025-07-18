using Microsoft.EntityFrameworkCore;
using Notes.Models;

namespace Notes.DataAccess
{
    public class NotesDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public NotesDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Note> Notes => Set<Note>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("Database");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
