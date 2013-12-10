HR= ==================================================
MOCHA_OPTS= --check-leaks
REPORTER = spec

# ---------------------------------------
# Initial Setup
# ---------------------------------------
setup-hook:
	@ln -s util/scripts/pre-commit.sh .git/hooks/pre-commit

initial-setup:
	@npm install -d
	#@cp conf/secrets.example.json conf/secrets.json
	#@make seed
	#@make setup-hook

# ---------------------------------------
# APP - build commands ( for building JS / SASS )
# ---------------------------------------
all: devJs
dev: devJs 

watchjs: 
	@./util/scripts/when-changed.py static/js/*.js static/js/*/*.js static/js/*/*/*.js static/js/*/*/*/*.js -c make devJs
watchsass:
	@sass --watch static/css/main.scss:static/css/compiled/main.css

# sub build commands
# ---------------------------------------
devJs:
	@echo "Building files - DEV"
	@rm -rf static/build/*
	@./node_modules/requirejs/bin/r.js -o static/js/build-dev.js
	@echo "Done! \n${HR}"

productionJs:
	@echo "Building files - PRODUCTION"
	@rm -rf static/build/*
	@./node_modules/requirejs/bin/r.js -o static/js/build.js
	@echo "Done! \n${HR}"

sass:
	@echo "Making sass"
	@sass static/css/main.scss:static/css/compiled/main.css
	@echo "Done! \n${HR}"

# ---------------------------------------
# API _ Tests
# ---------------------------------------
test: setup-test test-mocha
setup-test: 
	@echo "Clearing test DB"
	@mongo quintTest --eval "db.dropDatabase();"
	@redis-cli flushdb
	@echo "Seeding test DB"
	@NODE_ENV=test && node util/scripts/insertData.js
	@echo "Done seeding test data"
	@echo "Sleeping to ensure the seeding finishes before tests..."

test-mocha:
	sleep 0.5
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) $(MOCHA_OPTS) $(TEST_FILES)

# API - Data Related
# ---------------------------------------
clear:
	@mongo quint --eval "db.dropDatabase();"
	@redis-cli flushdb

clear-seeded:
	@mongo quint --eval "db.questions.remove();"
	@redis-cli flushdb

seed:
	@make clear-seeded
	@node util/scripts/insertData.js
	@redis-cli flushdb

# ---------------------------------------
#  Utility commands
# ---------------------------------------
personalityTest:
	@node util/scripts/processStaticData.js
