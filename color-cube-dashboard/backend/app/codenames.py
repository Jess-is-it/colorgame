from __future__ import annotations

import random


# "Lady name" codenames using popular leading ladies / heroines / iconic names.
# Keep ASCII only.
LEADING_LADY_CODENAMES = [
    "Leia",
    "Hermione",
    "Katniss",
    "Furiosa",
    "Ripley",
    "Mulan",
    "Moana",
    "Elsa",
    "Anna",
    "Belle",
    "Ariel",
    "Cinderella",
    "Jasmine",
    "Merida",
    "Tiana",
    "Rey",
    "Padme",
    "Trinity",
    "Neytiri",
    "WonderWoman",
    "BlackWidow",
    "CaptainMarvel",
    "ScarletWitch",
    "Gamora",
    "HarleyQuinn",
    "Wednesday",
    "Daenerys",
    "Arya",
    "Sansa",
    "Eleven",
    "MiaWallace",
    "ErinBrockovich",
    "LaraCroft",
    "Amelie",
    "Matilda",
    "Clarice",
    "Juno",
    "Hanna",
    "Selene",
    "Sally",
    "Dorothy",
    "Glinda",
    "Marilyn",
]


def pick_codename(used: set[str]) -> str:
    pool = [n for n in LEADING_LADY_CODENAMES if n not in used]
    if pool:
        return random.choice(pool)

    # If we ever exhaust the list, keep names readable.
    i = 1
    while True:
        name = f"Lady{i:03d}"
        if name not in used:
            return name
        i += 1

