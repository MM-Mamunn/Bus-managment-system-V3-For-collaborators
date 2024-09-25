--driver_insert function 
CREATE OR REPLACE FUNCTION public.driver_insert(
	data JSON)
    RETURNS JSON 
AS $BODY$

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
$BODY$
language  plpgsql;
S