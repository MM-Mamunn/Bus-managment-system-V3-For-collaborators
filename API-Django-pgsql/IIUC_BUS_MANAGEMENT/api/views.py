
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from rest_framework import status
from django.http import HttpResponse,HttpResponseRedirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils  import database 
import json
import re
from django.contrib import messages

# Create your views here.

@api_view(['GET','POST'])
def driver_insert(request):
    if request.method == "GET":
        return Response({'message':"GET method called"})
    elif request.method == "POST":
        try:
            body = json.dumps(json.loads(request.body))
            print(body)
            
            database.cur.execute("""
                select driver_insert(%s) ;
            """,(body,))
            # result = json.loads(json.dumps(database.cur.fetchone()[0]))
            database.conn.commit()
            

            return Response(
                {
                    "message": "success"
                }
            )
        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "Post called but error", "error": error});





@api_view(['GET','POST','PATCH'])
def driver_update(request):
    if request.method == "PATCH":
        try:
                
                body = json.dumps(json.loads(request.body))
                print(body)
                
                database.cur.execute("""
                    select driver_update(%s) ;
                """,(body,))
                #result = json.loads(json.dumps(database.cur.fetchone()[0]))
                database.conn.commit()
                
               
                return Response(
                    {
                        "message": "success"
                    }
                )
        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "Post called but error", "error": error});


@api_view(['GET','POST','PATCH'])
def bus_update(request):
    if request.method == "PATCH":
        try:
                
                body = json.dumps(json.loads(request.body))
                print(body)
                
                database.cur.execute("""
                    select bus_update(%s) ;
                """,(body,))
                #result = json.loads(json.dumps(database.cur.fetchone()[0]))
                database.conn.commit()
                
               
                return Response(
                    {
                        "message": "success"
                    }
                )
        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "Post called but error", "error": error});



# @api_view(['GET','POST','PATCH'])
# def driver_update(request):
#     if request.method == "PATCH":
#         try:
#                 body = json.dumps(json.loads(request.body))
#                 print(body)
                
#                 database.cur.execute("""
#                     select driver_update(%s) ;
#                 """,(body,))
#                 #result = json.loads(json.dumps(database.cur.fetchone()[0]))
#                 database.conn.commit()
                

#                 return Response(
#                     {
#                         "message": "success"
#                     }
#                 )
#         except(Exception, database.Error) as error:
#             database.conn.commit()
#             print(error)
#             return Response({"message": "Post called but error", "error": error});


@api_view(['GET','POST'])
def trip_insert(request):
    if request.method == "GET":
        return Response({'message':"GET method called"})
    elif request.method == "POST":
        try:
            body = json.dumps(json.loads(request.body))
            print(body)
            
            database.cur.execute("""
                select trip_insert(%s) ;
            """,(body,))
            database.conn.commit()
            

            return Response(
                {
                    "message": "success"
                }
            )
        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "Post called but error", "error": error});




@api_view(['GET','POST'])
def driver_view(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)

            database.cur.execute("""
                select driver_view(%s, %s);
            """,(page,limit))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});


@api_view(['GET','POST'])
def maintanance_view(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)

            database.cur.execute("""
                select maintanance_view(%s, %s);
            """,(page,limit))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});


@api_view(['GET','POST'])
def search_trip(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            driver_id = request.GET.get("driver_id",3)

            database.cur.execute("""
                select search_trip(%s);
            """,(driver_id,))
            # print(database.cur.fetchone()[0])
            result = json.loads(json.dumps(database.cur.fetchone()[0]))
            print(result)
            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});

@api_view(['GET','POST'])
def search_driver(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            driver_id = request.GET.get("driver_id",3)

            database.cur.execute("""
                select search_driver(%s);
            """,(driver_id,))
            # print(database.cur.fetchone()[0])
            result = json.loads(json.dumps(database.cur.fetchone()[0]))
            print(result)
            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});
@api_view(['GET','POST'])
def search_maintanance(request):
    if request.method == "GET":
        try:
            
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            bus_id = request.GET.get("bus_id",3)
            print(bus_id)
            database.cur.execute("""
                select maintanance_search2(%s);
            """,(bus_id,))
            # print(database.cur.fetchone()[0])
            result = json.loads(json.dumps(database.cur.fetchone()[0]))
            print(result)
            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});

