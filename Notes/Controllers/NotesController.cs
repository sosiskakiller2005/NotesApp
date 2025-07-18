 using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.Contracts;
using Notes.DataAccess;
using Notes.Models;
using System.Linq.Expressions;

namespace Notes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _dbContext;
        public NotesController(NotesDbContext DbContext) 
        {
            _dbContext = DbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNoteRequest request)
        {
            var note = new Note(request.Title, request.Description);
            await _dbContext.Notes.AddAsync(note);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]GetNotesRequest request)
        {
            var notesQuery = _dbContext.Notes.Where(n => string.IsNullOrWhiteSpace(request.Search) || n.Title.ToLower().Contains(request.Search.ToLower()));

            Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                _ => note => note.Id
            };
            notesQuery = request.SortOrder == "desc" 
                ? notesQuery.OrderByDescending(selectorKey) 
                : notesQuery.OrderBy(selectorKey);

            var noteDtos = await notesQuery.Select(n => new NotesDto(n.Id, n.Title, n.Description, n.CreatedAt)).ToListAsync();

            return Ok(new GetNotesResponse(noteDtos));
        }
    }
}
