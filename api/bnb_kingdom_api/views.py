from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .import models
import json

# Create your views here.


@csrf_exempt
def index(req):
    routes = [
        {
            "url": "/api/",
            "method": "*",
            "description": "This is the index page."
        },
        {
            "url": "/api/get_user/<wallet_address>",
            "method": "GET",
            "description": "This endpoint returns the user data for the given wallet address."
        },
        {
            "url": "/api/get_buy_history/<wallet_address>",
            "method": "GET",
            "description": "This endpoint returns the buy history for the given wallet address."
        },
        {
            "url": "/api/register_user/",
            "method": "POST",
            "description": "This endpoint registers a new user."
        },
        {
            "url": "/api/save_buy_history/",
            "method": "POST",
            "description": "This endpoint saves a new buy history."
        }
    ]

    return JsonResponse({
        "message": "Welcome to the BNB Kingdom API.",
        "routes": routes
    })


@csrf_exempt
def get_user(req, wallet_address):
    if req.method != "GET":
        return JsonResponse({
            "message": "Method not allowed."
        }, status=405)

    try:
        user = models.User.objects.get(wallet_address=wallet_address)
    except models.User.DoesNotExist:
        return JsonResponse({
            "message": "User not found.",
            "error_type": "user_not_found",
        }, status=404)

    return JsonResponse({
        "message": "User data found.",
        "user": {
            "id": user.user_id,
            "created_at": user.created_at,
            "date_created": user.date_created,
            "wallet_address": user.wallet_address
        }
    })


@csrf_exempt
def register_user(req):
    if req.method != "POST":
        return JsonResponse({
            "message": "Method not allowed.",
            "error_type": "method_not_allowed"
        }, status=405)

    body = json.loads(req.body.decode("utf-8"))

    if "wallet_address" not in body:
        return JsonResponse({
            "message": "Missing wallet_address.",
            "error_type": "missing_parameter"
        }, status=400)

    wallet_address = body["wallet_address"]

    try:
        user = models.User.objects.get(wallet_address=wallet_address)
        return JsonResponse({
            "message": "User already exists.",
            "error_type": "user_already_exists"
        }, status=400)
    except models.User.DoesNotExist:
        user = models.User(
            wallet_address=wallet_address
        )
        user.save()
        return JsonResponse({
            "message": "User registered."
        })
    return JsonResponse({
        "message": "Something went wrong.",
        "error_type": "internal_error"
    })


@csrf_exempt
def save_buy_history(req):
    if req.method != "POST":
        return JsonResponse({
            "message": "Method not allowed.",
            "error_type": "method_not_allowed"
        }, status=405)

    body = json.loads(req.body.decode("utf-8"))

    if "wallet_address" not in body:
        return JsonResponse({
            "message": "Missing wallet_address.",
            "error_type": "missing_parameter"
        }, status=400)

    if "amount_bnb" not in body:
        return JsonResponse({
            "message": "Missing amount_bnb.",
            "error_type": "missing_parameter"
        }, status=400)

    wallet_address = body["wallet_address"]
    amount_bnb = body["amount_bnb"]

    try:
        user = models.User.objects.get(wallet_address=wallet_address)
    except models.User.DoesNotExist:
        return JsonResponse({
            "message": "User not found.",
            "error_type": "user_not_found"
        }, status=404)

    buy_history = models.BuyHistory(
        user=user,
        amount_bnb=amount_bnb
    )
    buy_history.save()

    return JsonResponse({
        "message": "Buy history saved."
    })


@csrf_exempt
def get_buy_history(req, wallet_address):
    if req.method != "GET":
        return JsonResponse({
            "message": "Method not allowed."
        }, status=405)

    try:
        history = models.BuyHistory.objects.filter(
            user__wallet_address=wallet_address)
    except models.BuyHistory.DoesNotExist:
        return JsonResponse({
            "message": "Buy history not found.",
            "error_type": "buy_history_not_found"
        }, status=404)

    history_data = []
    for i in history:
        history_data.append({
            "id": i.buy_history_id,
            "user_id": i.user.user_id,
            "wallet_address": i.user.wallet_address,
            "created_at": i.created_at,
            "date_created": i.date_created,
            "date_started": i.get_date_started(),
            "date_finished": i.get_date_finished(),
            "amount_bnb": i.amount_bnb,
            "current_bnb_profit": i.get_current_bnb_profit(),
            "current_bnbk_profit": i.get_current_bnbk_profit(),
            "interest_per_day": i.get_interest_per_day(),
            "is_complete": i.is_complete_task(),
            "program_type": i.get_program_type(),
            "note": i.note
        })

    if len(history_data) == 0:
        return JsonResponse({
            "message": "Buy history not found."
        }, status=404)

    return JsonResponse({
        "message": "Buy history found.",
        "history": history_data
    })


def handler404(req, *args, **argv):
    return JsonResponse({
        "message": "Page not found."
    }, status=404)
