# Vehicle Tracker

Do you lend your car to your child and want to know how fast your child is driving? 

Vehicle Tracker is a project to track your vehicle remotely through the internet. With a Raspberry Pi, you will connect your car to the internet, tracking your vehicle metrics like RPM, speed, temperature and other custom metrics developed by anyone.

This repository contains the system that receives the metrics from the vehicles, store and show them to the final user.

The communication between Raspberry Pi and OBD interface is under development.

## Required Items

- Raspberry Pi with Docker installed
- Wired OBD Interface, to connect your car to Raspberry Pi
- 3G USB tongle to connect your Raspberry Pi to internet

## Running

### You need Docker installed in your machine

- Clone this repository
- Enter the cloned folder
- Run the command <code>docker-compose up -d</code> to create the three configured container (APP, API and database) in the detached way
- Access <code>http://localhost:PORT_DEFINED_IN_docker-compose.yml_TO_APP_SECTION</code> in your browser

## Utilization

### Before all, you will need configure your [Raspberry Pi with vehicle-tracker-device](https://github.com/vitorlofonseca/vehicle-tracker-device)

- Login in the platform using Raspberry Pi MAC address and the password created on logon
- See metrics
