
CREATE OR REPLACE FUNCTION search_trip(_driver_id varchar(30))
RETURNS JSON AS $$
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
$$ LANGUAGE plpgsql;

select * from trip
--page then limit
select search_trip('02')