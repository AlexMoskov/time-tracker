# Welcome to Simple Time Tracker

## Quick Start

If you are a new, this is the quickest way to get the app running.

1. Get Ruby (3.0.0) installed
2. Install gems: `bundle install`
3. `rails db:create db:migrate db:seed`
4. Install js libraries `yarn install`
5. Start app: `rails s --binding=127.0.0.1`
6. Open `http://127.0.0.1:3000/` or `http://localhost:3000/`

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
