
---creating function for insert into driver table
create or replace function insert_driver
		(driver_id varchar(30),name varchar(50),age integer ,license_no varchar(30))
returns void as 
$$
	begin
  		INSERT INTO driver(driver_id,name,age,license_no)
		VALUES
 		(driver_id,name,age,license_no);
	end 
$$

language plpgsql

---insert into driver table by function
select insert_driver     ('01','Ratul khan',25,'1234562');
select insert_driver    ('02','Rashid khan',25,'1234562');
select insert_driver 	('03','Muhammad Amir',29,'1234563');
select insert_driver 	('04','Salman Ali',39,'1234564');
select insert_driver 	('05','Ismail Alam',20,'1234565');
select insert_driver 	('06','karim Uddain',45,'1234566');
select insert_driver 	('07','jasim Jr',22,'1234567');
select insert_driver 	('08','Kamal Hasan',37,'1234568');

select * from driver



---creating function for insert into category table
create or replace function insert_category
		(category varchar,seats integer ,oil numeric ,salary numeric)
returns void as 
$$
	begin
  		INSERT INTO category(category,seats,oil,salary)
		VALUES
 		(category,seats,oil,salary);
	end 
$$

language plpgsql

---insert into category table by function
select  category('mini',30,0.15,1500);
select  category('medium',50,0.2,1700);
select  category('big',65,0.25,2000);
select  category('double_decker',120,0.35,2500);

select * from category



---creating function for insert into bus table
create or replace function insert_bus
		(bus_id varchar(20),category varchar(30),license_no varchar(30),assign varchar(30))
returns void as 
$$
	begin
  		INSERT INTO bus(bus_id,category,license_no,assign)
		VALUES
 		(bus_id,category,license_no,assign);
	end 
$$

language plpgsql

---insert into bus table by function
select insert_bus   ('01' ,'mini', 'CTG-LA 11-1234' ,'student' );
select insert_bus	('02' ,'medium', 'DHA-LA 11-7923' ,'teacher' );
select insert_bus	('03' ,'big', 'CTG-LA 11-1235' ,'staff' );
select insert_bus	('04' ,'double_decker', 'CTG-LA 11-1236' ,'student' );
select insert_bus	('05' ,'mini', 'CTG-LA 11-1244' ,'student' );
select insert_bus	('06' ,'medium', 'DHA-LA 11-7943' ,'staff' );
select insert_bus	('07' ,'big', 'CTG-LA 11-1255' ,'teacher' );
select insert_bus	('08' ,'double_decker', 'CTG-LA 11-1266' ,'student' );

select * from bus 


---creating function for insert into route table
create or replace function insert_route
		(route_name varchar(30),distance numeric)
returns void as 
$$
	begin
  		INSERT INTO route(route_name,distance)
		VALUES
 		(route_name,distance);
	end 
$$

language plpgsql

---insert into bus route by function
select insert_route('agrabad',28);
select insert_route('bot',24);
select insert_route('gec',26);
select insert_route('chawkbazar',25);
select insert_route('kotuwali',30);
select insert_route('hathhazari',25);
select * from route where distance <=25


---creating function for insert into trip table
create or replace function insert_trip
		(driver_id varchar(30),bus_id varchar(20),date date,route_name  varchar(30))
returns void as 
$$
	begin
  		INSERT INTO trip(driver_id,bus_id,date,route_name)
		VALUES
 		(driver_id,bus_id,date,route_name);
	end 
$$

language plpgsql

---insert into bus trip by function
select insert_trip	( '01', '01','2023-10-03','bot');
select insert_trip	( '02', '02','2023-10-03','gec');
select insert_trip	( '03', '03','2023-10-03','chawkbazar');
select insert_trip( '04', '04','2023-10-03','agrabad');
select insert_trip	( '05', '05','2023-10-03','kotuwali');
select insert_trip( '06', '06','2023-10-03','agrabad');
select insert_trip( '07', '07','2023-10-03','bot');
	
	
select * from trip -- natural join driver
	