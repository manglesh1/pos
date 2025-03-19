## How to run

```
node app.js
```
## Example Requests
```
curl -X POST http://localhost:8080/api/venue/create \
-H "Content-Type: application/json" \
-d '{
  "legalBusinessName": "Venue 1",
  "streetNumberOrBuildingName": "123",
  "streetName": "Main St",
  "townOrCity": "New York",
  "stateOrProvince": "NY",
  "country": "USA",
  "displayAddress": "123 Main St, New York, NY, USA",
  "contactName": "John Doe",
  "contactNumber": "123-456-7890"
}'
```

### Extra Internal Docs

Venue(venueId)
    -Legal business name
    -address

Tax

Checkout

Resource
 -Single-booking/multibooking
 -capacity

(Session or stock ki alag table banegi)
Products:(Session)
    -Name
    -ID
    - Product Variation
        - Name
        - Resource(konse use honge)

stock ki alag

Calendar
    -availability

settings -> resouce
account -> venue/setting n tax
resource -> multi book or single
product -> session or stock
