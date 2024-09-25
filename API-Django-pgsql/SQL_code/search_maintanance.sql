
CREATE OR REPLACE FUNCTION maintanance_search(_bus_id varchar(30))
RETURNS JSON AS $$
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
$$ LANGUAGE plpgsql;

select * from maintanance
--page then limit
select maintanance_search('B202401')