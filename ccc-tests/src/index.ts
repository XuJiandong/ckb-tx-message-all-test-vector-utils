import { TestVector } from "./test-vectors";

async function main() {
    const testVectors = TestVector.getAllFromDirectory("./test-vectors");
    for (let testVector of testVectors) {
        console.log(`Test vector: ${testVector.name}`);
        await testVector.run();
        console.log("Passed");
    }
}

main();