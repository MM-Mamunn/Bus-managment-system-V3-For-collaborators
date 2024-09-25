--trip_insert function 
CREATE OR REPLACE FUNCTION public.trip_insert(
	data JSON)
    RETURNS JSON 
AS $BODY$
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
$BODY$
language  plpgsql;
---query
SELECT public.trip_insert(
	'{"driver_id":"02", "bus_id":"04", "date":"2023-12-14","route_name":"bot"}'::json
);
select * from trip