# Vector Search Application

A full-stack vector search application with a FastAPI backend using OpenAI embeddings and pgvector for semantic document search and retrieval.

## Features

### Backend (VectorSearchService)
- **Document Embedding**: Store text documents with OpenAI embeddings
- **Semantic Search**: Find similar documents using vector similarity
- **PostgreSQL + pgvector**: Efficient vector storage and retrieval
- **FastAPI**: Modern, fast web API with automatic documentation
- **Poetry**: Modern Python dependency management

### Frontend (Coming Soon)
- **Modern Web Interface**: React-based frontend for document management
- **Search Interface**: User-friendly search and results display
- **Document Upload**: Easy document upload and management

## Project Structure

```
vector-search/
├── VectorSearchService/     # Backend API service
│   ├── app/
│   │   └── main.py         # FastAPI application
│   ├── pyproject.toml      # Poetry configuration & dependencies
│   ├── poetry.lock         # Locked dependency versions
│   ├── Dockerfile          # Backend container
│   ├── env.example         # Environment variables template
│   └── .env                # Environment variables (create from env.example)
├── FrontEnd/               # Frontend web application (coming soon)
├── docker-compose.yml      # Docker services orchestration
├── LICENSE                 # Project license
└── README.md              # This file
```

## Prerequisites

- Python 3.11+
- Docker and Docker Compose
- OpenAI API key
- Poetry (for backend development)
- Node.js and npm (for frontend development - when implemented)

## Quick Start

### 1. Install Poetry (for backend development)

```bash
# Install Poetry (choose one method)
curl -sSL https://install.python-poetry.org | python3 -
# OR
pipx install poetry
```

### 2. Clone and Setup

```bash
git clone <your-repo-url>
cd vector-search

# Navigate to backend service and install dependencies
cd VectorSearchService
poetry install
```

### 3. Environment Setup

Create a `.env` file in the VectorSearchService directory:

```bash
# From the VectorSearchService directory
cp env.example .env

# Edit .env and replace with your actual OpenAI API key
```

Your `.env` file should look like:
```env
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

**Important**: The `.env` file is automatically ignored by git for security.

### 4. Development Workflow

**Backend Development (VectorSearchService):**

```bash
# Navigate to backend service
cd VectorSearchService

# Activate Poetry's virtual environment
poetry shell

# Start the database
cd ..  # Back to project root
docker-compose up db -d

# Return to backend directory and start the API
cd VectorSearchService
uvicorn app.main:app --reload
```

**Alternative - Using Poetry Run:**
```bash
# From VectorSearchService directory
poetry run uvicorn app.main:app --reload
```

### 5. Using Docker (Full Stack)

```bash
# From project root
docker-compose up --build
```

This will start:
- PostgreSQL database with pgvector extension
- FastAPI backend service
- (Frontend service will be added here in the future)

## Backend API Usage

The API will be available at `http://localhost:8000`

### Interactive Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### API Endpoints

#### Store Document
```bash
curl -X POST "http://localhost:8000/embed" \
  -H "Content-Type: application/json" \
  -d '{"text": "Python is a programming language"}'
```

#### Search Documents
```bash
curl -X POST "http://localhost:8000/search" \
  -H "Content-Type: application/json" \
  -d '{"query": "programming languages", "k": 3}'
```

## Development

### Backend Development (VectorSearchService)

**For Active Development (Recommended):**
```bash
# From VectorSearchService directory
poetry install
poetry shell                              # Activate virtual environment

# Daily development (run directly)
uvicorn app.main:app --reload             # Start dev server
black .                                   # Format code
ruff check .                              # Lint code
pytest                                    # Run tests
python                                    # Interactive Python

# When done developing
exit                                      # Deactivate virtual environment
```

**For Scripts/CI/CD:**
```bash
# From VectorSearchService directory - no activation needed
poetry run uvicorn app.main:app --reload
poetry run black .
poetry run ruff check .
poetry run pytest
```

### Frontend Development (Coming Soon)

The frontend will be developed using modern web technologies:
- **React**: Modern frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

