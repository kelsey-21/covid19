--CREATE DATABASE CovidTracking
DROP DATABASE CovidTracking

USE CovidTracking

CREATE TABLE [Location] (
	LocationId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	LocationCode VARCHAR(5) NULL,
	LocationName VARCHAR(50) NOT NULL,
	)

CREATE TABLE [Policy] (
	PolicyId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	PolicyCode VARCHAR(20) NOT NULL,
	PolicyName VARCHAR(100) NOT NULL,
	)


CREATE TABLE LocationPolicy (
	LocationPolicyId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	PolicyId INT FOREIGN KEY REFERENCES Policy(PolicyId) NOT NULL,
	LocationId INT FOREIGN KEY REFERENCES Location(LocationId) NOT NULL,
	DateIssued DATETIME NOT NULL,
	DateExpires DATETIME NULL,
	DateEased DATETIME NULL,
	StateWide BIT NOT NULL DEFAULT 0,
	LocPolicyNotes VARCHAR(500) NULL,
	)

CREATE TABLE Color (
	ColorId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	ColorName VARCHAR(25) NOT NULL,
	ColorHex VARCHAR(25) NOT NULL,
	)

CREATE TABLE LocationColor (
	LocationColorId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	LocationId INT FOREIGN KEY REFERENCES Location(LocationId) NOT NULL,
	ColorId INT FOREIGN KEY REFERENCES Color(ColorId) NOT NULL,
	Date DATETIME NULL,
	StatusOfCases VARCHAR(50) NULL,
	)

CREATE TABLE UserType (
	UserTypeId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	UserTypeName VARCHAR(50) NOT NULL,
	IsAdmin BIT NOT NULL DEFAULT 0,
	)

CREATE TABLE [User] (
	UserId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	Email VARCHAR(75) NOT NULL,
	UserTypeId INT FOREIGN KEY REFERENCES UserType(UserTypeId) NOT NULL,
	)

INSERT INTO Color
VALUES ('DarkRed', '#8B0000'),
('Red', '#DC143C'),
('Yellow', '#FFD700'),
('Green', '#008000')


INSERT INTO [Location]
VALUES ('AK', 'Alaska'),
('AL', 'Alabama'),
('AZ', 'Arizona'),
('AR', 'Arkansas'),
('CA', 'California'),
('CO', 'Colorado'),
('CT', 'Connecticut'),
('DE', 'Delaware'),
('DC', 'District of Columbia'),
('FL', 'Florida'),
('GA', 'Georgia'),
('HI', 'Hawaii'),
('ID', 'Idaho'),
('IL', 'Illinois'),
('IN', 'Indiana'),
('IA', 'Iowa'),
('KS', 'Kansas'),
('KY', 'Kentucky'),
('LA', 'Louisiana'),
('ME', 'Maine'),
('MD', 'Maryland'),
('MA', 'Massachusetts'),
('MI', 'Michigan'),
('MN', 'Minnesota'),
('MS', 'Mississippi'),
('MO', 'Missouri'),
('MT', 'Montana'),
('NE', 'Nebraska'),
('NV', 'Nevada'),
('NH', 'New Hampshire'),
('NJ', 'New Jersey'),
('NM', 'New Mexico'),
('NY', 'New York'),
('NC', 'North Carolina'),
('ND', 'North Dakota'),
('OH', 'Ohio'),
('OK', 'Oklahoma'),
('OR', 'Oregon'),
('PA', 'Pennsylvania'),
('PR', 'Puerto Rico'),
('RI', 'Rhode Island'),
('SC', 'South Carolina'),
('SD', 'South Dakota'),
('TN', 'Tennessee'),
('TX', 'Texas'),
('UT', 'Utah'),
('VT', 'Vermont'),
('VA', 'Virginia'),
('WA', 'Washington'),
('WV', 'West Virginia'),
('WI', 'Wisconsin'),
('WY', 'Wyoming');

INSERT INTO [Policy]
VALUES ('EmergDec', 'State of Emergency declared'),
('SchoolClose', 'Schools closed'),
('BarRestrict', 'Bar operations restricted'),
('GathRestrict25', 'Gatherings restricted to 25 people or less'),
('GathRestrictAny', 'Gatherings restricted without social distancing'),
('OtherBusinessClose', 'Non-essential non-business closed'),
('RestaurantRestrict', 'Restaurant operations restricted'),
('GathRestrict10', 'Gatherings restricted to 10 people or less'),
('CaseIsolation', 'Positive COVID tests will be quarantined in place of residence for 14 days'),
('StayAtHome', 'Stay at home order'),
('PublicMask', 'Wear a face covering in public'),
('Quarantine', 'Mandatory 14 day quarantine for point of travel origins'),
('NEBusinessClose', 'Non-essential business closed'),
('TravelRestrictIntra', 'Visitors displaying symptoms travel restricted'),
('GathRestrict50', 'Gatherings restricted to 50 people or less'),
('GathRecomAny', 'Gatherings recommended without social distancing'),
('GathRestrict250', 'Gatherings restricted to 250 people or less'),
('GathRestrict5', 'Gatherings restricted to 5 people or less'),
('GathRestrict100', 'Gatherings restricted to 100 people or less'),
('GathRestrict1000', 'Gatherings restricted to 1000 people or less'),
('GathRestrict3', 'Gatherings restricted to 3 people or less'),
('TravelRestrictExit', 'Residents instructed not to travel outside of state'),
('TravelRestrictEntry', 'Visitors displaying symptoms travel restricted'),
('GathRestrict500', 'Gatherings restricted to 500 people or less')

INSERT INTO UserType 
VALUES ('StandardUser', 0),
('RequestedAdmin', 0),
('Admin', 1)

INSERT INTO LocationColor
VALUES ((SELECT LocationId FROM [Location] WHERE LocationCode='AL'), (SELECT ColorId FROM Color WHERE ColorName='Red'), 07/13/2020, 'Increasing'),
((SELECT LocationId FROM [Location] WHERE LocationCode='TN'), (SELECT ColorId FROM Color WHERE ColorName='Red'), GETDATE(), 'Increasing'),
((SELECT LocationId FROM [Location] WHERE LocationCode='TX'), (SELECT ColorId FROM Color WHERE ColorName='DarkRed'), GETDATE(), 'Increasing'),
((SELECT LocationId FROM [Location] WHERE LocationCode='OH'), (SELECT ColorId FROM Color WHERE ColorName='Yellow'), GETDATE(), 'No Change'),
((SELECT LocationId FROM [Location] WHERE LocationCode='CO'), (SELECT ColorId FROM Color WHERE ColorName='Green'), GETDATE(), 'Decreasing')

INSERT INTO [User]
VALUES ('StandardUser', 'Test', 'standard@test.test', (SELECT UserTypeId FROM UserType WHERE UserTypeName='StandardUser')),
('Requested', 'Test', 'requested@test.test', (SELECT UserTypeId FROM UserType WHERE UserTypeName='RequestedAdmin')),
('Admin', 'Test', 'admind@test.test', (SELECT UserTypeId FROM UserType WHERE UserTypeName='Admin'))