using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;

namespace StudentApi.Controllers
{
    [Authorize] 
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentsDbContext _ctx;

        public StudentsController(StudentsDbContext ctx)
        {
            _ctx = ctx;
        }

      
        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _ctx.Students.ToListAsync();
            return Ok(students);
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            _ctx.Students.Add(student);
            await _ctx.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, student); // Return 201 Created
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student updated)
        {
            if (id != updated.Id) return BadRequest("ID mismatch");

            var existing = await _ctx.Students.FindAsync(id);
            if (existing is null) return NotFound();

            existing.Name = updated.Name;
            existing.Class = updated.Class;
            existing.Section = updated.Section;

            await _ctx.SaveChangesAsync();
            return Ok(existing);
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _ctx.Students.FindAsync(id);
            if (student is null) return NotFound();

            _ctx.Students.Remove(student);
            await _ctx.SaveChangesAsync();
            return Ok(); // Return 200 OK (or 204 No Content)
        }
    }
}