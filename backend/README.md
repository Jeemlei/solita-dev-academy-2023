# Backend

**Backend requires** 
- PostgreSQL-database initialized with [init.sql](init.sql)-file. ([PostgreSQL setup](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) & [Running SQL file](https://www.postgresql.r2schools.com/how-to-execute-sql-file-in-postgresql/))
- [Geoapify API-key](https://myprojects.geoapify.com/)

Run all the following commands in the `backend`-directory.

## Installation

| Requires Python version 3.8+ and pip. |
|---------------------------------------|

Create and activate a virtual environment and install depedencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r ./requirements.txt
```

### Development mode

Provide the following environment variables in `.env`-file:

```
FLASK_APP=src/app.py
FLASK_DEBUG=true
DB_URI='postgresql://<username>:<password>@<server>/<database>'
GEOAPIFY_KEY='<Geoapify API-key>'
```

Start backend with:

```bash
flask run
```

### Production mode

[First build production build of the frontend.](../frontend/README.md)

Provide the following environment variables in `.env`-file:

```
FLASK_APP=src/app.py
DB_URI='postgresql://<username>:<password>@<server>/<database>'
GEOAPIFY_KEY='<Geoapify API-key>'
```

Start backend with:

```bash
flask run
```
