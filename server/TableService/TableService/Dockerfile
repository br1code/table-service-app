# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app
EXPOSE 80

# Copy csproj and restore dependencies
COPY . .

# Make script executable
RUN chmod +x ./wait-for-postgres.sh

# Restore packages
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

# Stage 2: Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app

# Install psql
RUN apt-get update \
    && apt-get install -y postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy to out
COPY --from=build /app/out .

# Copy the script into the Docker container
COPY wait-for-postgres.sh ./
RUN chmod +x ./wait-for-postgres.sh

CMD /app/wait-for-postgres.sh postgres dotnet TableService.dll
