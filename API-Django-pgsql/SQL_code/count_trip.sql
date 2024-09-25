
CREATE OR REPLACE FUNCTION count_trip(_driver_id varchar(30))
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_driver_id varchar(30) = coalesce(_driver_id,'');
BEGIN
	_users = (
			SELECT JSON_AGG(u)
			FROM ( select * from( select driver_id,count(*) as cnt from trip group by driver_id ) as temp where temp.driver_id = _driver_id
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
select count_trip('02')