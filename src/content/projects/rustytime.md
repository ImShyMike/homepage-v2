---
title: rustytime
description: 🕒 blazingly fast time tracking for developers
date: Dec 29 2025
link: https://rustytime.shymike.dev
repo: https://github.com/ImShyMike/rustytime
techStack: ['Rust', 'SvelteKit', 'TimescaleDB']
heroImage: ../../assets/projects/rustytime.png
---

<div class="flex flex-col items-center justify-center">
    <a class="mt-8!" href="https://rustytime.shymike.dev">
        <img class="m-0!" alt="rustytime" width="200" src="https://raw.githubusercontent.com/ImShyMike/rustytime/main/frontend/static/pwa/favicon-196.png">
    </a>
    <a class="text-lg! mt-4!" href="https://rustytime.shymike.dev"><h1 class="m-0!">rustytime</h1></a>
    <p class="m-0 mb-2">🕒 blazingly fast time tracking for developers</p>
</div>

---

## Features

- ✅ Time tracking
- ✅ Stat visualization
- ✅ WakaTime compatible
- ✅ Fast and memory efficient

## What is this?

`rustytime` is a [WakaTime](https://wakatime.com) compatible backend that can be used to track time
in most apps/IDEs with any of the existing [plugins](https://wakatime.com/plugins)! (or you could
even [make your own](https://wakatime.com/help/creating-plugin) plugin)

## Local Development

```sh
# Clone the repo
$ git clone https://github.com/ImShyMike/rustytime && cd rustytime

# Copy the env file
$ cp .env.example .env
```

Edit your `.env` file to include the following:

```dotenv
# GitHub OAuth Settings
GITHUB_CLIENT_ID=client_id_goes_here
GITHUB_CLIENT_SECRET=client_secret_goes_here
```

### Build & Run

```sh
# Run the full app
$ docker compose up

# OR

# Run the database + backend
$ docker compose up timescaledb rustytime
# Run the frontend
$ cd frontend && bun run dev
```

The app should now be available at [http://localhost:5173](http://localhost:5173)

### Seeding the DB

The `seed` feature can be enabled with a build flag to seed the database with a single user and 10000 fake heartbeats.

```bash
cargo run --features seed
```

## WakaTime

When using a WakaTime client, point your requests to `http://localhost:3000/api/v1`
(or `https://api-rustytime.shymike.dev/api/v1` if using the deployed version)

### Observability (OTel + LGTM)

If you're running the self-hosted Grafana LGTM (Loki/Grafana/Tempo/Mimir) stack or an OpenTelemetry
Collector on the same machine, expose its OTLP receiver (default gRPC on `4317`). Then add the following to your `.env`:

```dotenv
OTEL_SERVICE_NAME=rustytime-backend
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=dev,service.version=local-dev
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
OTEL_EXPORTER_OTLP_PROTOCOL=grpc
OTEL_TRACES_EXPORTER=otlp
OTEL_METRICS_EXPORTER=otlp
OTEL_LOGS_EXPORTER=otlp
# Only when your collector requires authentication headers (comma-separated k=v)
# OTEL_EXPORTER_OTLP_HEADERS=x-otlp-token=changeme
```

### Profiling (Pyroscope)

If you're also running Pyroscope for profiling, it can be enabled with:

```dotenv
PYROSCOPE_SERVER_URL=http://localhost:4040
PYROSCOPE_SAMPLE_RATE=99
```

## Star History

<a href="https://www.star-history.com/#imshymike/rustytime&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=imshymike/rustytime&type=date&theme=dark&legend=top-left"/>
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=imshymike/rustytime&type=date&legend=top-left"/>
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=imshymike/rustytime&type=date&legend=top-left"/>
 </picture>
</a>

## License

This project is licensed under the [GNU AGPLv3](https://github.com/ImShyMike/rustytime/blob/HEAD/LICENSE)
