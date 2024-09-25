
CREATE OR REPLACE FUNCTION total_distance(_page INT, _limit INT,fromm date, too date)
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			select bus_id,sum(route.distance) as total_dis
				from trip natural join route
			where trip.date >= fromm and trip.date<= too
			group by bus_id
			
			
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

select total_distance(2,4,'2023-01-01','2023-12-30')
