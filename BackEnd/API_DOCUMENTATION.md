# 🔌 Backend API Documentation

Complete REST API reference for the Pokémon Web App backend.

---

## 📖 Table of Contents

1. [Base URL & Authentication](#base-url--authentication)
2. [Pokémon Endpoints](#pokémon-endpoints)
3. [Team Endpoints](#team-endpoints)
4. [Health Check](#health-check)
5. [Error Handling](#error-handling)
6. [Request/Response Examples](#requestresponse-examples)
7. [Rate Limiting](#rate-limiting)
8. [CORS Configuration](#cors-configuration)

---

## Base URL & Authentication

### Base URL
```
http://localhost:3000/api
```

### Environment-Specific URLs

**Development**
```
http://localhost:3000/api
```

**Production (Example)**
```
https://api.pokemon-app.com/api
```

### Authentication

#### Public Endpoints (No auth required)
- `GET /api/pokemon` - List Pokémon
- `GET /api/pokemon/:id` - Get Pokémon details
- `GET /health` - Health check

#### Protected Endpoints (Bearer Token Required)
- `POST /api/team` - Create team
- `GET /api/team` - List teams
- `GET /api/team/:id` - Get team
- `POST /api/team/:teamId/pokemon` - Add Pokémon to team
- `DELETE /api/team/:teamId/pokemon/:pokemonTeamId` - Remove Pokémon
- `DELETE /api/team/:id` - Delete team

#### Bearer Token Format
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Default Token (Development)**
```
Authorization: Bearer SECRET123
```

**Change Token**
```env
# .env file
TEAM_API_TOKEN=your_custom_token
```

---

## Pokémon Endpoints

### GET /api/pokemon

List all Pokémon with optional search and pagination.

**Method**: `GET`

**Endpoint**: `/api/pokemon`

**Authentication**: Not required

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | - | Search by name or number |
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 20 | Items per page |

**Examples**:

```bash
# Get all Pokémon (first page)
GET /api/pokemon

# Search by name
GET /api/pokemon?q=charizard

# Search by number
GET /api/pokemon?q=6

# Pagination
GET /api/pokemon?page=2&limit=10

# Search with pagination
GET /api/pokemon?q=fire&page=1&limit=5
```

**Response**: `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "pokeapi_id": 6,
      "name": "Charizard",
      "height": 17,
      "weight": 905,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      "types": ["Fire", "Flying"]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "totalPages": 1
}
```

**cURL Example**:

```bash
curl -X GET "http://localhost:3000/api/pokemon?q=charizard" \
  -H "Content-Type: application/json"
```

**JavaScript/Axios Example**:

```javascript
import axios from 'axios'

const response = await axios.get('http://localhost:3000/api/pokemon', {
  params: {
    q: 'charizard',
    page: 1,
    limit: 20
  }
})

console.log(response.data)
```

---

### GET /api/pokemon/:id

Get detailed information about a specific Pokémon.

**Method**: `GET`

**Endpoint**: `/api/pokemon/:id`

**Authentication**: Not required

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Pokémon ID (1-151) |

**Examples**:

```bash
# Get Charizard details
GET /api/pokemon/6

# Get Bulbasaur details
GET /api/pokemon/1

# Get Mewtwo details
GET /api/pokemon/150
```

**Response**: `200 OK`

```json
{
  "id": 1,
  "pokeapi_id": 6,
  "name": "Charizard",
  "height": 17,
  "weight": 905,
  "description": "Known as the Flame Pokémon. When expelling a blast of superhot fire, the red flame on its tail is said to burn brighter.",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  "types": [
    "Fire",
    "Flying"
  ],
  "stats": {
    "hp": 78,
    "attack": 84,
    "defense": 78,
    "sp_attack": 109,
    "sp_defense": 85,
    "speed": 100
  },
  "abilities": [
    "Blaze",
    "Solar Power"
  ],
  "moves": [
    "Scratch",
    "Growl",
    "Dragon Rage",
    "Ember"
  ]
}
```

**Error Response**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Pokémon not found",
  "error": "Not Found"
}
```

**cURL Example**:

```bash
curl -X GET "http://localhost:3000/api/pokemon/6" \
  -H "Content-Type: application/json"
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.get('http://localhost:3000/api/pokemon/6')
const pokemon = response.data
console.log(`${pokemon.name} - HP: ${pokemon.stats.hp}`)
```

---

## Team Endpoints

All team endpoints require Bearer token authentication.

### POST /api/team

Create a new Pokémon team.

**Method**: `POST`

**Endpoint**: `/api/team`

**Authentication**: Required (Bearer Token)

**Request Body**:

```json
{
  "name": "My Awesome Team",
  "description": "My competitive team"
}
```

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Team name (max 255 chars) |
| `description` | string | No | Team description |

**Response**: `201 Created`

```json
{
  "id": 1,
  "name": "My Awesome Team",
  "description": "My competitive team",
  "pokemon": [],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Error Response**: `401 Unauthorized`

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**cURL Example**:

```bash
curl -X POST "http://localhost:3000/api/team" \
  -H "Authorization: Bearer SECRET123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Awesome Team",
    "description": "My competitive team"
  }'
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.post(
  'http://localhost:3000/api/team',
  {
    name: 'My Awesome Team',
    description: 'My competitive team'
  },
  {
    headers: {
      'Authorization': 'Bearer SECRET123'
    }
  }
)

console.log('Team created:', response.data)
```

---

### GET /api/team

List all teams.

**Method**: `GET`

**Endpoint**: `/api/team`

**Authentication**: Required (Bearer Token)

**Query Parameters**: None

**Response**: `200 OK`

```json
[
  {
    "id": 1,
    "name": "My Awesome Team",
    "description": "My competitive team",
    "pokemon": [
      {
        "id": 1,
        "pokemon_id": 6,
        "slot": 1
      },
      {
        "id": 2,
        "pokemon_id": 25,
        "slot": 2
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z"
  }
]
```

**cURL Example**:

```bash
curl -X GET "http://localhost:3000/api/team" \
  -H "Authorization: Bearer SECRET123"
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.get(
  'http://localhost:3000/api/team',
  {
    headers: {
      'Authorization': 'Bearer SECRET123'
    }
  }
)

console.log('Teams:', response.data)
```

---

### GET /api/team/:id

Get details of a specific team.

**Method**: `GET`

**Endpoint**: `/api/team/:id`

**Authentication**: Required (Bearer Token)

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Team ID |

**Response**: `200 OK`

```json
{
  "id": 1,
  "name": "My Awesome Team",
  "description": "My competitive team",
  "pokemon": [
    {
      "id": 1,
      "pokemon_id": 6,
      "pokemon": {
        "id": 1,
        "name": "Charizard",
        "types": ["Fire", "Flying"],
        "image": "https://..."
      },
      "slot": 1
    },
    {
      "id": 2,
      "pokemon_id": 25,
      "pokemon": {
        "id": 2,
        "name": "Pikachu",
        "types": ["Electric"],
        "image": "https://..."
      },
      "slot": 2
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:35:00Z"
}
```

**Error Response**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Team not found",
  "error": "Not Found"
}
```

**cURL Example**:

```bash
curl -X GET "http://localhost:3000/api/team/1" \
  -H "Authorization: Bearer SECRET123"
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.get(
  'http://localhost:3000/api/team/1',
  {
    headers: {
      'Authorization': 'Bearer SECRET123'
    }
  }
)

console.log('Team details:', response.data)
```

---

### POST /api/team/:teamId/pokemon

Add a Pokémon to a team (max 6 per team).

**Method**: `POST`

**Endpoint**: `/api/team/:teamId/pokemon`

**Authentication**: Required (Bearer Token)

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `teamId` | number | Team ID |

**Request Body**:

```json
{
  "pokemon_id": 6,
  "slot": 1
}
```

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pokemon_id` | number | Yes | Pokémon ID (1-151) |
| `slot` | number | Yes | Team slot (1-6) |

**Response**: `201 Created`

```json
{
  "id": 1,
  "name": "My Awesome Team",
  "pokemon": [
    {
      "id": 1,
      "pokemon_id": 6,
      "pokemon": {
        "name": "Charizard",
        "types": ["Fire", "Flying"]
      },
      "slot": 1
    }
  ]
}
```

**Error Responses**:

**400 Bad Request** - Team is full (max 6 Pokémon)
```json
{
  "statusCode": 400,
  "message": "Team is full",
  "error": "Bad Request"
}
```

**400 Bad Request** - Slot already occupied
```json
{
  "statusCode": 400,
  "message": "Slot 1 is already occupied",
  "error": "Bad Request"
}
```

**404 Not Found** - Pokémon not found
```json
{
  "statusCode": 404,
  "message": "Pokémon not found",
  "error": "Not Found"
}
```

**cURL Example**:

```bash
curl -X POST "http://localhost:3000/api/team/1/pokemon" \
  -H "Authorization: Bearer SECRET123" \
  -H "Content-Type: application/json" \
  -d '{
    "pokemon_id": 6,
    "slot": 1
  }'
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.post(
  'http://localhost:3000/api/team/1/pokemon',
  {
    pokemon_id: 6,
    slot: 1
  },
  {
    headers: {
      'Authorization': 'Bearer SECRET123'
    }
  }
)

console.log('Pokémon added to team:', response.data)
```

---

### DELETE /api/team/:teamId/pokemon/:pokemonTeamId

Remove a Pokémon from a team.

**Method**: `DELETE`

**Endpoint**: `/api/team/:teamId/pokemon/:pokemonTeamId`

**Authentication**: Required (Bearer Token)

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `teamId` | number | Team ID |
| `pokemonTeamId` | number | TeamPokémon association ID |

**Response**: `200 OK`

```json
{
  "id": 1,
  "name": "My Awesome Team",
  "pokemon": []
}
```

**Error Response**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Team or Pokémon not found",
  "error": "Not Found"
}
```

**cURL Example**:

```bash
curl -X DELETE "http://localhost:3000/api/team/1/pokemon/1" \
  -H "Authorization: Bearer SECRET123"
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.delete(
  'http://localhost:3000/api/team/1/pokemon/1',
  {
    headers: {
      'Authorization': 'Bearer SECRET123'
    }
  }
)

console.log('Pokémon removed from team:', response.data)
```

---

### DELETE /api/team/:id

Delete an entire team.

**Method**: `DELETE`

**Endpoint**: `/api/team/:id`

**Authentication**: Required (Bearer Token)

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Team ID |

**Response**: `200 OK`

```json
{
  "message": "Team deleted successfully"
}
```

**Error Response**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Team not found",
  "error": "Not Found"
}
```

**cURL Example**:

```bash
curl -X DELETE "http://localhost:3000/api/team/1" \
  -H "Authorization: Bearer SECRET123"
```

**JavaScript/Axios Example**:

```javascript
const response = await axios.delete(
  'http://localhost:3000/api/team/1',
  {
    headers: {
      'Authorization': 'Bearer SECRET123'
    }
  }
)

console.log('Team deleted:', response.data)
```

---

## Health Check

### GET /health

Check if the backend API is running.

**Method**: `GET`

**Endpoint**: `/health`

**Authentication**: Not required

**Response**: `200 OK`

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600
}
```

**cURL Example**:

```bash
curl -X GET "http://localhost:3000/health"
```

---

## Error Handling

### Standard Error Response Format

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Error Type"
}
```

### HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid parameters, validation failed |
| `401` | Unauthorized | Missing/invalid token |
| `403` | Forbidden | Access denied |
| `404` | Not Found | Resource doesn't exist |
| `500` | Server Error | Unexpected server error |
| `503` | Service Unavailable | Server temporarily down |

### Common Error Scenarios

**Missing Authorization Header**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**Invalid Token**
```json
{
  "statusCode": 401,
  "message": "Invalid token",
  "error": "Unauthorized"
}
```

**Invalid JSON Body**
```json
{
  "statusCode": 400,
  "message": "Invalid JSON",
  "error": "Bad Request"
}
```

**Missing Required Fields**
```json
{
  "statusCode": 400,
  "message": "Validation failed: name is required",
  "error": "Bad Request"
}
```

---

## Request/Response Examples

### Complete Workflow Example

**1. Create a Team**
```bash
curl -X POST "http://localhost:3000/api/team" \
  -H "Authorization: Bearer SECRET123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Elite Team",
    "description": "Championship team"
  }'
```

Response:
```json
{
  "id": 1,
  "name": "Elite Team",
  "description": "Championship team",
  "pokemon": [],
  "created_at": "2024-01-15T10:30:00Z"
}
```

**2. Get All Pokémon**
```bash
curl -X GET "http://localhost:3000/api/pokemon?limit=5"
```

Response:
```json
{
  "data": [
    {"id": 1, "pokeapi_id": 1, "name": "Bulbasaur", "types": ["Grass", "Poison"]},
    {"id": 2, "pokeapi_id": 2, "name": "Ivysaur", "types": ["Grass", "Poison"]},
    {"id": 3, "pokeapi_id": 3, "name": "Venusaur", "types": ["Grass", "Poison"]},
    {"id": 4, "pokeapi_id": 4, "name": "Charmander", "types": ["Fire"]},
    {"id": 5, "pokeapi_id": 5, "name": "Charmeleon", "types": ["Fire"]}
  ],
  "total": 151,
  "page": 1,
  "limit": 5
}
```

**3. Add Pokémon to Team**
```bash
curl -X POST "http://localhost:3000/api/team/1/pokemon" \
  -H "Authorization: Bearer SECRET123" \
  -H "Content-Type: application/json" \
  -d '{
    "pokemon_id": 6,
    "slot": 1
  }'
```

Response:
```json
{
  "id": 1,
  "name": "Elite Team",
  "pokemon": [
    {
      "id": 1,
      "pokemon_id": 6,
      "pokemon": {
        "name": "Charizard",
        "types": ["Fire", "Flying"]
      },
      "slot": 1
    }
  ]
}
```

**4. Get Team Details**
```bash
curl -X GET "http://localhost:3000/api/team/1" \
  -H "Authorization: Bearer SECRET123"
```

Response:
```json
{
  "id": 1,
  "name": "Elite Team",
  "pokemon": [
    {
      "id": 1,
      "pokemon_id": 6,
      "pokemon": {
        "id": 1,
        "pokeapi_id": 6,
        "name": "Charizard",
        "types": ["Fire", "Flying"],
        "image": "https://..."
      },
      "slot": 1
    }
  ]
}
```

---

## Rate Limiting

Currently no rate limiting is implemented, but consider adding for production:

### Recommended Rate Limits

```
Public Endpoints:     100 requests / minute
Team Endpoints:        50 requests / minute
Authentication:       10 attempts / 5 minutes
```

---

## CORS Configuration

### Allowed Origins (Development)
```
http://localhost:5173
http://localhost:3000
```

### Allowed Methods
```
GET, POST, PUT, DELETE, OPTIONS, PATCH
```

### Allowed Headers
```
Content-Type
Authorization
X-Requested-With
```

### Production Setup
Update CORS configuration for production domain:

```typescript
// In main.ts or app configuration
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})
```

---

## API Versioning

Current API Version: `v1` (implicit)

Future versions would be at:
```
/api/v1/pokemon
/api/v2/pokemon
```

---

## Testing Endpoints

### Using Postman

1. Import these URLs into Postman
2. Set `Bearer Token` in Authorization tab
3. Use `{{base_url}}` variable for `http://localhost:3000`

### Using Thunder Client (VS Code)

Install "Thunder Client" extension and create requests from examples above.

### Using Insomnia

1. Create new workspace
2. Import cURL examples
3. Set token as environment variable

---

## WebSocket Endpoints (Future)

Reserved for real-time features:
```
ws://localhost:3000/ws/team/:teamId
```

---

## Changelog

### v1.0.0 (Current)
- ✅ Pokémon list and detail endpoints
- ✅ Team CRUD operations
- ✅ Bearer token authentication
- ✅ Search and pagination

### Future Features
- Team battle endpoints
- Real-time team updates (WebSocket)
- Advanced filtering by type
- Evolution chain endpoints

---

## Support

For API issues:
1. Check documentation above
2. Review error response details
3. Verify authentication token
4. Check backend logs

**Backend Logs**:
```bash
cd BackEnd
npm run start:dev    # Shows all logs
```

---

**Last Updated**: 2024-01-15  
**Version**: 1.0.0  
**Status**: Production Ready
