
CREATE OR REPLACE FUNCTION bus_update( data JSON)
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_id  varchar := coalesce((data->>'id')::varchar,NULL);
	 _bus_id varchar := coalesce((data->>'bus_id')::varchar,NULL);
   _category varchar :=coalesce( (data->>'category')::varchar,NULL); 
   _license_no INTEGER:= coalesce((data->>'license_no')::varchar,NULL);
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
$$ LANGUAGE plpgsql;
select * from bus