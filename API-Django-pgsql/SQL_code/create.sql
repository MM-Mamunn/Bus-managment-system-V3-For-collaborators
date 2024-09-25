CREATE TABLE category(
	category varchar(30) NOT NULL  PRIMARY KEY, 
	seats  INTEGER NOT NULL,
	oil  NUMERIC NOT NULL,
	salary NUMERIC NOT NULL
);



CREATE TABLE driver(
	driver_id varchar(30) PRIMARY KEY,
	name varchar(50),
	age INTEGER NOT NULL,
 	license_no  varchar(30)  NOT NULL
);
ALTER TABLE driver ADD UNIQUE (license_no)




CREATE TABLE bus (
    bus_id varchar(20) PRIMARY KEY,
    category varchar(30) NOT NULL REFERENCES category(category) ON DELETE CASCADE,
    license_no varchar(30) NOT NULL,
    assign varchar(30) NOT NULL
);
ALTER TABLE bus
ADD CONSTRAINT bus_category_fkey
FOREIGN KEY (category)
REFERENCES category (category)
ON UPDATE CASCADE
ON DELETE CASCADE;


CREATE TABLE route(
	route_name varchar(30) PRIMARY KEY,
	distance NUMERIC NOT NULL
);
ALTER TABLE route
ADD COLUMN payment integer default 200;



CREATE TABLE trip (
  driver_id varchar(30) NOT NULL,
  bus_id varchar(20) NOT NULL,
  date DATE NOT NULL,
  route_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (driver_id) REFERENCES driver(driver_id) ON DELETE CASCADE,
  FOREIGN KEY (bus_id) REFERENCES bus(bus_id) ON DELETE CASCADE,
  FOREIGN KEY (route_name) REFERENCES route(route_name) ON DELETE CASCADE
);

ALTER TABLE trip
ADD CONSTRAINT trip_bus_id_fk
FOREIGN KEY (bus_id)
REFERENCES bus (bus_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE trip
ADD CONSTRAINT trip_driver_id_fkey
FOREIGN KEY (driver_id)
REFERENCES driver (driver_id)
ON UPDATE CASCADE
ON DELETE CASCADE;



CREATE TABLE maintanance (
  bus_id varchar(20) NOT NULL,
  driver_id varchar(30) NOT NULL,
  issue VARCHAR(200) NOT NULL,
  estimated_cost NUMERIC NOT NULL,
  issue_date DATE NOT NULL,
  solved_status VARCHAR(30) NOT NULL,	
  FOREIGN KEY (driver_id) REFERENCES driver(driver_id) ON DELETE CASCADE,
  FOREIGN KEY (bus_id) REFERENCES bus(bus_id) ON DELETE CASCADE
);

ALTER TABLE maintanance
ADD CONSTRAINT maintanance_driver_id_fkey
FOREIGN KEY (driver_id)
REFERENCES driver (driver_id)
ON UPDATE CASCADE
ON DELETE CASCADE;


ALTER TABLE maintanance
ADD CONSTRAINT maintanance_bus_id_fkey
FOREIGN KEY (bus_id)
REFERENCES bus (bus_id)
ON UPDATE CASCADE
ON DELETE CASCADE;