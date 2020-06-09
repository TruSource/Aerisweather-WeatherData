const Oracle = artifacts.require("Oracle");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

contract("Oracle (Query) - getAlerts", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["p", "55403"]);

    encodePathParams = cbor.encode(["closest"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getAlerts(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getCountries", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["us"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getCountries(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getForecasts", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["seattle,wa"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getForecasts(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getLightningSummary", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["atlanta,ga"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getLightningSummary(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getObservations", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["55403"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getObservations(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getPhrasesSummary", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["toronto,canada"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getPhrasesSummary(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getPlacesPostalcodes", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["55403"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getPlacesPostalcodes(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getSunmoonMoonphases", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["minneapolis,mn"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getSunmoonMoonphases(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getSunmoon", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["minneapolis,mn"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getSunmoon(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});
