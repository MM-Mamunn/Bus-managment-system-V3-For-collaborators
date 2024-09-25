
CREATE OR REPLACE FUNCTION driver_view(_page INT, _limit INT)
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			SELECT *
			FROM driver
			ORDER BY driver_id ASC
			LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
$$ LANGUAGE plpgsql;

--page then limit
select driver_view(2,2)