
CREATE OR REPLACE FUNCTION driver_update( data JSON)
RETURNS JSON AS $$
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
$$ LANGUAGE plpgsql;
