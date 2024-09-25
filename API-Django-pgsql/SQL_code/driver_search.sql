
CREATE OR REPLACE FUNCTION driver_search(_driver_id varchar(30))
RETURNS JSON AS $$
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
$$ LANGUAGE plpgsql;

select * from driver
--page then limit
select driver_search('01')