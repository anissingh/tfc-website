#!/usr/bin/env bash
cd tfcfrontend
npm install
cd ..
python3 -m virtualenv venv
source venv/bin/activate
chmod +x startup.sh
chmod +x run.sh
chmod +x makepayments.sh
cd tfcbackend
pip install -r requirements.txt
chmod +x manage.py
./manage.py makemigrations
./manage.py migrate
cd ..
