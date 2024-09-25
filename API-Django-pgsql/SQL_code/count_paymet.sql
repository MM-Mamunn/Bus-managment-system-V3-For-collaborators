
CREATE OR REPLACE FUNCTION count_payment(_driver_id varchar(30))
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM (	 (select driver_id
			select sum(payment), driver_id  from,payment,route_name from trip natural join route where driver_id = _driver_id  ) as temp group by driver_id 
			) u
	)::JSON ;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$ LANGUAGE plpgsql;


