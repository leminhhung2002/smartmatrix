from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("get_user/<str:wallet_address>",
         views.get_user, name="get_user"),
    path("get_buy_history/<str:wallet_address>",
         views.get_buy_history, name="get_buy_history"),
    path("register_user/", views.register_user, name="register_user"),
    path("save_buy_history/", views.save_buy_history, name="save_buy_history"),
]
