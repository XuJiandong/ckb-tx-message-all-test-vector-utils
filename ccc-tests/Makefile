

all: test-vectors
	pnpm build
	pnpm start

test-vectors:
	mkdir -p test-vectors
	cd .. && ./target/release/native-test-vector-generator --output ./ccc-tests/test-vectors

clean:
	pnpm clean
	rm -rf test-vectors

.PHONY: all
