CREATE TABLE "counties" (
	"county_id" SERIAL PRIMARY KEY,
	"county_name" VARCHAR(255)
);

INSERT INTO "counties" ("county_name") VALUES ('Aitkin'),
('Anoka'),
('Becker'),
('Beltrami'),
('Benton'),
('Big Stone'),
('Blue Earth'),
('Brown'),
('Carlton'),
('Carver'),
('Cass'),
('Chippewa'),
('Chisago'),
('Clay'),
('Clearwater'),
('Cook'),
('Cottonwood'),
('Crow Wing'),
('Dakota'),
('Dodge'),
('Douglas'),
('Faribault'),
('Fillmore'),
('Freeborn'),
('Goodhue'),
('Grant'),
('Hennepin'),
('Houston'),
('Hubbard'),
('Isanti'),
('Itasca'),
('Jackson'),
('Kanabec'),
('Kaniyohi'),
('Kittson'),
('Koochiching'),
('Lac Qui Parle'),
('Lake'),
('Lake Of The Wood'),
('Le Sueur'),
('Lincoln'),
('Lyon'),
('Mahnomen'),
('Marshall'),
('Martin'),
('McLeod'),
('Meeker'),
('Mille Lacs'),
('Morrison'),
('Mower'),
('Murray'),
('Nicollet'),
('Nobles'),
('Norman'),
('Olmsted'),
('Otter Tail'),
('Pennington'),
('Pine'),
('Pipestone'),
('Polk'),
('Pope'),
('Ramsey'),
('Red Lake'),
('Redwood'),
('Renville'),
('Rice'),
('Rock'),
('Roseau'),
('St. Louis'),
('Scott'),
('Sherburne'),
('Sibley'),
('Stearns'),
('Steele'),
('Stevens'),
('Swift'),
('Todd'),
('Traverse'),
('Wabasha'),
('Wadena'),
('Waseca'),
('Washington'),
('Watonwan'),
('Wilkin'),
('Winona'),
('Wright'),
('Yellow Medicine'),
('Other')
;

CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY,
	"org_name" varchar(255),
	"logo" varchar(255),
	"url" varchar(255),
	"type" varchar(255),
	"address_number" varchar(255),
	"address_street" varchar(255),
	"address_unit" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"county_id" integer REFERENCES counties,
	"zip" varchar(255),
	"notes" varchar(255)
);

INSERT INTO "organizations" ("org_name", "logo", "url", "type", "address_number", "address_street", "address_unit", "city", "state", "county_id", "zip")
VALUES( 'Esoteric Order of Dagon','https://www.octopussgarden.es/wp-content/uploads/big05_01c_Dagon_Lovecraft_T-Shirt-100x100.jpg', 'http://www.esotericorderofdagon.org/', 'non-profit','1234','Main Street', '#112', 'Burnsville','MN', 19,'55337'),
('Read To the Animals', 'https://www.mainstreetbooksminot.com/sites/mainstreetbooksminot.com/files/Reading%20With%20Rover.png', 'https://www.animalhumanesociety.org/education/rescue-readers', 'non-profit','987','West Barkway', NULL, 'Minneapolis','MN',27,'55411'),
('The Human Fund', 'https://images.adagio.com/images2/custom_blends/33590.jpg', 'http://festivusweb.com/festivus-the-human-fund.php', 'non-profit','1000', 'Wall St.', '#5001', 'New York','NY', 62,'10281'),
('Greendale Community College', 'https://images-na.ssl-images-amazon.com/images/I/41-621wQstL._SX331_BO1,204,203,200_.jpg', 'https://community-sitcom.fandom.com/wiki/Greendale_Community_College', 'school','5443','Community RD E', NULL, 'Minneapolis', 'MN', 62, '55119'),
('Church of The Flying Spaghetti Monster', 'https://images-na.ssl-images-amazon.com/images/I/41kY3eUmMQL._AC_.jpg', 'https://en.wikipedia.org/wiki/Flying_Spaghetti_Monster', 'religious', '1', 'Noodly Appendage Way', NULL, 'Bloomington', 'MN', 27, '55431');


CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_name" varchar(255) NOT NULL,
	"title" varchar(255),
	"organizations_id" integer REFERENCES organizations,
	"phone_number" varchar(255) NOT NULL,
	"phone_number_type" varchar(255),
	"email" varchar(255),
	"notes" varchar(255)
);

INSERT INTO "contacts" ("contact_name", "title", "organizations_id", "phone_number", "phone_number_type", "email")
VALUES ('Ctulhu Mythos', 'Pastor', 1, '800-246-1357', 'office', 'ctulhu@dagon.com'),
('Steve Edwin', 'Volunteed', 2, '612-555-2345', 'cell', 'steve@RTTA.org'),
('George C.', 'Director', 3, '952-555-9876', 'office', 'costanza@humanfund.com'),
('Craig Pelton', 'Teacher', 4, '651-555-4332', 'office', 'cpelton@greendale.com'),
('Fabrizzio Cavatappi', 'Boilerman', 5, '715-555-4321', 'cell', 'cavatappi@noodlyappendage.com');

CREATE TABLE "events" (
	"id" serial PRIMARY KEY,
	"event_name" varchar(255) NOT NULL,
	"organizations_id" integer REFERENCES organizations,
    "contacts_id" integer REFERENCES contacts,
	"date" DATE NOT NULL,
	"start_time" TIME,
	"end_time" TIME,
	"books_in" int,
	"books_out" int,
	"number_of_children" int,
	"number_of_adult_esl_learners" int,
	"location" varchar(255),
	"volunteers" varchar(255),
	"notes" varchar(255)
);

INSERT INTO "events" ("event_name", "organizations_id", "contacts_id", "date", "start_time", "end_time", "books_in", "books_out", "number_of_children", "number_of_adult_esl_learners")
VALUES ('Free Book Giveaway', 1, 1, '2020-02-29', '10:00', '14:00', 0, 142, 64, 0),
('Books for Pets Day', 2, 2, '2019-11-27', '16:00', '20:00', 25, 62, 15, 0),
('Vandelay Book Day', 3, 3, '2019-12-18', '12:00', '13:00', 0, 10, 3, 0),
('Books Down Under', 4, 4, '2019-10-01', '16:00', '20:00', 10, 75, 25, 0),
('Noodly Holiday Party', 5, 5, '2019-12-11', '16:00', '19:00', 0, 15, 5, 0);

CREATE TABLE "demographics_age" (
    "id" serial PRIMARY KEY,
    "organizations_id" integer REFERENCES organizations,
    "0-3" integer,
    "4-7" integer,
    "8-12" integer,
    "13-18" integer
);

INSERT INTO "demographics_age" ("organizations_id", "0-3", "4-7", "8-12", "13-18")
VALUES(1, 0, 75, 25, 0),
(2, 25, 75, 0, 0),
(3, 25, 50, 25, 0),
(4, 50, 50, 0, 0),
(5, 25, 25, 25, 25);

CREATE TABLE "demographics_race" (
    "id" serial PRIMARY KEY,
    "organizations_id" integer REFERENCES organizations,
    "white" integer,
    "black_or_african_american" integer,
    "american_indian_or_alaska_native" integer, 
    "asian" integer, 
    "native_hawaiian_or_pacific_islander" integer
);

INSERT INTO "demographics_race" ("organizations_id", "white", "black_or_african_american", "american_indian_or_alaska_native", "asian", "native_hawaiian_or_pacific_islander")
VALUES(1, 75, 25, 0, 0, 0),
(2, 90, 10, 0, 0, 0),
(3, 10, 80, 0, 10, 0),
(4, 40, 40, 0, 20, 0),
(5, 20, 30, 10, 30, 10);

CREATE TABLE "demographics_poverty" (
    "id" serial PRIMARY KEY,
    "organizations_id" integer REFERENCES organizations,
    "percentage_NSLP" integer
);

INSERT INTO "demographics_poverty" ("organizations_id", "percentage_NSLP")
VALUES(1, 75),
(2, 50),
(3, 0),
(4, 100),
(5, 42);

CREATE TABLE  "user"(
    "id" serial PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT false
);

INSERT INTO "user" ("username", "password", "admin")
VALUES ('admin', '$2a$10$fld6zZiQxdgcbVIWKAzve.g9NEEfGWHaN7/LSbshYl9R3BH/0rSbS', TRUE)