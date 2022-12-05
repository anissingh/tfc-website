#!/usr/bin/env bash
source venv/bin/activate
./tfcbackend/manage.py runserver 8000 &
npm start --prefix ./tfcfrontend
