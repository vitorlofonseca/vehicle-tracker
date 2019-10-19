{
	"info": {
		"_postman_id": "50298a32-f7cd-4e57-a99f-22ffc2dec263",
		"name": "vehicle-tracker",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Creating device",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"inUse\":false,\n\t\"macAddress\":\"psakopsa-opksakopsa-kosap-askopk\",\n\t\"password\":\"test\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/v1/device/create",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"v1",
						"device",
						"create"
					]
				}
			},
			"response": []
		},
		{
			"name": "Device Auth",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"macAddress\":\"psakopsa-opksakopsa-kosap-askopk\",\n\t\"password\": \"test\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/v1/device/auth",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"v1",
						"device",
						"auth"
					]
				}
			},
			"response": []
		},
		{
			"name": "Set Vehicle in device",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"macAddress\":\"psakopsa-opksakopsa-kosap-askopk\",\n\t\"vehicle\":{\n\t\t\"manufacturer\": \"Ford\",\n\t\t\"model\": \"fiesta\",\n\t\t\"year\": 2013,\n\t\t\"plate\": \"kas-1233\"\n\t}\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/v1/device/setVehicle",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"v1",
						"device",
						"setVehicle"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Device",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3001/api/v1/device/psakopsa-opksakopsa-kosap-askopk",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"v1",
						"device",
						"psakopsa-opksakopsa-kosap-askopk"
					]
				}
			},
			"response": []
		},
		{
			"name": "Save metric",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"deviceMacAddress\": \"psakopsa-opksakopsa-kosap-askopk\",\n\t\"metrics\": [{\n\t\t\"code\": \"TEST\",\n\t\t\"name\": \"Test3\",\n\t\t\"value\": \"99999999999\"\n\t},{\n\t\t\"code\": \"TEST3\",\n\t\t\"name\": \"Test4\",\n\t\t\"value\": \"321\"\n\t}]\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/v1/metric",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"v1",
						"metric"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Last Metrics",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3001/api/v1/metric/getLast/psakopsa-opksakopsa-kosap-askopk",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"v1",
						"metric",
						"getLast",
						"psakopsa-opksakopsa-kosap-askopk"
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}