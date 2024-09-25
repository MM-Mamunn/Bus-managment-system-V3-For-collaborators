
---delete

CREATE OR REPLACE FUNCTION public.bus_delete(_bus_id varchar(20))
    RETURNS JSON 
AS $BODY$
DECLARE
 
BEGIN
    delete from bus where bus_id =_bus_id;

    RETURN JSON_BUILD_OBJECT('success', 'success');
END;
$BODY$
LANGUAGE plpgsql;