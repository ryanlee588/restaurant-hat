# Restaurant Hat

A service that helps you pick a random restaurant from submitted choices. It allows users to create lists which allow other users to add restaurants to, and generates a random restaurant from the list when requested.

This web app has been deployed using vercel and can be found [here](https://restaurant-hat.vercel.app).

# Requirements

## Primary Requirements

1. The application has a web page that allows a user to input a restaurant of their choice, which is submitted to a backend service via an API call.
2. The backend service has an API that returns a random restaurant from the submitted choices.
3. Other users may submit restaurants of their choice as well.
4. The web page allows a user to request for a random choice based on the submitted choices. After the random choice is shown, no further restaurants may be submitted.

## Secondary Requirements

1. Only the user who submitted the first restaurant may make the request in primary requirement 4.
2. Multiple users may initiate different sessions and invite guests to submit choices to their session. These choices are limited only to the initiated session.

# Web App Layout

The web app consists of 3 main pages.

- Login page (landing page)
- List Directory
- Individual List Page

The **List Directory** and **Individual List Page** can only be accessed if a user is logged in.

The following sections lay out the functionalities of each page.

## Login Page

- User Sign In
- User Sign up
  - Basic email validation done, ensuring that emails follow the structure of {prefix}@{domain}.{suffix}

## List Directory

- Viewing of list
  - All users can view all lists by providing the list's name.
  - All list names are unique.
- Creation of list
  - If a list does not exist, a new list of the provided name will be created.
  - The user who creates the list is the owner of the list.
- Deletion of list
  - Lists can only be deleted by its owner.
  - All restaurants in that list will be deleted.
  - This action is irreversible.

## Individual List Page

- Viewing of restaurants in the list and the emails of the users who added them.
- Viewing of list status (Open or Close).
- Adding of restaurants to a list.
  - Restaurants can only be added to an open list.
- Getting a random restaurant.
  - Only owners can get a random restaurant.
  - This action can be done regardless of the list's status.
  - This action closes the list.

# Tech Stack

## Front End (Next.js)

- Framework used to implement all web page components, providing functionalities such as routing and handingly server/client side rendering.
- Typescript programming language.
- Used in conjunction with tailwind CSS and shadcn/ui which handled styling of components.

## Back End (Supabase)

- Interaction with Supabase was mostly done using the Supabase Next.js and javascript libraries. Documentation on interacting with supabase can be found [here](https://supabase.com/docs).

- Authentication

  - Helped to handle basic email-password authentication and user management.
  - Provided APIs and a UI to interact with authentication and user sessions.

- Provided a PostgreSQL Database, and APIs and a UI to interact with its tables and functions.

  - Table schemas

    - Lists

    | Column Name   | Type                    |
    | ------------- | ----------------------- |
    | id            | Primary Key, Unique     |
    | created_at    |                         |
    | name          | Primary Key, Unique     |
    | open          |                         |
    | owner         |                         |
    | ------------- | ----------------------- |

    - Restaurants

    | Column Name   | Type                      |
    | ------------- | ------------------------- |
    | id            | Primary Key, Unique       |
    | created_at    |                           |
    | list          | Foreign Key -> lists.name |
    | restaurant    |                           |
    | owner         |                           |
    | ------------- | -----------------------   |

  - Additional Functions (Built upon basic PostgreSQL database functions)
    - `check_list_empty`: Checks if a list is empty.
      - Input: list_name (text)
      - Output: bool
    - `check_list_exists`: Checks if a list of a given name has been created.
      - Input: list_name (text)
      - Output: bool
    - `check_list_open`: Checks if a list is open.
      - Input: list_name (text)
      - Output: bool
    - `delete_list`: Deletes a list if the user requesting it is the owner
      - Input: list_name (text), user_email (text)
      - Output: void
    - `get_rand_restaurant`: Gets a random restaurant if the user requesting it is the owner, and closes list.
      - Input: list_name (text), user_email (text)
      - Output: text

# Testing

Jest and Playwright was used to do end-to-end testing for this web app. Documentation of Jest and Playwright can be found [here](https://playwright.dev/docs/intro).

Tests can be found in ./rh_frontend/src/test

The implementation of tests prioritised testing the requirements. With that said, additional tests were implemented as well to ensure greater test coverage. Tests that test for a requirement will have the requirement(s) tested for in paranthesis beside the test name.

The following tests have been implemented:

## Basic (`basic.test.ts`)

### Page is reachable

Tests that the deployed page is reachable.

## Login Page (`login.test.ts`)

### Email is validated during sign up

Tests that basic validation is done for email.

### Sign in ensures user is signed up

Tests that only authenticated users can sign in.

### Sign in ensures password is correct

Tests that only authenticated users can sign in.

### Sign in and redirect works for registered user

Tests that after sucessful sign it, user will be redirected to list directory page.

### Sign in can happen after failed sign in

Tests that sign in can be done after failing to sign in.

### Authenticated user should be redirected to directory when accessing landing page

Tests that users who are authenticated will be redirected when accessing login page.

### Non authenticated user cannot access directory or list page

Tests that users who are not authenticated will be redirected to login page when trying to access list directory or any list page.

## List Directory Page (`directory.test.ts`)

### Viewing existing list should be redirected to list page

Tests that owners should be able to view list and are redirected to list page when trying to view a list. (Test might fail occasionally due to lag in redirect)

### Non owner should be able to view list (_Secondary Requirement 2_)

Tests that non owners should be able to view list and are redirected to list page when trying to view a list. (Test might fail occasionally due to lag in redirect)

### Owner should be able to delete list (_Secondary Requirement 2_)

Tests that owners should be able to delete lists. (Test might fail occasionally due to lag in creation of list)

## List Page (`list.test.ts`)

### Owner should be able to get a random restaurant (_Primary requirement 2/ Secondary Requirement 1_)

Owners of a list should be able to get a random restaurant from that list.

### Non Owner should not be able to get a random restaurant (_Secondary requirement 2/ Secondary Requirement 1_)

Non Owners of list should not be able to get a random restaurant from that list.

### Should not be able to add restaurant to a closed list (_Secondary requirement 4_)

Once a list has been closed from getting a random restaurant, users should not be able to add any more restaurants.

### Should be able to add restaurant to an open list (_Primary requirement 1_)

Owner should be able to add restaurants to an open list.

### Non owner Should be able to add restaurant to an open list (_Primary requirement 3_)

Non owners should be able to add restaurants to an open list
