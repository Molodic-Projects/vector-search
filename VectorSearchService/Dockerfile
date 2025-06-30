FROM python:3.11-slim

# Configure & install Poetry
RUN pip install poetry
ENV POETRY_NO_INTERACTION=1 \
    POETRY_VENV_IN_PROJECT=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app
COPY pyproject.toml poetry.lock* ./

# Install dependencies and ensure they're available
RUN poetry install --only=main --no-root

# Copy application code
COPY . .

EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 