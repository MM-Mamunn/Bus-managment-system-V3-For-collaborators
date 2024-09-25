CREATE OR REPLACE FUNCTION efficiency(_page INT, _limit INT,_oil numeric)
RETURNS JSON AS $$
DECLARE
	_users JSON = NULL::JSON;
	_page INT = coalesce(_page, 1);
	_limit INT = coalesce(_limit, 10);
	_oil numeric = coalesce(_oil,40);
BEGIN
	_users = (
		SELECT JSON_AGG(u) 
		FROM (
		
	
select tf3.bus_id,totall_seats,cnt,c1,c2,totall,coalesce(dis,0) dis2,(eff/(coalesce(dis,0.00001)/coalesce(totall_seats,0.00001))) as eff from
(select *, ((c1+c2)/totall_seats) as eff,(c1 + c2) as totall from 
---cost 1 starts(oil * price)
	(select bus.bus_id,coalesce(totall_seats,0.00001) totall_seats ,coalesce (cnt,0.00001) cnt,coalesce(c1,0) c1 from bus left outer join 
	(select * from 
	(select  bus_id,sum(seats) as totall_seats ,(SUM(mul) * _oil) as c1,count(*) as cnt from
	 (select  bus_id,category,seats,license_no,(oil * distance) as mul from 
	  (select * from 
	   (select * from 
		(select * from trip natural join bus) as t natural join category 
  		) as t2 natural join route) as t3) as t4 group by bus_id )as t5 natural join bus order by bus_id)
		t4 on bus.bus_id = t4.bus_id)
		tf1
		---cost1 stop
		natural join
---cost2  starts
(select bus.bus_id,coalesce(c2,0)c2 from bus left outer join
(select bus_id, sum(estimated_cost) as c2 from maintanance group by bus_id) as t5 
on bus.bus_id= t5.bus_id)
tf2
---cost2 stops
)
tf3 left outer join
(---distance starts
select bus_id,coalesce(sum(distance),0.00001) dis from trip natural join route group by bus_id
---distance stops
) tf4 
on tf3.bus_id = tf4.bus_id

	

		

			ORDER BY tf3.bus_id ASC
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
select efficiency(1,10,30)
