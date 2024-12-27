-- Create PostGIS extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create areas table with enhanced data types and constraints
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE, -- Ensure unique area names
    boundary GEOMETRY(POLYGON, 4326) NOT NULL
);

-- Create logs table with foreign key constraint and default value for timestamp
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    userid UUID NOT NULL, 
    areaid INT REFERENCES areas(id) ON DELETE CASCADE, -- Cascade delete logs when area is deleted
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create spatial index on the boundary column of the areas table
CREATE INDEX idx_areas_boundary ON areas USING GIST (boundary);