Development commands (when implemented):
```bash
# From FrontEnd directory
npm install                    # Install dependencies
npm run dev                    # Start development server
npm run build                  # Build for production
npm run test                   # Run tests
```

### Poetry Commands (Backend)

```bash
# From VectorSearchService directory
poetry install                            # Install dependencies
poetry add package-name                   # Add new dependency
poetry add --group dev package-name       # Add dev dependency
poetry update                             # Update dependencies
poetry remove package-name                # Remove dependency
poetry show --tree                        # Show dependency tree
poetry env info                           # Check virtual environment info
```

### Development Tools (Backend)

**If you activated the shell (`poetry shell`):**
```bash
# From VectorSearchService directory
black .                                   # Format code
ruff check .                              # Lint code
mypy app/                                 # Type checking
pytest                                    # Run tests
black . && ruff check . && mypy app/      # Run all checks
```

**If using poetry run:**
```bash
# From VectorSearchService directory
poetry run black .
poetry run ruff check .
poetry run mypy app/
poetry run pytest
poetry run black . && poetry run ruff check . && poetry run mypy app/
```

## API Reference

### Models

#### DocIn
```json
{
  "text": "string"
}
```

#### QueryIn
```json
{
  "query": "string",
  "k": 3
}
```

#### Search Response
```json
[
  {
    "text": "document text",
    "score": 0.95
  }
]
```

## Configuration

### Environment Variables

| Variable | Description | Required | Location |
|----------|-------------|----------|----------|
| `OPENAI_API_KEY` | OpenAI API key for embeddings | Yes | VectorSearchService/.env |

### Database Configuration

The application connects to PostgreSQL with these defaults:
- **Host**: localhost (db when using Docker)
- **Database**: vectordb
- **User**: vectordb
- **Password**: secret
- **Port**: 5432

## Deployment

### Using Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f app
```

### Manual Deployment

**Backend Only:**
```bash
# From VectorSearchService directory
poetry install --only=main
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Full Stack (when frontend is implemented):**
```bash
# Build frontend
cd FrontEnd
npm run build

# Start backend
cd ../VectorSearchService
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure `OPENAI_API_KEY` is set in `VectorSearchService/.env`
   - Check that your API key is valid and has credits

2. **Database Connection Error**
   - Ensure PostgreSQL is running: `docker-compose up db -d`
   - Check that pgvector extension is installed

3. **Poetry Installation Issues**
   - Try alternative installation methods from [Poetry docs](https://python-poetry.org/docs/#installation)
   - Ensure Python 3.11+ is installed

4. **Path Issues**
   - Ensure you're in the correct directory (`VectorSearchService` for backend commands)
   - Check that the virtual environment is activated when needed

### Useful Commands

```bash
# Check Poetry installation
poetry --version

# Check Python version (from VectorSearchService directory)
python --version

# Check Docker services (from project root)
docker-compose ps

# View database logs
docker-compose logs db

# View backend logs
docker-compose logs app

# Reset database
docker-compose down -v && docker-compose up db -d
```

## Development Roadmap

### ✅ Completed
- [x] Backend API with FastAPI
- [x] Vector search with OpenAI embeddings
- [x] PostgreSQL + pgvector integration
- [x] Docker containerization
- [x] API documentation

### 🚧 In Progress
- [ ] Frontend web application
- [ ] User authentication
- [ ] File upload functionality
- [ ] Batch document processing

### 📋 Planned
- [ ] Advanced search filters
- [ ] Document management interface
- [ ] Search result highlighting
- [ ] Export functionality
- [ ] API rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes in the appropriate service directory
4. Run tests and linting:
   - Backend: `cd VectorSearchService && poetry run pytest && poetry run black . && poetry run ruff check .`
   - Frontend: `cd FrontEnd && npm test && npm run lint` (when implemented)
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **OpenAI**: Text embeddings generation
- **PostgreSQL**: Primary database
- **pgvector**: Vector similarity search
- **Poetry**: Dependency management
- **Docker**: Containerization
- **Pydantic**: Data validation

### Frontend (Coming Soon)
- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **Vite**: Build tool and dev server 