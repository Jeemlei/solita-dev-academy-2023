import requests
from requests.structures import CaseInsensitiveDict
from config import GEOAPIFY_KEY
import json


def get_address(lat, lng):
    url = f'https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lng}&lang=en&apiKey={GEOAPIFY_KEY}'
    headers = CaseInsensitiveDict()
    headers['Accept'] = 'application/json'

    resp = requests.get(url, headers=headers)
    return json.loads(resp.text)['features'][0]['properties']['formatted']
