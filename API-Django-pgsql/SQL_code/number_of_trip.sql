
CREATE OR REPLACE FUNCTION number_of_trip(_page INT, _limit INT,fromm date, too date)
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			select bus.bus_id,bus.category,bus.license_no,bus.assign,count(*) as number_of_trip from bus join trip on bus.bus_id = trip.bus_id
			where trip.date >= fromm and trip.date<= too
			group by bus.bus_id
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
select * from trip
select number_of_trip(1,4,'2023-01-01','2023-12-30')
