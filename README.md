# Vector Search API

A FastAPI-based vector search application using OpenAI embeddings and pgvector for semantic document search and retrieval.

## Features

- **Document Embedding**: Store text documents with OpenAI embeddings
- **Semantic Search**: Find similar documents using vector similarity
- **PostgreSQL + pgvector**: Efficient vector storage and retrieval
- **FastAPI**: Modern, fast web API with automatic documentation
- **Poetry**: Modern Python dependency management

## Prerequisites

- Python 3.11+
- Docker and Docker Compose
- OpenAI API key
- Poetry (for dependency management)

## Quick Start

### 1. Install Poetry

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

# Install dependencies (creates virtual environment automatically)
poetry install
```

### 3. Environment Setup

Create a `.env` file in the project root by copying the example:

```bash
# Copy the template
cp env.example .env

# Edit .env and replace with your actual OpenAI API key
# Your .env file should look like:
```

```env
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

**Important**: The `.env` file is automatically ignored by git for security.

### 4. Choose Your Development Approach

**Option A: Activate Virtual Environment (Recommended for Development)**
```bash
# Activate Poetry's virtual environment once
poetry shell

# Now run commands directly (faster for development)
uvicorn app.main:app --reload
```

**Option B: Use Poetry Run (Good for CI/CD and One-off Commands)**
```bash
# Run commands through Poetry (no activation needed)
poetry run uvicorn app.main:app --reload
```

### 5. Start Services

```bash
# Start PostgreSQL with pgvector
docker-compose up db -d

# Start the FastAPI application (choose based on your approach above)

# If using activated shell (poetry shell):
uvicorn app.main:app --reload

# If using poetry run:
poetry run uvicorn app.main:app --reload
```

### 6. Using Docker (Alternative)

```bash
# Start everything with Docker
docker-compose up --build
```

## API Usage

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

### Virtual Environment Workflow

**For Active Development (Recommended):**
```bash
# One-time setup
poetry install
poetry shell                    # Activate virtual environment

# Daily development (run directly)
uvicorn app.main:app --reload   # Start dev server
black .                         # Format code
ruff check .                    # Lint code
pytest                          # Run tests
python                          # Interactive Python

# When done developing
exit                            # Deactivate virtual environment
```

**For Scripts/CI/CD:**
```bash
# No activation needed - run everything through poetry
poetry run uvicorn app.main:app --reload
poetry run black .
poetry run ruff check .
poetry run pytest
```

### Poetry Commands

```bash
# Install dependencies
poetry install

# Add new dependency
poetry add package-name
poetry add --group dev package-name  # dev dependency

# Update dependencies
poetry update

# Remove dependency
poetry remove package-name

# Show dependency tree
poetry show --tree

# Check virtual environment info
poetry env info

# Export requirements (for Docker/CI)
poetry export -f requirements.txt --output requirements.txt
```

### Development Tools

**If you activated the shell (`poetry shell`):**
```bash
# Format code
black .

# Lint code
ruff check .

# Type checking
mypy app/

# Run tests
pytest

# Run all checks
black . && ruff check . && mypy app/
```

**If using poetry run:**
```bash
# Format code
poetry run black .

# Lint code
poetry run ruff check .

# Type checking
poetry run mypy app/

# Run tests
poetry run pytest

# Run all checks
poetry run black . && poetry run ruff check . && poetry run mypy app/
```

### Project Structure

```
vector-search/
├── app/
│   └── main.py          # FastAPI application
├── pyproject.toml       # Poetry configuration & dependencies
├── poetry.lock          # Locked dependency versions
├── docker-compose.yml   # Docker services
├── Dockerfile          # Application container
├── env.example         # Environment variables template
├── .env                # Environment variables (create from env.example)
└── README.md           # This file
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

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for embeddings | Yes |

### Database Configuration

The application connects to PostgreSQL with these defaults:
- **Host**: localhost
- **Database**: vectordb
- **User**: vectordb
- **Password**: secret
- **Port**: 5432

## Deployment

### Using Docker Compose

```bash
# Production deployment
docker-compose up -d

# View logs
docker-compose logs -f app
```

### Manual Deployment

```bash
# Install production dependencies only
poetry install --only=main

# Run with production server
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure `OPENAI_API_KEY` is set in your environment
   - Check that your API key is valid and has credits

2. **Database Connection Error**
   - Ensure PostgreSQL is running: `docker-compose up db -d`
   - Check that pgvector extension is installed

3. **Poetry Installation Issues**
   - Try alternative installation methods from [Poetry docs](https://python-poetry.org/docs/#installation)
   - Ensure Python 3.11+ is installed

### Useful Commands

```bash
# Check Poetry installation
poetry --version

# Check Python version
python --version

# Check Docker services
docker-compose ps

# View database logs
docker-compose logs db

# Reset database
docker-compose down -v && docker-compose up db -d
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting: `poetry run pytest && poetry run black . && poetry run ruff check .`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Tech Stack

- **FastAPI**: Modern Python web framework
- **OpenAI**: Text embeddings generation
- **PostgreSQL**: Primary database
- **pgvector**: Vector similarity search
- **Poetry**: Dependency management
- **Docker**: Containerization
- **Pydantic**: Data validation 