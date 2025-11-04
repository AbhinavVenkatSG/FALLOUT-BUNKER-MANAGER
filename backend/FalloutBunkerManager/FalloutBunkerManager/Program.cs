// Program.cs  (.NET 8)
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Dev CORS – wide open for local testing
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

// Shared state
var seq = 0;
var random = new Random();
var deltas = new[] { -10, -7, -5, -3, 0, 3, 5, 7, 10 };

Status current = new(seq, 0, DateTime.UtcNow);

app.MapGet("/", () => "Bunker Health Service (OK)");
app.MapGet("/status", () => Results.Json(current, new JsonSerializerOptions {
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    Converters = { new JsonStringEnumConverter() }
}));

// Optional: manual override (POST {"healthDelta": 5})
app.MapPost("/status", async (HttpContext ctx) =>
{
    var body = await JsonSerializer.DeserializeAsync<ManualDelta>(ctx.Request.Body);
    if (body is null) return Results.BadRequest();
    seq++;
    current = new Status(seq, body.HealthDelta, DateTime.UtcNow);
    return Results.Json(current, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
});

// Background loop: update every 5s
_ = Task.Run(async () =>
{
    var timer = new PeriodicTimer(TimeSpan.FromSeconds(5));
    while (await timer.WaitForNextTickAsync())
    {
        seq++;
        var delta = deltas[random.Next(deltas.Length)];
        current = new Status(seq, delta, DateTime.UtcNow);
        Console.WriteLine($"[seq={seq}] healthDelta={delta} issuedAt={current.IssuedAt:o}");
    }
});

app.Run("http://0.0.0.0:5080");  // listens on port 5080

record Status(int Seq, int HealthDelta, DateTime IssuedAt);
record ManualDelta(int HealthDelta);