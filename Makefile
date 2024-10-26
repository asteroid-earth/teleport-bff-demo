.PHONY: configure start stop restart clean

configure:
	@echo "Configuring Teleport..."
	@read -p "Enter your Teleport cluster URL (e.g., space.teleport.sh): " cluster_url; \
	cluster_url=$${cluster_url#https://}; \
	cluster_url=$${cluster_url%/}; \
	read -p "Enter your join token ( App Role Required ): " token; \
	TELEPORT_CLUSTER_URL=$$cluster_url \
	TELEPORT_JOIN_TOKEN=$$token \
	envsubst < config/teleport.yaml.template > config/teleport.yaml

start: stop
	@echo "Starting services..."
	docker compose up -d --build
	@echo "\nAccess your applications at:"
	@echo "https://${TELEPORT_CLUSTER_URL}"

stop:
	@echo "Stopping services..."
	docker compose down

clean:
	rm -f config/teleport.yaml