@api_view(['GET','POST'])
def count_trip(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            driver_id = request.GET.get("driver_id",3)

            database.cur.execute("""
                select count_trip(%s);
            """,(driver_id,))
            # print(database.cur.fetchone()[0])
            result = json.loads(json.dumps(database.cur.fetchone()[0]))
            print(result)
            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});



@api_view(['GET','POST'])
def count_payment(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            driver_id = request.GET.get("driver_id",3)

            database.cur.execute("""
                select count_payment(%s);
            """,(driver_id,))
            # print(database.cur.fetchone()[0])
            result = json.loads(json.dumps(database.cur.fetchone()[0]))
            print(result)
            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});



@api_view(['GET','POST'])
def trip_all(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)

            database.cur.execute("""
                select trip_all(%s, %s);
            """,(page,limit))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});

@api_view(['GET','POST'])
def oil_count(request):
    print("hi hi");
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            date1 = request.GET.get("date1","'2002-01-01'")
            date2 = request.GET.get("date2","'2032-01-01'")

            database.cur.execute("""
                select oil_count(%s, %s, %s,%s);
            """,(page,limit,date1,date2,))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});


@api_view(['GET','POST'])
def bus_view(request):
     if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)

            database.cur.execute("""
                select bus_view(%s, %s);
            """,(page,limit))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});

@api_view(['GET','POST'])
def efficiency(request):
     if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)
            oil = request.GET.get("oil",40)
            print(oil);
            database.cur.execute("""
                select efficiency(%s, %s,%s );
            """,(page,limit,oil,))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            print(oil);
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});

@api_view(['GET','POST'])
def category_view(request):
     if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)

            database.cur.execute("""
                select category_view(%s, %s);
            """,(page,limit))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});


@api_view(['GET','POST'])
def route_view(request):
     print("route_view called")
     if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 5)

            database.cur.execute("""
                select route_view(%s, %s);
            """,(page,limit))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            print(result)
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});


@api_view(['GET','POST','PATCH'])
def driver_search(request, driver_id):
    if request.method == "GET":
        try:
            
            database.cur.execute("""
                select driver_search(%s);
            """,(driver_id,))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});




@api_view(['GET','POST'])
def bus_insert(request):
    if request.method == "GET":
        return Response({'message':"GET method called"})
    elif request.method == "POST":
        try:
            body = json.dumps(json.loads(request.body))
            print(body)
            
            database.cur.execute("""
                select bus_insert(%s) ;
            """,(body,))
            # result = json.loads(json.dumps(database.cur.fetchone()[0]))
            database.conn.commit()
            

            return Response(
                {
                    "message": "success"
                }
            )
        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "Post called but error", "error": error});




@api_view(['GET','DELETE'])
def bus_delete(request):
    if request.method == "GET":
        try:
            bus_id = request.GET.get("bus_id",3)

            database.cur.execute("""
                select bus_delete(%s) ;
            """,(bus_id,))
            # result = json.loads(json.dumps(database.cur.fetchone()[0]))
            database.conn.commit()
            

            return Response(
                {
                    "message": "success"
                }
            )
        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "Post called but error", "error": error});



#number of trip of a bus in from a date to another date
@api_view(['GET','POST'])
def number_of_trip(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 3)
            fromm = request.GET.get("date1",'2023-01-01')
            too = request.GET.get("date2",'2023-12-30')
            database.cur.execute("""
                select number_of_trip(%s, %s,%s,%s);
            """,(page,limit,fromm,too))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            print(result)
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});




#total distance traveled by a bus
@api_view(['GET','POST'])
def total_distance(request):
    if request.method == "GET":
        try:
            page = request.GET.get("page",1)
            limit = request.GET.get("limit", 3)
            date1 = request.GET.get("date1",'2023-01-01')
            date2 = request.GET.get("date2",'2023-12-30')
            database.cur.execute("""
                select total_distance(%s, %s,%s,%s);
            """,(page,limit,date1,date2))
            result = json.loads(json.dumps(database.cur.fetchone()[0]))

            database.conn.commit()
            print(result)
            return Response({
                "data": result
            }
            )


        except(Exception, database.Error) as error:
            database.conn.commit()
            print(error)
            return Response({"message": "GET called but error", "error": error});
