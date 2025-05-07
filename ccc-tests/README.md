# Integration Tests with CKB CCC

This repository contains integration tests for the CKB [CCC](https://github.com/ckb-devrel/ccc) library.

## Prerequisites

- Make sure you have `pnpm` installed

## Building and Running Tests

1. Build the project at root folder:
```bash
make build
```

2. Run tests
```bash
cd ccc-tests
pnpm install
make all
```

