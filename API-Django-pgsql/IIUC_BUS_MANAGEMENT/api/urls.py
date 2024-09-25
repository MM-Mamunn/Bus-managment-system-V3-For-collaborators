
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('driver_insert',views.driver_insert,name="driver_insert"),
    path('driver_update',views.driver_update,name="driver_update"),
    path('bus_update',views.bus_update,name="bus_update"),
    path('driver_view',views.driver_view,name="driver_view"),
    path('maintanance_view',views.maintanance_view,name="maintanance_view"),
    path('bus_view',views.bus_view,name="bus_view"),
    path('efficiency',views.efficiency,name="efficiency"),
    path('category_view',views.category_view,name="category_view"),
    path('oil_count',views.oil_count,name="oil_count"),
    path('route_view',views.route_view,name="route_view"),
    # path('driver_search/<str:driver_id>',views.driver_search,name="driver_search"),
    path('trip_insert',views.trip_insert,name="trip_insert"),
    path('bus_insert',views.bus_insert,name="bus_insert"),
    path('bus_delete',views.bus_delete,name="bus_delete"),
    path('number_of_trip',views.number_of_trip,name="number_of_trip"),
    path('total_distance',views.total_distance,name="total_distance"),
    path('trip_all',views.trip_all,name="trip_all"),
    path('search_trip',views.search_trip,name="search_trip"),
    path('search_driver',views.search_driver,name="search_driver"),
    path('search_maintanance',views.search_maintanance,name="search_maintanance"),
    path('count_trip',views.count_trip,name="count_trip"),
    path('count_payment',views.count_payment,name="count_payment")
]
