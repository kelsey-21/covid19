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

CREATE TABLE LocationColor (
	LocationColorId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	LocationId VARCHAR(25) NOT NULL,
	LocationName VARCHAR(25) NOT NULL,
	Color VARCHAR(25) NOT NULL,
	Status VARCHAR(25) NOT NULL,
	PercentChange Int NOT NULL, 
	Date DATETIME NULL,
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

INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('363','WI','Wisconsin','#8a2c2d','greatly increasing','26','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('364','WY','Wyoming','#8a2c2d','greatly increasing','29','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('351','PA','Pennsylvania','#BF671E','increasing','11','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('352','PR','Puerto Rico','#8a2c2d','greatly increasing','46','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('353','RI','Rhode Island','#BF671E','increasing','6','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('354','SC','South Carolina','#8a2c2d','greatly increasing','31','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('355','SD','South Dakota','#BF671E','increasing','11','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('356','TN','Tennessee','#8a2c2d','greatly increasing','38','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('357','TX','Texas','#8a2c2d','greatly increasing','32','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('358','UT','Utah','#BF671E','increasing','20','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('359','VT','Vermont','#BF671E','increasing','5','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('360','VA','Virginia','#BF671E','increasing','17','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('361','WA','Washington','#BF671E','increasing','23','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('362','WV','West Virginia','#8a2c2d','greatly increasing','35','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('342','NH','New Hampshire','#BF671E','increasing','6','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('343','NJ','New Jersey','#D5A021','flat','2','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('344','NM','New Mexico','#BF671E','increasing','23','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('345','NY','New York','#D5A021','flat','2','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('346','NC','North Carolina','#BF671E','increasing','24','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('347','ND','North Dakota','#8a2c2d','greatly increasing','31','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('348','OH','Ohio','#BF671E','increasing','23','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('349','OK','Oklahoma','#8a2c2d','greatly increasing','45','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('350','OR','Oregon','#8a2c2d','greatly increasing','30','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('326','IL','Illinois','#BF671E','increasing','11','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('327','IN','Indiana','#BF671E','increasing','18','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('328','IA','Iowa','#BF671E','increasing','17','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('329','KS','Kansas','#8a2c2d','greatly increasing','26','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('330','KY','Kentucky','#8a2c2d','greatly increasing','35','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('331','LA','Louisiana','#8a2c2d','greatly increasing','31','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('332','ME','Maine','#BF671E','increasing','7','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('333','MD','Maryland','#BF671E','increasing','14','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('334','MA','Massachusetts','#D5A021','flat','3','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('335','MI','Michigan','#BF671E','increasing','11','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('336','MN','Minnesota','#BF671E','increasing','19','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('337','MS','Mississippi','#8a2c2d','greatly increasing','40','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('338','MO','Missouri','#8a2c2d','greatly increasing','56','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('339','MT','Montana','#8a2c2d','greatly increasing','60','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('340','NE','Nebraska','#BF671E','increasing','15','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('341','NV','Nevada','#8a2c2d','greatly increasing','39','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('317','CA','California','#8a2c2d','greatly increasing','31','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('318','CO','Colorado','#BF671E','increasing','17','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('319','CT','Connecticut','#D5A021','flat','4','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('320','DE','Delaware','#BF671E','increasing','10','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('321','DC','District of Columbia','#BF671E','increasing','8','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('322','FL','Florida','#8a2c2d','greatly increasing','39','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('323','GA','Georgia','#8a2c2d','greatly increasing','33','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('324','HI','Hawaii','#8a2c2d','greatly increasing','49','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('325','ID','Idaho','#8a2c2d','greatly increasing','47','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('314','AL','Alabama','#8a2c2d','greatly increasing','34','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('313','AK','Alaska','#8a2c2d','greatly increasing','70','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('315','AZ','Arizona','#BF671E','increasing','23','8/1/2020');
INSERT INTO LocationColor (LocationColorId,LocationId,LocationName,Color,Status,PercentChange,Date) VALUES ('316','AR','Arkansas','#8a2c2d','greatly increasing','33','8/1/2020');

INSERT INTO [User]
VALUES ('StandardUser', 'Test', 'standard@test.test', (SELECT UserTypeId FROM UserType WHERE UserTypeName='StandardUser')),
('Requested', 'Test', 'requested@test.test', (SELECT UserTypeId FROM UserType WHERE UserTypeName='RequestedAdmin')),
('Admin', 'Test', 'admind@test.test', (SELECT UserTypeId FROM UserType WHERE UserTypeName='Admin'))