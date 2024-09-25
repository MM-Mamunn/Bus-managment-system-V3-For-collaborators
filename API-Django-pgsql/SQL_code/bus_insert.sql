--bus_insert function 
CREATE OR REPLACE FUNCTION public.bus_insert(data JSON)
    RETURNS JSON 
AS $BODY$
DECLARE
    _bus_id varchar := COALESCE((data->>'bus_id')::varchar, ''); 
    _category varchar := COALESCE((data->>'category')::varchar, ''); 
    _license_no varchar := COALESCE((data->>'license_no')::varchar, '');
    _assign varchar := COALESCE((data->>'assign')::varchar, '');
BEGIN
    INSERT INTO bus(bus_id, category, license_no, assign)
    VALUES (_bus_id, _category, _license_no, _assign);

    RETURN JSON_BUILD_OBJECT('success', 'success');
END;
$BODY$
LANGUAGE plpgsql;

---query

SELECT public.bus_insert(
    '{"bus_id":"1234", "category":"big","license_no":"CUM-LA 19-1814","assign":"student"}'::json
);
