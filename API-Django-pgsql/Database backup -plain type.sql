--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-09-25 11:31:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 235 (class 1255 OID 16964)
-- Name: bus_delete(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.bus_delete(_bus_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
 
BEGIN
    delete from bus where bus_id =_bus_id;

    RETURN JSON_BUILD_OBJECT('success', 'success');
END;
$$;


ALTER FUNCTION public.bus_delete(_bus_id character varying) OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 16963)
-- Name: bus_insert(json); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.bus_insert(data json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    _bus_id varchar := COALESCE((data->>'bus_id')::varchar, ''); 
    _category varchar := COALESCE((data->>'category')::varchar, ''); 
    _license_no varchar := COALESCE((data->>'license_no')::varchar, '');
    _assign varchar := COALESCE((data->>'assign')::varchar, '');
BEGIN
    INSERT INTO bus(bus_id, category, license_no, assign)
    VALUES (_bus_id, _category, _license_no, _assign);

    RETURN JSON_BUILD_OBJECT('success', 'success');
END;
$$;


ALTER FUNCTION public.bus_insert(data json) OWNER TO postgres;

--
-- TOC entry 250 (class 1255 OID 25184)
-- Name: bus_update(json); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.bus_update(data json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_id  varchar := coalesce((data->>'id')::varchar,NULL);
	 _bus_id varchar := coalesce((data->>'bus_id')::varchar,NULL);
   _category varchar :=coalesce( (data->>'category')::varchar,NULL); 
   _license_no varchar:= coalesce((data->>'license_no')::varchar,NULL);
	_assign varchar := coalesce((data->>'assign')::varchar,NULL);
	
BEGIN
	update bus
	set
	  bus_id = coalesce(_bus_id,bus_id),
	  category = coalesce(_category,category),
	  assign= coalesce(_assign,assign),
	  license_no = coalesce(_license_no,license_no)
	  where bus_id = _id;
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
	
END;
$$;


ALTER FUNCTION public.bus_update(data json) OWNER TO postgres;

--
-- TOC entry 247 (class 1255 OID 25143)
-- Name: bus_view(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.bus_view(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			SELECT *
			FROM bus natural join category
			ORDER BY bus_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.bus_view(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 220 (class 1255 OID 16700)
-- Name: category(character varying, integer, numeric, numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.category(category character varying, seats integer, oil numeric, salary numeric) RETURNS void
    LANGUAGE plpgsql
    AS $$
	begin
  		INSERT INTO category(category,seats,oil,salary)
		VALUES
 		(category,seats,oil,salary);
	end 
$$;


ALTER FUNCTION public.category(category character varying, seats integer, oil numeric, salary numeric) OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 25183)
-- Name: category_view(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.category_view(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			SELECT *
			from category
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.category_view(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 256 (class 1255 OID 25177)
-- Name: count_payment(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.count_payment(_driver_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM (
			select sum(payment), driver_id  from	 (select driver_id,payment,route_name from trip natural join route where driver_id = _driver_id  ) as temp group by driver_id 
			) u
	)::JSON ;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.count_payment(_driver_id character varying) OWNER TO postgres;

--
-- TOC entry 244 (class 1255 OID 25148)
-- Name: count_trip(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.count_trip(_driver_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM ( 
select * from (select * from( select driver_id,count(*) as cnt from trip group by driver_id ) as temp where temp.driver_id =  _driver_id) as temp2 join driver on temp2.driver_id = driver.driver_id 
		) u
	)::JSON ;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.count_trip(_driver_id character varying) OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 16953)
-- Name: driver_insert(json); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.driver_insert(data json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
     
    _driver_id varchar := coalesce((data->>'driver_id')::varchar,'');
   _name varchar :=coalesce( (data->>'name')::varchar,''); 
   _age INTEGER:= coalesce((data->>'age')::INTEGER,0);
	_license_no varchar := coalesce((data->>'license_no')::varchar,'');
	
begin
 
	
	INSERT INTO driver(driver_id,name,age,license_no)
		VALUES
 		(_driver_id,_name,_age,_license_no);
	return JSON_BUILD_OBJECT(
	'success','success') ;	
end;
$$;


ALTER FUNCTION public.driver_insert(data json) OWNER TO postgres;

--
-- TOC entry 237 (class 1255 OID 16961)
-- Name: driver_search(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.driver_search(_driver_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM driver u
			where driver_id = _driver_id
		
	)::JSON -> 0;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.driver_search(_driver_id character varying) OWNER TO postgres;

--
-- TOC entry 255 (class 1255 OID 25155)
-- Name: driver_update(json); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.driver_update(data json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_id  varchar := coalesce((data->>'id')::varchar,NULL);
	 _driver_id varchar := coalesce((data->>'driver_id')::varchar,NULL);
   _name varchar :=coalesce( (data->>'name')::varchar,NULL); 
   _age INTEGER:= coalesce((data->>'age')::INTEGER,NULL);
	_license_no varchar := coalesce((data->>'license_no')::varchar,NULL);
	
BEGIN
	update driver
	set
	  driver_id = coalesce(_driver_id,driver_id),
	  name = coalesce(_name,name),
	  age= coalesce(_age,age),
	  license_no = coalesce(_license_no,license_no)
	  where driver_id = _id;
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.driver_update(data json) OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 16973)
-- Name: driver_update(character varying, json); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.driver_update(id character varying, data json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	 _driver_id varchar := coalesce((data->>'driver_id')::varchar,NULL);
   _name varchar :=coalesce( (data->>'name')::varchar,NULL); 
   _age INTEGER:= coalesce((data->>'age')::INTEGER,NULL);
	_license_no varchar := coalesce((data->>'license_no')::varchar,NULL);
	
BEGIN
	update driver
	set
	  driver_id = coalesce(_driver_id,driver_id),
	  name = coalesce(_name,name),
	  age= coalesce(_age,age),
	  license_no = coalesce(_license_no,license_no)
	  where driver_id = id;
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.driver_update(id character varying, data json) OWNER TO postgres;

--
-- TOC entry 238 (class 1255 OID 16958)
-- Name: driver_view(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.driver_view(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			SELECT *
			FROM driver
			ORDER BY driver_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.driver_view(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 259 (class 1255 OID 25240)
-- Name: efficiency(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.efficiency(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
		select *, ((c1+c2)/totall_seats) as eff,(c1 + c2) as totall from 
---cost 1 starts(oil * price)
	(select bus.bus_id,coalesce(totall_seats,0.00001) totall_seats ,coalesce (cnt,0.00001) cnt,coalesce(c1,0) c1 from bus left outer join 
	(select * from 
	(select  bus_id,sum(seats) as totall_seats ,(SUM(mul) * 40) as c1,count(*) as cnt from
	 (select  bus_id,category,seats,license_no,(oil * distance) as mul from 
	  (select * from 
	   (select * from 
		(select * from trip natural join bus) as t natural join category 
  		) as t2 natural join route) as t3) as t4 group by bus_id )as t5 natural join bus order by bus_id)
		t4 on bus.bus_id = t4.bus_id)
		tf1
		---cost1 stop
		natural join
---cost2  starts
(select bus.bus_id,coalesce(c2,0)c2 from bus left outer join
(select bus_id, sum(estimated_cost) as c2 from maintanance group by bus_id) as t5 
on bus.bus_id= t5.bus_id)
tf2
---cost2 stops

			ORDER BY bus_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.efficiency(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 260 (class 1255 OID 25241)
-- Name: efficiency(integer, integer, numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.efficiency(_page integer, _limit integer, _oil numeric) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	_oil numeric = coalesce(_oil,40);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
		
	
select tf3.bus_id,totall_seats,cnt,c1,c2,totall,coalesce(dis,0) dis2,(eff/(coalesce(dis,0.00001)/coalesce(totall_seats,0.00001))) as eff from
(select *, ((c1+c2)/totall_seats) as eff,(c1 + c2) as totall from 
---cost 1 starts(oil * price)
	(select bus.bus_id,coalesce(totall_seats,0.00001) totall_seats ,coalesce (cnt,0.00001) cnt,coalesce(c1,0) c1 from bus left outer join 
	(select * from 
	(select  bus_id,sum(seats) as totall_seats ,(SUM(mul) * _oil) as c1,count(*) as cnt from
	 (select  bus_id,category,seats,license_no,(oil * distance) as mul from 
	  (select * from 
	   (select * from 
		(select * from trip natural join bus) as t natural join category 
  		) as t2 natural join route) as t3) as t4 group by bus_id )as t5 natural join bus order by bus_id)
		t4 on bus.bus_id = t4.bus_id)
		tf1
		---cost1 stop
		natural join
---cost2  starts
(select bus.bus_id,coalesce(c2,0)c2 from bus left outer join
(select bus_id, sum(estimated_cost) as c2 from maintanance group by bus_id) as t5 
on bus.bus_id= t5.bus_id)
tf2
---cost2 stops
)
tf3 left outer join
(---distance starts
select bus_id,coalesce(sum(distance),0.00001) dis from trip natural join route group by bus_id
---distance stops
) tf4 
on tf3.bus_id = tf4.bus_id

	

		

			ORDER BY tf3.bus_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.efficiency(_page integer, _limit integer, _oil numeric) OWNER TO postgres;

--
-- TOC entry 222 (class 1255 OID 16702)
-- Name: insert_bus(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_bus(bus_id character varying, category character varying, license_no character varying, assign character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
	begin
  		INSERT INTO bus(bus_id,category,license_no,assign)
		VALUES
 		(bus_id,category,license_no,assign);
	end 
$$;


ALTER FUNCTION public.insert_bus(bus_id character varying, category character varying, license_no character varying, assign character varying) OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 16701)
-- Name: insert_category(character varying, integer, numeric, numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_category(category character varying, seats integer, oil numeric, salary numeric) RETURNS void
    LANGUAGE plpgsql
    AS $$
	begin
  		INSERT INTO category(category,seats,oil,salary)
		VALUES
 		(category,seats,oil,salary);
	end 
$$;


ALTER FUNCTION public.insert_category(category character varying, seats integer, oil numeric, salary numeric) OWNER TO postgres;

--
-- TOC entry 223 (class 1255 OID 16703)
-- Name: insert_route(character varying, numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_route(route_name character varying, distance numeric) RETURNS void
    LANGUAGE plpgsql
    AS $$
	begin
  		INSERT INTO route(route_name,distance)
		VALUES
 		(route_name,distance);
	end 
$$;


ALTER FUNCTION public.insert_route(route_name character varying, distance numeric) OWNER TO postgres;

--
-- TOC entry 251 (class 1255 OID 25236)
-- Name: maintanance_search(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.maintanance_search(_bus_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_bus_id varchar(30) = coalesce(_bus_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM maintanance u
			where bus_id = _bus_id
		
	)::JSON -> 0;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.maintanance_search(_bus_id character varying) OWNER TO postgres;

--
-- TOC entry 254 (class 1255 OID 25237)
-- Name: maintanance_search2(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.maintanance_search2(_bus_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_bus_id varchar(30) = coalesce(_bus_id, '10');
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			select * from maintanance where bus_id = _bus_id
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.maintanance_search2(_bus_id character varying) OWNER TO postgres;

--
-- TOC entry 258 (class 1255 OID 25235)
-- Name: maintanance_view(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.maintanance_view(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			select * from maintanance order by bus_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.maintanance_view(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 16967)
-- Name: number_of_trip(integer, integer, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.number_of_trip(_page integer, _limit integer, fromm date, too date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			select bus.bus_id,bus.category,bus.license_no,bus.assign,count(*) as number_of_trip from bus join trip on bus.bus_id = trip.bus_id
			where trip.date >= fromm and trip.date<= too
			group by bus.bus_id
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.number_of_trip(_page integer, _limit integer, fromm date, too date) OWNER TO postgres;

--
-- TOC entry 252 (class 1255 OID 25179)
-- Name: oil_count(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.oil_count(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			
		select * from (select  bus_id, SUM(mul) from(select  bus_id,category,license_no,(oil * distance) as mul from (select * from (select * from  (select * from trip natural join bus) as t natural join category 
		) as t2 natural join route) as t3) as t4 group by bus_id )as t5 natural join bus order by bus_id
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.oil_count(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 253 (class 1255 OID 25180)
-- Name: oil_count(integer, integer, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.oil_count(_page integer, _limit integer, _date1 date, _date2 date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	 _date1 Date= coalesce(_date1,'2022-01-01');
	 _date2 Date= coalesce(_date2,'2025-01-01');
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			
		select * from (select  bus_id, SUM(mul) from(select  bus_id,category,license_no,(oil * distance) as mul from (select * from (select * from  (select * from trip natural join bus where date >= _date1 and date <= _date2) as t natural join category 
  ) as t2 natural join route) as t3) as t4 group by bus_id )as t5 natural join bus order by bus_id
  
	LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.oil_count(_page integer, _limit integer, _date1 date, _date2 date) OWNER TO postgres;

--
-- TOC entry 257 (class 1255 OID 25178)
-- Name: route_view(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.route_view(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			SELECT *
			FROM route
			ORDER BY distance ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.route_view(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 246 (class 1255 OID 25181)
-- Name: search_driver(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.search_driver(_driver_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM ( 
			select * from driver where driver_id = _driver_id
			) u
	)::JSON ;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.search_driver(_driver_id character varying) OWNER TO postgres;

--
-- TOC entry 245 (class 1255 OID 25144)
-- Name: search_trip(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.search_trip(_driver_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM ( select * from trip left join driver on trip.driver_id = driver.driver_id 
			where trip.driver_id = _driver_id
		) u
	)::JSON ;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.search_trip(_driver_id character varying) OWNER TO postgres;

--
-- TOC entry 248 (class 1255 OID 25182)
-- Name: total_distance(integer, integer, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.total_distance(_page integer, _limit integer, date1 date, date2 date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	_date1 Date= coalesce(date1,'2022-01-01');
	 _date2 Date= coalesce(date2,'2025-01-01');
	
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
		select driver_id,sum(distance) from trip natural join route  where date >= _date1 and date <= _date2 group by driver_id
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.total_distance(_page integer, _limit integer, date1 date, date2 date) OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 25146)
-- Name: trip_all(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trip_all(_page integer, _limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			SELECT *
			FROM driver join trip on driver.driver_id = trip.driver_id
			ORDER BY driver.driver_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$;


ALTER FUNCTION public.trip_all(_page integer, _limit integer) OWNER TO postgres;

--
-- TOC entry 236 (class 1255 OID 16957)
-- Name: trip_insert(json); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trip_insert(data json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
     
    _driver_id varchar := coalesce((data->>'driver_id')::varchar,'');
   _bus_id varchar :=coalesce( (data->>'bus_id')::varchar,''); 
    _date date := coalesce((data->>'date')::date,'2023-12-12');
	_route_name varchar := coalesce((data->>'route_name')::varchar,'');
	--(bus_id varchar(20),category varchar(30),license_no varchar(30),assign varchar(30))
	
begin
	
	INSERT INTO trip(driver_id,bus_id,date,route_name)
		VALUES
 		(_driver_id,_bus_id,_date,_route_name);
	return JSON_BUILD_OBJECT(
	'success','success') ;
		
end;
$$;


ALTER FUNCTION public.trip_insert(data json) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16649)
-- Name: bus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bus (
    bus_id character varying(20) NOT NULL,
    category character varying(30) NOT NULL,
    license_no character varying(30) NOT NULL,
    assign character varying(30) NOT NULL
);


ALTER TABLE public.bus OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16632)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category character varying(30) NOT NULL,
    seats integer NOT NULL,
    oil numeric NOT NULL,
    salary numeric NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16639)
-- Name: driver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driver (
    driver_id character varying(30) NOT NULL,
    name character varying(50),
    age integer NOT NULL,
    license_no character varying(30) NOT NULL
);


ALTER TABLE public.driver OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16684)
-- Name: maintanance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maintanance (
    bus_id character varying(20) NOT NULL,
    driver_id character varying(30) NOT NULL,
    issue character varying(200) NOT NULL,
    estimated_cost numeric NOT NULL,
    issue_date date NOT NULL,
    solved_status character varying(30) NOT NULL
);


ALTER TABLE public.maintanance OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16659)
-- Name: route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route (
    route_name character varying(30) NOT NULL,
    distance numeric NOT NULL,
    payment integer DEFAULT 200
);


ALTER TABLE public.route OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16666)
-- Name: trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip (
    driver_id character varying(30) NOT NULL,
    bus_id character varying(20) NOT NULL,
    date date NOT NULL,
    route_name character varying(30) NOT NULL
);


ALTER TABLE public.trip OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 16649)
-- Dependencies: 216
-- Data for Name: bus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bus (bus_id, category, license_no, assign) FROM stdin;
02020222	mini	463376735	student
555	medium	343453	teacher
1234	big	CUM-LA 19-1814	student
07	big	CTG-LA 11-1255	teacher
11	medium	CTG-LA 11-1899	staff
B202401	AC Bus	DHAKA-1234	VIP Passengers
B202402	Non-AC Bus	CHITTAGONG-5678	General Public
B202403	Mini Bus	DHAKA-9101	Short Trips
B202404	Local Bus	DHAKA-1121	Everyone
B202405	Double Decker	COX-3141	Tourists
B202406	School Bus	DHAKA-5161	Students
B202407	University Bus	DHAKA-7181	University Students
B202408	Tourist Bus	SYLHET-9201	Tourists
B202409	City Bus	DHAKA-1222	City Commuters
B202410	Express Bus	DHAKA-3242	Long Distance Travelers
B202411	Shuttle Bus	DHAKA-5262	Office Workers
B202412	Intercity Bus	RAJSHAHI-7282	Intercity Travelers
B202413	VIP Bus	DHAKA-9302	VIP Passengers
B202414	Luxury Bus	DHAKA-1333	High-End Travelers
B202415	Sleeper Bus	DHAKA-3353	Overnight Travelers
B202416	Electric Bus	DHAKA-5373	Eco-Friendly Travelers
B202417	Hybrid Bus	DHAKA-7393	Eco-Friendly Travelers
B202418	Airport Shuttle	DHAKA-9404	Airport Passengers
B202419	Rent-a-Bus	DHAKA-1414	Rental Service
B202420	Festival Special	DHAKA-3434	Festival Participants
11001100	mini	23252423	student
\.


--
-- TOC entry 3384 (class 0 OID 16632)
-- Dependencies: 214
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category, seats, oil, salary) FROM stdin;
mini	30	0.15	1500
medium	50	0.2	1700
big	65	0.25	2000
double_decker	120	0.35	2500
large	75	0.3	2200
AC Bus	40	5.5	2.0
Non-AC Bus	50	6.0	1.0
Mini Bus	30	7.0	1.2
Local Bus	60	5.0	0.8
Double Decker	70	4.5	1.5
School Bus	40	6.5	1.1
University Bus	50	6.2	1.1
Tourist Bus	45	5.8	2.0
City Bus	55	5.7	1.0
Express Bus	35	6.8	1.5
Shuttle Bus	25	7.2	1.2
Intercity Bus	60	5.4	1.8
VIP Bus	20	6.9	2.5
Luxury Bus	30	7.0	2.5
Sleeper Bus	40	5.5	2.2
Electric Bus	50	3.5	1.5
Hybrid Bus	45	4.0	1.8
Airport Shuttle	20	4.5	2.0
Rent-a-Bus	50	6.0	1.0
Festival Special	60	5.0	1.5
\.


--
-- TOC entry 3385 (class 0 OID 16639)
-- Dependencies: 215
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.driver (driver_id, name, age, license_no) FROM stdin;
87	jaamal bhai	43	2421234234
03	Muhammad Amir	29	1234563
05	Ismail Alam	20	1234565
06	karim Uddain	45	1234566
08	Kamal Hasan	37	1234568
221177	Muhtasim Shahriar	32	6969696969696969
D202401	Ratul Khan	25	1234562
13	Sayen	22	12223344
15	Mahfuz	25	334428334
D202402	Sarah Lee	30	6543210
D202403	John Doe	28	7890123
D202404	Alice Smith	32	5678901
D202405	Bob Johnson	26	8901234
D202406	Charlie Brown	29	2345678
D202407	David Wilson	31	3456789
D202408	Eva Green	27	4567890
D202409	Frank White	33	5678902
10	Sahed saim	34	29428334
D202410	Grace Black	24	6789012
11	Istiaque Ahmed	30	69696969
D202411	Hannah Scott	30	7890124
D202412	Ivan Clark	26	8901235
D202413	Jack Hill	28	9012345
D202414	Kathy Adams	31	9934566
D202415	Liam Young	32	2345679
D202416	Mia Martinez	27	3456781
D202417	Noah King	29	4567891
D202418	Olivia Baker	33	5678903
09	Dibbo Khan Dibbo	27	13449898
28	Rakib Hossain	33	0283428334
D202419	Peter Wright	25	6789013
33	New Rayhan	25	245214252
123	afaf	23	1321414
345	new entrytwo	34	4324234
D202420	Quinn Rivera	30	7890125
D202421	Arifur Rahman	26	8901236
D202422	Masud Rana	27	9012346
999	new new new	34	2342424
D202423	Rashidul Karim	28	9994568
D202424	Jahangir Alam	29	2345670
2342	Abdul Karim	34	12315113232
D202425	Shamim Hossain	30	3456782
736	Karim janat	24	125245222
221050	Rayhan Bhai	29	1737201741
22105050	MRU	40	99999999999999999
D202426	Moinul Islam	31	4567892
D202427	Abdul Kader	32	5678904
D202428	Saiful Islam	33	6789014
221055	testing	23	22105555
D202429	Habibur Rahman	24	7890126
D202430	Mizanur Rahman	25	8901237
221060	Rafi Vhaaaai	23	221060
D202431	Azizul Haque	26	9012347
D202432	Belal Hossain	27	1234569
D202433	Delwar Hossain	28	2345671
D202434	Ehsanul Haque	29	3456783
D202435	Ferdous Ahmed	30	4567893
D202436	Golam Rabbani	31	5678905
D202437	Hamidul Islam	32	6789015
D202438	Iqbal Hossain	33	7890127
D202439	Jamal Uddin	24	8901238
D202440	Kazi Shakil	25	9012348
D2213131		23	3944827342343
D2322423		34	123352342
221047	Mayeen Uddin Hasan	30	2321313123
233	new salman	23	23221312313
12	old salman	44	34687
77	Ismail khan new	35	242635324
202020	Mmafa	43	2435342
100	Ahnab Ayub	29	987654321124
46	M M	34	252163
99999	new insert	34	8373473533
99099	fdgsdf	45	2524565435
C22104744	afcef	34	342412324
\.


--
-- TOC entry 3389 (class 0 OID 16684)
-- Dependencies: 219
-- Data for Name: maintanance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.maintanance (bus_id, driver_id, issue, estimated_cost, issue_date, solved_status) FROM stdin;
B202401	D202402	Engine Overheating	5000.00	2024-07-10	Pending
B202402	D202403	Brake System Fault	3000.00	2024-07-11	Resolved
B202403	D202404	Suspension Issues	2500.00	2024-07-12	Pending
B202404	D202405	Electrical Problem	4000.00	2024-07-13	Pending
B202405	D202406	Transmission Fluid Leak	3500.00	2024-07-14	Resolved
B202406	D202407	Battery Replacement	2000.00	2024-07-15	Resolved
B202407	D202408	AC Not Cooling	1500.00	2024-07-16	Pending
B202408	D202409	Tire Replacement	1800.00	2024-07-17	Resolved
B202409	D202410	Fuel Injector Cleaning	2200.00	2024-07-18	Pending
B202410	D202411	Gearbox Issues	2800.00	2024-07-19	Pending
B202411	D202412	Headlight Repair	1200.00	2024-07-20	Resolved
B202412	D202413	Wiper Blade Replacement	1000.00	2024-07-21	Resolved
B202413	D202414	Air Filter Change	800.00	2024-07-22	Pending
B202414	D202415	Oil Change	600.00	2024-07-23	Pending
B202415	D202416	Coolant Flush	1500.00	2024-07-24	Resolved
B202416	D202417	Brake Pad Replacement	2000.00	2024-07-25	Pending
B202417	D202418	Windshield Crack Repair	300.00	2024-07-26	Resolved
B202418	D202419	Exhaust System Repair	2800.00	2024-07-27	Pending
B202419	D202420	Alternator Replacement	1800.00	2024-07-28	Pending
B202420	D202402	Spark Plug Change	500.00	2024-07-29	Resolved
1234	77	Engine fault	5000	2024-07-11	pending
\.


--
-- TOC entry 3387 (class 0 OID 16659)
-- Dependencies: 217
-- Data for Name: route; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.route (route_name, distance, payment) FROM stdin;
gec	26	200
bot	24	300
agrabad	28	400
chawkbazar	25	250
kotuwali	30	400
hathhazari	25	500
Dhanmondi to Uttara	15.0	150
Gulshan to Motijheel	10.0	100
Mirpur to Banani	12.0	120
Bashundhara to Shahbag	8.0	80
Jatrabari to Farmgate	14.0	140
Agrabad to Halishahar	6.0	60
Nasirabad to GEC	5.0	50
Pahartali to New Market	7.0	70
Kotwali to CEPZ	9.0	90
Chawkbazar to Oxygen	8.5	85
Dhaka to Chittagong	250.0	2500
Dhaka to Sylhet	240.0	2400
Dhaka to Rajshahi	200.0	2000
Dhaka to Khulna	250.0	2500
Chittagong to Coxs Bazar	150.0	1500
Sylhet to Moulvibazar	60.0	600
Khulna to Jessore	70.0	700
Rajshahi to Bogra	100.0	1000
Barisal to Patuakhali	90.0	900
Rangpur to Dinajpur	80.0	800
\.


--
-- TOC entry 3388 (class 0 OID 16666)
-- Dependencies: 218
-- Data for Name: trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip (driver_id, bus_id, date, route_name) FROM stdin;
77	02020222	2224-02-22	bot
05	555	2023-10-03	kotuwali
100	555	2024-06-27	agrabad
221060	11	2024-07-04	chawkbazar
221060	11	2024-07-02	bot
D202402	B202401	2024-07-12	Dhanmondi to Uttara
D202403	B202402	2024-07-12	Gulshan to Motijheel
D202404	B202403	2024-07-13	Mirpur to Banani
D202405	B202404	2024-07-13	Bashundhara to Shahbag
D202406	B202405	2024-07-14	Jatrabari to Farmgate
D202407	B202406	2024-07-14	Agrabad to Halishahar
D202408	B202407	2024-07-15	Nasirabad to GEC
D202409	B202408	2024-07-15	Pahartali to New Market
D202410	B202409	2024-07-16	Kotwali to CEPZ
D202411	B202410	2024-07-16	Chawkbazar to Oxygen
D202412	B202411	2024-07-17	Dhaka to Chittagong
D202413	B202412	2024-07-17	Dhaka to Sylhet
D202414	B202413	2024-07-18	Dhaka to Rajshahi
D202415	B202414	2024-07-18	Dhaka to Khulna
D202416	B202415	2024-07-19	Chittagong to Coxs Bazar
D202417	B202416	2024-07-19	Sylhet to Moulvibazar
D202418	B202417	2024-07-20	Khulna to Jessore
D202419	B202418	2024-07-20	Rajshahi to Bogra
D202420	B202419	2024-07-21	Barisal to Patuakhali
D202402	B202420	2024-07-21	Rangpur to Dinajpur
D202407	B202401	2024-07-09	kotuwali
77	07	2023-10-03	bot
77	07	2023-12-15	kotuwali
77	11	2024-07-17	bot
77	11	2024-07-02	kotuwali
77	11	2024-07-09	bot
77	11	2024-07-03	bot
77	11	2024-07-17	kotuwali
\.


--
-- TOC entry 3230 (class 2606 OID 16653)
-- Name: bus bus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_pkey PRIMARY KEY (bus_id);


--
-- TOC entry 3224 (class 2606 OID 16638)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category);


--
-- TOC entry 3226 (class 2606 OID 25154)
-- Name: driver driver_license_no_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_license_no_key UNIQUE (license_no);


--
-- TOC entry 3228 (class 2606 OID 16643)
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (driver_id);


--
-- TOC entry 3232 (class 2606 OID 16665)
-- Name: route route_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT route_pkey PRIMARY KEY (route_name);


--
-- TOC entry 3233 (class 2606 OID 25220)
-- Name: bus bus_bus_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_bus_id_fk FOREIGN KEY (bus_id) REFERENCES public.bus(bus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3234 (class 2606 OID 25195)
-- Name: bus bus_bus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_bus_id_fkey FOREIGN KEY (bus_id) REFERENCES public.bus(bus_id) ON UPDATE CASCADE;


--
-- TOC entry 3235 (class 2606 OID 25225)
-- Name: bus bus_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_category_fkey FOREIGN KEY (category) REFERENCES public.category(category) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3239 (class 2606 OID 25210)
-- Name: maintanance maintanance_bus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintanance
    ADD CONSTRAINT maintanance_bus_id_fkey FOREIGN KEY (bus_id) REFERENCES public.bus(bus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3240 (class 2606 OID 25215)
-- Name: maintanance maintanance_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintanance
    ADD CONSTRAINT maintanance_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.driver(driver_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3236 (class 2606 OID 25200)
-- Name: trip trip_bus_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_bus_id_fk FOREIGN KEY (bus_id) REFERENCES public.bus(bus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3237 (class 2606 OID 25166)
-- Name: trip trip_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.driver(driver_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3238 (class 2606 OID 25230)
-- Name: trip trip_route_name_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_route_name_fk FOREIGN KEY (route_name) REFERENCES public.route(route_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3241 (class 2606 OID 25161)
-- Name: maintanance updatedd_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintanance
    ADD CONSTRAINT updatedd_constraint FOREIGN KEY (driver_id) REFERENCES public.driver(driver_id) ON UPDATE CASCADE;


-- Completed on 2024-09-25 11:31:50

--
-- PostgreSQL database dump complete
--

