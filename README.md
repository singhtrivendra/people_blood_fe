# Blood Donor Registration System

This project provides a complete blood donor registration system with a TypeScript Express backend and integration with a React frontend.

## Backend Structure

The backend is built with Express.js and TypeScript, with MongoDB as the database. It follows a layered architecture:

- **Models**: Define the data structure for donor information
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and database operations
- **Routes**: Define API endpoints

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donors` | Get all donors |
| GET | `/api/donors/:id` | Get a specific donor |
| POST | `/api/donors` | Register a new donor |
| PUT | `/api/donors/:id` | Update donor information |
| DELETE | `/api/donors/:id` | Delete a donor |

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/blood-donation
   NODE_ENV=development
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Frontend Integration

The backend is designed to work seamlessly with the provided React frontend. 

To integrate:

1. Update the `onSubmit` function in your React form to send data to the backend
2. Ensure field names match between frontend and backend
3. Handle API responses appropriately with user feedback

## Data Model

The donor schema includes:

- Personal Information
  - `name`: Full name of the donor
  - `email`: Email address
  - `phone`: Phone number
  - `dob`: Date of birth
  - `gender`: Gender selection
  - `bloodType`: Blood type if known

- Contact Information
  - `address`: Street address
  - `city`: City
  - `state`: State/Province
  - `zipCode`: Zip/Postal code

- Medical & Donation History
  - `previousDonation`: Whether they've donated before (yes/no)
  - `medicalConditions`: Any relevant medical conditions (optional)
  - `additionalInfo`: Additional information (optional)

- Terms
  - `agreeTerms`: Consent to terms and conditions

## Testing with Postman

A sample Postman request body is included in the repository. Use it to test the API endpoints.

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Terms not accepted
- Server errors
- Not found errors

## License

This project is licensed under the MIT License.