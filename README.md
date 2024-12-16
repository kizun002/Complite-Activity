# COMPLITE

## How to set up laravel
follow this tutorial
1. https://youtu.be/LLimpgtNWlo?si=NO3OMg96wlG2gS6G

After setup or downloading laravel
## How to work with the project
1. Download the zipped folder
2. Copy then paste it inside the www folder of your wampserver folder
3. Run Wampserver
4. Open the folder of the project in VS Code
5. type in terminal in VS Code - cd complite-api
6. Type npm install. After type - php artisan migrate
7. After migrate, type - php artisan db:seed (to seed dummy data)
8. After seeding, type - php artisan serve (to start server)
7. Then in terminal type - cd..
8. Then go to complite-app by typing - cd complite-app
9. Type npm run android to run react native in open android studio emulator

## Reminders
1. make sure in your wamp, you have db named - complite
2. make sure you followed the tutorial in downloading laravel
3. If there are concerns, message me

## How to get database

1. Open the complite-api
2. Navigate to Databases\Migrations
3. Copy migration Files and paste to your Laravel project
4. Open your Terminal (make sure the directory is within your laravel project and it is connected to WAMPSERVER)
5. Type the command 'php artisan migrate' this will migrate the database to your server.