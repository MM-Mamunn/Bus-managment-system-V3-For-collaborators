
CREATE OR REPLACE FUNCTION maintanance_search2(_bus_id varchar(30))
RETURNS JSON AS $$
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
$$ LANGUAGE plpgsql;
select maintanance_search2('B202401')