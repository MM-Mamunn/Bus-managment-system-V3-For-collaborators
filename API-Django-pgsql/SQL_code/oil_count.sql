
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	 _date1 Date= coalesce(_date1,'2022-01-01');
	 _date2 Date= coalesce(_date2,'2025-01-01');
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
			
		select * from (select  bus_id, SUM(mul) from(select  bus_id,category,license_no,(oil * distance) as mul from (select * from (select * from  (select * from trip natural join bus where date >= _date1 and date <= _date2) as t natural join category 
  ) as t2 natural join route) as t3) as t4 group by bus_id )as t5 natural join bus order by bus_id
  
	LIMIT _limit
			OFFSET (_page - 1) * _limit
		) u
	)::JSON;
	
	RETURN JSON_BUILD_OBJECT(
		'status', 'success',
		'users', _users
	);
END;
