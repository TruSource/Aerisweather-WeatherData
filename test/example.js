const Oracle = artifacts.require("Oracle");
const Example = artifacts.require("Example");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

const { decodeRawLog } = require("./utils/helpers.js");

// EACH TEST NEED TO BE GENERATED FOR EACH SOURCE
contract("Example (End to End tests)", async accounts => {
  // accounts[0] is the address that deployed the contracts (especially the oracle contract)
  let ownerAddress, otherAccountAddress;
  let serverResponse;
  let oracleInstance, exampleInstance;
  let OPERATIONS;
  let statusCode;
  let queryId;

  // before hook is run before all tests
  before(async () => {
    ownerAddress = accounts[0];
    otherAccountAddress = accounts[1];
    serverResponse = "placeholder response";

    oracleInstance = await Oracle.deployed();
    exampleInstance = await Example.deployed();

    OPERATIONS = {
      getAlerts: 0,
      getCountries: 1,
      getForecasts: 2,
      getLightningSummary: 3,
      getObservations: 4,
      getPhrasesSummary: 5,
      getPlacesPostalcodes: 6,
      getSunmoonMoonphases: 7,
      getSunmoon: 8
    };

    statusCode = 200;
  });

  describe("getAlerts operation", () => {
    it("Query getAlerts should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getAlerts({
          from: ownerAddress
        })
      );
    });

    it("Callback for getAlerts should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getAlerts();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getAlerts,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getAlerts should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getAlerts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getAlerts,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getAlerts should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getAlerts,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getAlerts function is called", async () => {
      const exampleTxObj = await exampleInstance.getAlerts();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getAlerts callback function is called", async () => {
      let result = await exampleInstance.getAlerts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getAlerts,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getAlerts function", async () => {
      let result = await exampleInstance.getAlerts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["p", "55403"],
        "Event not emitted or incorrect queryParams"
      );
    });

    it("(Event) Event pathParams should be generated correctly for getAlerts function", async () => {
      let result = await exampleInstance.getAlerts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["closest"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getCountries operation", () => {
    it("Query getCountries should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getCountries({
          from: ownerAddress
        })
      );
    });

    it("Callback for getCountries should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getCountries();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getCountries,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getCountries should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getCountries();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getCountries,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getCountries should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getCountries,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getCountries function is called", async () => {
      const exampleTxObj = await exampleInstance.getCountries();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getCountries callback function is called", async () => {
      let result = await exampleInstance.getCountries();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getCountries,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getCountries function", async () => {
      let result = await exampleInstance.getCountries();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["us"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getForecasts operation", () => {
    it("Query getForecasts should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getForecasts({
          from: ownerAddress
        })
      );
    });

    it("Callback for getForecasts should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getForecasts();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getForecasts,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getForecasts should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getForecasts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getForecasts,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getForecasts should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getForecasts,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getForecasts function is called", async () => {
      const exampleTxObj = await exampleInstance.getForecasts();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getForecasts callback function is called", async () => {
      let result = await exampleInstance.getForecasts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getForecasts,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getForecasts function", async () => {
      let result = await exampleInstance.getForecasts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["seattle,wa"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getLightningSummary operation", () => {
    it("Query getLightningSummary should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getLightningSummary({
          from: ownerAddress
        })
      );
    });

    it("Callback for getLightningSummary should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getLightningSummary();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getLightningSummary,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getLightningSummary should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getLightningSummary();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getLightningSummary,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getLightningSummary should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getLightningSummary,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getLightningSummary function is called", async () => {
      const exampleTxObj = await exampleInstance.getLightningSummary();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getLightningSummary callback function is called", async () => {
      let result = await exampleInstance.getLightningSummary();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getLightningSummary,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getLightningSummary function", async () => {
      let result = await exampleInstance.getLightningSummary();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["atlanta,ga"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getObservations operation", () => {
    it("Query getObservations should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getObservations({
          from: ownerAddress
        })
      );
    });

    it("Callback for getObservations should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getObservations();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getObservations,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getObservations should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getObservations();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getObservations,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getObservations should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getObservations,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getObservations function is called", async () => {
      const exampleTxObj = await exampleInstance.getObservations();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getObservations callback function is called", async () => {
      let result = await exampleInstance.getObservations();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getObservations,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getObservations function", async () => {
      let result = await exampleInstance.getObservations();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["55403"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getPhrasesSummary operation", () => {
    it("Query getPhrasesSummary should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getPhrasesSummary({
          from: ownerAddress
        })
      );
    });

    it("Callback for getPhrasesSummary should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getPhrasesSummary();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getPhrasesSummary,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getPhrasesSummary should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getPhrasesSummary();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getPhrasesSummary,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getPhrasesSummary should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getPhrasesSummary,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getPhrasesSummary function is called", async () => {
      const exampleTxObj = await exampleInstance.getPhrasesSummary();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getPhrasesSummary callback function is called", async () => {
      let result = await exampleInstance.getPhrasesSummary();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getPhrasesSummary,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getPhrasesSummary function", async () => {
      let result = await exampleInstance.getPhrasesSummary();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["toronto,canada"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getPlacesPostalcodes operation", () => {
    it("Query getPlacesPostalcodes should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getPlacesPostalcodes({
          from: ownerAddress
        })
      );
    });

    it("Callback for getPlacesPostalcodes should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getPlacesPostalcodes();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getPlacesPostalcodes,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getPlacesPostalcodes should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getPlacesPostalcodes();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getPlacesPostalcodes,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getPlacesPostalcodes should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getPlacesPostalcodes,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getPlacesPostalcodes function is called", async () => {
      const exampleTxObj = await exampleInstance.getPlacesPostalcodes();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getPlacesPostalcodes callback function is called", async () => {
      let result = await exampleInstance.getPlacesPostalcodes();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getPlacesPostalcodes,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getPlacesPostalcodes function", async () => {
      let result = await exampleInstance.getPlacesPostalcodes();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["55403"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getSunmoonMoonphases operation", () => {
    it("Query getSunmoonMoonphases should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getSunmoonMoonphases({
          from: ownerAddress
        })
      );
    });

    it("Callback for getSunmoonMoonphases should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getSunmoonMoonphases();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getSunmoonMoonphases,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getSunmoonMoonphases should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getSunmoonMoonphases();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getSunmoonMoonphases,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getSunmoonMoonphases should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getSunmoonMoonphases,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getSunmoonMoonphases function is called", async () => {
      const exampleTxObj = await exampleInstance.getSunmoonMoonphases();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getSunmoonMoonphases callback function is called", async () => {
      let result = await exampleInstance.getSunmoonMoonphases();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getSunmoonMoonphases,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getSunmoonMoonphases function", async () => {
      let result = await exampleInstance.getSunmoonMoonphases();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["minneapolis,mn"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getSunmoon operation", () => {
    it("Query getSunmoon should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getSunmoon({
          from: ownerAddress
        })
      );
    });

    it("Callback for getSunmoon should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getSunmoon();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getSunmoon,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getSunmoon should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getSunmoon();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getSunmoon,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getSunmoon should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getSunmoon,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getSunmoon function is called", async () => {
      const exampleTxObj = await exampleInstance.getSunmoon();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getSunmoon callback function is called", async () => {
      let result = await exampleInstance.getSunmoon();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getSunmoon,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getSunmoon function", async () => {
      let result = await exampleInstance.getSunmoon();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["minneapolis,mn"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });
});
