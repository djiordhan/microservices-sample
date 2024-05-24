
# microservices-sample

This repository demonstrates a sample microservices architecture with two microservices implemented in different languages working together to serve a React front-end application. The structure includes a Spring Boot application named "products" and two submodules for the front-end and transactions services.

## Repository Structure

- `products/`: Contains the Spring Boot application.
- `front-end/`: Contains the React front-end application (submodule: [react-tailwind-pos](https://github.com/djiordhan/react-tailwind-pos.git)).
- `transactions/`: Contains the Node.js transactions service (submodule: [node-pos](https://github.com/djiordhan/node-pos.git)).

## Cloning the Repository

To clone this repository along with its submodules, use the following command:

```sh
git clone --recurse-submodules https://github.com/djiordhan/microservices-sample.git
```

If you have already cloned the repository without the submodules, you can initialize and update them with:

```sh
git submodule update --init --recursive
```

## Running the Applications

### Spring Boot Application (products)

1. Navigate to the `products` directory:
    ```sh
    cd products
    ```

2. Run the Spring Boot application:
    ```sh
    ./gradlew bootRun
    ```

### Transactions Service (Node.js)

1. Navigate to the `transactions` directory:
    ```sh
    cd transactions
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

3. Run the development server:
    ```sh
    npm run dev
    ```

### Front-end Application (React)

1. Navigate to the `front-end` directory:
    ```sh
    cd front-end
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

3. Run the development server:
    ```sh
    npm run dev
    ```
