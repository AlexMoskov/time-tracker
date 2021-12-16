# Welcome to Simple Time Tracker

## Quick Start

If you are a new, this is the quickest way to get the app running.

1. Get Ruby (3.0.0) installed
2. Postgresql should be configured
3. Install gems: `bundle install`
4. `rails db:create db:migrate db:seed`
5. Install js libraries `yarn install`
6. Start app: `rails s --binding=127.0.0.1`
7. Open `http://127.0.0.1:3000/` or `http://localhost:3000/`

## Running Tests

The first thing you want to do is run tests to make sure everything is working before making any changes.

### Setup / Clean the DB for testing
This step is optional as it destroys the DB
```
rails db:drop db:create RAILS_ENV=test                 # Drop and recreate the DB
rails db:migrate RAILS_ENV=test                        # Clean and setup the env
```

### Run RSPEC tests
```
rspec                                                       # Run all test (takes a while)

rspec spec/{whatever file}                                  # Run a specific rspec file

rspec spec/{whatever file}:{line number}                    # Run a specific test in rspec file
```

### Useful commands for debugging

Start rails console
```
rails c
```

### Test accounts

```
user-1@example.com / password
user-2@example.com / password
```

### Written Response

1. Please describe your process for approaching the code challenge. What kind of planning did you do? Did your plans change as you began coding?
```
At the beginning, I carefully analyzed the technical assignment and highlighted the main points such as: tracking time, support many users and work with data.
Then, I decided to create a basic functionality for the backend with a simple visualization on the frontend.
When this was done, I switched to the UI part, for which I configured the React library and other necessary packages.
I also consider testing an important part of the process, but I left it and decided to add tests at the end of the task, in order to have time to implement all the functionality.
At the end of the planning, I divided the task into smaller parts(tasks) for gradual implementation, step by step.
My plans didn't change after I started coding, because I had a certain time limit and the tasks have already been analyzed and formed.
If I changed my plans, in my opinion, it would be a waste of limited time.
```

2. Describe the schema design you chose. Why did you choose this design? What other alternatives did you consider?
```
I chose a scheme that is suitable for this task and does not take much time to implement. 
I also had some similar elements (but not all) in my previous work.
I presented the concept of the page as a time tracker that I used.
An alternative design was - it's a more dynamic page with more usability, 
but, unfortunately, it would take much longer to implement.
```
3. If you were given another day to work on this, how would you spend it? What if you were given a month?
```
If I had more time:
One Day:   
  - I would add tests for the UI part (jest and cucumber)
  - I would also check all the logic again, step by step.
One month: 
  - Added more tests       
  - I would add more functionality to the application such as: 
    working with a user profile, additional configurations for teachers, 
    add a few roles that can manage time tracking, validations, 
    several types for intervals, pause for the tracker, filters, reports and others.
```