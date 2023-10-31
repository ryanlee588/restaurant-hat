# Restaurant Hat

A service that helps you pick a random restaurant from submitted choices. It allows users to create lists which allow other users to add restaurants to, and generates a random restaurant from the list when requested.

# Requirements

Below are the primary and secondary requirements of Restaurant Hat.

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

The main technologies used for this web app are as follows.

## Front End

- Next.js
  - Framework used to implement all web page components, providing functionalities such as routing and handingly server/client side rendering.
  - Typescript programming language.
  - Used in conjunction with tailwind CSS and shadcn/ui which handled styling of components.

## Back End

- Supabase

  - Authentication

    - Helped to handle basic email-password authentication and user management.
    - Provided APIs and a UI to interact with authentication and user sessions.

  - Database

    - Provided a Postgres Database, and APIs and a UI to interact with its tables and functions.

      - Tables

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

      - Functions
        - `check_list_empty`: Checks if a list is empty.
        - `check_list_exists`: Checks if a list of a given name has been created.
        - `check_list_open`: Checks if a list is open.
        - `delete_list`: Deletes a list if the user requesting it is the owner
        - `get_rand_restaurant`: Gets a random restaurant if the user requesting it is the owner, and closes list.
