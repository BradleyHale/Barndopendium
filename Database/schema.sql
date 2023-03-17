CREATE TABLE IF NOT EXISTS plans (
    planID TEXT PRIMARY KEY,  
    overallSQF INTEGER NOT NULL,  
    heatedCooledSQF INTEGER NOT NULL,  
    length INTEGER,
    lengthFt GENERATED ALWAYS AS (length / 12) STORED,
    lengthIn GENERATED ALWAYS AS (MOD(length,12)) STORED,
    width INTEGER,
    widthFt GENERATED ALWAYS AS (width / 12) STORED,
    widthIn GENERATED ALWAYS AS (MOD(width,12)) STORED,
    sidewallLength INTEGER,
    sidewallLengthFt GENERATED ALWAYS AS (sidewallLength / 12) STORED,
    sidewallLengthIn GENERATED ALWAYS AS (MOD(sidewllLength,12)) STORED,
    stories INTEGER NOT NULL DEFAULT 1, 
    bedrooms INTEGER NOT NULL DEFAULT 1, 
    bathrooms INTEGER NOT NULL DEFAULT 1, 
    halfBaths INTEGER DEFAULT 0, 
    saferoom BOOLEAN DEFAULT 0 
);
-- anything below this comment is currently not in use, will be implemented in future versions--------
CREATE TABLE IF NOT EXISTS bonusFeatures(
    FOREIGN KEY (planID) REFERENCES Plans(planID),
    featureID INTEGER

);

CREATE TABLE IF NOT EXISTS hasShops (
    FOREIGN KEY (planID) REFERENCES Plans(planID),
    length INTEGER NOT NULL,
    WIDTH INTEGER NOT NULL, 
    attached BOOLEAN DEFAULT 0

);