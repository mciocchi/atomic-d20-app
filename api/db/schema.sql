CREATE TABLE Character (
    ID SERIAL PRIMARY KEY,
    Type VARCHAR(50) DEFAULT 'character',
    Name VARCHAR(255) NOT NULL,
    Level INT NOT NULL,
    Description TEXT,
    Aspects INT[] DEFAULT '{}',
    Skills INT[] DEFAULT '{}',
    PracticedManeuvers INT[] DEFAULT '{}',
    Inventory INT[] DEFAULT '{}'
);

CREATE TABLE Skill (
    ID SERIAL PRIMARY KEY,
    Type VARCHAR(50) DEFAULT 'skill',
    Name VARCHAR(255) NOT NULL,
    Level INT NOT NULL,
    Description TEXT
);

CREATE TABLE Aspect (
    ID SERIAL PRIMARY KEY,
    Type VARCHAR(50) DEFAULT 'aspect',
    Name VARCHAR(255) NOT NULL,
    Level INT NOT NULL,
    Description TEXT
);

CREATE TABLE Item (
    ID SERIAL PRIMARY KEY,
    Type VARCHAR(50) DEFAULT 'item',
    Name VARCHAR(255) NOT NULL,
    Level INT NOT NULL,
    Description TEXT
);

CREATE TABLE PracticedManeuver (
    ID SERIAL PRIMARY KEY,
    Type VARCHAR(50) DEFAULT 'practiced_maneuver',
    Name VARCHAR(255) NOT NULL,
    Level INT NOT NULL,
    Description TEXT
);

