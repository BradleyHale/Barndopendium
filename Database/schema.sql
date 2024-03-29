CREATE TABLE IF NOT EXISTS plans (
    planID TEXT PRIMARY KEY,  
    overallSQF INTEGER NOT NULL,  
    heatedCooledSQF INTEGER NOT NULL,  
    length INTEGER,
    width INTEGER,
    sidewallLength INTEGER,
    stories INTEGER NOT NULL DEFAULT 1, 
    bedrooms INTEGER NOT NULL DEFAULT 1, 
    bathrooms INTEGER NOT NULL DEFAULT 1, 
    halfBaths INTEGER DEFAULT 0, 
    saferoom BOOLEAN DEFAULT 0 
);
-- anything below this comment is currently not in use, will be implemented in future versions--------
